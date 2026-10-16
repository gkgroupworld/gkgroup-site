import test from "node:test";
import assert from "node:assert/strict";
import { turnstileVerifier, zohoNotifier } from "../src/providers.mjs";
import { collect } from "../src/collector.mjs";
import { backend, sample, request, options } from "./harness.mjs";

test("Turnstile validates hostname/action, denies replay/failure and sends no project content", async () => {
  const used = new Set();
  let mode = "valid"; const calls = [];
  const verify = turnstileVerifier({ secret: "synthetic-secret", hostname: "gkgm.synthetic.test", fetcher: async (url, init) => {
    assert.equal(url, "https://challenges.cloudflare.com/turnstile/v0/siteverify");
    const values = Object.fromEntries(init.body); calls.push(values);
    if (mode === "down") throw Error("synthetic offline");
    const success = !used.has(values.response) && values.response === "synthetic-valid-token";
    used.add(values.response);
    return Response.json({ success, hostname: mode === "hostname" ? "evil.test" : "gkgm.synthetic.test", action: mode === "action" ? "other" : "gkgm_project" });
  } });
  assert.equal(await verify("synthetic-valid-token"), true);
  assert.equal(await verify("synthetic-valid-token"), false);
  for (const invalid of ["hostname", "action"]) { used.clear(); mode = invalid; assert.equal(await verify("synthetic-valid-token"), false); }
  assert.ok(calls.every(c => Object.keys(c).sort().join(",") === "response,secret"));
  mode = "down";
  const b = backend(); assert.equal((await collect(request({ ...sample(), turnstileToken: "synthetic-valid-token" }), options(b.client(), { verify }))).status, 503);
  assert.ok(![...b.entries.keys()].some(k => k.startsWith("inquiries/") || k.startsWith("outbox/")));
});

test("Zoho notification is fixed, content-free, OAuth secrets in body/header only", async () => {
  const calls = [];
  const notify = zohoNotifier({ GKGM_ZOHO_DOMAIN: "eu", GKGM_ZOHO_ACCOUNT_ID: "123", GKGM_ZOHO_CLIENT_ID: "synthetic-client", GKGM_ZOHO_CLIENT_SECRET: "synthetic-secret", GKGM_ZOHO_REFRESH_TOKEN: "synthetic-refresh" }, async (url, init) => {
    calls.push({ url, init });
    return url.includes("/oauth/") ? Response.json({ access_token: "synthetic-access-token" }) : Response.json({ status: { code: 200 } });
  });
  await notify();
  assert.equal(calls.length, 2);
  assert.ok(calls.every(c => !c.url.includes("?") && c.init.redirect === "error"));
  const mail = JSON.parse(calls[1].init.body);
  assert.equal(mail.toAddress, "gk.contactus@gkgroup.app");
  assert.equal(mail.fromAddress, "gk.contactus@gkgroup.app");
  assert.deepEqual(Object.keys(mail).sort(), ["fromAddress", "toAddress", "subject", "content", "mailFormat"].sort());
  assert.ok(!/synthetic-|https?:|\+228|passport|submissionId/.test(mail.content));
  assert.equal(calls[1].init.headers.Authorization, "Zoho-oauthtoken synthetic-access-token");
  await assert.rejects(zohoNotifier({ GKGM_ZOHO_DOMAIN: "evil.test" }, async () => { throw Error("Must not fetch"); })());
});
