import assert from "node:assert/strict";
import { spawn, execFile } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { chromium } from "@playwright/test";
import { sample, PROJECT_TYPES } from "./gkgm-fixtures.mjs";
import { COMMON_FIELDS, PROJECT_COPY } from "../content/gkgm-project.js";

const root = fileURLToPath(new URL("../", import.meta.url));
const base = "http://127.0.0.1:3115";
const endpoint = base + "/__gkgm-forms.html";
// Only this local child frontend is enabled with synthetic public configuration.
// It has no collection-service credentials; every non-local request is intercepted.
const server = spawn(process.execPath, [root + "node_modules/next/dist/bin/next", "start", "--hostname", "127.0.0.1", "--port", "3115"], { cwd: root, env: { ...process.env, GKGM_FRONTEND_ENABLED: "true", GKGM_PRIVACY_APPROVED: "true", CONTEXT: "production" }, stdio: "ignore", windowsHide: true });
let browser;
const audit = [];
try {
  let ready = false;
  for (let i = 0; i < 100; i++) {
    try { if ((await fetch(base)).ok) { ready = true; break; } } catch { /* server starting */ }
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  assert.ok(ready, "Local production build must be running");
  const definition = await fetch(base + "/__gkgm-forms.html");
  assert.equal(definition.status, 200);
  assert.match(await definition.text(), /name="gkgm-project-inquiry"[^>]*data-netlify="true"/);
  browser = await chromium.launch({ channel: "msedge", headless: true });
  for (const locale of ["fr", "en"]) for (const type of PROJECT_TYPES) {
    const width = type.id === "d2" ? 768 : locale === "fr" ? 390 : 1440;
    const context = await browser.newContext({ viewport: { width, height: 900 } });
    const page = await context.newPage();
    const bodies = []; let failFirst = true;
    await context.route("**/*", async route => {
      const url = route.request().url();
      if (url === endpoint && route.request().method() === "POST") {
        const body = route.request().postData(); bodies.push(Object.fromEntries(new URLSearchParams(body)));
        if (failFirst) {
          failFirst = false;
          if (type.id === "visit") return route.abort();
          if (type.id === "company") return route.fulfill({ status: 200, contentType: "text/html", body: '<body id="gkgm-form-reference">Synthetic static file</body>' });
          const status = type.id === "study" ? 429 : type.id === "business" ? 403 : 503;
          return route.fulfill({ status, contentType: "text/plain", body: "Synthetic refusal" });
        }
        return route.fulfill({ status: 200, contentType: "text/html", body: "Synthetic acknowledgement" });
      }
      if (url.startsWith(base)) return route.continue();
      return route.abort();
    });
    await page.goto(base + "/gkgm-project?lang=" + locale);
    assert.equal(await page.locator('link[rel="canonical"]').getAttribute("href"), "https://gkgroup.app/gkgm-project" + (locale === "en" ? "?lang=en" : ""));
    for (const [lang, suffix] of [["fr", ""], ["en", "?lang=en"], ["x-default", ""]]) assert.equal(await page.locator(`link[rel="alternate"][hreflang="${lang}"]`).getAttribute("href"), "https://gkgroup.app/gkgm-project" + suffix);
    const form = page.locator("#gkgm-project-form");
    const copy = PROJECT_COPY[locale];
    const next = () => form.locator('button[type="submit"]').click();
    const model = sample(type.id, locale);
    await form.locator('[name="type"]').selectOption(type.id); await next();
    for (const field of COMMON_FIELDS) {
      const locator = form.locator(`[name="${field.id}"]`);
      if (field.choices) await locator.selectOption(model[field.id]);
      else if (!(field.id === "destination" && type.id === "d2")) await locator.fill(model[field.id]);
    }
    await next();
    const visibleNames = await form.locator('input:not([name="fax"]):not([type="hidden"]),select,textarea').evaluateAll(inputs => inputs.map(input => input.name));
    assert.deepEqual(visibleNames.sort(), [...type.fields.map(f => f.id), "description"].sort());
    for (const field of [...type.fields, { id: "description" }]) {
      const locator = form.locator(`[name="${field.id}"]`);
      if (field.choices) await locator.selectOption(model[field.id]); else await locator.fill(model[field.id]);
    }
    await next();
    await form.getByRole("button", { name: copy.back, exact: true }).click();
    assert.equal(await form.locator('[name="description"]').inputValue(), model.description); await next();
    assert.equal(await form.locator('[name="consent"]').isChecked(), false);
    await next(); assert.ok(await form.locator("#gkgm-consent-error").isVisible());
    await form.locator('[name="consent"]').check();
    await next(); await form.getByRole("alert").filter({ hasText: copy.failed }).waitFor();
    assert.ok((await form.locator("dl").innerText()).includes(model.description));
    await next(); await form.getByRole("status").waitFor();
    assert.equal(bodies.length, 2);
    for (const body of bodies) {
      assert.equal(body["form-name"], "gkgm-project-inquiry");
      assert.equal(body.locale, locale); assert.equal(body.consent, "yes");
      assert.equal(body.fax, ""); assert.equal(body.submissionId, undefined); assert.equal(body.turnstileToken, undefined);
    }
    assert.deepEqual(bodies[0], bodies[1]);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
    assert.equal(overflow, false);
    audit.push({ locale, type: type.id, width, steps: 4, conditionalFields: true, consentInitiallyUnchecked: true, backPreservesAnswers: true, failurePreservesAnswers: true, sameAnswersOnRetry: true, simulatedAcknowledgement: true, overflow });
    await context.close();
  }
  const partnerships = [];
  for (const locale of ["fr", "en"]) {
    const context = await browser.newContext(); const page = await context.newPage(); let submissions = 0;
    await context.route("**/*", async route => {
      const req = route.request();
      if (req.url() === base + "/__forms.html" && req.method() === "POST") {
        const values = Object.fromEntries(new URLSearchParams(req.postData()));
        assert.equal(values["form-name"], "international-partnerships"); assert.equal(values.locale, locale);
        submissions++;
        return route.fulfill({ status: 200, contentType: "text/plain", body: "Synthetic acknowledgement" });
      }
      if (req.url().startsWith(base)) return route.continue();
      return route.abort();
    });
    await page.goto(base + "/partnerships?lang=" + locale);
    const form = page.locator("#partnership-form");
    assert.equal(await form.getAttribute("action"), "/__forms.html");
    for (const [name, value] of Object.entries({ organisation: "Synthetic organisation", country: "Synthetic country", name: "Synthetic QA", role: "Synthetic role", email: "qa@example.test", phone: "+22890000001", website: "https://example.test", type: "Synthetic partnership", description: "Entirely synthetic partnership description for local regression tests." })) await form.locator(`[name="${name}"]`).fill(value);
    await form.locator('[name="area"]').selectOption({ index: 1 });
    await form.locator('[name="consent"]').check();
    await form.locator('button[type="submit"]').click();
    await form.getByRole("status").waitFor();
    assert.equal(submissions, 1); partnerships.push({ locale, simulatedSubmission: true, nativeFormNamePreserved: true });
    await context.close();
  }
  const sitemap = await (await fetch(base + "/sitemap.xml")).text();
  for (const url of ["https://gkgroup.app/gkgm-project", "https://gkgroup.app/gkgm-project?lang=en", "https://gkgroup.app/partnerships"]) assert.ok(sitemap.includes(`<loc>${url}</loc>`));
  await new Promise((resolve, reject) => execFile(process.execPath, [root + "scripts/verify-seo.mjs", base], { cwd: root, windowsHide: true }, (error, stdout) => { if (error) reject(new Error("SEO regression failed")); else { console.log(stdout.trim()); resolve(); } }));
  const output = root + "docs/gkgm-netlify-browser-audit.json";
  await mkdir(root + "docs", { recursive: true });
  await writeFile(output, JSON.stringify({ syntheticOnly: true, externalRequestsIntercepted: true, staticReferenceServed: true, fullSeoRegressionVerified: true, canonicalAndHreflangVerified: true, sitemapVerified: true, partnerships, journeys: audit }, null, 2) + "\n");
  console.log("PASS browser: 12 FR/EN journeys, 4 steps, relevant fields, consent, back/error retention; HTTP 503/429 and network failure with unchanged retry payload; native Forms simulated acknowledgement; widths 390/768/1440, no overflow. No real provider traffic.");
  console.log("PASS regression: canonical/hreflang FR/EN, sitemap, two simulated international-partnerships submissions to the unchanged native form path.");
} finally {
  if (browser) await browser.close();
  server.kill();
}
