import { getLanguageAlternates } from "@/lib/seo";

export default function sitemap() {
  const paths = ["/", "/about", "/architecture", "/activities", "/entities", "/gk-global-technology", "/gk-global-mobility", "/gk-nexus", "/gk-esttrade", "/partnerships", "/news", "/contact"];
  // No reliable editorial modification dates are recorded for these pages.
  return paths.flatMap((path) => {
    const languages = getLanguageAlternates(path);
    return ["fr", "en"].map((locale) => ({
      url: languages[locale],
      changeFrequency: "monthly",
      priority: path === "/" ? 1 : 0.8,
      alternates: { languages },
    }));
  });
}
