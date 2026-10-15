import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";

// Load the real pure data/model modules without changing package.json's module mode.
const dataSource = await readFile(new URL("../content/site.js", import.meta.url), "utf8");
const dataUrl = `data:text/javascript;base64,${Buffer.from(dataSource).toString("base64")}`;
const modelSource = (await readFile(new URL("../lib/news.js", import.meta.url), "utf8")).replace('"../content/site"', JSON.stringify(dataUrl));
const model = await import(`data:text/javascript;base64,${Buffer.from(modelSource).toString("base64")}`);
const { NEWS_CATEGORIES, NEWS_ITEMS } = await import(dataUrl);
const { getPublishedNews, filterNewsByCategory, getPublishedArticle, getOpportunityStatus, getEventStatus, getNewsSitemapPaths, getNewsImage, parseNewsDate, getArticleStructuredData, formatNewsDate } = model;
assert.deepEqual(NEWS_ITEMS.map(item => item.id), ["gk-nexus-international-coordination", "gkgm-international-mobility", "gkgroup-international-ecosystem"], "Only prepared editorial content may be introduced");
assert.deepEqual(getPublishedNews().map(item => item.id), ["gkgm-international-mobility", "gkgroup-international-ecosystem", "gk-nexus-international-coordination"]);
assert.equal(createHash("sha256").update(JSON.stringify(NEWS_ITEMS.find(item => item.id === "gkgroup-international-ecosystem"))).digest("hex"), "fbe30c2a848fe575ab675fc6df04325724bb538590be5f1104d2c0b7a7642ea5", "First approved article remains identical");
const gkgm = NEWS_ITEMS.find(item => item.id === "gkgm-international-mobility");
assert.equal(gkgm.status, "published");
assert.equal(gkgm.publicationApproved, true);
assert.equal(gkgm.date, "2026-10-15");
assert.equal(gkgm.relatedEntity.href, "/gk-global-mobility");
const { status: _status, publicationApproved: _approval, date: _date, ...approvedGkgm } = gkgm;
assert.equal(createHash("sha256").update(JSON.stringify(approvedGkgm)).digest("hex"), "0e1724400b1373f43e514aa6f61916c3496abf7cd18b4338fd1ab43920811239", "Validated GKGM content and link remain identical");
assert.equal(NEWS_CATEGORIES.length, 4);
const nexus = NEWS_ITEMS.find(item => item.id === "gk-nexus-international-coordination");
assert.equal(nexus.status, "published");
assert.equal(nexus.publicationApproved, true);
assert.equal(nexus.date, "2026-10-15");
assert.equal(nexus.relatedEntity.href, "/gk-nexus");
const { status: _nexusStatus, publicationApproved: _nexusApproval, date: _nexusDate, ...approvedNexus } = nexus;
assert.equal(createHash("sha256").update(JSON.stringify(approvedNexus)).digest("hex"), "f3be931ea377dcb0d94a72b407246f3d382e33f845e4192a72fb897b6c5a9194", "Validated Nexus content and link unchanged");
const now = Date.parse("2030-06-15T12:00:00Z");
const content = { fr: { title: "Test FR", summary: "Résumé test", body: ["Paragraphe test."] }, en: { title: "Test EN", summary: "Test summary", body: "Test paragraph." } };
const article = { id: "test", slug: "test", category: "group", status: "published", publicationApproved: true, date: "2030-06-01", content };
const opportunity = { ...article, category: "opportunities", opportunity: { region: { fr: "Test", en: "Test" }, type: { fr: "Test", en: "Test" }, organisation: "Test", eligibility: { fr: "Test", en: "Test" }, officialUrl: "https://example.com/", verifiedAt: "2030-06-14T12:00:00Z", verificationValidUntil: "2030-06-16T12:00:00Z", availabilityVerified: true, deadline: "2030-06-15", status: "open" } };
const event = { ...article, category: "events", event: { name: { fr: "Test", en: "Test" }, country: { fr: "Test", en: "Test" }, city: "Test", organiser: "Test", officialUrl: "https://example.com/", verifiedAt: "2030-06-14", startsAt: "2030-06-16", endsAt: "2030-06-17", status: "scheduled" } };
for (const status of ["draft", "published", "archived", "unknown"]) for (const publicationApproved of [true, false]) {
  const item = { ...article, status, publicationApproved };
  const visible = publicationApproved && ["published", "archived"].includes(status);
  assert.equal(getPublishedNews([item], now).length, Number(visible));
  assert.equal(Boolean(getPublishedArticle("test", [item], now)), visible);
  assert.equal(getNewsSitemapPaths([item], now).length, Number(visible));
}
for (const patch of [{ date: "2031-01-01" }, { date: "2030-02-30" }, { slug: "../test" }, { category: "invalid" }, { content: { fr: content.fr } }, { source: { name: "Test", url: "javascript:alert(1)" } }]) assert.deepEqual(getPublishedNews([{ ...article, ...patch }], now), []);
assert.deepEqual(getPublishedNews([article, { ...article, status: "draft" }], now), []);
assert.deepEqual(getPublishedNews([article, { ...article, id: "other", slug: "other", date: "2030-06-02" }], now).map(item => item.slug), ["other", "test"]);
for (const category of NEWS_CATEGORIES) {
  const sample = category.id === "opportunities" ? opportunity : category.id === "events" ? event : { ...article, category: category.id };
  const items = getPublishedNews([sample], now);
  assert.equal(items.length, 1);
  assert.equal(filterNewsByCategory(items, category.id).length, 1);
  assert.equal(filterNewsByCategory(items, "all").length, 1);
  assert.equal(filterNewsByCategory(items, "bad-category").length, 1);
  assert.equal(filterNewsByCategory(items, NEWS_CATEGORIES.find(other => other.id !== category.id).id).length, 0);
}
assert.equal(getOpportunityStatus(opportunity, now), "open");
assert.equal(getOpportunityStatus(opportunity, Date.parse("2030-06-15T23:59:59.999Z")), "open");
assert.equal(getOpportunityStatus(opportunity, Date.parse("2030-06-16T00:00:00Z")), "expired");
assert.equal(getOpportunityStatus({ ...opportunity, status: "archived" }, now), "archived");
assert.equal(getOpportunityStatus({ ...opportunity, status: "archived" }, Date.parse("2030-06-16T00:00:00Z")), "expired");
for (const patch of [{ availabilityVerified: false }, { verificationValidUntil: null }, { verifiedAt: "2031-01-01" }, { verificationValidUntil: "2030-06-14" }, { officialUrl: "http://example.com" }]) assert.equal(getOpportunityStatus({ ...opportunity, opportunity: { ...opportunity.opportunity, ...patch } }, now), "unverified");
assert.equal(getPublishedNews([opportunity], Date.parse("2030-06-20T00:00:00Z")).length, 1, "Expired opportunities remain available");
assert.deepEqual(getPublishedNews([{ ...opportunity, opportunity: { ...opportunity.opportunity, officialUrl: "invalid" } }], now), []);
assert.equal(getEventStatus(event, now), "scheduled");
assert.equal(getEventStatus(event, Date.parse("2030-06-18T00:00:00Z")), "past");
assert.equal(getEventStatus({ ...event, event: { ...event.event, startsAt: "2030-06-16T01:00:00+14:00", endsAt: null } }, Date.parse("2030-06-16T00:00:00Z")), "past");
for (const status of ["cancelled", "postponed", "archived"]) assert.equal(getEventStatus({ ...event, event: { ...event.event, status } }, now), status);
assert.equal(getNewsImage({ ...article, image: { src: "/test.png", width: 1200, height: 675, alt: { fr: "Test", en: "Test" }, publicationApproved: false } }), null);
assert.ok(Number.isNaN(parseNewsDate("2030-02-30")));
assert.ok(Number.isNaN(parseNewsDate("2030-02-30T10:00:00Z")));
assert.notEqual(formatNewsDate(article.date, "fr"), formatNewsDate(article.date, "en"));
assert.match(formatNewsDate("2030-06-15T10:30:00+02:00", "en"), /08:30 UTC$/);
for (const lang of ["fr", "en"]) {
  const json = getArticleStructuredData(article, lang, `https://gkgroup.app/news/test${lang === "en" ? "?lang=en" : ""}`);
  assert.equal(json.headline, content[lang].title);
  assert.equal(json.inLanguage, lang);
  assert.equal(json["@type"], "NewsArticle");
  assert.equal(getArticleStructuredData(opportunity, lang, "https://gkgroup.app/news/test")["@type"], "Article");
}

