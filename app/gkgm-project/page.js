import { InstitutionalBanner } from "@/components/ui/InstitutionalBanner";
import { InstitutionalFrame } from "@/components/ui/InstitutionalPage";
import { GkgmProjectForm } from "@/components/forms/GkgmProjectForm";
import { ENTITY_LOGOS } from "@/content/site";
import { PROJECT_COPY, PROJECT_PATH } from "@/content/gkgm-project";
import { getLocale } from "@/lib/locale";
import { getPageMetadata } from "@/lib/seo";
import { projectDeliveryConfig } from "@/lib/gkgm-project-server";

export async function generateMetadata({ searchParams }) {
  const locale = getLocale(await searchParams);
  return getPageMetadata(PROJECT_PATH, locale, { title: PROJECT_COPY[locale].title, description: PROJECT_COPY[locale].intro });
}

export default async function Page({ searchParams }) {
  const locale = getLocale(await searchParams);
  const copy = PROJECT_COPY[locale];
  const { enabled, endpoint, sitekey } = projectDeliveryConfig(process.env);
  return <InstitutionalFrame locale={locale}>
    <InstitutionalBanner title={copy.title} description={copy.intro} logo={ENTITY_LOGOS.gkgm} eyebrow="GK Global Mobility — GK GLOBAL GROUP SARL U" />
    <section className="bg-[#f5f7fa] px-5 py-12 sm:px-8"><div className="mx-auto max-w-4xl"><p className="mb-8 border-l-4 border-[#946020] bg-white p-5 leading-7 text-[#061b46]">{copy.disclaimer}</p><GkgmProjectForm locale={locale} enabled={enabled} endpoint={enabled ? endpoint : undefined} sitekey={enabled ? sitekey : undefined} /></div></section>
  </InstitutionalFrame>;
}
