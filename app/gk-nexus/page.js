import { NexusPage } from "@/components/pages/NexusPage";
import { getLocale } from "@/lib/locale";
import { getPageMetadata } from "@/lib/seo";

export async function generateMetadata({ searchParams }) {
  const locale = getLocale(await searchParams);
  const fr = locale === "fr";
  return getPageMetadata("/gk-nexus", locale, { title: "GK NEXUS", description: fr ? "GK NEXUS Sh.p.k., projet en Albanie dont l’immatriculation est en cours ; future plateforme de coordination et de développement international." : "GK NEXUS Sh.p.k., a project in Albania with registration in progress; future international coordination and development platform." });
}

export default async function Page({ searchParams }) {
  const locale = getLocale(await searchParams);
  return <NexusPage locale={locale} />;
}
