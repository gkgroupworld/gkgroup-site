import { readFile, mkdir, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import sharp from "sharp";

const root = new URL("../", import.meta.url);
const batch = JSON.parse(await readFile(new URL("content/gkgt-authentic-batch.json", root), "utf8"));
const data = await readFile(new URL("content/gkgt-gallery.js", root), "utf8");
const historical = JSON.parse(data.match(/export const HISTORICAL_PHOTOS = (\[[\s\S]*?\n\]);/)[1]);
const photos = [
  ...historical.map(photo => ({ id: photo.id, source: `public${photo.src}` })),
  ...batch.photos.filter(photo => photo.disposition === "included-local-preview").map(photo => ({ id: photo.id, source: photo.original })),
];
const settings = { sigma: 0.55, m1: 0.45, m2: 1.1, x1: 2, y2: 5, y3: 8 };
await mkdir(new URL("public/gkgt-sharpness-v1/", root), { recursive: true });
const manifest = { method: "Non-generative mild technical sharpening; no reconstruction, denoising, crop or creative retouching", settings, photos: {} };
for (const photo of photos) {
  const bytes = await readFile(new URL(photo.source, root));
  const src = `/gkgt-sharpness-v1/${photo.id.toLowerCase()}.webp`;
  const thumbnail = `/gkgt-sharpness-v1/${photo.id.toLowerCase()}-thumb.webp`;
  const full = await sharp(bytes).rotate().resize({ width: 2048, height: 2048, fit: "inside", withoutEnlargement: true }).sharpen(settings).webp({ quality: 88, effort: 6 }).toBuffer();
  const thumb = await sharp(bytes).rotate().resize({ width: 960, height: 960, fit: "inside", withoutEnlargement: true }).sharpen(settings).webp({ quality: 84, effort: 6 }).toBuffer();
  await writeFile(new URL(`public${src}`, root), full);
  await writeFile(new URL(`public${thumbnail}`, root), thumb);
  const meta = await sharp(full).metadata();
  manifest.photos[photo.id] = { src, thumbnail, width: meta.width, height: meta.height, fullBytes: full.length, thumbnailBytes: thumb.length, source: photo.source, sourceSha256: createHash("sha256").update(bytes).digest("hex") };
}
await writeFile(new URL("content/gkgt-sharpness.json", root), JSON.stringify(manifest, null, 2) + "\n");
console.log(`Prepared ${photos.length} versioned full-size copies and thumbnails; no source overwritten.`);
