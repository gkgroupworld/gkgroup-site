import test from "node:test";
import assert from "node:assert/strict";
import { collect, retentionDeadline } from "../src/collector.mjs";
import { reserve, takeAttempt, HOUR, DAY } from "../src/quotas.mjs";
import { read, mutate } from "../src/store.mjs";
import { serviceConfig } from "../src/config.mjs";
import { processOutbox, purgeExpired } from "../src/maintenance.mjs";
import { backend, sample, request, options, PROJECT_TYPES, NOW, ORIGIN } from "./harness.mjs";

const active = b => [...b.entries.values()].filter(e => e.data.payload);

test("real SDK CAS: create collision, stale ETag, fresh write, storage HTTP failure", async () => {
  const b = backend(); const a = b.client(); const c = b.client();
  assert.equal((await a.setJSON("probe", { n: 0 }, { onlyIfNew: true })).modified, true);
  assert.equal((await c.setJSON("probe", { n: 9 }, { onlyIfNew: true })).modified, false);
  const old = await read(a, "probe");
  assert.equal((await c.setJSON("probe", { n: 1 }, { onlyIfMatch: old.etag })).modified, true);
  assert.equal((await a.setJSON("probe", { n: 2 }, { onlyIfMatch: old.etag })).modified, false);
  assert.equal((await read(a, "probe")).data.n, 1);
  assert.ok(b.calls.some(c => c.create === "*") && b.calls.some(c => c.conditional));
  for (const status of [401, 500]) {
    b.fail((req) => req.method === "PUT" ? status : undefined);
    await assert.rejects(mutate(a, "probe", data => ({ write: true, value: { n: data.n + 1 }, result: true })));
  }
  assert.equal((await read(c, "probe")).data.n, 1);
});

test("six types × FR/EN: valid record, normalisation, only active fields, no public data", async () => {
  for (const type of PROJECT_TYPES) for (const locale of ["fr", "en"]) {
    const b = backend(); const values = sample(type.id, locale);
    const response = await collect(request(values), options(b.client()));
    assert.equal(response.status, 200, `${type.id}/${locale}`);
    assert.deepEqual(await response.json(), { ok: true });
    assert.equal(active(b).length, 1);
    const record = active(b)[0].data;
    assert.equal(record.payload.type, type.id); assert.equal(record.payload.locale, locale);
    assert.equal(record.receivedAt, NOW); assert.equal(record.validatedAt, NOW);
    assert.ok(!JSON.stringify(record).includes("synthetic-token"));
    assert.ok(!("form-name" in record.payload));
    assert.ok(!("submissionId" in record.payload));
    assert.equal(record.notification.state, "pending");
    assert.equal(response.headers.get("cache-control"), "no-store");
  }
});

test("invalid/bypass inputs create no inquiry and no outbox notification", async () => {
  const cases = [
    [{ consent: "" }, 422], [{ email: "bad" }, 422], [{ whatsapp: "123" }, 422],
    [{ type: "invented" }, 422], [{ businessPlan: "yes" }, 400],
    [{ passport: "forbidden" }, 400], [{ fax: "bot" }, 400],
    [{ "form-name": "international-partnerships" }, 400],
    [{ turnstileToken: "" }, 422], [{ submissionId: "not-a-uuid" }, 400],
  ];
  for (const [patch, status] of cases) {
    const b = backend();
    const response = await collect(request({ ...sample(), ...patch }), options(b.client()));
    assert.equal(response.status, status); assert.equal(active(b).length, 0);
    assert.ok(![...b.entries.keys()].some(k => k.startsWith("outbox/")));
  }
  for (const [req, expected] of [
    [request(sample(), { headers: { origin: "https://evil.test" } }), 403],
    [request(sample(), { headers: { origin: "null" } }), 403],
    [request(sample(), { method: "GET" }), 405],
    [request(sample(), { headers: { "content-type": "application/x-www-form-urlencoded-invalid" } }), 415],
    [request("x=" + "a".repeat(20001)), 413],
    [request(new URLSearchParams(sample()).toString() + "&name=duplicate"), 400],
    [request(sample(), { path: "/api/gkgm-project?name=must-not-be-used" }), 400],
  ]) {
    const b = backend(); assert.equal((await collect(req, options(b.client()))).status, expected); assert.equal(active(b).length, 0);
  }
});

test("direct function alias uses identical validation; fake headers are not trusted IP", async () => {
  const b = backend();
  const invalid = await collect(request({ ...sample(), consent: "" }, { path: "/.netlify/functions/gkgm-ingest", headers: { "x-forwarded-for": "203.0.113.9" } }), options(b.client()));
  assert.equal(invalid.status, 422); assert.equal(active(b).length, 0);
  assert.equal((await collect(request(sample()), options(b.client(), { ip: undefined }))).status, 503);
  assert.equal((await collect(request(sample()), options(b.client(), { verify: async () => { throw Error("synthetic failure"); } }))).status, 503);
});