const base = process.argv[2] || "http://localhost:3100";
const sitemap = await (await fetch(base + "/sitemap.xml")).text();
assert.ok(!sitemap.includes("/news/test"));
assert.ok(!sitemap.includes("/preview/"), "Preview routes excluded from sitemap");
for (const lang of ["fr", "en"]) {
  for (const category of ["all", ...NEWS_CATEGORIES.map(item => item.id), "invalid"]) {
    const response = await fetch(`${base}/news?lang=${lang}&category=${category}`);
    assert.equal(response.status, 200);
    const html = await response.text();
    const main = html.match(/<main\b[^>]*>(.*?)<\/main>/s)?.[1] || "";
    assert.match(html, new RegExp(`<html[^>]*lang="${lang}"`));
    assert.equal((main.match(/<h1\b/g) || []).length, 1);
    const expected = filterNewsByCategory(getPublishedNews(), category);
    assert.equal(main.includes("data-news-empty"), expected.length === 0);
    assert.equal((main.match(/data-news-card/g) || []).length, expected.length);
    for (const item of expected) assert.ok(main.includes(`/news/${item.slug}?lang=${lang}`));
    assert.equal((main.match(/aria-current="page"/g) || []).length, 1);
    const selected = model.normalizeNewsCategory(category);
    const active = main.match(/<a\b[^>]*aria-current="page"[^>]*>/)?.[0];
    assert.ok(active?.includes('style="color:#ffffff"'), "Readable active filter");
    assert.ok(active?.includes(selected === "all" ? `/news?lang=${lang}#publications` : `category=${selected}#publications`));
    for (const item of NEWS_CATEGORIES) assert.ok(main.includes(item.label[lang]));
    assert.ok(html.includes(`rel="canonical" href="https://gkgroup.app/news${lang === "en" ? "?lang=en" : ""}"`));
  }
  for (const item of getPublishedNews()) {
    const path = `/news/${item.slug}`;
    const response = await fetch(`${base}${path}?lang=${lang}`);
    assert.equal(response.status, 200);
    const html = await response.text();
    const schema = JSON.parse(html.match(/<script[^>]*id="news-article-structured-data"[^>]*>(.*?)<\/script>/s)[1]);
    assert.equal(schema.headline, item.content[lang].title);
    assert.equal(schema.inLanguage, lang);
    assert.equal(schema.datePublished, item.date);
    assert.equal(schema["@type"], "NewsArticle");
    assert.ok(sitemap.includes(`https://gkgroup.app${path}${lang === "en" ? "?lang=en" : ""}</loc>`));
    assert.ok(html.includes(item.content[lang].title.replaceAll("'", "&#x27;")));
    assert.ok(html.includes(`<title>${item.content[lang].title.replaceAll("'", "&#x27;")} | GK GROUP</title>`));
    assert.ok(html.includes(`name="description" content="${item.content[lang].summary.replaceAll("'", "&#x27;")}"`));
    assert.ok(!html.includes("Brouillon —") && !html.includes("Draft —"));
    if (item.relatedEntity) assert.ok(html.includes(`href="${item.relatedEntity.href}?lang=${lang}"`));
    assert.ok(!html.includes('name="robots" content="noindex"'));
    for (const paragraph of item.content[lang].body) assert.ok(html.includes(paragraph.replaceAll("'", "&#x27;")), paragraph);
  }
  for (const slug of [nexus.slug, gkgm.slug, "exemple-brouillon"]) {
    const preview = await fetch(`${base}/preview/news/${slug}?lang=${lang}`);
    assert.equal(preview.status, 404, "No public preview access");
    const previewHtml = await preview.text();
    assert.ok(!previewHtml.includes(gkgm.content[lang].title));
    assert.ok(!previewHtml.includes('id="news-article-structured-data"'));
  }
  for (const slug of ["inexistant", "exemple-brouillon", "test"]) {
    const missing = await fetch(`${base}/news/${slug}?lang=${lang}`);
    assert.equal(missing.status, 404, slug);
    const html = await missing.text();
    assert.match(html, /name="robots" content="noindex"/);
    assert.ok(!html.includes('id="news-article-structured-data"'));
  }
}
console.log("PASS news: categories/filtering, approval/publication/archive/future-date gates, FR/EN completeness, automatic expiration and verification window, event states, image approval, Article schema, empty-state/filter links/canonical, detailed-route 404 and draft-free sitemap. All sample publications exist only inside this test.");
