import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { ALL_FIELDS, PROJECT_TYPES, FORM_NAME, PROJECT_COPY } from "../content/gkgm-project.js";
import { projectDeliveryConfig } from "../lib/gkgm-project-server.js";
import { netlifyProjectBody, sendNetlifyProject, NETLIFY_PROJECT_ENDPOINT } from "../lib/gkgm-netlify.js";
import { sample } from "./gkgm-fixtures.mjs";

// No real provider traffic: each transmission test supplies its own transport.
const values = sample;

test("static blueprint matches every declared field and declares native honeypot", async () => {
  const html = await readFile(new URL("../public/__gkgm-forms.html", import.meta.url), "utf8");
  assert.match(html, /name="gkgm-project-inquiry"[^>]*data-netlify="true"[^>]*netlify-honeypot="fax"/);
  const names = [...html.matchAll(/<(?:input|select|textarea)\b[^>]*\bname="([^"]+)"/g)].map(m => m[1]);
  assert.deepEqual(names.sort(), [...ALL_FIELDS.map(f => f.id), "form-name", "locale", "type", "fax", "consent", "notice-version"].sort());
  assert.equal(new Set(names).size, names.length);
  assert.doesNotMatch(html, /type="file"|turnstile|submissionId|postgres|blobs/i);
});

test("six categories x FR/EN encode only relevant fields for native Forms", () => {
  for (const type of PROJECT_TYPES) for (const locale of ["fr", "en"]) {
    const body = new URLSearchParams(netlifyProjectBody(values(type.id, locale)));
    assert.equal(body.get("form-name"), FORM_NAME); assert.equal(body.get("locale"), locale);
    assert.equal(body.get("type"), type.id); assert.equal(body.get("consent"), "yes");
    assert.equal(body.get("fax"), ""); assert.equal(body.get("notice-version"), "gkgm-netlify-2026-10-16");
    assert.equal(body.has("turnstileToken"), false); assert.equal(body.has("submissionId"), false);
  }
});

test("client preparation rejects invalid consent, contact, category, honeypot and unwanted fields", () => {
  for (const change of [{ consent: "" }, { email: "invalid" }, { type: "other" }, { locale: "xx" }, { fax: "synthetic bot" }, { passport: "synthetic forbidden" }, { occupation: new Blob(["synthetic"]) }]) assert.throws(() => netlifyProjectBody({ ...values(), ...change }));
});

test("first contact permits omitting optional questions and telephone unless WhatsApp is selected", () => {
  const first = { ...values(), whatsapp: "", experience: "", qualification: "", language: "", availability: "" };
  assert.doesNotThrow(() => netlifyProjectBody(first));
  assert.throws(() => netlifyProjectBody({ ...first, contact: "whatsapp" }));
});

test("production UI remains closed without explicit frontend and privacy flags", () => {
  const env = { CONTEXT: "production", GKGM_FRONTEND_ENABLED: "true", GKGM_PRIVACY_APPROVED: "true" };
  assert.equal(projectDeliveryConfig({}).enabled, false);
  assert.equal(projectDeliveryConfig(env).enabled, true);
  for (const flag of ["GKGM_FRONTEND_ENABLED", "GKGM_PRIVACY_APPROVED"]) assert.equal(projectDeliveryConfig({ ...env, [flag]: "false" }).enabled, false);
  assert.equal(projectDeliveryConfig({ ...env, CONTEXT: "deploy-preview", GKGM_FRONTEND_ENABLED: "false" }).enabled, false);
});

test("native acknowledgement, HTTP refusal, static-file false success and network failure", async () => {
  let calls = 0;
  await sendNetlifyProject(values(), async (url, init) => {
    calls++; assert.equal(url, NETLIFY_PROJECT_ENDPOINT); assert.equal(init.method, "POST");
    assert.equal(init.redirect, "error"); assert.equal(init.credentials, "omit");
    assert.equal(init.headers["Content-Type"], "application/x-www-form-urlencoded");
    assert.equal(new URLSearchParams(init.body).get("form-name"), FORM_NAME);
    return new Response("Synthetic acknowledgement");
  });
  assert.equal(calls, 1);
  for (const status of [400, 403, 404, 429, 500, 503]) await assert.rejects(sendNetlifyProject(values(), async () => new Response("Synthetic refusal", { status })));
  await assert.rejects(sendNetlifyProject(values(), async () => new Response('<body id="gkgm-form-reference">')));
  await assert.rejects(sendNetlifyProject(values(), async () => { throw Error("Synthetic offline"); }));
});

test("privacy copy describes Forms and email copies without marketing or partner authorisation", () => {
  for (const locale of ["fr", "en"]) {
    assert.match(PROJECT_COPY[locale].privacy.join(" "), /Netlify Forms/);
    assert.match(PROJECT_COPY[locale].privacy.join(" "), /12/);
    assert.doesNotMatch(PROJECT_COPY[locale].privacy.join(" "), /Cloudflare Turnstile|48 hours|48 heures/);
    assert.match(PROJECT_COPY[locale].consent, locale === "fr" ? /n’autorise aucun démarchage/ : /does not authorise commercial/);
  }
});
