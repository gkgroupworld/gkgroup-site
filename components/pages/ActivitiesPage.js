import Image from "next/image";
import Link from "next/link";
import { ENTITY_LOGOS } from "@/content/site";
import { PREMIUM_ACTIVITIES } from "@/content/activities";
import { InstitutionalFrame, InstitutionalHero, InstitutionalHeading, InstitutionalAction, InstitutionalClosing, institutionalStyles as styles } from "@/components/ui/InstitutionalPage";

export function ActivitiesPage({ locale }) {
  const copy = PREMIUM_ACTIVITIES[locale];
  return <InstitutionalFrame locale={locale}>
    <InstitutionalHero {...copy.hero} />
    <nav aria-label={copy.contents} className="border-b border-slate-200 px-5 py-7 sm:px-8"><div className="mx-auto max-w-7xl"><p className="text-sm font-bold text-[#061b46]">{copy.contents}</p><ul className="mt-4 flex flex-wrap gap-3">{copy.domains.map(domain => <li key={domain.id}><Link href={`#activity-${domain.id}`} className="inline-flex min-h-12 items-center border border-slate-200 px-4 py-2 text-sm font-bold text-[#061b46] transition-colors hover:border-[#d59b46] hover:bg-[#f5f7fa]">{domain.entity}</Link></li>)}</ul></div></nav>
    {copy.domains.map((domain, index) => {
      const dark = index % 2 === 1;
      const logo = ENTITY_LOGOS[domain.logo];
      return <section key={domain.id} id={`activity-${domain.id}`} data-business-domain={domain.id} className={`scroll-mt-6 px-5 py-16 sm:px-8 sm:py-24 ${dark ? "bg-[#061b46] text-white" : "bg-white"}`}>
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[1.4fr_.6fr] lg:items-center lg:gap-16">
            <div><InstitutionalHeading eyebrow={domain.entity} title={domain.title} dark={dark} /><p className={`max-w-3xl text-lg leading-8 ${dark ? "text-slate-200" : "text-slate-600"}`}>{domain.description}</p></div>
            <div className="mx-auto flex h-44 w-full max-w-xs items-center justify-center border border-[#d59b46] bg-[#f5f7fa] p-5"><Image src={logo.src} alt={logo.alt} width={1536} height={1024} className="h-full w-full object-contain" sizes="280px" /></div>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-2">{domain.groups.map((group, groupIndex) => <article key={group.title} data-activity-group className={`border border-t-2 border-t-[#d59b46] p-6 sm:p-8 ${dark ? "border-white/20 bg-white/5" : "border-slate-200 bg-[#f5f7fa]"} ${domain.groups.length % 2 === 1 && groupIndex === domain.groups.length - 1 ? "lg:col-span-2" : ""} ${styles.card}`}>
            <h3 className={`text-xl font-bold leading-7 ${dark ? "text-white" : "text-[#061b46]"}`}>{group.title}</h3><p className={`mt-4 leading-7 ${dark ? "text-slate-200" : "text-slate-600"}`}>{group.description}</p>
            {group.items && <ul className="mt-6 grid gap-3 sm:grid-cols-2">{group.items.map(item => <li key={item} className={`border-l-2 border-[#d59b46] pl-3 text-sm leading-6 ${dark ? "text-slate-200" : "text-slate-600"}`}>{item}</li>)}</ul>}
          </article>)}</div>
          <div className={`mt-8 border-l-2 border-[#d59b46] p-5 ${dark ? "bg-white/5" : "bg-[#f5f7fa]"}`}><h3 className={`text-sm font-bold ${dark ? "text-[#e7ba75]" : "text-[#946020]"}`}>{copy.scope}</h3><p className={`mt-2 text-sm leading-7 ${dark ? "text-slate-200" : "text-slate-600"}`}>{domain.boundary}</p></div>
          <div className="mt-8"><InstitutionalAction href={domain.href} locale={locale} variant={dark ? "gold" : "navy"}>{copy.discover}<span className="sr-only"> · {domain.entity}</span></InstitutionalAction></div>
        </div>
      </section>;
    })}
    <InstitutionalClosing locale={locale} copy={copy.final} />
  </InstitutionalFrame>;
}
