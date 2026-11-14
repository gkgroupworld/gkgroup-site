import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const base = process.argv[2] || "http://127.0.0.1:3116";
const expectedPhotos = ["01_20181030_170129.webp", "02_20181030_170143.webp", "06_20211013_095534.webp", "11_IMG-20181112-WA0042.webp", "12_IMG-20181122-WA0004.webp", "14_IMG-20190301-WA0000.webp", "16_unites-centrales-arriere-plan-modifie.png", "18_IMG_20180329_095427.webp", "20_IMG_20190125_120103_9.webp", "21_IMG_20190214_073458_8.webp", "23_IMG_20190308_092807_2.webp", "24_IMG_20190308_092825_7.webp"];
for (const lang of ["fr", "en"]) {
  const response = await fetch(`${base}/gk-global-technology?lang=${lang}`);
  assert.equal(response.status, 200);
  const html = await response.text();
  const archives = html.match(/<section\b[^>]*id="technical-archives"[^>]*>(.*?)<\/section>/s)?.[1];
  assert.ok(archives);
  assert.equal((archives.match(/<figure\b/g) || []).length, 12);
  for (const file of expectedPhotos) {
    assert.ok(archives.includes(file), file);
    assert.equal((await fetch(`${base}/archives-techniques/${file}`)).status, 200);
  }
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
  assert.deepEqual([...record.matchAll(/<dd\b[^>]*>(\d+)<\/dd>/g)].map(m => Number(m[1])), [3, 2, 1, 8]);
  for (const partner of ["Dalimit Global", "ApplyBoard", "Elec Work Agency", "Live &amp; Study in Europe"]) assert.ok(record.includes(partner));
}
const original = "16_IMG-20210728-WA0002(1).webp";
assert.equal((await fetch(`${base}/archives-techniques/${original}`)).status, 404);
assert.equal((await fetch(`${base}/source-assets/archives-techniques/originals/${original}`)).status, 404);
const rights = JSON.parse(await readFile(new URL("../content/gkgt-publication-rights.json", import.meta.url), "utf8"));
assert.ok(rights.pendingHistoricalPhotos.every(photo => photo.status === "confirmed"));
console.log("PASS galleries/GKGM FR/EN: 12 approved photos, private original 16, 2 labelled illustrations, 6 visas separate from 8 permits, 4 partners, no gallery on About.");
