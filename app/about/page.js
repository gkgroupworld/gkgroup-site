import { AboutPage } from "@/components/pages/AboutPage";
import { getLocale } from "@/lib/locale";
import { getPageMetadata } from "@/lib/seo";
import { PREMIUM_ABOUT } from "@/content/about";

export async function generateMetadata({ searchParams }) {
  const locale = getLocale(await searchParams);
  const copy = PREMIUM_ABOUT[locale].hero;
  return getPageMetadata("/about", locale, { title: copy.title, description: copy.description });
}

export default async function Page({ searchParams }) {
  const locale = getLocale(await searchParams);
  return <AboutPage locale={locale} />;
}
