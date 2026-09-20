import { AboutPage } from "@/components/pages/AboutPage";
import { getLocale } from "@/lib/locale";
import { getPageMetadata } from "@/lib/seo";

export async function generateMetadata({ searchParams }) {
  const locale = getLocale(await searchParams);
  const fr = locale === "fr";
  return getPageMetadata("/about", locale, { title: fr ? "À propos" : "About", description: fr ? "Découvrez GK GROUP, son modèle institutionnel et sa vision stratégique 2026–2035." : "Discover GK GROUP, its institutional model and its 2026–2035 strategic vision." });
}

export default async function Page({ searchParams }) {
  const locale = getLocale(await searchParams);
  return <AboutPage locale={locale} />;
}
