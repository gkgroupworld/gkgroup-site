import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { chromium } from "@playwright/test";
import { collect } from "../src/collector.mjs";
import { backend, options, sample, PROJECT_TYPES } from "./harness.mjs";
import { COMMON_FIELDS, PROJECT_COPY } from "../../../content/gkgm-project.js";

const root = fileURLToPath(new URL("../../../", import.meta.url));
const base = "http://127.0.0.1:3115";
const endpoint = "https://collector.synthetic.test/api/gkgm-project";
// Only this local child frontend is enabled with synthetic public configuration.
// It has no collection-service credentials; every non-local request is intercepted.
const server = spawn(process.execPath, [root + "node_modules/next/dist/bin/next", "start", "--hostname", "127.0.0.1", "--port", "3115"], { cwd: root, env: { ...process.env, GKGM_FRONTEND_ENABLED: "true", GKGM_PRIVACY_APPROVED: "true", GKGM_API_URL: endpoint, GKGM_TURNSTILE_SITE_KEY: "synthetic-public-sitekey" }, stdio: "ignore", windowsHide: true });
let browser;
const audit = [];
try {
  let ready = false;
  for (let i = 0; i < 100; i++) {
    try { if ((await fetch(base)).ok) { ready = true; break; } } catch { /* server starting */ }
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  assert.ok(ready, "Local production build must be running");
  browser = await chromium.launch({ channel: "msedge", headless: true });
  for (const locale of ["fr", "en"]) for (const type of PROJECT_TYPES) {
    const width = type.id === "d2" ? 768 : locale === "fr" ? 390 : 1440;
    const context = await browser.newContext({ viewport: { width, height: 900 } });
    const page = await context.newPage();
    const b = backend(); const bodies = []; let failFirst = true;
    await context.route("**/*", async route => {
      const url = route.request().url();
      if (url.startsWith(base)) return route.continue();
      if (url.startsWith("https://challenges.cloudflare.com/turnstile/v0/api.js")) return route.fulfill({ contentType: "application/javascript", body: `window.turnstile={render:(el,o)=>{el.textContent='Synthetic antispam widget';queueMicrotask(()=>o.callback('synthetic-token-'+crypto.randomUUID()));return 'synthetic-widget'},remove:()=>{}};` });
      if (url === endpoint) {
        const body = route.request().postData(); bodies.push(Object.fromEntries(new URLSearchParams(body)));
        if (failFirst) {
          failFirst = false;
          if (type.id === "visit") return route.abort();
          const [status, code] = type.id === "study" ? [429, "quota"] : type.id === "business" ? [422, "challenge"] : type.id === "company" ? [409, "expired_attempt"] : [503, "unavailable"];
          return route.fulfill({ status, contentType: "application/json", body: JSON.stringify({ ok: false, code }) });
        }
        const request = new Request(endpoint, { method: "POST", headers: { origin: base, "content-type": "application/x-www-form-urlencoded" }, body });
        const response = await collect(request, options(b.client(), { origin: base }));
        return route.fulfill({ status: response.status, headers: Object.fromEntries(response.headers), body: await response.text() });
      }
      return route.abort();
    });
    await page.goto(base + "/gkgm-project?lang=" + locale);
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
    const visibleNames = await form.locator('input:not([name="fax"]),select,textarea').evaluateAll(inputs => inputs.map(input => input.name));
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
    await next(); await form.getByRole("alert").filter({ hasText: type.id === "study" ? copy.quotaError : type.id === "business" ? copy.challengeError : copy.failed }).waitFor();
    assert.ok((await form.locator("dl").innerText()).includes(model.description));
    await next(); await form.getByRole("status").waitFor();
    assert.equal(bodies.length, 2);
    if (type.id === "company") assert.notEqual(bodies[0].submissionId, bodies[1].submissionId);
    else assert.equal(bodies[0].submissionId, bodies[1].submissionId);
    assert.notEqual(bodies[0].turnstileToken, bodies[1].turnstileToken);
    assert.equal([...b.entries.values()].filter(e => e.data.payload).length, 1);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
    assert.equal(overflow, false);
    audit.push({ locale, type: type.id, width, steps: 4, conditionalFields: true, consentInitiallyUnchecked: true, backPreservesAnswers: true, failurePreservesAnswers: true, stableRetryId: type.id !== "company", expiredAttemptRenewsId: type.id === "company", freshChallengeOnRetry: true, recorded: 1, overflow });
    await context.close();
  }
  const output = root + "docs/gkgm-phase-b-browser-audit.json";
  await mkdir(root + "docs", { recursive: true });
  await writeFile(output, JSON.stringify({ syntheticOnly: true, externalRequestsIntercepted: true, journeys: audit }, null, 2) + "\n");
  console.log("PASS browser: 12 FR/EN journeys, 4 steps, relevant fields, consent, back/error retention; HTTP 503/429/challenge error, offline and expired retry; stable retry IDs except renewed expired attempts, fresh challenges, private simulated success; widths 390/768/1440, no overflow. No real provider traffic.");
} finally {
  if (browser) await browser.close();
  server.kill();
}
