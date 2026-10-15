import assert from "node:assert/strict";

const base = process.argv[2] || "http://localhost:3100";
for (const lang of ["fr", "en"]) {
  for (const path of ["/activities", "/about"]) {
    const response = await fetch(`${base}${path}?lang=${lang}`);
    assert.equal(response.status, 200);
    const html = await response.text();
    const main = html.match(/<main\b[^>]*>(.*?)<\/main>/s)?.[1] || "";
    assert.match(html, new RegExp(`<html[^>]*lang="${lang}"`));
    assert.equal((main.match(/<h1\b/g) || []).length, 1);
    assert.ok(main.includes("GLOBAL BUSINESS WITHOUT BORDERS"));
    assert.ok(!/ApplyBoard|Dalimit|\bELEC\b/.test(main));
    if (path === "/activities") {
      assert.ok(main.includes(lang === "fr" ? "Nos domaines d&#x27;activité" : "Our Business Activities"));
      assert.deepEqual([...main.matchAll(/data-business-domain="([^"]+)"/g)].map(match => match[1]), ["technology", "mobility", "trade", "coordination"]);
      const mobility = main.match(/<section\b[^>]*id="activity-mobility"[^>]*>(.*?)<\/section>/s)?.[1] || "";
      assert.equal((mobility.match(/data-activity-group/g) || []).length, 4);
      assert.ok(mobility.includes(lang === "fr" ? "aucun visa, emploi ou admission n’est garanti" : "no visa, job or admission is guaranteed"));
      const nexus = main.match(/<section\b[^>]*id="activity-coordination"[^>]*>(.*?)<\/section>/s)?.[1] || "";
      assert.equal((nexus.match(/data-activity-group/g) || []).length, 5);
      assert.ok(nexus.includes(lang === "fr" ? "sans affirmer qu’elles sont toutes déjà opérationnelles" : "without asserting that all are already operational"));
      assert.ok(nexus.includes("GK Nexus Sh.p.k."));
      for (const href of ["/gk-global-technology", "/gk-global-mobility", "/gk-esttrade", "/gk-nexus"]) assert.ok(main.includes(`href="${href}?lang=${lang}"`));
    } else {
      assert.ok(main.includes(lang === "fr" ? "À propos de GK GROUP" : "About GK GROUP"));
      assert.equal((main.match(/data-history-step/g) || []).length, 4);
      assert.equal((main.match(/data-institutional-value/g) || []).length, 5);
      assert.equal((main.match(/data-about-entity=/g) || []).length, 4);
      assert.ok(main.includes("GK Informatique"));
      assert.ok(main.includes(lang === "fr" ? "activité historique" : "historical activity"));
      assert.ok(main.includes(lang === "fr" ? "sans personnalité juridique propre" : "without legal personality of its own"));
      assert.ok(main.includes(lang === "fr" ? "En constitution" : "In formation"));
      assert.ok(main.includes("Edem Yawo Awutey"));
      assert.ok(main.includes(lang === "fr" ? "l’Asie, les Amériques" : "Asia, the Americas"));
      assert.ok(main.includes("founder%2Fedem-yawo-awutey-founder.png"));
      const history = main.match(/<section\b[^>]*id="our-history"[^>]*>(.*?)<\/section>/s)?.[1] || "";
      assert.ok(!/\b(?:19|20)\d{2}\b/.test(history.replace(/<[^>]+>/g, "")), "No fabricated dates in the history text");
    }
    const ids = new Set([...main.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]));
    for (const match of main.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.has(match[1]), match[1]);
    const paths = new Set([...main.matchAll(/href="(\/[^"#]+)"/g)].map(match => match[1].replaceAll("&amp;", "&")));
    for (const href of paths) {
      assert.ok(href.endsWith(`?lang=${lang}`), href);
      assert.equal((await fetch(base + href)).status, 200, href);
    }
  }
}
console.log("PASS activities/about FR/EN: four domains, four mobility subdomains, five Nexus functions, four undated history stages, five values, cautious entity statuses, official founder photo, valid anchors and bilingual destination routes.");
