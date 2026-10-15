import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";

export const paths = ["/", "/about", "/architecture", "/activities", "/entities", "/gk-global-technology", "/gk-global-mobility", "/gk-nexus", "/gk-esttrade", "/partnerships", "/news", "/contact"];
const base = process.argv[2] || "http://localhost:3100";
const record = process.argv.includes("--record");
const baselinePath = new URL("../docs/hero-baseline.json", import.meta.url);
const baseline = record ? {} : JSON.parse(await readFile(baselinePath, "utf8"));
const hash = value => createHash("sha256").update(value).digest("hex");
const normalise = value => value.replace(/<!--.*?-->/gs, "").replace(/\s+/g, " ").trim();
const text = value => normalise(value.replace(/<div aria-hidden="true" class="invisible[^>]*>.*?<\/div>/s, "").replace(/<[^>]*>/g, " "));
for (const path of paths) for (const lang of ["fr", "en"]) {
  const key = `${path}?lang=${lang}`;
  const response = await fetch(base + key);
  assert.equal(response.status, 200, key);
  const html = await response.text();
  const main = html.match(/<main\b[^>]*>(.*?)<\/main>/s)?.[1] || "";
  const hero = main.match(/^\s*(<section\b[^>]*>.*?<\/section>)/s)?.[1];
  assert.ok(hero, key);
  const below = main.slice(main.indexOf(hero) + hero.length);
  const buttons = [...hero.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>(.*?)<\/a>/gs)].map(match => [match[1], text(match[2])]);
  const snapshot = {
    below: hash(normalise(below)),
    header: hash(normalise(html.match(/<header\b[^>]*>.*?<\/header>/s)?.[0] || "")),
    footer: hash(normalise(html.match(/<footer\b[^>]*>.*?<\/footer>/s)?.[0] || "")),
    seo: hash(normalise((html.match(/<title>.*?<\/title>|<(?:meta|link)\b[^>]*>/g) || []).filter(tag => /<title|name="description"|rel="canonical"|hrefLang=/.test(tag)).join(""))),
    schema: hash(html.match(/id="gkgroup-structured-data"[^>]*>(.*?)<\/script>/s)?.[1] || ""),
    text: text(hero), buttons,
  };
  if (record) baseline[key] = snapshot;
  else {
    assert.deepEqual(snapshot, baseline[key], `${key}: content below hero, navigation, SEO, schema, visible hero text and buttons unchanged`);
    assert.equal((main.match(/data-institutional-hero/g) || []).length, 1, key);
    assert.equal((hero.match(/<h1\b/g) || []).length, 1, key);
    const expectedLogo = { "/gk-global-technology": "gk-global-technology.png", "/gk-global-mobility": "gk-global-mobility.png", "/gk-nexus": "gk-nexus.png", "/gk-esttrade": "uab-gk-esttrade.png" }[path] || "gk-group-official-logo.png";
    assert.ok(hero.includes(expectedLogo), key);
    assert.ok(!hero.includes("invisible"), key);
  }
}
if (record) await writeFile(baselinePath, JSON.stringify(baseline, null, 2) + "\n");
console.log(record ? "Recorded 24 pre-change hero/content/SEO snapshots." : "PASS 24 FR/EN heroes: common component, correct official logos, visible text/buttons preserved, below-hero content/navigation/SEO/schema unchanged.");
