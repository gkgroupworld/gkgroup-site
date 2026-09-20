import { getLanguageAlternates } from "@/lib/seo";

export default function sitemap() {
  const paths = ["/", "/about", "/architecture", "/activities", "/entities", "/gk-nexus", "/news", "/contact"];
  const lastModified = new Date();
  return paths.flatMap((path) => {
    const languages = getLanguageAlternates(path);
    return ["fr", "en"].map((locale) => ({
      url: languages[locale],
      lastModified,
      changeFrequency: "monthly",
      priority: path === "/" ? 1 : 0.8,
      alternates: { languages },
    }));
  });
}
