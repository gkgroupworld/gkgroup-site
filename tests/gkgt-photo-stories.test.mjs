import test from "node:test";
import assert from "node:assert/strict";
import { GKGT_PHOTO_STORIES } from "../content/gkgt-photo-stories.js";

test("editorial sequences use all 21 approved-selection views exactly once", () => {
  const ids = GKGT_PHOTO_STORIES.flatMap(story => story.photos);
  const expected = ["N03", "N04", "N05", "N06", "N08", "N09", "N10", "N13", "N15", ...["01", "02", "06", "11", "12", "14", "16", "18", "20", "21", "23", "24"].map(id => `archive-${id}`)];
  assert.equal(ids.length, 21);
  assert.equal(new Set(ids).size, 21);
  assert.deepEqual([...ids].sort(), [...expected].sort());
  assert.equal(new Set(GKGT_PHOTO_STORIES.map(story => story.anchor)).size, 5);
  for (const story of GKGT_PHOTO_STORIES) {
    for (const key of ["eyebrow", "title", "body"]) for (const lang of ["fr", "en"]) assert.ok(story[key][lang]);
  }
  const timeline = GKGT_PHOTO_STORIES.find(story => story.layout === "timeline");
  assert.equal(timeline.steps.length, timeline.photos.length);
  assert.ok(timeline.body.fr.includes("sans dates"));
  assert.ok(timeline.body.en.includes("undated"));
});
