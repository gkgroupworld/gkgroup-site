import { readFile } from "node:fs/promises";

// Local builds retain all 12 original photographs for review. Netlify builds
// must not expose files from public while the separately recorded rights are pending.
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
}
