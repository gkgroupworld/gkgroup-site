import { HomePage } from "@/components/pages/HomePage";
import { getLocale } from "@/lib/locale";
import { getPageMetadata } from "@/lib/seo";
export async function generateMetadata({ searchParams }) {
  const locale = getLocale(await searchParams);
  return getPageMetadata("/", locale, {
    title: "GK GROUP | Global Business Without Borders",
    description: locale === "en"
      ? "GK GROUP is an international group connecting opportunities, expertise and markets across technology, international mobility, trade, business development and strategic consulting."
      : "GK GROUP est un groupe international reliant les opportunités, les expertises et les marchés dans les domaines de la technologie, de la mobilité internationale, du commerce, du développement d’affaires et du conseil stratégique.",
  });
}

export default async function Page({ searchParams }) { return <HomePage locale={getLocale(await searchParams)} />; }
