import { readFile, mkdir, writeFile, stat } from "node:fs/promises";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const batch = JSON.parse(await readFile(new URL("../content/gkgt-authentic-batch.json", import.meta.url), "utf8"));
const output = new URL("../public/gkgt-activities/", import.meta.url);
await mkdir(output, { recursive: true });
const results = [];
for (const photo of batch.photos) {
  const original = new URL(`../${photo.original}`, import.meta.url);
  const bytes = await readFile(original);
  if (createHash("sha256").update(bytes).digest("hex") !== photo.originalSha256) throw new Error(`Original changed: ${photo.id}`);
  if (photo.disposition !== "included-local-preview") continue;
  const full = fileURLToPath(new URL(`../public${photo.publicationFile}`, import.meta.url));
  const thumbnail = fileURLToPath(new URL(`../public${photo.thumbnailFile}`, import.meta.url));
  // Orientation, proportional resizing and encoding only. No crop, retouching,
  // colour grading or generated content. Sharp strips metadata by default.
  await sharp(bytes).rotate().resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true }).webp({ quality: 82, effort: 6 }).toFile(full);
  await sharp(bytes).rotate().resize({ width: 640, height: 640, fit: "inside", withoutEnlargement: true }).webp({ quality: 78, effort: 6 }).toFile(thumbnail);
  const metadata = await sharp(full).metadata();
  if (metadata.exif || metadata.iptc || metadata.xmp) throw new Error(`Unexpected private metadata: ${photo.id}`);
  results.push({ id: photo.id, originalBytes: bytes.length, fullBytes: (await stat(full)).size, thumbnailBytes: (await stat(thumbnail)).size, width: metadata.width, height: metadata.height });
}
await writeFile(new URL("../docs/gkgt-authentic-optimisation.json", import.meta.url), JSON.stringify(results, null, 2) + "\n");
console.log(`Prepared ${results.length} proportional WebP copies and thumbnails; 15 original hashes verified.`);
