import { TechnologyPage } from "@/components/pages/TechnologyPage";
import { TECHNOLOGY_CONTENT } from "@/content/technology";
import { getLocale } from "@/lib/locale";
import { getPageMetadata } from "@/lib/seo";

export async function generateMetadata({ searchParams }) {
  const locale = getLocale(await searchParams);
  return getPageMetadata("/gk-global-technology", locale, {
    title: TECHNOLOGY_CONTENT[locale].title,
    description: TECHNOLOGY_CONTENT[locale].seoDescription,
  });
}

export default async function Page({ searchParams }) {
  const locale = getLocale(await searchParams);
  return <TechnologyPage locale={locale} />;
}
