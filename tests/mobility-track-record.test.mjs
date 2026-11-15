import test from "node:test";
import assert from "node:assert/strict";
import { MOBILITY_TRACK_RECORD as data, MOBILITY_TRACK_RECORD_COPY as copy } from "../content/mobility-track-record.js";

test("historical additions retain qualifiers without dates, totals or fabricated visit counts", () => {
  assert.deepEqual(data.historicalHighlights.map(r => [r.id, r.quantity.qualifier, r.quantity.value]), [["canada", "more-than", 50], ["albania", "approximately", 10]]);
  assert.ok(data.historicalHighlights.every(r => !r.period && !r.since));
  assert.ok(data.historicalHighlights[0].label.fr.includes("Visas d’entrée pour études"));
  assert.ok(data.historicalHighlights[0].note.fr.includes("pas comptabilisés"));
  assert.deepEqual(data.historicalVisitDestinations.map(r => r.id), ["ecuador", "singapore", "malaysia", "china"]);
  assert.ok(data.historicalVisitDestinations.every(r => !("count" in r) && !("period" in r)));
  const ids = [...data.historicalHighlights, ...data.historicalVisitDestinations, ...data.visas, { id: "poland" }].map(r => r.id);
  assert.equal(ids.length, 10);
  assert.equal(new Set(ids).size, 10);
  assert.deepEqual(data.visas.map(r => r.count), [3, 2, 1]);
  assert.equal(data.workPermits.count, 8);
  assert.deepEqual(data.partners, ["Dalimit Global", "ApplyBoard", "Elec Work Agency", "Live & Study in Europe"]);
  assert.equal(copy.fr.title, "Nos réalisations en mobilité internationale");
  assert.equal(copy.en.title, "Our International Mobility Track Record");
  assert.ok(copy.fr.intro.includes("déclarés par GKGM"));
  assert.ok(copy.en.intro.includes("reported by GKGM"));
});