test("concurrent attempts share a strict 10/minute budget across SDK clients", async () => {
  const b = backend();
  const results = await Promise.all(Array.from({ length: 16 }, () => takeAttempt(b.client(), "synthetic-ip-hash", NOW)));
  assert.equal(results.filter(Boolean).length, 10);
  assert.equal(await takeAttempt(b.client(), "synthetic-ip-hash", NOW + 60000), true);
});

test("concurrent ingests: 3/hour/IP; contact/day across IPs; rolling service cap 100/day", async () => {
  const b = backend();
  const responses = await Promise.all(Array.from({ length: 8 }, (_, n) => collect(request(sample("work", "fr", n + 1)), options(b.client()))));
  assert.equal(responses.filter(r => r.status === 200).length, 3);
  assert.equal(active(b).length, 3);
  await b.client().setJSON("system/notification-health", { at: NOW + HOUR });
  assert.equal((await collect(request(sample("work", "fr", 99)), options(b.client(), { now: NOW + HOUR }))).status, 200);
  const c = backend();
  const contact = await Promise.all(Array.from({ length: 6 }, (_, n) => collect(request(sample()), options(c.client(), { ip: `192.0.2.${n + 1}` }))));
  assert.equal(contact.filter(r => r.status === 200).length, 3);
  const d = backend(); let admitted = 0;
  for (let batch = 0; batch < 12; batch++) {
    const results = await Promise.all(Array.from({ length: 10 }, (_, i) => {
      const n = batch * 10 + i;
      return reserve(d.client(), { ip: `hash-${n}`, contacts: [`contact-${n}`], attempt: `attempt-${n}`, fingerprint: `payload-${n}`, now: NOW });
    }));
    admitted += results.filter(r => r.ok).length;
  }
  assert.equal(admitted, 100);
  assert.equal((await reserve(d.client(), { ip: "new", contacts: ["new"], attempt: "new", fingerprint: "new", now: NOW + DAY })).ok, true);
});

test("idempotency, content conflict, storage failure, recovery without duplicate or date reset", async () => {
  const b = backend(); const values = sample();
  const responses = await Promise.all(Array.from({ length: 5 }, () => collect(request(values), options(b.client()))));
  assert.ok(responses.every(r => r.status === 200)); assert.equal(active(b).length, 1);
  assert.equal((await collect(request({ ...values, name: "Different synthetic name" }), options(b.client()))).status, 409);
  const c = backend();
  c.fail((req, key) => req.method === "PUT" && key.startsWith("inquiries/") ? 401 : undefined);
  assert.equal((await collect(request(values), options(c.client()))).status, 503);
  assert.equal(active(c).length, 0);
  let emails = 0; await processOutbox(c.client(), async () => { emails++; }, NOW);
  assert.equal(emails, 0);
  c.fail(undefined);
  assert.equal((await collect(request(values), options(c.client(), { now: NOW + 1000 }))).status, 200);
  assert.equal(active(c).length, 1); assert.equal(active(c)[0].data.receivedAt, NOW);
  assert.equal((await read(c.client(), "system/admission-v1")).data.admissions.length, 1);
});

test("notification after persistence, concurrent lease, bounded retries and no resurrection", async () => {
  const b = backend(); await collect(request(sample()), options(b.client()));
  let emails = 0;
  await Promise.all([processOutbox(b.client(), async () => { emails++; }, NOW), processOutbox(b.client(), async () => { emails++; }, NOW)]);
  assert.equal(emails, 1);
  await processOutbox(b.client(), async () => { emails++; }, NOW + 900000);
  assert.equal(emails, 1);
  const c = backend(); await collect(request(sample()), options(c.client()));
  let attempts = 0;
  for (let n = 0; n < 5; n++) await processOutbox(c.client(), async () => { attempts++; throw Error("synthetic failure"); }, NOW + n * 900000);
  assert.equal(attempts, 3); assert.equal(active(c)[0].data.notification.state, "failed");
});

