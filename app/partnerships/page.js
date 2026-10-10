import { PartnershipsPage } from "@/components/pages/PartnershipsPage";
import { PARTNERSHIP_CONTENT } from "@/content/partnerships";
import { getLocale } from "@/lib/locale";
import { getPageMetadata } from "@/lib/seo";

export async function generateMetadata({ searchParams }) {
  const locale = getLocale(await searchParams);
  const copy = PARTNERSHIP_CONTENT[locale];
  return getPageMetadata("/partnerships", locale, { title: copy.title, description: copy.seo });
}

export default async function Page({ searchParams }) {
  const locale = getLocale(await searchParams);
  return <PartnershipsPage locale={locale} />;
}
