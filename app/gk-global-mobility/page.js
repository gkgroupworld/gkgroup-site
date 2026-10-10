import { MobilityPage } from "@/components/pages/MobilityPage";
import { MOBILITY_CONTENT } from "@/content/mobility";
import { getLocale } from "@/lib/locale";
import { getPageMetadata } from "@/lib/seo";

export async function generateMetadata({ searchParams }) {
  const locale = getLocale(await searchParams);
  return getPageMetadata("/gk-global-mobility", locale, {
    title: MOBILITY_CONTENT[locale].title,
    description: locale === "fr"
      ? "GKGM : études internationales, mobilité professionnelle, assistance administrative pour les visas, entrepreneuriat et coopérations B2B."
      : "GKGM: international studies, professional mobility, administrative visa assistance, entrepreneurship and B2B cooperation.",
  });
}

export default async function Page({ searchParams }) {
  const locale = getLocale(await searchParams);
  return <MobilityPage locale={locale} />;
}