test("calendar retention, leap day, early purge, minimal proof, repeat purge and proof expiry", async () => {
  assert.equal(new Date(retentionDeadline(Date.UTC(2024, 1, 29, 12))).toISOString(), "2025-02-28T12:00:00.000Z");
  const b = backend(); await collect(request(sample()), options(b.client()));
  const key = [...b.entries.keys()].find(k => k.startsWith("inquiries/"));
  const expiry = b.entries.get(key).data.expiresAt;
  assert.equal((await purgeExpired(b.client(), expiry - 3 * DAY)).erased, 0);
  const result = await purgeExpired(b.client(), expiry - 2 * DAY);
  assert.equal(result.erased, 1); assert.equal(result.verified, 1); assert.equal(active(b).length, 0);
  assert.equal(await read(b.client(), key), null);
  const proofKey = [...b.entries.keys()].find(k => k.startsWith("proofs/"));
  const proof = (await read(b.client(), proofKey)).data;
  assert.deepEqual(Object.keys(proof).sort(), ["schema", "deletedAt", "proofUntil", "reason"].sort());
  assert.equal((await purgeExpired(b.client(), expiry)).erased, 0);
  let email = 0; await processOutbox(b.client(), async () => { email++; }, expiry); assert.equal(email, 0);
  await purgeExpired(b.client(), expiry + 31 * DAY); assert.equal(await read(b.client(), key), null); assert.equal(await read(b.client(), proofKey), null);
  const ledger = await read(b.client(), "system/admission-v1"); assert.equal(ledger.data.admissions.length, 0);
});

test("service runtime is closed for missing flags, previews, unpublished aliases and wrong site", () => {
  const context = { site: { id: "synthetic-site" }, deploy: { context: "production", published: true } };
  const env = { GKGM_COLLECTION_ENABLED: "true", GKGM_PRIVACY_APPROVED: "true", GKGM_MIGRATION_APPROVED: "true", GKGM_MAINTENANCE_ENABLED: "true", GKGM_NOTIFICATION_ENABLED: "true", GKGM_ALLOWED_ORIGIN: ORIGIN, GKGM_QUOTA_SECRET: "synthetic-only-quota-secret-000000000", GKGM_TURNSTILE_SECRET: "synthetic-turnstile-secret", GKGM_BLOBS_REGION: "eu-central-1", GKGM_SERVICE_SITE_ID: "synthetic-site", GKGM_ZOHO_DOMAIN: "eu", GKGM_ZOHO_ACCOUNT_ID: "123", GKGM_ZOHO_CLIENT_ID: "synthetic-client", GKGM_ZOHO_CLIENT_SECRET: "synthetic-secret", GKGM_ZOHO_REFRESH_TOKEN: "synthetic-refresh" };
  assert.equal(serviceConfig({}, context).enabled, false);
  assert.equal(serviceConfig(env, context).enabled, true);
  for (const flag of ["GKGM_COLLECTION_ENABLED", "GKGM_PRIVACY_APPROVED", "GKGM_MIGRATION_APPROVED", "GKGM_MAINTENANCE_ENABLED", "GKGM_NOTIFICATION_ENABLED"]) assert.equal(serviceConfig({ ...env, [flag]: "false" }, context).enabled, false);
  for (const key of ["GKGM_QUOTA_SECRET", "GKGM_TURNSTILE_SECRET", "GKGM_BLOBS_REGION", "GKGM_ZOHO_REFRESH_TOKEN", "GKGM_ALLOWED_ORIGIN"]) assert.equal(serviceConfig({ ...env, [key]: undefined }, context).enabled, false);
  assert.equal(serviceConfig({ ...env, GKGM_BLOBS_REGION: "not-a-region" }, context).enabled, false);
  assert.equal(serviceConfig(env, { ...context, deploy: { context: "deploy-preview", published: true } }).enabled, false);
  assert.equal(serviceConfig(env, { ...context, deploy: { context: "production", published: false } }).enabled, false);
  assert.equal(serviceConfig(env, { ...context, site: { id: "wrong-site" } }).enabled, false);
  assert.equal(serviceConfig({ ...env, GKGM_MAINTENANCE_ENABLED: "true", GKGM_COLLECTION_ENABLED: "false", GKGM_TURNSTILE_SECRET: undefined }, context).maintenanceEnabled, true);
});

test("ambiguous storage response reuses the persisted inquiry and initial receipt", async () => {
  const b = backend(); const store = b.client(); const values = sample(); let failOnce = true;
  const original = store.setJSON.bind(store);
  store.setJSON = async (key, ...rest) => {
    const result = await original(key, ...rest);
    if (key.startsWith("inquiries/") && failOnce) { failOnce = false; throw Error("Synthetic lost acknowledgement"); }
    return result;
  };
  assert.equal((await collect(request(values), options(store))).status, 503);
  assert.equal(active(b).length, 1);
  assert.equal((await collect(request(values), options(b.client(), { now: NOW + 5000 }))).status, 200);
  assert.equal(active(b).length, 1); assert.equal(active(b)[0].data.receivedAt, NOW);
});

