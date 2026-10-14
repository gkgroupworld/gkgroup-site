import { EstTradePage } from "@/components/pages/EstTradePage";
import { getLocale } from "@/lib/locale";
import { getPageMetadata } from "@/lib/seo";

export async function generateMetadata({ searchParams }) {
  const locale = getLocale(await searchParams);
  return getPageMetadata("/gk-esttrade", locale, {
    title: "UAB GK EstTrade",
    description: locale === "fr"
      ? "UAB GK EstTrade, société distincte établie en Lituanie au sein de l’écosystème GK GROUP : commerce international, import-export, négoce et distribution de matériel informatique."
      : "UAB GK EstTrade, a distinct company established in Lithuania within the GK GROUP ecosystem: international trade, import-export, trading and IT equipment distribution.",
  });
}

export default async function Page({ searchParams }) {
  return <EstTradePage locale={getLocale(await searchParams)} />;
}
