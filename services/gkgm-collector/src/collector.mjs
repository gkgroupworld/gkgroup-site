import { validateProject, validatedPayload } from "../../../lib/gkgm-project.js";
import { digest, takeAttempt, reserve, HOUR } from "./quotas.mjs";
import { read } from "./store.mjs";

export function retentionDeadline(received) {
  const source = new Date(received);
  const year = source.getUTCFullYear() + 1;
  const month = source.getUTCMonth();
  const last = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  return Date.UTC(year, month, Math.min(source.getUTCDate(), last), source.getUTCHours(), source.getUTCMinutes(), source.getUTCSeconds(), source.getUTCMilliseconds());
}

async function bodyValues(request) {
  if (request.headers.get("content-type")?.split(";", 1)[0].trim().toLowerCase() !== "application/x-www-form-urlencoded") return { status: 415, code: "encoding" };
  if (Number(request.headers.get("content-length")) > 20000) return { status: 413, code: "size" };
  const reader = request.body?.getReader();
  if (!reader) return { status: 400, code: "body" };
  const chunks = []; let size = 0;
  let timer;
  try {
    await Promise.race([
      (async () => {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          size += value.byteLength;
          if (size > 20000) { await reader.cancel(); throw new RangeError("Body limit"); }
          chunks.push(value);
        }
      })(),
      new Promise((_, reject) => { timer = setTimeout(() => { void reader.cancel().catch(() => {}); reject(new Error("Body timeout")); }, 5000); }),
    ]);
  } catch (error) {
    if (error instanceof RangeError) return { status: 413, code: "size" };
    throw new Error("Body unavailable");
  } finally { clearTimeout(timer); }
  const bytes = new Uint8Array(size); let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
  const params = new URLSearchParams(new TextDecoder("utf-8", { fatal: true }).decode(bytes));
  if ([...params.keys()].some(key => params.getAll(key).length !== 1)) return { status: 400, code: "duplicate" };
  return { values: Object.fromEntries(params) };
}

export async function collect(request, { enabled = false, origin, ip, secret, store, verify, now = Date.now() } = {}) {
  const headers = { "Cache-Control": "no-store", "Vary": "Origin", "X-Content-Type-Options": "nosniff" };
  if (origin && request.headers.get("origin") === origin) headers["Access-Control-Allow-Origin"] = origin;
  const reply = (status, code, extra = {}) => Response.json({ ok: status === 200, ...(code ? { code } : {}), ...extra }, { status, headers });
  try {
    const url = new URL(request.url);
    if (url.search) return reply(400, "query");
    if (request.headers.get("origin") !== origin || !origin) return reply(403, "origin");
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: { ...headers, "Access-Control-Allow-Methods": "POST", "Access-Control-Allow-Headers": "Content-Type", "Access-Control-Max-Age": "600" } });
    if (request.method !== "POST") return reply(405, "method");
    if (!enabled || !store || !verify || !ip || secret?.length < 32 || !secret) return reply(503, "privacy_pending");
    const ipHash = digest(secret, "ip", ip);
    if (!await takeAttempt(store, ipHash, now)) { headers["Retry-After"] = "60"; return reply(429, "quota"); }
    const parsed = await bodyValues(request);
    if (!parsed.values) return reply(parsed.status, parsed.code);
    const { submissionId, turnstileToken, ...values } = parsed.values;
    if (!/^[a-f0-9-]{36}$/i.test(submissionId || "") || !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(submissionId)) return reply(400, "attempt");
    if (values["form-name"] !== undefined || values.fax?.trim()) return reply(400, "fields");
    if (!["fr", "en"].includes(values.locale)) return reply(400, "locale");
    const errors = validateProject(values);
    if (Object.keys(errors).length) return reply(422, "validation", { errors });
    const valid = validatedPayload(values);
    if (!valid) return reply(400, "fields");
    const { "form-name": ignoredForm, fax: ignoredFax, ...payload } = valid;
    void ignoredForm; void ignoredFax;
    payload.email = payload.email.toLowerCase();
    payload.whatsapp = payload.whatsapp.replace(/[\s().-]/g, "");
    // Stable canonical content, not object insertion order or untrusted form-name.
    const canonical = JSON.stringify(Object.fromEntries(Object.entries(payload).sort(([a], [b]) => a.localeCompare(b))));
    if (!await verify(turnstileToken)) return reply(422, "challenge");
    // No new intake if the scheduled work has not been bootstrapped or is stale.
    // Independent monitoring is still required for existing records during outages.
    const purgeHealth = await read(store, "system/purge-health");
    const mailHealth = await read(store, "system/notification-health");
    const fresh = (entry, age) => Number.isFinite(entry?.data.at) && entry.data.at <= now + 60000 && entry.data.at >= now - age;
    if (!fresh(purgeHealth, 3 * HOUR) || purgeHealth.data.backlog === true || !fresh(mailHealth, 45 * 60000)) return reply(503, "maintenance_pending");
    const reservation = await reserve(store, { ip: ipHash, contacts: [digest(secret, "email", payload.email), digest(secret, "phone", payload.whatsapp)], attempt: digest(secret, "attempt", submissionId), fingerprint: digest(secret, "payload", canonical), now });
    if (!reservation.ok) { if (reservation.code === "quota") headers["Retry-After"] = "3600"; return reply(reservation.code === "conflict" ? 409 : 429, reservation.code); }
    const admission = reservation.admission;
    const deadline = retentionDeadline(admission.at);
    const key = `inquiries/${new Date(deadline).toISOString().slice(0, 10)}/${admission.record}`;
    const queue = async () => {
      const result = await store.setJSON(`outbox/${admission.record}`, { schema: 1, recordKey: key, createdAt: admission.at }, { onlyIfNew: true });
      if (typeof result?.modified !== "boolean" || (result.modified && !result.etag)) throw new Error("CAS unavailable");
    };
    const existing = await read(store, key);
    if (existing) {
      if (existing.data.deletedAt) return reply(409, "expired_attempt");
      if (existing.data.fingerprint !== admission.fingerprint || existing.data.schema !== 1 || !existing.data.validatedAt) throw new Error("Record mismatch");
      if (existing.data.notification.state === "pending") await queue();
      return reply(200);
    }
    // A reservation older than one hour cannot re-create a deleted/expired record.
    if (now - admission.at >= HOUR) return reply(409, "expired_attempt");
    // Queue has no client data. Write it first so a crash cannot leave an accepted
    // record permanently missing notification work; missing records are never sent.
    await queue();
    const record = { schema: 1, validatedAt: admission.at, receivedAt: admission.at, expiresAt: deadline, fingerprint: admission.fingerprint, noticeVersion: "gkgm-privacy-2026-10-16-b", payload, notification: { state: "pending", tries: 0, nextAt: now } };
    const result = await store.setJSON(key, record, { onlyIfNew: true });
    if (result?.modified !== true || !result.etag) {
      const saved = await read(store, key);
      if (!saved || saved.data.fingerprint !== admission.fingerprint) throw new Error("Storage unavailable");
    }
    return reply(200);
  } catch {
    return reply(503, "unavailable");
  }
}
