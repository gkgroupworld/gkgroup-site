import { ActivitiesPage } from "@/components/pages/ActivitiesPage";
import { getLocale } from "@/lib/locale";

export async function generateMetadata({ searchParams }) {
  const locale = getLocale(await searchParams);
  const fr = locale === "fr";
  return { title: fr ? "Nos activités" : "Our Activities", description: fr ? "Découvrez les cinq domaines d’activité complémentaires de GK GROUP." : "Discover GK GROUP’s five complementary areas of activity." };
}

export default async function Page({ searchParams }) {
  const locale = getLocale(await searchParams);
  return <ActivitiesPage locale={locale} />;
}
