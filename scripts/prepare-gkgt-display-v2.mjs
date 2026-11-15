import { readFile, writeFile, mkdir } from "node:fs/promises";
import { createHash } from "node:crypto";
import sharp from "sharp";

const review = JSON.parse(await readFile("docs/quality-review/analysis.json", "utf8"));
await mkdir("public/gkgt-quality-v2", { recursive: true });
const manifest = { method: "Single WebP encoding from the audited best source, no AI, no crop, no upscaling", photos: {} };
const evidence = [];
for (const photo of review.photos) {
  const bytes = await readFile(photo.source);
  if (createHash("sha256").update(bytes).digest("hex") !== photo.sourceSha256) throw new Error(`Source changed: ${photo.id}`);
  const quality = ["limitée", "très limitée"].includes(photo.assessment) ? 92 : 90;
  const widths = [...new Set([320, 480, 640, 960, 1280, 1600].filter(w => w < photo.sourceWidth).concat(photo.sourceWidth))];
  const variants = [];
  for (const width of widths) {
    let image = sharp(bytes).rotate().resize({ width, withoutEnlargement: true });
    if (photo.settings) image = image.sharpen(photo.settings);
    const { data, info } = await image.webp({ quality, effort: 6 }).toBuffer({ resolveWithObject: true });
    const src = `/gkgt-quality-v2/${photo.id.toLowerCase()}-w${info.width}.webp`;
    await writeFile(`public${src}`, data);
    variants.push({ src, width: info.width, height: info.height, bytes: data.length, sha256: createHash("sha256").update(data).digest("hex") });
  }
  const full = variants.at(-1);
  manifest.photos[photo.id] = { src: full.src, thumbnail: (variants.find(v => v.width >= 640) || full).src, width: full.width, height: full.height, variants };
  evidence.push({ id: photo.id, source: photo.source, sourceSha256: photo.sourceSha256, betterJpeg: photo.betterJpegAvailable, settings: photo.settings, quality, widths: variants.map(v => v.width), fullBytes: full.bytes, allVariantsBytes: variants.reduce((sum, v) => sum + v.bytes, 0) });
}
await writeFile("content/gkgt-display-v2.json", JSON.stringify(manifest, null, 2) + "\n");
await writeFile("docs/gkgt-display-v2-processing.json", JSON.stringify(evidence, null, 2) + "\n");
console.log(JSON.stringify({ photos: evidence.length, variants: Object.values(manifest.photos).reduce((n,p) => n+p.variants.length,0), fullBytes: evidence.reduce((n,p) => n+p.fullBytes,0), allVariantsBytes: evidence.reduce((n,p) => n+p.allVariantsBytes,0) }));
