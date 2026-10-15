import assert from "node:assert/strict";

const base = process.argv[2] || "http://localhost:3100";
const sections = ["hero", "vision", "activities", "ecosystem", "nexus", "partnerships", "founder", "collaboration"];
const routes = ["/activities", "/architecture", "/about", "/entities", "/gk-global-technology", "/gk-global-mobility", "/gk-esttrade", "/gk-nexus", "/partnerships", "/contact"];
for (const lang of ["fr", "en"]) {
  const response = await fetch(`${base}/?lang=${lang}`);
  assert.equal(response.status, 200);
  const html = await response.text();
  const main = html.match(/<main\b[^>]*>(.*?)<\/main>/s)?.[1] || "";
  assert.match(html, new RegExp(`<html[^>]*lang="${lang}"`));
  assert.equal((main.match(/<h1\b/g) || []).length, 1);
  assert.ok(main.includes(lang === "fr" ? "Connecter les marchés, les talents et les opportunités." : "Connecting Markets, Talent and Opportunities."));
  assert.deepEqual([...main.matchAll(/data-home-section="([^"]+)"/g)].map(match => match[1]), sections);
  assert.equal((main.match(/data-home-activity=/g) || []).length, 4);
  assert.deepEqual([...main.matchAll(/data-home-entity="([^"]+)"/g)].map(match => match[1]), ["gk-global-group-sarlu", "uab-gk-esttrade", "gk-nexus", "gk-danube-trading"]);
  assert.ok(!main.includes("data-architecture-entity"), "Home does not duplicate the full chart");
  const nexus = main.match(/<section\b[^>]*id="home-nexus"[^>]*>(.*?)<\/section>/s)?.[1] || "";
  assert.equal((nexus.match(/<li\b/g) || []).length, 5);
  assert.ok(nexus.includes(lang === "fr" ? "sans affirmer qu’elles sont toutes déjà opérationnelles" : "without asserting that all are already operational"));
  assert.ok(nexus.includes(lang === "fr" ? "ni propriété juridique" : "neither legal ownership"));
  assert.ok(main.includes(lang === "fr" ? "marque sans personnalité juridique propre" : "brand without legal personality of its own"));
  assert.ok(main.includes(lang === "fr" ? "En constitution" : "In formation"));
  assert.ok(main.includes(lang === "fr" ? "aucun résultat n’est garanti" : "no outcome is guaranteed"));
  assert.ok(main.includes("Edem Yawo Awutey"));
  assert.ok(main.includes(lang === "fr" ? "l’Asie, les Amériques" : "Asia, the Americas"));
  assert.ok(!/ApplyBoard|Dalimit|\bELEC\b/.test(main), "No unverified partner endorsements");
  const links = new Set([...main.matchAll(/href="(\/[^"#]+)"/g)].map(match => match[1].replaceAll("&amp;", "&")));
  assert.deepEqual([...links].sort(), routes.map(path => `${path}?lang=${lang}`).sort());
  for (const href of links) assert.equal((await fetch(base + href)).status, 200, href);
}
console.log("PASS home FR/EN: eight sections, four activities, four entity summaries, five Nexus functions, cautious legal/project/mobility wording, approved founder content and ten existing bilingual destinations.");
