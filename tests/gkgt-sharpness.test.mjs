import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import sharp from "sharp";

test("21 technical sharpness variants retain source hashes, proportions and private metadata exclusion", async () => {
  const manifest = JSON.parse(await readFile(new URL("../content/gkgt-sharpness.json", import.meta.url), "utf8"));
  assert.equal(Object.keys(manifest.photos).length, 21);
  assert.equal(manifest.photos["archive-16"].source, "public/archives-techniques/16_unites-centrales-arriere-plan-modifie.png");
  for (const photo of Object.values(manifest.photos)) {
    const bytes = await readFile(new URL(`../${photo.source}`, import.meta.url));
    assert.equal(createHash("sha256").update(bytes).digest("hex"), photo.sourceSha256);
    const original = await sharp(bytes).metadata();
    for (const [file, limit] of [[photo.src, 2048], [photo.thumbnail, 960]]) {
      const meta = await sharp(await readFile(new URL(`../public${file}`, import.meta.url))).metadata();
      assert.ok(meta.width <= limit && meta.height <= limit);
      assert.ok(Math.abs(meta.width / meta.height - original.width / original.height) < 0.004);
      assert.ok(!meta.exif && !meta.iptc && !meta.xmp);
    }
  }
});
