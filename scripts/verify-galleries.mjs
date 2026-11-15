import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const base = process.argv[2] || "http://127.0.0.1:3116";
const expectedPhotos = ["01_20181030_170129.webp", "02_20181030_170143.webp", "06_20211013_095534.webp", "11_IMG-20181112-WA0042.webp", "12_IMG-20181122-WA0004.webp", "14_IMG-20190301-WA0000.webp", "16_unites-centrales-arriere-plan-modifie.png", "18_IMG_20180329_095427.webp", "20_IMG_20190125_120103_9.webp", "21_IMG_20190214_073458_8.webp", "23_IMG_20190308_092807_2.webp", "24_IMG_20190308_092825_7.webp"];
for (const lang of ["fr", "en"]) {
  const response = await fetch(`${base}/gk-global-technology?lang=${lang}`);
  assert.equal(response.status, 200);
  const html = await response.text();
  const archives = html.match(/<main\b[^>]*>(.*?)<\/main>/s)?.[1];
  assert.ok(archives);
  assert.equal((archives.match(/data-gallery-photo=/g) || []).length, 21);
  assert.equal(new Set([...archives.matchAll(/data-gallery-photo="([^"]+)"/g)].map(match => match[1])).size, 21);
  assert.equal((archives.match(/data-gallery-photo="archive-/g) || []).length, 12);
  assert.equal((archives.match(/data-photo-story=/g) || []).length, 5);
  for (const story of ["expertise", "maintenance", "equipment", "workshop", "evolution"]) assert.ok(archives.includes(`data-photo-story="${story}"`));
  assert.ok(archives.includes(lang === "fr" ? "sans dates" : "undated"));
  assert.ok(archives.includes('id="technical-archives"'));
  const batch = JSON.parse(await readFile(new URL("../content/gkgt-authentic-batch.json", import.meta.url), "utf8"));
  for (const photo of batch.photos.filter(photo => photo.disposition === "included-local-preview")) {
    assert.ok(archives.includes(`data-gallery-photo="${photo.id}"`));
    assert.equal((await fetch(base + photo.publicationFile)).status, 200);
    assert.equal((await fetch(base + photo.thumbnailFile)).status, 200);
  }
  assert.ok(!archives.includes(lang === "fr" ? "Validation de publication en attente" : "Publication approval pending"));
  for (const file of expectedPhotos) {
    assert.ok(archives.includes(`data-gallery-photo="archive-${file.slice(0, 2)}"`), file);
    assert.equal((await fetch(`${base}/archives-techniques/${file}`)).status, 200);
  }
  const display = JSON.parse(await readFile(new URL("../content/gkgt-display-v2.json", import.meta.url), "utf8"));
  for (const photo of Object.values(display.photos)) {
    assert.ok(archives.includes(photo.src));
    for (const variant of photo.variants) {
      assert.ok(archives.includes(variant.src));
      assert.equal((await fetch(base + variant.src)).status, 200);
    }
  }
  assert.ok(!archives.includes("/_next/image?url=%2Fgkgt-quality-v2"));
  assert.ok(archives.includes(lang === "fr" ? "arrière-plan modifié" : "edited background"));
  assert.ok(archives.includes("GK Informatique"));
  const workshop = html.match(/<section\b[^>]*id="workshop-store"[^>]*>(.*?)<\/section>/s)?.[1];
  assert.equal((workshop?.match(/<figure\b/g) || []).length, 2);
  assert.match(workshop, /GKGT_Atelier_Illustration\.png/);
  assert.match(workshop, /GKGT_Boutique_Illustration\.png/);
  assert.ok(workshop.includes(lang === "fr" ? "ne sont pas des photographies" : "not photographs"));
  const about = await (await fetch(`${base}/about?lang=${lang}`)).text();
  assert.ok(!about.includes('id="technical-archives"'));
  const mobility = await (await fetch(`${base}/gk-global-mobility?lang=${lang}`)).text();
  const record = mobility.match(/<section\b[^>]*id="track-record"[^>]*>(.*?)<\/section>/s)?.[1];
  assert.equal((record?.match(/data-visa-result=/g) || []).length, 3);
  assert.equal((record.match(/data-historical-result=/g) || []).length, 2);
  assert.equal((record.match(/data-historical-visit=/g) || []).length, 4);
  for (const destination of ["canada", "albania"]) assert.equal((record.match(new RegExp(`data-historical-result="${destination}"`, "g")) || []).length, 1);
  assert.ok(record.includes(lang === "fr" ? "Plus de" : "More than"));
  assert.ok(record.includes(lang === "fr" ? "Environ" : "Approximately"));
  assert.ok(record.includes(lang === "fr" ? "déclarés par GKGM" : "reported by GKGM"));
  assert.ok(record.includes(lang === "fr" ? "pas comptabilisés comme des résultats supplémentaires" : "not counted as additional results"));
  assert.deepEqual([...record.matchAll(/<dd\b[^>]*>(\d+)<\/dd>/g)].map(m => Number(m[1])), [3, 2, 1, 8]);
  for (const partner of ["Dalimit Global", "ApplyBoard", "Elec Work Agency", "Live &amp; Study in Europe"]) assert.ok(record.includes(partner));
}
const original = "16_IMG-20210728-WA0002(1).webp";
assert.equal((await fetch(`${base}/archives-techniques/${original}`)).status, 404);
assert.equal((await fetch(`${base}/source-assets/archives-techniques/originals/${original}`)).status, 404);
const rights = JSON.parse(await readFile(new URL("../content/gkgt-publication-rights.json", import.meta.url), "utf8"));
assert.ok(rights.pendingHistoricalPhotos.every(photo => photo.status === "confirmed"));
console.log("PASS GKGT/GKGM FR/EN: 21 unique views across 5 editorial sequences, pending rights preserved, historical captions/private original and illustrations retained; qualified Canada/Albania results, four unquantified destinations, previous results and partners retained.");
