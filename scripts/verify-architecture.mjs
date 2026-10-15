import assert from "node:assert/strict";

const base = process.argv[2] || "http://localhost:3100";
const national = ["gk-global-group-sarlu", "uab-gk-esttrade", "gk-danube-trading"];
const branches = ["gkgt", "gkgm"];
for (const locale of ["fr", "en"]) {
  const response = await fetch(`${base}/architecture?lang=${locale}`);
  assert.equal(response.status, 200);
  const html = await response.text();
  const main = html.match(/<main\b[^>]*>(.*?)<\/main>/s)?.[1];
  assert.ok(main);
  assert.match(html, new RegExp(`<html[^>]*lang="${locale}"`));
  assert.ok(main.includes(locale === "fr" ? "Notre architecture internationale" : "Our International Structure"));
  assert.ok(main.includes(locale === "fr" ? "Sans personnalité juridique propre" : "without legal personality"));
  assert.ok(main.includes(locale === "fr" ? "En constitution" : "In formation"));
  assert.ok(main.includes(locale === "fr" ? "Immatriculation en cours" : "Registration in progress"));
  assert.ok(main.includes(locale === "fr" ? "sans relation de détention juridique" : "no legal ownership relationship"));
  assert.ok(main.includes(locale === "fr" ? "au Togo uniquement" : "in Togo only"));
  assert.equal((main.match(/data-architecture-platform="gk-nexus"/g) || []).length, 1);
  assert.ok(main.indexOf('data-architecture-platform="gk-nexus"') < main.indexOf('data-architecture-entity='));
  assert.ok(main.includes(locale === "fr" ? "Plateforme internationale de gestion et de coordination de l’écosystème GK GROUP" : "International management and coordination platform for the GK GROUP ecosystem"));
  assert.ok(main.includes(locale === "fr" ? "Tirets dorés" : "Gold dashes"));
  assert.ok(main.includes(locale === "fr" ? "Points gris" : "Grey dots"));
  assert.ok(main.includes(locale === "fr" ? "ne signifient pas que toutes sont déjà opérationnelles" : "do not imply that all are already operational"));
  const nexusProfile = main.match(/<article\b[^>]*id="profile-gk-nexus"[^>]*>(.*?)<\/article>/s)?.[1] || "";
  assert.equal((nexusProfile.match(/<li\b/g) || []).length, 5, "five platform functions");
  assert.ok(nexusProfile.includes("GK Nexus Sh.p.k."));
  assert.deepEqual([...main.matchAll(/data-architecture-entity="([^"]+)"/g)].map(match => match[1]), national);
  assert.deepEqual([...main.matchAll(/data-architecture-branch="([^"]+)"/g)].map(match => match[1]), branches);
  for (const id of ["gk-nexus", ...national, ...branches]) {
    assert.ok(main.includes(`id="profile-${id}"`));
    assert.ok(main.includes(`href="#profile-${id}"`));
  }
  const ids = new Set([...main.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]));
  for (const match of main.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.has(match[1]), match[1]);
  const links = new Set([...main.matchAll(/href="(\/[^"#]+)"/g)].map(match => match[1].replaceAll("&amp;", "&")));
  assert.equal(links.size, 5, "Only existing entity routes");
  for (const path of ["/entities", "/gk-esttrade", "/gk-nexus", "/gk-global-technology", "/gk-global-mobility"]) {
    const href = `${path}?lang=${locale}`;
    assert.ok(links.has(href));
    assert.equal((await fetch(base + href)).status, 200, href);
  }
}
console.log("PASS architecture FR/EN: central Nexus platform, three coordinated entities, two Togo divisions, six profiles, five platform functions, cautious legal status, three relationship types and existing bilingual links.");
