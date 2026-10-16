import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { PROJECT_TYPES, ALL_FIELDS, FORM_NAME } from "../content/gkgm-project.js";
import { projectFields, validateProject, validatedPayload } from "../lib/gkgm-project.js";
import { projectDeliveryConfig } from "../lib/gkgm-project-server.js";
const base = process.argv[2] || "http://127.0.0.1:3111";
assert.equal(PROJECT_TYPES.length, 6);
assert.equal(projectDeliveryConfig({ GKGM_PRIVACY_APPROVED: "true", SITE_NAME: "example", SITE_ID: "test" }).enabled, false, "Legacy flag alone cannot activate new collection");
const configuration = { GKGM_FRONTEND_ENABLED: "true", GKGM_PRIVACY_APPROVED: "true", GKGM_API_URL: "https://collector.synthetic.test/api/gkgm-project", GKGM_TURNSTILE_SITE_KEY: "synthetic-public-sitekey" };
assert.equal(projectDeliveryConfig(configuration).enabled, true);
for (const endpoint of ["http://evil.test/api/gkgm-project", "https://evil.test/api/gkgm-project?name=bad", "https://user:pass@evil.test/api/gkgm-project", "https://evil.test/other"]) assert.equal(projectDeliveryConfig({ ...configuration, GKGM_API_URL: endpoint }).enabled, false);
for (const type of PROJECT_TYPES) for (const locale of ["fr", "en"]) {
  const values = { type: type.id, locale, consent: "yes", fax: "" };
  for (const field of projectFields(type.id)) values[field.id] = field.choices?.[0].id || (field.type === "number" ? "3" : "Synthetic offline answer");
  Object.assign(values, { email: "synthetic@example.test", whatsapp: "+22890000000", destination: type.id === "d2" ? "Portugal" : "Synthetic destination", description: "Synthetic offline description of the proposed project." });
  assert.deepEqual(validateProject(values), {});
  assert.equal(validatedPayload(values)["form-name"], FORM_NAME);
  for (const field of projectFields(type.id).filter(f => !f.optional)) assert.ok(validateProject({ ...values, [field.id]: "" })[field.id]);
  assert.equal(validatedPayload({ ...values, passport: "not allowed" }), null);
}
const reference = await readFile(new URL("../public/__gkgm-forms.html", import.meta.url), "utf8");
const names = [...reference.matchAll(/name="([^"]+)"/g)].map(m => m[1]).filter(name => !["robots", FORM_NAME].includes(name));
assert.deepEqual(names.sort(), ["form-name", "locale", "type", "fax", "consent", ...ALL_FIELDS.map(f => f.id)].sort());
assert.match(reference, /data-netlify="true"/); // Retained pending explicit migration approval, not secure ingress.
for (const locale of ["fr", "en"]) {
  const response = await fetch(base + "/gkgm-project?lang=" + locale);
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.ok(html.includes('href="https://gkgroup.app/gkgm-project' + (locale === "en" ? "?lang=en" : "") + '"'));
  assert.match(html, /id="gkgm-project-form"/);
  assert.ok(!html.includes('type="file"'));
  assert.ok(!html.includes("challenges.cloudflare.com/turnstile/v0/api.js"), "Disabled rendering must not load Turnstile");
  const mobility = await (await fetch(base + "/gk-global-mobility?lang=" + locale)).text();
  assert.ok(mobility.includes("/gkgm-project?lang=" + locale));
}
const closed = await fetch(base + "/api/gkgm-project", { method: "POST", headers: { "content-type": "application/x-www-form-urlencoded" }, body: "name=synthetic" });
assert.equal(closed.status, 503);
assert.equal((await closed.json()).code, "collector_not_configured");
console.log("PASS GKGM: 12 type/language models, required fields, frontend config closed by default, local FR/EN links and metadata, old application ingress closed, native detector retained pending authorised migration. Run isolated service tests for secure ingestion.");
