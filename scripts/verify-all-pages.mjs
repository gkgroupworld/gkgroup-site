import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const base = process.argv[2] || "http://127.0.0.1:3116";
for (const check of ["home", "architecture", "entities", "institutional-pages", "partnerships", "news", "seo", "heroes", "galleries"]) {
  const result = spawnSync(process.execPath, [fileURLToPath(new URL(`./verify-${check}.mjs`, import.meta.url)), base], { stdio: "inherit", windowsHide: true });
  if (result.status !== 0) process.exit(result.status || 1);
}
