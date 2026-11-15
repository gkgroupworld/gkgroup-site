import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const batch = JSON.parse(await readFile(new URL("../content/gkgt-authentic-batch.json", import.meta.url), "utf8"));
const included = batch.photos.filter(photo => photo.disposition === "included-local-preview");

test("15 intact originals yield nine new views, with six visual duplicates excluded", async () => {
  assert.equal(batch.photos.length, 15);
  assert.equal(included.length, 9);
  assert.equal(batch.photos.filter(photo => photo.disposition === "visual-duplicate").length, 6);
  assert.equal(new Set(batch.photos.map(photo => photo.originalSha256)).size, 15);
  assert.equal(batch.photos.find(photo => photo.id === "N11").duplicateOf, "16_unites-centrales-arriere-plan-modifie.png");
  for (const photo of batch.photos) {
    const original = await readFile(new URL(`../${photo.original}`, import.meta.url));
    assert.equal(createHash("sha256").update(original).digest("hex"), photo.originalSha256, photo.id);
  }
});

test("optimized copies are proportional, bounded, metadata-free and bilingual", async () => {
  const categories = {};
  for (const photo of included) {
    categories[photo.category] = (categories[photo.category] || 0) + 1;
    assert.ok(photo.caption.fr && photo.caption.en);
    const sourceRatio = photo.originalWidth / photo.originalHeight;
    for (const [file, limit] of [[photo.publicationFile, 1600], [photo.thumbnailFile, 640]]) {
      const bytes = await readFile(new URL(`../public${file}`, import.meta.url));
      const metadata = await sharp(bytes).metadata();
      assert.equal(metadata.format, "webp");
      assert.ok(metadata.width <= limit && metadata.height <= limit);
      assert.ok(Math.abs(metadata.width / metadata.height - sourceRatio) < 0.003);
      assert.ok(!metadata.exif && !metadata.iptc && !metadata.xmp);
    }
  }
  assert.deepEqual(categories, { interventions: 5, equipment: 3, workshop: 1 });
});

test("confirmed new batch passes Netlify builds while unconfirmed additions remain guarded", async () => {
  assert.equal(batch.generalPublicationAuthorization, "confirmed-by-owner");
  assert.ok(included.every(photo => photo.publicationStatus === "confirmed"));
  const script = fileURLToPath(new URL("../scripts/check-gkgt-publication.mjs", import.meta.url));
  const guard = await readFile(new URL("../scripts/check-gkgt-publication.mjs", import.meta.url), "utf8");
  assert.match(guard, /additions\.filter\(photo => photo\.publicationStatus !== "confirmed"\)/);
  assert.match(guard, /batch\.generalPublicationAuthorization !== "confirmed-by-owner" \|\| pendingAdditions\.length/);
  const local = spawnSync(process.execPath, [script], { env: { ...process.env, NETLIFY: "false" }, encoding: "utf8", windowsHide: true });
  assert.equal(local.status, 0);
  const cloud = spawnSync(process.execPath, [script], { env: { ...process.env, NETLIFY: "true" }, encoding: "utf8", windowsHide: true });
  assert.equal(cloud.status, 0);
  for (const photo of included) assert.ok(!cloud.stderr.includes(photo.id));
  assert.ok(!cloud.stderr.includes("Owner approved the edited-background"));
});
