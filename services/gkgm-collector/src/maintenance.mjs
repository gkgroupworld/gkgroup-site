import { randomUUID } from "node:crypto";
import { mutate, read } from "./store.mjs";
import { DAY, HOUR, pruneLedger } from "./quotas.mjs";

async function keys(store, prefix, directories = false) {
  const result = [];
  for await (const page of store.list({ prefix, directories, paginate: true })) {
    result.push(...(directories ? page.directories : page.blobs.map(b => b.key)));
  }
  return result;
}

// Invoked only by the scheduled wrapper; no public notification/write API.
export async function processOutbox(store, notify, now = Date.now()) {
  const summary = { sent: 0, failed: 0, deferred: 0 };
  const started = Date.now(); let processed = 0;
  await pruneLedger(store, now);
  for (const queueKey of await keys(store, "outbox/")) {
    if (processed >= 5 || Date.now() - started >= 8000) { summary.deferred++; break; }
    processed++;
    const pointer = await read(store, queueKey);
    if (!pointer) continue;
    const { recordKey, createdAt } = pointer.data;
    if (!/^inquiries\/\d{4}-\d{2}-\d{2}\/[a-f0-9-]{36}$/.test(recordKey || "")) throw new Error("Outbox invalid");
    const lease = randomUUID();
    const decision = await mutate(store, recordKey, data => {
      if (!data) return { write: false, result: now - createdAt >= HOUR ? "discard" : "defer" };
      if (data.deletedAt || data.schema !== 1 || !data.validatedAt || !data.payload || data.expiresAt <= now + 2 * DAY) return { write: false, result: "discard" };
      const n = data.notification;
      if (n.state === "sent" || n.state === "failed") return { write: false, result: "discard" };
      if (n.nextAt > now || (n.leaseUntil && n.leaseUntil > now)) return { write: false, result: "defer" };
      if (n.tries >= 3) return { write: true, value: { ...data, notification: { ...n, state: "failed" } }, result: "discard" };
      return { write: true, value: { ...data, notification: { ...n, state: "sending", tries: n.tries + 1, lease, leaseUntil: now + 2 * 60000 } }, result: "send" };
    });
    if (decision === "discard") { await store.delete(queueKey); continue; }
    if (decision === "defer") { summary.deferred++; continue; }
    let sent = false;
    try { await notify(); sent = true; summary.sent++; }
    catch { summary.failed++; }
    await mutate(store, recordKey, data => {
      // Never resurrect data erased by a concurrent purge.
      if (!data?.payload || data.notification?.lease !== lease) return { write: false, result: false };
      const n = data.notification;
      return { write: true, value: { ...data, notification: { state: sent ? "sent" : n.tries >= 3 ? "failed" : "pending", tries: n.tries, nextAt: now + 15 * 60000 } }, result: true };
    });
    const final = await read(store, recordKey);
    if (!final?.data.payload || ["sent", "failed"].includes(final.data.notification?.state)) await store.delete(queueKey);
  }
  await mutate(store, "system/notification-health", data => ({ write: true, value: { at: now, ...summary, failedAttempts: (data?.failedAttempts || 0) + summary.failed, lastFailureAt: summary.failed ? now : data?.lastFailureAt ?? null }, result: true }));
  return summary;
}

export async function purgeExpired(store, now = Date.now()) {
  const summary = { erased: 0, verified: 0, proofsExpired: 0, backlog: false };
  const started = Date.now(); let processed = 0;
  const budget = () => processed < 20 && Date.now() - started < 8000;
  const cutoff = new Date(now + 2 * DAY).toISOString().slice(0, 10);
  const directories = await keys(store, "inquiries/", true);
  outer:
  for (const directory of directories) {
    if (!/^inquiries\/\d{4}-\d{2}-\d{2}\/$/.test(directory) || directory.slice(10, 20) > cutoff) continue;
    for (const key of await keys(store, directory)) {
      if (!budget()) { summary.backlog = true; break outer; }
      processed++;
      const result = await mutate(store, key, data => {
        if (!data || data.deletedAt || data.expiresAt > now + 2 * DAY) return { write: false, result: false };
        if (data.schema !== 1 || !data.validatedAt || !data.expiresAt) throw new Error("Retention record invalid");
        // Remove every payload, fingerprint and delivery metadata atomically.
        // The remaining opaque key + dates are the minimal proof for 30 days.
        return { write: true, value: { schema: 1, deletedAt: now, proofUntil: now + 30 * DAY, reason: "retention" }, result: true };
      });
      if (result) summary.erased++;
      const final = await read(store, key);
      if (final?.data.deletedAt) {
        if (final.data.payload || final.data.fingerprint || final.data.notification) throw new Error("Purge verification failed");
        const proofKey = `proofs/${new Date(final.data.proofUntil).toISOString().slice(0, 10)}/${key.split("/").at(-1)}`;
        const saved = await store.setJSON(proofKey, { schema: 1, deletedAt: final.data.deletedAt, proofUntil: final.data.proofUntil, reason: "retention" }, { onlyIfNew: true });
        if (saved?.modified !== false && (!saved?.modified || !saved.etag)) throw new Error("Proof storage unavailable");
        const proof = await read(store, proofKey);
        if (!proof || proof.data.deletedAt !== final.data.deletedAt || proof.data.proofUntil !== final.data.proofUntil) throw new Error("Proof verification failed");
        if (result) summary.verified++;
        await store.delete(`outbox/${key.split("/").at(-1)}`);
        await store.delete(key);
        if (await read(store, key)) throw new Error("Record cleanup failed");
      }
    }
  }
  const today = new Date(now).toISOString().slice(0, 10);
  proofLoop:
  for (const directory of await keys(store, "proofs/", true)) {
    if (!/^proofs\/\d{4}-\d{2}-\d{2}\/$/.test(directory) || directory.slice(7, 17) > today) continue;
    for (const key of await keys(store, directory)) {
      if (!budget()) { summary.backlog = true; break proofLoop; }
      processed++;
      const proof = await read(store, key);
      if (proof?.data.proofUntil <= now) {
        await store.delete(key); if (await read(store, key)) throw new Error("Proof cleanup failed"); summary.proofsExpired++;
      }
    }
  }
  await pruneLedger(store, now);
  // Only timestamps and aggregate counts, no client fields or raw provider errors.
  await store.setJSON("system/purge-health", { at: now, ...summary });
  return summary;
}
