import { readFile, writeFile, mkdir } from "node:fs/promises";
import { createHash } from "node:crypto";
import sharp from "sharp";

const base = "http://127.0.0.1:3000";
const out = "docs/quality-review";
const active = JSON.parse(await readFile("content/gkgt-sharpness.json", "utf8"));
const batch = JSON.parse(await readFile("content/gkgt-authentic-batch.json", "utf8"));
const measurements = JSON.parse(await readFile(`${out}/browser-measurements.json`, "utf8"));
const approved = JSON.parse(await readFile("tests/approved-assets.json", "utf8"));
const hash = bytes => createHash("sha256").update(bytes).digest("hex");
const protectedFiles = new Set([
  ...Object.keys(approved), ...batch.photos.map(p => p.original),
  ...Object.values(active.photos).flatMap(p => [p.source, `public${p.src}`, `public${p.thumbnail}`]),
  "content/gkgt-gallery.js", "content/gkgt-sharpness.json", "content/gkgt-authentic-batch.json",
  "content/gkgt-publication-rights.json", "content/gkgt-photo-stories.js", "next.config.mjs",
  "components/pages/GkgtPhotoGallery.js", "components/pages/GkgtPhotoGallery.module.css",
]);
const preserved = {};
for (const file of protectedFiles) preserved[file] = hash(await readFile(file));
const alternatives = Object.fromEntries(batch.photos.filter(p => p.disposition === "visual-duplicate" && p.id !== "N11").map(p => [`archive-${p.duplicateOf.slice(0, 2)}`, p.original]));

// Manual content-aware assessments, not rankings from a noise-sensitive edge metric.
// sigma=0 means no sharpening: fidelity and avoiding halos take precedence.
const profiles = {
  "archive-01": [0.4, "modérée", "JPEG plus défini disponible ; détail des étagères déjà doux dans la source.", "Gain surtout de source et de transport ; pas de promesse de détails nouveaux."],
  "archive-02": [0.4, "modérée", "JPEG plus défini ; faible lumière et petits objets éloignés.", "Gain limité à modéré avec le JPEG et une seule conversion."],
  "archive-06": [0.5, "correcte", "JPEG original plus défini ; matériel lisible, petits marquages éloignés.", "Préserver la définition sans forcer les micro-contours."],
  "archive-11": [0, "limitée", "Source WebP de 1080 × 809 px et 54 Ko, détails et arrière-plan déjà comprimés ou doux.", "Pas d’amélioration fidèle importante ; ne pas recréer les inscriptions."],
  "archive-12": [0.4, "correcte", "Composants plus lisibles au centre ; profondeur de champ variable.", "Gain de transport ; pas de correction du flou hors plan de mise au point."],
  "archive-14": [0, "limitée", "1080 × 710 px ; bruit et contours déjà marqués sur une scène sombre.", "Pas de récupération significative garantie ; conserver un affichage contenu."],
  "archive-16": [0, "correcte", "Copie PNG approuvée, 1086 × 1448 px ; version à fond modifié à préserver.", "Éviter les conversions successives ; aucune nouvelle reconstruction du fond."],
  "archive-18": [0.4, "modérée", "JPEG de 1536 × 2048 px disponible ; étiquettes petites et rendu doux.", "Gain de résolution et moins de réencodages, sans inventer les étiquettes."],
  "archive-20": [0.4, "modérée", "Plan de travail et clavier : netteté non uniforme déjà présente à la source.", "Amélioration locale modeste ; les zones hors foyer restent hors foyer."],
  "archive-21": [0.4, "modérée", "JPEG plus défini ; scène de matériel légèrement douce à la source.", "Le fichier source plus grand évite une perte évitable."],
  "archive-23": [0, "limitée", "Faible lumière et grain visibles dans la source historique ; douceur sur les détails.", "Le gain fidèle reste faible ; accentuer davantage renforcerait le bruit."],
  "archive-24": [0.4, "modérée", "Personne et composants, définition inégale selon les zones.", "Préserver la fidélité ; pas de restauration du visage ou des petits composants."],
  N03: [0, "limitée", "Photo intérieure bruitée ; écran surexposé et détails doux déjà dans le JPG de 2048 × 1152 px.", "Gain modeste de compression seulement ; les zones écrêtées ne sont pas récupérables ici."],
  N04: [0.45, "correcte", "Scène extérieure assez définie ; petits détails de l’unité éloignés.", "Accentuation très légère, pas de reconstruction de pièces."],
  N05: [0.45, "correcte", "Bonne lumière, certaines zones ou gestes restent moins définis.", "Accentuation légère seulement."],
  N06: [0.35, "modérée", "Contraste fort et détails des personnes/écrans de taille réduite.", "Éviter les halos sur les contours lumineux."],
  N08: [0.4, "correcte", "Source de 1153 × 2048 px ; détails limités par la distance du sujet.", "Préserver la définition et limiter l’agrandissement des détails."],
  N09: [0.35, "correcte", "Équipements assez lisibles, tableau et documents hors du plan principal.", "Ne pas reconstruire le texte ou les détails des écrans."],
  N10: [0, "très limitée", "Seulement 720 × 720 px et 55 Ko ; flou et compression déjà présents dans le JPG.", "Aucune amélioration fidèle importante sans meilleure source ; éviter une grande vue sur écran dense."],
  N13: [0.35, "modérée", "JPG de 1536 × 2048 px, faible microcontraste et douceur initiale.", "Gain modeste de transport ; aucune modification du visage."],
  N15: [0.4, "modérée", "JPG de 2048 × 1536 px, netteté douce sur les équipements et l’emballage.", "Réduction de compression secondaire ; pas de reconstruction des textes ou reflets."],
};

