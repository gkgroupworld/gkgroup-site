import { NewsPage } from "@/components/pages/NewsPage";
import { getLocale } from "@/lib/locale";

export async function generateMetadata({ searchParams }) {
  const locale = getLocale(await searchParams);
  const fr = locale === "fr";
  return { title: fr ? "Actualités & Perspectives" : "News & Insights", description: fr ? "Actualités, initiatives, partenariats et développements stratégiques de GK GROUP et de ses structures." : "News, initiatives, partnerships and strategic developments from GK GROUP and its structures." };
}

export default async function Page({ searchParams }) {
  const locale = getLocale(await searchParams);
  return <NewsPage locale={locale} />;
}
