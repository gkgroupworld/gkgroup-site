export const SUPPORTED_LOCALES = ["fr", "en"];

export function getLocale(searchParams = {}) {
  return SUPPORTED_LOCALES.includes(searchParams?.lang) ? searchParams.lang : "fr";
}

export function withLocale(path, locale) {
  return `${path}?lang=${locale}`;
}
