import { InstitutionalBanner } from "@/components/ui/InstitutionalBanner";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { InstitutionalDiagram } from "@/components/ui/InstitutionalDiagram";
import { ENTITY_LOGOS } from "@/content/site";
import { ARCHITECTURE_COPY, ARCHITECTURE_ENTITIES } from "@/content/architecture";
import { withLocale } from "@/lib/locale";
import styles from "./Architecture.module.css";

export function ArchitecturePage({ locale }) {
  const copy = ARCHITECTURE_COPY[locale];
  const profiles = [...ARCHITECTURE_ENTITIES.filter(entity => entity.platform), ...ARCHITECTURE_ENTITIES.filter(entity => !entity.platform)];
  return <><Header locale={locale} /><main lang={locale}>
    <InstitutionalBanner eyebrow="GK GROUP · Global Business Without Borders" title={copy.title} description={copy.subtitle} note={copy.brandStatus} />
    <section id="ecosystem" className="px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-7xl"><SectionTitle eyebrow={copy.eyebrow} title={copy.diagramTitle} /><p className="mb-10 max-w-3xl leading-8 text-slate-600">{copy.diagramIntro}</p><InstitutionalDiagram locale={locale} /></div>
    </section>
    <section id="entity-profiles" className="bg-[#f5f7fa] px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-7xl"><SectionTitle eyebrow="GK GROUP" title={copy.detailsTitle} /><p className="mb-10 max-w-4xl leading-8 text-slate-600">{copy.detailsIntro}</p>
        <div className="grid gap-6 lg:grid-cols-2">
          {profiles.map((entity, index) => {
            const logo = ENTITY_LOGOS[entity.id];
            return <article key={entity.id} id={`profile-${entity.id}`} aria-labelledby={`title-${entity.id}`} className={`flex scroll-mt-6 flex-col border border-slate-200 border-t-2 border-t-[#d59b46] bg-white p-6 sm:p-8 ${entity.platform ? "lg:col-span-2" : ""} ${styles.card} ${styles.reveal}`} style={{ "--reveal-delay": `${Math.min(index, 3) * 65}ms` }}>
              <div className="flex flex-wrap items-center justify-between gap-4"><p className="text-xs font-bold uppercase tracking-[.18em] text-[#9b651f]">{entity.platform ? copy.carrier : entity.country[locale]}</p><Image src={logo.src} alt={logo.alt} width={1536} height={1024} className="h-20 w-32 object-contain" sizes="128px" /></div>
              <h3 id={`title-${entity.id}`} className="mt-6 text-2xl font-bold tracking-tight text-[#061b46]">{entity.name}</h3>
              {entity.platform && <p className="mt-5 border-l-2 border-[#d59b46] bg-[#061b46] p-5 text-xl font-bold leading-8 text-[#f5a24e]">{copy.platformRole}</p>}
              <p className="mt-3 border-l-2 border-[#d59b46] pl-3 text-sm font-bold leading-6 text-[#805217]">{entity.status[locale]}</p>
              {entity.branch && <p className="mt-2 text-xs leading-6 text-slate-600">{copy.branchOf}</p>}
              <p className="mt-5 leading-7 text-slate-600">{entity.description[locale]}</p>
              {entity.platform && <div className="mt-5 grid gap-4 border-l-2 border-[#d59b46] pl-4 text-sm leading-7 text-slate-600"><p>{copy.platformLegal}</p><p>{copy.platformScope}</p></div>}
              <h4 className="mt-6 text-sm font-bold text-[#061b46]">{entity.platform ? copy.platformFunctions : entity.project ? copy.planned : copy.activities}</h4>
              <ul className="mb-7 mt-4 grid gap-3">{entity.activities[locale].map(activity => <li key={activity} className="border-l-2 border-[#d59b46] pl-3 text-sm leading-6 text-slate-600">{activity}</li>)}</ul>
              {entity.branches && <div className="mb-7 flex flex-wrap gap-3">{entity.branches.map(id => <Link key={id} href={`#profile-${id}`} className="inline-flex min-h-11 items-center border border-slate-200 px-4 text-sm font-bold text-[#061b46] hover:border-[#d59b46]">{id.toUpperCase()}<span aria-hidden="true" className="ml-2">↓</span></Link>)}</div>}
              <div className="mt-auto border-t border-slate-200 pt-6"><Link href={withLocale(entity.href, locale)} className="inline-flex min-h-11 items-center justify-center border border-[#d59b46] bg-[#061b46] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#0c3269]" style={{ color: "#ffffff" }}>{entity.href === "/entities" ? copy.directory : copy.discover}<span className="sr-only"> · {entity.name}</span><span aria-hidden="true" className="ml-3">→</span></Link></div>
            </article>;
          })}
        </div>
      </div>
    </section>
    <section className="px-5 py-16 sm:px-8 sm:py-20"><div className="mx-auto max-w-7xl"><SectionTitle eyebrow="GK GROUP" title={copy.principlesTitle} /><div className="grid gap-6 md:grid-cols-3">{copy.principles.map(([title, description]) => <article key={title} className="border-t-2 border-[#d59b46] pt-6"><h3 className="text-xl font-bold text-[#061b46]">{title}</h3><p className="mt-4 text-sm leading-7 text-slate-600">{description}</p></article>)}</div></div></section>
  </main><Footer locale={locale} /></>;
}
