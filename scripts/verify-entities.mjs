import assert from "node:assert/strict";

const base = process.argv[2] || "http://localhost:3100";
for (const lang of ["fr", "en"]) {
  const response = await fetch(`${base}/entities?lang=${lang}`);
  assert.equal(response.status, 200);
  const html = await response.text();
  const main = html.match(/<main\b[^>]*>(.*?)<\/main>/s)?.[1] || "";
  assert.match(html, new RegExp(`<html[^>]*lang="${lang}"`));
  assert.equal((main.match(/<h1\b/g) || []).length, 1);
  assert.ok(main.includes(lang === "fr" ? "Nos entités" : "Our Entities"));
  assert.ok(main.includes(lang === "fr" ? "Un écosystème international de compétences, d&#x27;entreprises et de projets complémentaires." : "An international ecosystem of complementary expertise, companies and projects."));
  assert.equal((main.match(/data-entity-profile=/g) || []).length, 4);
  const section = id => main.match(new RegExp(`<section\\b[^>]*id="${id}"[^>]*>(.*?)</section>`, "s"))?.[1] || "";
  const togo = section("togo");
  assert.equal((togo.match(/data-entity-division=/g) || []).length, 2);
  assert.ok(togo.includes(lang === "fr" ? "ne constituent pas deux sociétés juridiquement indépendantes" : "not two legally independent companies"));
  for (const id of ["gkgt", "gkgm"]) assert.ok(togo.includes(`data-entity-division="${id}"`));
  assert.ok(section("lithuania").includes(lang === "fr" ? "juridiquement distincte de GK GLOBAL GROUP SARL U" : "legally distinct from GK GLOBAL GROUP SARL U"));
  assert.equal((main.match(/data-nexus-function/g) || []).length, 5);
  const nexus = section("nexus");
  for (const text of lang === "fr" ? ["Plateforme internationale de gestion et de coordination", "achèvement non confirmé par un justificatif", "ne signifient pas que toutes sont déjà opérationnelles", "ni une propriété juridique ni une participation au capital"] : ["International management and coordination platform", "completion has not been confirmed", "do not imply that all are already operational", "neither legal ownership nor equity interests"]) assert.ok(nexus.includes(text), text);
  const serbia = section("serbia");
  assert.ok(serbia.includes(lang === "fr" ? "En constitution" : "In formation"));
  assert.ok(!serbia.includes("<img"), "No invented Serbian logo");
  assert.ok(serbia.includes(lang === "fr" ? "n’est pas présenté comme une société déjà enregistrée ou opérationnelle" : "not presented as an already registered or operational company"));
  assert.ok(section("ecosystem").includes(lang === "fr" ? "ne dispose pas actuellement d’une personnalité juridique distincte" : "currently has no separate legal personality"));
  assert.equal((main.match(/data-entity-expertise/g) || []).length, 4);
  for (const value of ["TG-LFW-01-2026-B13-02457", "1002141706", "306154150"]) assert.ok(main.includes(value), "Existing legal information retained");
  for (const logo of ["gk-group-official-logo.png", "gk-global-group-sarlu.png", "gk-global-technology.png", "gk-global-mobility.png", "uab-gk-esttrade.png", "gk-nexus.png"]) assert.ok(main.includes(logo));
  const ids = [...main.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(new Set(ids).size, ids.length, "Unique anchor IDs");
  for (const [, id] of main.matchAll(/aria-labelledby="([^"]+)"/g)) assert.ok(ids.includes(id));
  for (const path of ["/gk-global-technology", "/gk-global-mobility", "/gk-esttrade", "/gk-nexus", "/architecture", "/activities", "/contact"]) {
    assert.ok(main.includes(`href="${path}?lang=${lang}"`));
    assert.equal((await fetch(`${base}${path}?lang=${lang}`)).status, 200);
  }
}
console.log("PASS entities FR/EN: four institutional profiles, two divisions nested under Togo, five Nexus functions and cautious legal status, Serbia in formation without logo, four complementary domains, retained legal details, official logos and seven bilingual destinations.");
