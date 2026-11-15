import { readFile } from "node:fs/promises";

// Rights validation only: passing this check never authorises deployment.
// Photo 16 uses the approved publication copy; its original stays outside public.
if (process.env.NETLIFY === "true") {
  const rights = JSON.parse(await readFile(new URL("../content/gkgt-publication-rights.json", import.meta.url), "utf8"));
  const pending = rights.pendingHistoricalPhotos.filter(photo => photo.status !== "confirmed");
  if (rights.historicalGeneralAuthorization !== "confirmed-by-owner"
    || rights.modernIllustrationsAuthorization !== "confirmed-by-owner-with-illustration-label"
    || pending.length) {
    console.error("GKGT publication blocked: separate image rights require validation before any Netlify build.");
    for (const photo of pending) console.error(`- ${photo.file}: ${photo.reason}`);
    process.exitCode = 1;
  }
  const batch = JSON.parse(await readFile(new URL("../content/gkgt-authentic-batch.json", import.meta.url), "utf8"));
  const additions = batch.photos.filter(photo => photo.disposition === "included-local-preview");
  const pendingAdditions = additions.filter(photo => photo.publicationStatus !== "confirmed");
  if (batch.generalPublicationAuthorization !== "confirmed-by-owner" || pendingAdditions.length) {
    console.error("GKGT publication blocked: new authentic photographs require separate approval.");
    for (const photo of pendingAdditions) console.error(`- ${photo.id}: ${photo.confidentialityReview}`);
    process.exitCode = 1;
  }
}
