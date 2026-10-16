import { randomUUID } from "node:crypto";
import { checkedStore } from "../src/store.mjs";
import { PROJECT_TYPES } from "../../../content/gkgm-project.js";
import { projectFields } from "../../../lib/gkgm-project.js";

export const ORIGIN = "https://gkgm.synthetic.test";
export const SECRET = "synthetic-only-not-a-real-secret-00000000";
export const NOW = Date.UTC(2026, 9, 16, 12);
export function sample(type = "work", locale = "fr", n = 1) {
  const values = { type, locale, consent: "yes", fax: "", submissionId: randomUUID(), turnstileToken: `synthetic-token-${randomUUID()}` };
  for (const field of projectFields(type)) values[field.id] = field.choices?.[0].id || (field.type === "number" ? "3" : "Synthetic answer");
  return { ...values, name: "Synthetic QA", email: `synthetic-${n}@example.test`, whatsapp: `+228${String(90000000 + n)}`, destination: type === "d2" ? "Portugal" : "Synthetic destination", description: "Synthetic offline project description, no real personal data." };
}
export { PROJECT_TYPES };
export const request = (values, { path = "/api/gkgm-project", headers = {}, method = "POST" } = {}) => new Request(`https://collector.synthetic.test${path}`, { method, headers: { origin: ORIGIN, "content-type": "application/x-www-form-urlencoded", ...headers }, ...(method === "POST" ? { body: typeof values === "string" ? values : new URLSearchParams(values).toString() } : {}) });

// Real SDK, fake private HTTP backend. CAS check + write is one synchronous step
// after reading the request body, so independent SDK clients share one authority.
// Not the SDK filesystem emulator, whose check/write is not a cloud atomicity proof.
export function backend() {
  const entries = new Map(); const calls = []; let revision = 0;
  entries.set("system/purge-health", { data: { at: NOW }, etag: '"synthetic-seed-purge"' });
  entries.set("system/notification-health", { data: { at: NOW }, etag: '"synthetic-seed-notifications"' });
  let fault;
  const fetcher = async (input, init = {}) => {
    const req = new Request(input, init);
    const url = new URL(req.url);
    if (url.hostname !== "blobs.synthetic.test" || req.headers.get("authorization") !== "Bearer synthetic-private-token") return new Response(null, { status: 401 });
    const parts = url.pathname.split("/").slice(1);
    if (parts[0]?.startsWith("region:")) parts.shift();
    const key = parts.slice(2).join("/");
    calls.push({ method: req.method, key, conditional: req.headers.get("if-match"), create: req.headers.get("if-none-match") });
    const failed = fault?.(req, key);
    if (failed) return new Response(null, { status: failed });
    if (req.method === "PUT") {
      const body = await req.text();
      const old = entries.get(key);
      if ((req.headers.get("if-none-match") === "*" && old) || (req.headers.has("if-match") && req.headers.get("if-match") !== old?.etag)) return new Response(null, { status: 412 });
      const etag = `"synthetic-${++revision}"`;
      entries.set(key, { data: JSON.parse(body), etag });
      return new Response(null, { status: 200, headers: { etag } });
    }
    if (req.method === "DELETE") { entries.delete(key); return new Response(null, { status: 204 }); }
    if (!key) {
      const prefix = url.searchParams.get("prefix") || "";
      const list = [...entries.keys()].filter(k => k.startsWith(prefix)).sort();
      if (url.searchParams.get("directories") === "true") return Response.json({ blobs: [], directories: [...new Set(list.map(k => { const end = k.indexOf("/", prefix.length); return end < 0 ? null : k.slice(0, end + 1); }).filter(Boolean))] });
      return Response.json({ blobs: list.map(key => ({ key, etag: entries.get(key).etag })) });
    }
    const entry = entries.get(key);
    if (!entry) return new Response(null, { status: 404 });
    return Response.json(entry.data, { headers: { etag: entry.etag } });
  };
  const client = () => checkedStore({ siteID: "synthetic-site", token: "synthetic-private-token", region: "eu-central-1", edgeURL: "https://cached-blobs.synthetic.test", uncachedEdgeURL: "https://blobs.synthetic.test", fetch: fetcher });
  return { entries, calls, fetcher, client, fail: fn => { fault = fn; } };
}

export const options = (store, extra = {}) => ({ enabled: true, origin: ORIGIN, ip: "192.0.2.1", secret: SECRET, store, verify: async token => Boolean(token?.startsWith("synthetic-token-")), now: NOW, ...extra });
