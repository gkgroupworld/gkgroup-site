import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import sharp from "sharp";

test("quality review keeps selected files and sources intact and candidates separate", async () => {
  const root = new URL("../", import.meta.url);
  const review = JSON.parse(await readFile(new URL("docs/quality-review/analysis.json", root), "utf8"));
  assert.equal(review.photos.length, 21);
  assert.equal(new Set(review.photos.map(p => p.id)).size, 21);
  assert.equal(review.photos.filter(p => p.betterJpegAvailable).length, 5);
  // These three files now activate the separately preserved V2 delivery
  // copies. Every photographed asset, source, rights record and V1 copy is
  // still protected by the frozen audit snapshot below.
  const approvedRuntimeChanges = new Set([
    "content/gkgt-gallery.js",
    "components/pages/GkgtPhotoGallery.js",
    "components/pages/GkgtPhotoGallery.module.css",
  ]);
  for (const [file, expected] of Object.entries(review.protectedHashes)) {
    if (approvedRuntimeChanges.has(file)) continue;
    assert.equal(createHash("sha256").update(await readFile(new URL(file, root))).digest("hex"), expected, file);
  }
  for (const photo of review.photos) {
    for (const file of [photo.referenceFile, photo.candidateFile, photo.balancedFile]) {
      assert.ok(file.startsWith("assets/"));
      const metadata = await sharp(await readFile(new URL(`docs/quality-review/${file}`, root))).metadata();
      assert.equal(metadata.width, photo.sourceWidth);
      assert.equal(metadata.height, photo.sourceHeight);
      assert.ok(!metadata.exif && !metadata.iptc && !metadata.xmp);
    }
    assert.equal(photo.delivered.modal.quality, 75);
  }
  assert.equal(review.photos.find(p => p.id === "archive-16").source, "public/archives-techniques/16_unites-centrales-arriere-plan-modifie.png");
  assert.equal(review.photos.find(p => p.id === "N10").settings, null);
});

test("V2 delivery uses the audited sources once, keeps proportions and supplies responsive copies", async () => {
  const root = new URL("../", import.meta.url);
  const review = JSON.parse(await readFile(new URL("docs/quality-review/analysis.json", root), "utf8"));
  const display = JSON.parse(await readFile(new URL("content/gkgt-display-v2.json", root), "utf8"));
  const evidence = JSON.parse(await readFile(new URL("docs/gkgt-display-v2-processing.json", root), "utf8"));
  assert.equal(Object.keys(display.photos).length, 21);
  assert.equal(evidence.length, 21);
  assert.equal(evidence.filter(photo => photo.betterJpeg).length, 5);
  for (const audited of review.photos) {
    const photo = display.photos[audited.id];
    const record = evidence.find(item => item.id === audited.id);
    assert.ok(photo && record, audited.id);
    assert.equal(record.source, audited.source);
    assert.equal(record.sourceSha256, audited.sourceSha256);
    assert.deepEqual(record.settings, audited.settings);
    assert.ok(photo.variants.length >= 4);
    assert.equal(photo.src, photo.variants.at(-1).src);
    assert.equal(photo.width, photo.variants.at(-1).width);
    for (let index = 0; index < photo.variants.length; index += 1) {
      const variant = photo.variants[index];
      const metadata = await sharp(await readFile(new URL(`public${variant.src}`, root))).metadata();
      assert.equal(metadata.width, variant.width);
      assert.equal(metadata.height, variant.height);
      assert.ok(metadata.width <= audited.sourceWidth && metadata.height <= audited.sourceHeight);
      assert.ok(Math.abs(metadata.width / metadata.height - audited.sourceWidth / audited.sourceHeight) < 0.004);
      assert.ok(!metadata.exif && !metadata.iptc && !metadata.xmp);
      if (index) assert.ok(variant.width > photo.variants[index - 1].width);
    }
  }
});