await mkdir(`${out}/assets`, { recursive: true });
const photos = [];
for (const [id, current] of Object.entries(active.photos)) {
  const source = alternatives[id] || current.source;
  const bytes = await readFile(source);
  const meta = await sharp(bytes).metadata();
  const [sigma, assessment, cause, limitation] = profiles[id];
  const settings = sigma ? { sigma, m1: 0.1, m2: 0.6, x1: 2, y2: 3, y3: 5 } : null;
  // Reference decoded once to lossless RGB; no private metadata copied.
  const reference = await sharp(bytes).rotate().webp({ lossless: true, effort: 6 }).toBuffer();
  await writeFile(`${out}/assets/${id}-source.webp`, reference);
  let processing = sharp(bytes).rotate();
  if (settings) processing = processing.sharpen(settings);
  const candidate = await processing.webp({ lossless: true, effort: 6 }).toBuffer();
  await writeFile(`${out}/assets/${id}-candidate.webp`, candidate);
  let balanced = sharp(bytes).rotate();
  if (settings) balanced = balanced.sharpen(settings);
  const balancedBytes = await balanced.webp({ quality: 94, effort: 6 }).toBuffer();
  await writeFile(`${out}/assets/${id}-q94.webp`, balancedBytes);
  const m = measurements.rows.find(row => row.id === id);
  const delivered = {};
  for (const kind of ["page", "modal"]) {
    const chosen = kind === "page" && m.page.thumbnail ? current.thumbnail : current.src;
    const url = `${base}/_next/image?url=${encodeURIComponent(chosen)}&w=${m[kind].requestedWidth}&q=75`;
    const response = await fetch(url, { headers: { Accept: "image/webp" } });
    if (!response.ok) throw new Error(`${id}/${kind}: ${response.status}`);
    const resource = Buffer.from(await response.arrayBuffer());
    await writeFile(`${out}/assets/${id}-current-${kind}.webp`, resource);
    const decoded = await sharp(resource).metadata();
    const width = m[kind].paintedWidth;
    delivered[kind] = { url, width: decoded.width, height: decoded.height, bytes: resource.length, contentType: response.headers.get("content-type"), displayedWidth: width, dpr1Coverage: +(decoded.width / width).toFixed(2), dpr2Coverage: +(decoded.width / (width * 2)).toFixed(2), quality: 75 };
  }
  const cm = await sharp(`public${current.src}`).metadata();
  photos.push({ id, source, sourceSha256: hash(bytes), sourceWidth: meta.width, sourceHeight: meta.height, sourceBytes: bytes.length, sourceFormat: meta.format, betterJpegAvailable: !!alternatives[id], originalSourceOfV1: current.source, activeFile: `public${current.src}`, activeDimensions: [cm.width, cm.height], assessment, cause, limitation, settings, referenceFile: `assets/${id}-source.webp`, currentFile: `assets/${id}-current-modal.webp`, candidateFile: `assets/${id}-candidate.webp`, balancedFile: `assets/${id}-q94.webp`, referenceBytes: reference.length, candidateBytes: candidate.length, balancedBytes: balancedBytes.length, delivered });
}
const unsupportedQualityResponse = await fetch(`${base}/_next/image?url=${encodeURIComponent(active.photos.N10.src)}&w=750&q=90`);
const result = { date: "2026-11-14", scope: "Local audit only; no selected image, config, rights or source modified", nativeDprMeasured: 1, retinaCoverage: "Calculated DPR 2, not a physical Retina test", optimizerQ90Status: unsupportedQualityResponse.status, protectedHashes: preserved, photos };
for (const [file, expected] of Object.entries(preserved)) if (hash(await readFile(file)) !== expected) throw new Error(`Protected file changed: ${file}`);
await writeFile(`${out}/analysis.json`, JSON.stringify(result, null, 2) + "\n");
console.log(JSON.stringify({ analysed: photos.length, betterSources: photos.filter(p => p.betterJpegAvailable).map(p => p.id), noAdditionalSharpening: photos.filter(p => !p.settings).map(p => p.id), optimizerQ90Status: result.optimizerQ90Status, activeFilesUnchanged: Object.keys(preserved).length, candidateBytes: photos.reduce((s,p) => s+p.candidateBytes,0), balancedBytes: photos.reduce((s,p) => s+p.balancedBytes,0) }));
