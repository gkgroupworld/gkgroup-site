import { NEWS_CATEGORIES, NEWS_ITEMS } from "../content/site";

export function parseNewsDate(value, endOfDay = false) {
  if (typeof value !== "string") return NaN;
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const instant = Date.parse(value + "T00:00:00.000Z");
    if (!Number.isFinite(instant) || new Date(instant).toISOString().slice(0, 10) !== value) return NaN;
    return instant + (endOfDay ? 86400000 - 1 : 0);
  }
  return /^\d{4}-\d{2}-\d{2}T.*(?:Z|[+-]\d{2}:\d{2})$/.test(value)
    && Number.isFinite(parseNewsDate(value.slice(0, 10))) ? Date.parse(value) : NaN;
}

const text = value => typeof value === "string" && value.trim().length > 0;
const bilingual = value => value && ["fr", "en"].every(locale => text(value[locale]));
const body = value => text(value) || (Array.isArray(value) && value.length > 0 && value.every(text));
const verified = (value, now) => Number.isFinite(parseNewsDate(value)) && parseNewsDate(value) <= now;
export const isOfficialUrl = value => { try { const url = new URL(value); return url.protocol === "https:" && !url.username && !url.password; } catch { return false; } };

export function normalizeNewsCategory(value) {
  return NEWS_CATEGORIES.some(category => category.id === value) ? value : "all";
}

export function isPublishedNews(item, now = Date.now()) {
  if (!item || !["published", "archived"].includes(item.status) || item.publicationApproved !== true
    || !text(item.id) || !text(item.slug) || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.slug)
    || normalizeNewsCategory(item.category) === "all" || !verified(item.date, now)
    || !["fr", "en"].every(locale => text(item.content?.[locale]?.title) && text(item.content?.[locale]?.summary) && body(item.content?.[locale]?.body))) return false;
  if (item.source && (!text(item.source.name) || !isOfficialUrl(item.source.url))) return false;
  if (item.category === "opportunities") {
    const o = item.opportunity;
    return Boolean(o && bilingual(o.region) && bilingual(o.type) && bilingual(o.eligibility) && text(o.organisation)
      && isOfficialUrl(o.officialUrl) && verified(o.verifiedAt, now) && ["open", "expired", "archived"].includes(o.status)
      && (!o.deadline || Number.isFinite(parseNewsDate(o.deadline))));
  }
  if (item.category === "events") {
    const e = item.event;
    return Boolean(e && bilingual(e.name) && bilingual(e.country) && text(e.city) && text(e.organiser)
      && isOfficialUrl(e.officialUrl) && verified(e.verifiedAt, now) && Number.isFinite(parseNewsDate(e.startsAt))
      && (!e.endsAt || parseNewsDate(e.endsAt, true) >= parseNewsDate(e.startsAt))
      && ["scheduled", "cancelled", "postponed", "archived"].includes(e.status)
      && (!e.registration || bilingual(e.registration)));
  }
  return true;
}

export function getPublishedNews(items = NEWS_ITEMS, now = Date.now()) {
  // Fail closed on duplicate public identities rather than expose an ambiguous URL.
  return items.filter(item => isPublishedNews(item, now)
    && items.filter(other => other.slug === item.slug || other.id === item.id).length === 1)
    .toSorted((a, b) => parseNewsDate(b.date) - parseNewsDate(a.date) || a.slug.localeCompare(b.slug));
}

export function filterNewsByCategory(items, category) {
  const selected = normalizeNewsCategory(category);
  return selected === "all" ? items : items.filter(item => item.category === selected);
}

export function getPublishedArticle(slug, items = NEWS_ITEMS, now = Date.now()) {
  return getPublishedNews(items, now).find(item => item.slug === slug);
}

export function getOpportunityStatus(item, now = Date.now()) {
  const o = item.opportunity;
  if (o?.deadline && !Number.isFinite(parseNewsDate(o.deadline))) return "unverified";
  if (o?.status === "expired" || (o?.deadline && now > parseNewsDate(o.deadline, true))) return "expired";
  if (item.status === "archived" || o?.status === "archived") return "archived";
  return o?.status === "open" && o.availabilityVerified === true && isOfficialUrl(o.officialUrl)
    && verified(o.verifiedAt, now) && parseNewsDate(o.verificationValidUntil, true) >= now
    && parseNewsDate(o.verificationValidUntil, true) >= parseNewsDate(o.verifiedAt) ? "open" : "unverified";
}

export function getEventStatus(item, now = Date.now()) {
  const e = item.event;
  if (item.status === "archived" || e?.status === "archived") return "archived";
  if (["cancelled", "postponed"].includes(e?.status)) return e.status;
  const start = parseNewsDate(e?.startsAt);
  const end = e?.endsAt || (Number.isFinite(start) ? new Date(start).toISOString().slice(0, 10) : null);
  return now > parseNewsDate(end, true) ? "past" : "scheduled";
}

export function getNewsStatus(item, now = Date.now()) {
  return item.category === "opportunities" ? getOpportunityStatus(item, now)
    : item.category === "events" ? getEventStatus(item, now) : item.status === "archived" ? "archived" : null;
}

export function getNewsImage(item) {
  const image = item.image;
  return image?.publicationApproved === true && /^\/(?!\/)/.test(image.src || "")
    && image.width > 0 && image.height > 0 && bilingual(image.alt) ? image : null;
}

export function formatNewsDate(value, locale) {
  const date = parseNewsDate(value);
  if (!Number.isFinite(date)) return "";
  const hasTime = value.includes("T");
  const formatted = new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-GB", { dateStyle: "long", timeZone: "UTC", ...(hasTime ? { timeStyle: "short" } : {}) }).format(date);
  return hasTime ? `${formatted} UTC` : formatted;
}

export function getNewsSitemapPaths(items = NEWS_ITEMS, now = Date.now()) {
  return getPublishedNews(items, now).map(item => `/news/${item.slug}`);
}

export function getArticleStructuredData(item, locale, canonical) {
  const image = getNewsImage(item);
  return {
    "@context": "https://schema.org", "@type": ["group", "announcements"].includes(item.category) ? "NewsArticle" : "Article",
    headline: item.content[locale].title, description: item.content[locale].summary,
    datePublished: item.date, inLanguage: locale, url: canonical, mainEntityOfPage: canonical,
    articleSection: NEWS_CATEGORIES.find(category => category.id === item.category).label[locale],
    ...(image ? { image: new URL(image.src, canonical).href } : {}),
  };
}
