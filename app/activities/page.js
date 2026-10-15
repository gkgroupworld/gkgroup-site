import { ActivitiesPage } from "@/components/pages/ActivitiesPage";
import { getLocale } from "@/lib/locale";
import { getPageMetadata } from "@/lib/seo";
import { PREMIUM_ACTIVITIES } from "@/content/activities";

export async function generateMetadata({ searchParams }) {
  const locale = getLocale(await searchParams);
  const copy = PREMIUM_ACTIVITIES[locale].hero;
  return getPageMetadata("/activities", locale, { title: copy.title, description: copy.description });
}

export default async function Page({ searchParams }) {
  const locale = getLocale(await searchParams);
  return <ActivitiesPage locale={locale} />;
}
