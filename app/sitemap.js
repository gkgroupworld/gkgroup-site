import { getLanguageAlternates } from "@/lib/seo";
import { getNewsSitemapPaths } from "@/lib/news";

export const dynamic = "force-dynamic";

export default function sitemap() {
  const paths = ["/", "/about", "/architecture", "/activities", "/entities", "/gk-global-technology", "/gk-global-mobility", "/gk-nexus", "/gk-esttrade", "/partnerships", "/news", "/contact"];
  // No reliable editorial modification dates are recorded for these pages.
  return [...paths, ...getNewsSitemapPaths()].flatMap((path) => {
    const languages = getLanguageAlternates(path);
    return ["fr", "en"].map((locale) => ({
      url: languages[locale],
      changeFrequency: "monthly",
      priority: path === "/" ? 1 : 0.8,
      alternates: { languages },
    }));
  });
}
