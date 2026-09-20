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

export const SITE_STRUCTURED_DATA = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "GK GROUP",
    url: SITE_URL,
    slogan: "Global Business Without Borders",
    logo: `${SITE_URL}/brand/gk-group-official-logo.png`,
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "GK GROUP",
    url: SITE_URL,
  },
];
