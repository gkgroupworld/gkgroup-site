import { CONTACT } from "../content/site";

export const SITE_URL = "https://gkgroup.app";
export const SOCIAL_IMAGE = {
  url: `${SITE_URL}/brand/gk-group-social-card.png`,
  width: 1200,
  height: 630,
  alt: "GK GROUP — Global Business Without Borders",
};

export function getLanguageAlternates(path) {
  const pageUrl = new URL(path, SITE_URL);
  const frenchUrl = pageUrl.pathname === "/" ? SITE_URL : pageUrl.href;
  pageUrl.searchParams.set("lang", "en");
  return { fr: frenchUrl, en: pageUrl.href, "x-default": frenchUrl };
}

export function getPageAlternates(path, locale) {
  const languages = getLanguageAlternates(path);
  return { canonical: languages[locale === "en" ? "en" : "fr"], languages };
}

export function getPageMetadata(path, locale, { title, description }) {
  const alternates = getPageAlternates(path, locale);
  const socialTitle = path === "/" ? title : `${title} | GK GROUP`;
  const english = locale === "en";
  return {
    title: path === "/" ? { absolute: title } : title,
    description,
    alternates,
    openGraph: {
      title: socialTitle,
      description,
      url: alternates.canonical,
      locale: english ? "en_US" : "fr_FR",
      alternateLocale: english ? "fr_FR" : "en_US",
      siteName: "GK GROUP",
      type: "website",
      images: [SOCIAL_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      images: [SOCIAL_IMAGE],
      title: socialTitle,
      description,
    },
  };
}

// Stable entity identifiers; brand association does not assert corporate ownership.
export const SITE_STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Brand",
      "@id": `${SITE_URL}/#brand`,
      name: "GK GROUP",
      description: "International institutional brand and ecosystem, without legal status of its own.",
      url: SITE_URL,
      slogan: "Global Business Without Borders",
      logo: `${SITE_URL}/brand/gk-group-official-logo.png`,
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#gk-global-group`,
      name: CONTACT.legalName,
      legalName: "GK GLOBAL GROUP SARL U",
      url: SITE_URL,
      brand: { "@id": `${SITE_URL}/#brand` },
      address: { "@type": "PostalAddress", addressLocality: "Lomé", addressCountry: "TG" },
      email: [CONTACT.generalEmail, CONTACT.email],
      telephone: CONTACT.phone,
      contactPoint: { "@type": "ContactPoint", contactType: "WhatsApp", telephone: CONTACT.whatsapp, url: CONTACT.whatsappHref },
      department: [
        { "@id": `${SITE_URL}/#gk-global-technology` },
        { "@id": `${SITE_URL}/#gk-global-mobility` },
      ],
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#gk-global-technology`,
      name: "GK GLOBAL TECHNOLOGY",
      alternateName: "GKGT",
      description: "Operational division of GK GLOBAL GROUP SARL U.",
      url: `${SITE_URL}/gk-global-technology`,
      parentOrganization: { "@id": `${SITE_URL}/#gk-global-group` },
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#gk-global-mobility`,
      name: "GK GLOBAL MOBILITY",
      alternateName: "GKGM",
      description: "Operational division of GK GLOBAL GROUP SARL U.",
      url: `${SITE_URL}/gk-global-mobility`,
      parentOrganization: { "@id": `${SITE_URL}/#gk-global-group` },
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#uab-gk-esttrade`,
      name: "UAB GK EstTrade",
      legalName: "UAB GK EstTrade",
      url: `${SITE_URL}/gk-esttrade`,
      logo: `${SITE_URL}/brand/entities/uab-gk-esttrade.png`,
      description: "Legally distinct company established in Lithuania within the GK GROUP ecosystem: international trade, import-export, trading and IT equipment distribution.",
      brand: { "@id": `${SITE_URL}/#brand` },
      address: { "@type": "PostalAddress", addressLocality: "Vilnius", addressCountry: "LT" },
    },
    {
      // A proposed company is not described as an existing legal Organization.
      "@type": "Thing",
      "@id": `${SITE_URL}/#gk-nexus-project`,
      name: "GK NEXUS Sh.p.k. — project",
      description: "Proposed company in Albania, registration in progress. Future coordination and international development platform, subject to registration.",
      url: `${SITE_URL}/gk-nexus`,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: "GK GROUP",
      url: SITE_URL,
      about: { "@id": `${SITE_URL}/#brand` },
      inLanguage: ["fr", "en"],
    },
  ],
};
