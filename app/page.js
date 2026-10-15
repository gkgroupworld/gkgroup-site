import { HomePage } from "@/components/pages/HomePage";
import { getLocale } from "@/lib/locale";
import { getPageMetadata } from "@/lib/seo";
export async function generateMetadata({ searchParams }) {
  const locale = getLocale(await searchParams);
  return getPageMetadata("/", locale, {
    title: "GK GROUP | Global Business Without Borders",
    description: locale === "en"
      ? "GK GROUP, an international brand and entrepreneurial ecosystem connecting technology, international mobility, international trade and business development."
      : "GK GROUP, marque et écosystème entrepreneurial international : technologies, mobilité internationale, commerce international et développement des affaires.",
  });
}

export default async function Page({ searchParams }) { return <HomePage locale={getLocale(await searchParams)} />; }
