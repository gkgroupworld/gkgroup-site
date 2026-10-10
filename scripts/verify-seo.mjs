import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { AsyncLocalStorage } from "node:async_hooks";
globalThis.AsyncLocalStorage = AsyncLocalStorage;
const { default: testing } = await import("next/experimental/testing/server.js");
const { unstable_doesMiddlewareMatch } = testing;

const base = process.argv[2] || "http://localhost:3100";
const site = "https://gkgroup.app";
const paths = ["/", "/about", "/architecture", "/activities", "/entities", "/gk-global-technology", "/gk-global-mobility", "/gk-nexus", "/partnerships", "/news", "/contact"];
const expectedUrls = paths.flatMap(path => [path === "/" ? site : site + path, site + path + "?lang=en"]);
const matcher = { matcher: ["/((?!api(?:/|$)|_next(?:/|$)|.*\\.).*)"] };
// Read the real matcher rather than silently testing a copy of it.
const proxySource = await readFile(new URL("../proxy.js", import.meta.url), "utf8");
assert.ok(proxySource.includes(JSON.stringify(matcher.matcher[0])));
for (const url of ["/__forms.html", "/_next/static/chunk.js", "/_next/image", "/brand/logo.png", "/sitemap.xml", "/robots.txt", "/api/example"]) {
  assert.equal(unstable_doesMiddlewareMatch({ config: matcher, nextConfig: {}, url }), false, url);
}
for (const path of paths) assert.equal(unstable_doesMiddlewareMatch({ config: matcher, nextConfig: {}, url: path }), true, path);
const xmlResponse = await fetch(base + "/sitemap.xml");
assert.equal(xmlResponse.status, 200);
const xml = await xmlResponse.text();
const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1].replaceAll("&amp;", "&"));
assert.equal(urls.length, 22);
assert.deepEqual(urls, expectedUrls);
assert.equal(new Set(urls).size, 22);
assert.ok(!xml.includes("<lastmod>"));
assert.equal((xml.match(/hreflang="fr"/g) || []).length, 22);
assert.equal((xml.match(/hreflang="en"/g) || []).length, 22);
assert.equal((xml.match(/hreflang="x-default"/g) || []).length, 22);
const referenceResponse = await fetch(base + "/__forms.html");
assert.equal(referenceResponse.status, 200);
const reference = await referenceResponse.text();
assert.equal(reference, await readFile(new URL("../public/__forms.html", import.meta.url), "utf8"));
assert.match(reference, /data-netlify="true"/);
assert.match(reference, /netlify-honeypot="fax"/);
const names = text => [...text.matchAll(/<(?:input|select|textarea)\b[^>]*\bname="([^"]+)"/g)].map(m => m[1]).sort();
let canonicalGraph;
for (const publicUrl of urls) {
  const url = new URL(publicUrl);
  const locale = url.searchParams.get("lang") === "en" ? "en" : "fr";
  const response = await fetch(base + url.pathname + url.search);
  assert.equal(response.status, 200, publicUrl);
  const html = await response.text();
  assert.match(html, new RegExp(`<html[^>]*lang="${locale}"`), publicUrl);
  const links = [...html.matchAll(/<link\b[^>]*>/g)].map(m => m[0]);
  const canonical = links.find(link => link.includes('rel="canonical"'));
  assert.ok(canonical?.includes(`href="${publicUrl}"`), publicUrl);
  for (const language of ["fr", "en", "x-default"]) {
    const target = language === "en" ? site + url.pathname + "?lang=en" : url.pathname === "/" ? site : site + url.pathname;
    assert.ok(links.some(link => link.includes(`hrefLang="${language}"`) && link.includes(`href="${target}"`)), `${publicUrl}: ${language}`);
  }
  const json = html.match(/<script\b[^>]*id="gkgroup-structured-data"[^>]*>(.*?)<\/script>/s)?.[1];
  assert.ok(json, publicUrl);
  const data = JSON.parse(json);
  assert.equal(data["@context"], "https://schema.org");
  const graph = data["@graph"];
  const ids = new Set(graph.map(node => node["@id"]));
  assert.equal(ids.size, graph.length);
  const visit = value => {
    if (!value || typeof value !== "object") return;
    if (value["@id"]) { assert.ok(value["@id"].startsWith(site + "/#")); assert.ok(ids.has(value["@id"])); }
    for (const child of Object.values(value)) visit(child);
  };
  visit(data);
  const entity = id => graph.find(node => node["@id"] === site + "/#" + id);
  assert.equal(entity("brand")["@type"], "Brand");
  const company = entity("gk-global-group");
  assert.equal(company.legalName, "GK GLOBAL GROUP SARL U");
  assert.equal(company.address.addressCountry, "TG");
  assert.deepEqual(company.department.map(ref => ref["@id"]).sort(), [site + "/#gk-global-mobility", site + "/#gk-global-technology"]);
  for (const id of ["gk-global-mobility", "gk-global-technology"]) assert.equal(entity(id).parentOrganization["@id"], company["@id"]);
  const esttrade = entity("uab-gk-esttrade");
  assert.equal(esttrade["@type"], "Organization");
  assert.equal(esttrade.address.addressCountry, "LT");
  assert.ok(!esttrade.parentOrganization);
  const nexus = entity("gk-nexus-project");
  assert.equal(nexus["@type"], "Thing");
  assert.match(nexus.description, /registration in progress/);
  for (const node of graph) assert.ok(!node.owns && !node.owner && !node.subOrganization);
  if (canonicalGraph) assert.deepEqual(data, canonicalGraph); else canonicalGraph = data;
  if (url.pathname === "/partnerships") {
    const form = html.match(/<form\b[^>]*id="partnership-form".*?<\/form>/s)?.[0];
    assert.ok(form);
    assert.match(form, /method="POST"/);
    assert.match(form, /action="\/__forms.html"/);
    assert.match(form, new RegExp(`name="locale" value="${locale}"`));
    assert.deepEqual(names(form), names(reference));
    assert.match(form, /<input(?=[^>]*name="consent")(?=[^>]*required)[^>]*>/);
    assert.match(form, /name="form-name" value="international-partnerships"/);
  }
}
for (const [query, locale] of [["?lang=fr", "fr"], ["?lang=invalid", "fr"], ["?lang=EN", "fr"], ["?lang=en&lang=fr", "fr"], ["?lang=en&campaign=test", "en"]]) {
  const html = await (await fetch(base + "/" + query, { headers: { "x-gk-locale": locale === "fr" ? "en" : "fr" } })).text();
  assert.match(html, new RegExp(`<html[^>]*lang="${locale}"`));
}
console.log("PASS: 22 server-rendered FR/EN URLs, canonical/hreflang, sitemap without fabricated dates, JSON-LD identities/references, language fallback/header override, static asset exclusions, FR/EN partnership form field parity and Netlify reference.");
