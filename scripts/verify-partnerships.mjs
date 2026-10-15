import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
const directorySource = await readFile(new URL("../content/partnership-directory.js", import.meta.url), "utf8");
const { PARTNERSHIP_DIRECTORY, PARTNERSHIP_CATEGORIES, getApprovedPartners } = await import(`data:text/javascript;base64,${Buffer.from(directorySource).toString("base64")}`);

assert.deepEqual(PARTNERSHIP_DIRECTORY, [], "No partner identity may be introduced without explicit approval");
const fixture = { id: "test", category: "education", status: "confirmed", name: "Test", summary: { fr: "Test", en: "Test" }, agreementValidated: true, publicationApproved: true };
for (const status of ["enquiry", "discussion", "confirmed"]) for (const agreementValidated of [false, true]) for (const publicationApproved of [false, true]) {
  assert.equal(getApprovedPartners([{ ...fixture, status, agreementValidated, publicationApproved }]).length, Number(status === "confirmed" && agreementValidated && publicationApproved));
}
assert.deepEqual(getApprovedPartners([{ ...fixture, category: "invalid" }]), []);
assert.deepEqual(getApprovedPartners([{ ...fixture, name: "" }]), []);
const logo = { src: "/authorised-test.png", width: 200, height: 100, publicationApproved: true };
assert.deepEqual(getApprovedPartners([{ ...fixture, logo }])[0].logo, logo);
for (const unapproved of [{ ...logo, publicationApproved: false }, { ...logo, src: "https://example.com/logo.png" }, { ...logo, src: "//example.com/logo.png" }, { ...logo, width: 0 }]) assert.equal(getApprovedPartners([{ ...fixture, logo: unapproved }])[0].logo, null);

const base = process.argv[2] || "http://localhost:3100";
for (const lang of ["fr", "en"]) {
  const response = await fetch(`${base}/partnerships?lang=${lang}`);
  assert.equal(response.status, 200);
  const html = await response.text();
  const main = html.match(/<main\b[^>]*>(.*?)<\/main>/s)?.[1] || "";
  assert.equal((main.match(/<h1\b/g) || []).length, 1);
  assert.match(html, new RegExp(`<html[^>]*lang="${lang}"`));
  assert.ok(main.includes(lang === "fr" ? "Nos partenariats internationaux" : "Our International Partnerships"));
  assert.equal((main.match(/data-partnership-value/g) || []).length, 5);
  assert.equal((main.match(/data-partnership-domain=/g) || []).length, 5);
  for (const category of PARTNERSHIP_CATEGORIES) assert.ok(main.includes(`data-partnership-domain="${category}"`));
  assert.equal((main.match(/data-approved-partner/g) || []).length, 0);
  assert.equal((main.match(/<img\b/g) || []).length, 1, "Only GK GROUP official banner logo is displayed");
  assert.ok(!/partenaire officiel|official partner/i.test(main));
  for (const text of lang === "fr" ? ["une inscription sur une plateforme", "autorisation appropriée", "validation explicite", "sans personnalité juridique propre", "Développons ensemble des partenariats durables."] : ["platform registration", "appropriate permission", "explicit approval", "without legal personality of its own", "Let’s build lasting partnerships together."]) assert.ok(main.includes(text), text);
  const ids = [...main.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
  assert.equal(new Set(ids).size, ids.length);
  for (const [, target] of main.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.includes(target));
  const form = main.match(/<form\b[^>]*id="partnership-form".*?<\/form>/s)?.[0];
  assert.ok(form);
  assert.match(form, /method="POST"/);
  assert.match(form, /action="\/__forms.html"/);
  assert.match(form, new RegExp(`name="locale" value="${lang}"`));
  assert.match(form, /<input(?=[^>]*name="consent")(?=[^>]*required)[^>]*>/);
  for (const path of ["/gk-global-mobility", "/gk-global-technology", "/gk-esttrade", "/gk-nexus", "/entities", "/activities", "/contact"]) {
    assert.ok(main.includes(`href="${path}?lang=${lang}"`));
    assert.equal((await fetch(`${base}${path}?lang=${lang}`)).status, 200);
  }
}
console.log("PASS partnerships FR/EN: five values, five domains, no published external partner identities, explicit approval/confirmed-agreement gate, independent logo permission, cautious institutional wording, preserved form and seven bilingual destinations.");
