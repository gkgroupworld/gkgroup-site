import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";

const approved = JSON.parse(await readFile(new URL("./approved-assets.json", import.meta.url), "utf8"));
test("approved logos, historical images, original 16 and illustrations remain byte-identical", async () => {
  for (const [file, expected] of Object.entries(approved)) {
    const bytes = await readFile(new URL(`../${file}`, import.meta.url));
    assert.equal(createHash("sha256").update(bytes).digest("hex"), expected, file);
  }
});