test("purge racing a sending worker cannot restore payload; failed purge cannot claim success", async () => {
  const b = backend(); await collect(request(sample()), options(b.client()));
  const expiry = active(b)[0].data.expiresAt;
  let entered; let release;
  const enteredPromise = new Promise(resolve => { entered = resolve; });
  const blocked = new Promise(resolve => { release = resolve; });
  const sender = processOutbox(b.client(), async () => { entered(); await blocked; }, NOW);
  await enteredPromise;
  await purgeExpired(b.client(), expiry - 2 * DAY);
  release(); await sender; assert.equal(active(b).length, 0);
  const c = backend(); await collect(request(sample()), options(c.client()));
  c.fail((req, key) => req.method === "PUT" && key.startsWith("inquiries/") ? 401 : undefined);
  await assert.rejects(purgeExpired(c.client(), expiry));
  assert.equal(active(c).length, 1); assert.equal((await read(c.client(), "system/purge-health")).data.at, NOW);
});

test("contact quotas normalise email case and telephone punctuation", async () => {
  const b = backend();
  for (let n = 0; n < 3; n++) assert.equal((await collect(request({ ...sample(), email: "SYNTHETIC-1@EXAMPLE.TEST", whatsapp: "+228 90 00 00 01" }), options(b.client(), { ip: `192.0.2.${n + 1}` }))).status, 200);
  assert.equal((await collect(request(sample()), options(b.client(), { ip: "192.0.2.99" }))).status, 429);
});

test("streamed oversized and stalled bodies are bounded without storing inquiries", async () => {
  const b = backend();
  const streamed = new Request("https://collector.synthetic.test/api/gkgm-project", { method: "POST", headers: { origin: ORIGIN, "content-type": "application/x-www-form-urlencoded" }, duplex: "half", body: new ReadableStream({ start(controller) { controller.enqueue(new TextEncoder().encode("a".repeat(20001))); controller.close(); } }) });
  assert.equal((await collect(streamed, options(b.client()))).status, 413);
  const stalled = new Request("https://collector.synthetic.test/api/gkgm-project", { method: "POST", headers: { origin: ORIGIN, "content-type": "application/x-www-form-urlencoded" }, duplex: "half", body: new ReadableStream() });
  const start = Date.now();
  assert.equal((await collect(stalled, options(b.client()))).status, 503);
  assert.ok(Date.now() - start < 6500); assert.equal(active(b).length, 0);
});

test("missing or stale maintenance health stops new intake", async () => {
  for (const key of ["system/purge-health", "system/notification-health"]) {
    const b = backend(); await b.client().delete(key);
    const response = await collect(request(sample()), options(b.client()));
    assert.equal(response.status, 503); assert.equal((await response.json()).code, "maintenance_pending");
    assert.equal(active(b).length, 0);
  }
  const b = backend(); await b.client().setJSON("system/notification-health", { at: NOW - HOUR });
  assert.equal((await collect(request(sample()), options(b.client()))).status, 503);
});

test("bounded scheduled batches resume; purge backlog closes intake until drained", async () => {
  const b = backend();
  for (let n = 1; n <= 6; n++) assert.equal((await collect(request(sample("work", "fr", n)), options(b.client(), { ip: `192.0.2.${n}` }))).status, 200);
  let messages = 0;
  assert.equal((await processOutbox(b.client(), async () => { messages++; }, NOW)).sent, 5);
  assert.equal((await processOutbox(b.client(), async () => { messages++; }, NOW)).sent, 1);
  assert.equal(messages, 6);
  const data = active(b)[0].data;
  const expiry = data.expiresAt;
  const directory = `inquiries/${new Date(expiry).toISOString().slice(0, 10)}/`;
  for (let n = 0; n < 19; n++) await b.client().setJSON(directory + sample().submissionId, data, { onlyIfNew: true });
  const first = await purgeExpired(b.client(), expiry - 2 * DAY);
  assert.equal(first.erased, 20); assert.equal(first.backlog, true);
  await b.client().setJSON("system/notification-health", { at: expiry - 2 * DAY });
  assert.equal((await collect(request(sample()), options(b.client(), { now: expiry - 2 * DAY }))).status, 503);
  const second = await purgeExpired(b.client(), expiry - 2 * DAY);
  assert.equal(second.erased, 5); assert.equal(second.backlog, false); assert.equal(active(b).length, 0);
});

test("failed proof write leaves no payload, retries preserve deletion date and prove absence", async () => {
  const b = backend(); await collect(request(sample()), options(b.client()));
  const originalKey = [...b.entries.keys()].find(k => k.startsWith("inquiries/"));
  const expiry = active(b)[0].data.expiresAt;
  b.fail((req, key) => req.method === "PUT" && key.startsWith("proofs/") ? 401 : undefined);
  await assert.rejects(purgeExpired(b.client(), expiry));
  assert.equal(active(b).length, 0);
  assert.equal((await read(b.client(), originalKey)).data.deletedAt, expiry);
  b.fail(undefined);
  await purgeExpired(b.client(), expiry + HOUR);
  assert.equal(await read(b.client(), originalKey), null);
  const key = [...b.entries.keys()].find(k => k.startsWith("proofs/"));
  assert.equal((await read(b.client(), key)).data.deletedAt, expiry);
});
