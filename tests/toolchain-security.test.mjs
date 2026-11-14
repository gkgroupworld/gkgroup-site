import test from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const parserRequire = createRequire(require.resolve("@typescript-eslint/typescript-estree"));
const { minimatch } = parserRequire("minimatch");

test("patched parser glob matcher preserves default-project matching", () => {
  // Same public API/options used by typescript-estree's allowDefaultProject.
  for (const [file, pattern, expected] of [
    ["eslint.config.mjs", "*.mjs", true],
    [".config.ts", "*.ts", true],
    ["scripts/check.ts", "scripts/*.ts", true],
    ["scripts/nested/check.ts", "scripts/*.ts", false],
    ["src/main.tsx", "src/*.ts", false],
    ["src/main.tsx", "src/*.{ts,tsx}", true],
  ]) assert.equal(minimatch(file, pattern, { dot: true }), expected, `${file}: ${pattern}`);
});
