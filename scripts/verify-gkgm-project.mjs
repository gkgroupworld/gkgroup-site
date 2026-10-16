import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { PROJECT_TYPES, ALL_FIELDS, FORM_NAME } from "../content/gkgm-project.js";
import { projectFields, validateProject, validatedPayload } from "../lib/gkgm-project.js";
import { handleProjectRequest, projectDeliveryConfig } from "../lib/gkgm-project-server.js";

const base = process.argv[2] || "http://127.0.0.1:3111";
const origin = "https://example.test";
const headers = { origin, "content-type": "application/x-www-form-urlencoded" };
const request = (values, extra = {}) => new Request(origin + "/api/gkgm-project", { method: "POST", headers: { ...headers, ...extra }, body: typeof values === "string" ? values : new URLSearchParams(values).toString() });
const sample = (type, locale) => {
  const values = { type, locale, consent: "yes", fax: "" };
  for (const field of projectFields(type)) values[field.id] = field.choices?.[0].id || (field.type === "number" ? "3" : "Synthetic test answer");
  return { ...values, name: "Synthetic QA", email: "synthetic@example.test", whatsapp: "+22890000000", destination: type === "d2" ? "Portugal" : "Test destination", description: "Synthetic test project for offline validation only." };
};
assert.equal(PROJECT_TYPES.length, 6);
assert.equal(projectDeliveryConfig({ NETLIFY: "true", DEPLOY_URL: "https://example.netlify.app" }).enabled, false);
assert.equal(projectDeliveryConfig({ GKGM_PRIVACY_APPROVED: "true", SITE_NAME: "example", SITE_ID: "test" }).enabled, true);
assert.equal(projectDeliveryConfig({ GKGM_PRIVACY_APPROVED: "true", SITE_NAME: "evil.test/path", SITE_ID: "test" }).enabled, false);
const upstreamOrigin = "https://example.netlify.app";
for (const project of PROJECT_TYPES) for (const locale of ["fr", "en"]) {
  const values = sample(project.id, locale);
  assert.deepEqual(validateProject(values), {});
  assert.equal(validatedPayload(values)["form-name"], FORM_NAME);
  for (const field of projectFields(project.id).filter(field => !field.optional)) {
    const missing = { ...values, [field.id]: "" };
    assert.ok(validateProject(missing)[field.id], `${project.id}: required ${field.id}`);
  }
  assert.equal((await handleProjectRequest(request(values))).status, 503, "Privacy validation blocks real sends");
  let sent = 0;
  const result = await handleProjectRequest(request(values), { enabled: true, upstreamOrigin, fetcher: async (url, options) => {
    sent++;
    assert.equal(url.href, upstreamOrigin + "/__gkgm-forms.html");
    const payload = Object.fromEntries(new URLSearchParams(options.body));
    assert.equal(payload.type, project.id);
    assert.equal(payload.locale, locale);
    assert.equal(payload.consent, "yes");
    assert.equal(payload["form-name"], FORM_NAME);
    assert.ok(!("passport" in payload));
    return new Response("");
  } });
  assert.equal(result.status, 200);
  assert.deepEqual(await result.json(), { ok: true });
  assert.equal(sent, 1);
  for (const fetcher of [async () => new Response("No", { status: 500 }), async () => { throw new Error("offline"); }, async () => new Response('<body id="gkgm-form-reference">'), async () => new Response('<title>GK GROUP</title><script src="/_next/app.js"></script>')]) {
    assert.equal((await handleProjectRequest(request(values), { enabled: true, upstreamOrigin, fetcher })).status, 502);
  }
  assert.equal((await handleProjectRequest(request({ ...values, consent: "" }))).status, 422);
  assert.equal((await handleProjectRequest(request({ ...values, fax: "bot" }))).status, 400);
  assert.equal((await handleProjectRequest(request({ ...values, passport: "must not be collected" }))).status, 400);
  assert.equal((await handleProjectRequest(request(values, { origin: "https://other.test" }))).status, 403);
  assert.equal((await handleProjectRequest(request(new URLSearchParams(values).toString() + "&name=duplicate"))).status, 400);
}
assert.ok(validateProject({ ...sample("work", "fr"), experience: "81" }).experience);
assert.ok(validateProject({ ...sample("work", "fr"), whatsapp: "123" }).whatsapp);
assert.ok(validateProject({ ...sample("study", "en"), email: "bad" }).email);
assert.ok(validateProject({ ...sample("d2", "en"), destination: "Other" }).destination);
assert.equal((await handleProjectRequest(request("x=" + "a".repeat(20001)))).status, 413);
assert.equal((await handleProjectRequest(request(sample("work", "en"), { "content-type": "application/json" }))).status, 415);
assert.equal((await handleProjectRequest(request(sample("work", "en")), { enabled: true, upstreamOrigin: "https://evil.test" })).status, 503);

const reference = await readFile(new URL("../public/__gkgm-forms.html", import.meta.url), "utf8");
const names = [...reference.matchAll(/name="([^"]+)"/g)].map(m => m[1]).filter(name => !["robots", FORM_NAME].includes(name));
assert.deepEqual(names.sort(), ["form-name", "locale", "type", "fax", "consent", ...ALL_FIELDS.map(field => field.id)].sort());
assert.match(reference, /data-netlify="true"/);
assert.match(reference, /netlify-honeypot="fax"/);
assert.ok(!/type="file"|passport|birth|children/i.test(reference));
for (const locale of ["fr", "en"]) {
  const response = await fetch(`${base}/gkgm-project?lang=${locale}`);
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.ok(html.includes(`href="https://gkgroup.app/gkgm-project${locale === "en" ? "?lang=en" : ""}"`));
  assert.match(html, /gk-global-mobility.png/);
  assert.match(html, /id="gkgm-project-form"/);
  assert.ok(!html.includes('type="file"'));
  const mobility = await (await fetch(`${base}/gk-global-mobility?lang=${locale}`)).text();
  assert.ok(mobility.includes(`/gkgm-project?lang=${locale}`));
}
const apiResponse = await fetch(`${base}/api/gkgm-project`, { method: "POST", headers: { origin: base, "content-type": "application/x-www-form-urlencoded" }, body: new URLSearchParams(sample("work", "fr")) });
assert.equal(apiResponse.status, 503, "Live app remains blocked until privacy validation");
console.log("PASS GKGM: 12 type/language combinations, conditional required fields, payload minimisation, consent, honeypot, size/origin/duplicate checks, simulated upstream success/failure/static-host fallback, no live submission, detection field parity, local FR/EN routes and links.");
