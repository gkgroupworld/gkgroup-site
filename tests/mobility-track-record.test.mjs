import test from "node:test";
import assert from "node:assert/strict";
import { MOBILITY_TRACK_RECORD as data, MOBILITY_TRACK_RECORD_COPY as copy } from "../content/mobility-track-record.js";

test("GKGM historical mobility results and achievements are accurate", () => {
  assert.deepEqual(data.historicalHighlights.map(r => [r.id, r.quantity.fr, r.quantity.en]), [
    ["canada", "Plus de 50", "More than 50"],
    ["albania", "Environ 10", "Approximately 10"],
  ]);

  assert.ok(data.historicalHighlights.every(r => !r.period && !r.since));
  assert.ok(data.historicalHighlights[0].note.fr.includes("pas comptabilisés"));

  assert.deepEqual(data.historicalVisitDestinations.map(r => [r.id, r.quantity.fr, r.quantity.en]), [
    ["china", "Plusieurs dizaines", "Several dozen"],
    ["singapore", "Plus de 15", "More than 15"],
    ["malaysia", "10", "10"],
    ["ecuador", "12", "12"],
    ["barbados", "7", "7"],
  ]);
  assert.ok(data.historicalVisitDestinations.every(r => !("count" in r) && !("period" in r)));

  assert.equal(data.studentSupport.count, 13);
  assert.ok(data.studentSupport.label.fr.includes("Campus France"));

  assert.deepEqual(data.companyFormations.map(r => [r.id, r.count]), [
    ["lithuania", 2],
    ["albania", 2],
  ]);

  assert.equal(data.eResidency.count, 1);
  assert.ok(data.eResidency.label.fr.includes("e-résidence estonienne"));

  assert.deepEqual(data.visas.map(r => r.count), [3, 2, 1]);
  assert.equal(data.workPermits.count, 8);
  assert.equal(data.workPermits.period, "2025–2026");

  assert.deepEqual(data.partners, [
    "Dalimit Global",
    "ApplyBoard",
    "Elec Work Agency",
    "Live & Study in Europe",
  ]);

  assert.equal(copy.fr.title, "Nos réalisations en mobilité internationale");
  assert.equal(copy.en.title, "Our International Mobility Track Record");
  assert.ok(copy.fr.intro.includes("déclarés par GKGM"));
  assert.ok(copy.en.intro.includes("reported by GKGM"));
});