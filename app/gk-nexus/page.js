import { NexusPage } from "@/components/pages/NexusPage";
import { getLocale } from "@/lib/locale";
import { getPageMetadata } from "@/lib/seo";

export async function generateMetadata({ searchParams }) {
  const locale = getLocale(await searchParams);
  const fr = locale === "fr";
  return getPageMetadata("/gk-nexus", locale, { title: "GK NEXUS", description: fr ? "GK NEXUS, plateforme corporate et opérationnelle internationale de GK GROUP." : "GK NEXUS, GK GROUP’s international corporate and operational platform." });
}

export default async function Page({ searchParams }) {
  const locale = getLocale(await searchParams);
  return <NexusPage locale={locale} />;
}
