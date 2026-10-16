import { build } from "esbuild";
import { fileURLToPath } from "node:url";

await build({
  absWorkingDir: fileURLToPath(new URL("..", import.meta.url)),
  entryPoints: ["functions/gkgm-ingest.mjs", "functions/gkgm-notifications.mjs", "functions/gkgm-purge.mjs"],
  bundle: true, platform: "node", target: "node22", format: "esm", packages: "external",
  outdir: "build", write: false, logLevel: "error",
});
console.log("PASS collector: all three isolated functions bundle; no deployment or output written.");
