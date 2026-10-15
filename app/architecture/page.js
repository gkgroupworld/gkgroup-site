import { ArchitecturePage } from "@/components/pages/ArchitecturePage";
import { getLocale } from "@/lib/locale";
import { getPageMetadata } from "@/lib/seo";
import { ARCHITECTURE_COPY } from "@/content/architecture";

export async function generateMetadata({ searchParams }) {
  const locale = getLocale(await searchParams);
  const copy = ARCHITECTURE_COPY[locale];
  return getPageMetadata("/architecture", locale, { title: copy.title, description: copy.subtitle });
}
export default async function Page({ searchParams }) { return <ArchitecturePage locale={getLocale(await searchParams)} />; }
