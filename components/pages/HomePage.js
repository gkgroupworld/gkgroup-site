import { InstitutionalBanner } from "@/components/ui/InstitutionalBanner";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ENTITY_LOGOS } from "@/content/site";
import { ARCHITECTURE_ENTITIES } from "@/content/architecture";
import { HOME_ACTIVITIES, HOME_COPY } from "@/content/home";
import { withLocale } from "@/lib/locale";
import styles from "./Home.module.css";

function Action({ href, locale, children, variant = "navy" }) {
  const tone = variant === "gold"
    ? "border-[#d59b46] bg-[#d59b46] hover:bg-[#e7ba75]"
    : variant === "outline" ? "border-white/50 bg-transparent hover:bg-white/10" : "border-[#061b46] bg-[#061b46] hover:bg-[#0c3269]";
  return <Link href={withLocale(href, locale)} className={`inline-flex min-h-12 items-center justify-center gap-3 border px-5 py-3 text-sm font-bold transition-colors ${tone}`} style={{ color: variant === "gold" ? "#061b46" : "#ffffff" }}>{children}<span aria-hidden="true">→</span></Link>;
}

export function HomePage({ locale }) {
  const copy = HOME_COPY[locale];
  const entities = ARCHITECTURE_ENTITIES.filter(entity => !entity.branch);
  return <><Header locale={locale} /><main lang={locale}>
    <InstitutionalBanner data-home-section="hero" eyebrow={copy.hero.eyebrow} title={copy.hero.title} description={copy.hero.description} signature="GLOBAL BUSINESS WITHOUT BORDERS" actions={<><Action href="/activities" locale={locale} variant="gold">{copy.hero.activities}</Action><Action href="/architecture" locale={locale} variant="outline">{copy.hero.architecture}</Action></>} />

    <section data-home-section="vision" className="px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div className={styles.heading}><SectionTitle eyebrow={copy.vision.eyebrow} title={copy.vision.title} /><ul className="flex flex-wrap gap-x-6 gap-y-3">{copy.vision.values.map(value => <li key={value} className="border-l-2 border-[#d59b46] pl-3 text-xs font-bold uppercase leading-6 tracking-wider text-[#061b46]">{value}</li>)}</ul></div>
        <div><p className="text-lg leading-8 text-slate-600">{copy.vision.description}</p><p className="mt-6 border-l-2 border-[#d59b46] bg-[#f5f7fa] p-5 text-sm leading-7 text-slate-600">{copy.vision.legal}</p><Link href={withLocale("/about", locale)} className="mt-7 inline-flex min-h-12 items-center gap-3 text-sm font-bold text-[#061b46] underline underline-offset-4">{copy.vision.link}<span aria-hidden="true">→</span></Link></div>
      </div>
    </section>

    <section id="home-activities" data-home-section="activities" className="bg-[#f5f7fa] px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-7xl"><div className={styles.heading}><SectionTitle eyebrow={copy.activities.eyebrow} title={copy.activities.title} /></div><p className="-mt-4 mb-10 max-w-3xl leading-8 text-slate-600">{copy.activities.intro}</p>
        <div className="grid gap-6 lg:grid-cols-2">{HOME_ACTIVITIES.map((activity, index) => {
          const detail = copy.activities[activity.id];
          const logo = ENTITY_LOGOS[activity.logo];
          return <article key={activity.id} data-home-activity={activity.id} aria-labelledby={`home-${activity.id}`} className={`flex flex-col border border-slate-200 border-t-2 border-t-[#d59b46] bg-white p-6 sm:p-8 ${styles.card}`}>
            <div className="flex items-center justify-between gap-5"><p aria-hidden="true" className="text-sm font-bold tracking-wider text-[#946020]">0{index + 1}</p><Image src={logo.src} alt={logo.alt} width={1536} height={1024} className="h-16 w-28 object-contain" sizes="112px" /></div>
            <p className="mt-5 text-xs font-bold uppercase leading-6 tracking-wider text-[#946020]">{activity.entity}</p>
            <h3 id={`home-${activity.id}`} className="mt-3 text-2xl font-bold tracking-tight text-[#061b46]">{detail.title}</h3>
            <p className="mt-4 leading-7 text-slate-600">{detail.description}</p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">{detail.items.map(item => <li key={item} className="border-l-2 border-[#d59b46] pl-3 text-sm leading-6 text-slate-600">{item}</li>)}</ul>
            <p className="mb-6 mt-6 border-t border-slate-200 pt-5 text-xs leading-6 text-slate-500">{detail.note}</p>
            <div className="mt-auto"><Action href={activity.href} locale={locale}>{copy.activities.discover}<span className="sr-only"> · {detail.title}</span></Action></div>
          </article>;
        })}</div>
      </div>
    </section>

    <section id="home-ecosystem" data-home-section="ecosystem" className="bg-[#061b46] px-5 py-16 text-white sm:px-8 sm:py-24">
      <div className="mx-auto max-w-7xl"><div className={styles.darkHeading}><SectionTitle eyebrow={copy.ecosystem.eyebrow} title={copy.ecosystem.title} /></div><p className="-mt-4 mb-10 max-w-3xl leading-8 text-slate-200">{copy.ecosystem.intro}</p>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">{entities.map(entity => {
          const logo = ENTITY_LOGOS[entity.id];
          const detail = copy.ecosystem.entities[entity.id];
          return <article key={entity.id} data-home-entity={entity.id} className={`flex min-w-0 flex-col border border-white/20 border-t-2 border-t-[#d59b46] bg-white p-6 ${styles.card}`}>
            <p className="text-xs font-bold uppercase tracking-[.15em] text-[#946020]">{entity.country[locale]}</p>
            <div className="mt-5 flex h-24 items-center justify-center bg-[#f5f7fa] p-3"><Image src={logo.src} alt={logo.alt} width={1536} height={1024} className="h-full w-full object-contain" sizes="(max-width: 768px) 240px, 220px" /></div>
            <h3 className="mt-5 text-xl font-bold leading-7 text-[#061b46]">{entity.platform ? "GK Nexus" : entity.name}</h3>
            <p className="mt-3 border-l-2 border-[#d59b46] pl-3 text-xs font-bold leading-6 text-[#805217]">{detail.status}</p>
            <p className="mb-6 mt-4 text-sm leading-7 text-slate-600">{detail.description}</p>
            <div className="mt-auto border-t border-slate-200 pt-4"><Link href={withLocale(entity.href, locale)} className="inline-flex min-h-12 items-center gap-3 text-sm font-bold" style={{ color: "#061b46" }}>{copy.ecosystem.discover}<span className="sr-only"> · {entity.name}</span><span aria-hidden="true">→</span></Link></div>
          </article>;
        })}</div>
        <div className="mt-10"><Action href="/architecture" locale={locale} variant="outline">{copy.ecosystem.link}</Action></div>
      </div>
    </section>

    <section id="home-nexus" data-home-section="nexus" className="px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div><div className={styles.heading}><SectionTitle eyebrow={copy.nexus.eyebrow} title={copy.nexus.title} /></div><p className="leading-8 text-slate-600">{copy.nexus.intro}</p><div className="mt-8"><Action href="/gk-nexus" locale={locale}>{copy.nexus.link}</Action></div></div>
        <ol className="divide-y divide-slate-200 border-t-2 border-t-[#d59b46]">{copy.nexus.functions.map((mission, index) => <li key={mission} className="grid grid-cols-[2rem_1fr] gap-4 py-5"><span aria-hidden="true" className="text-sm font-bold leading-7 text-[#946020]">0{index + 1}</span><p className="font-bold leading-7 text-[#061b46]">{mission}</p></li>)}</ol>
        <p className="border-l-2 border-[#d59b46] bg-[#f5f7fa] p-5 text-sm leading-7 text-slate-600 lg:col-span-2">{copy.nexus.scope}</p>
      </div>
    </section>

    <section data-home-section="partnerships" className="border-y border-slate-200 bg-[#f5f7fa] px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.2fr_.8fr] lg:items-center lg:gap-16">
        <div><div className={styles.heading}><SectionTitle eyebrow={copy.partnerships.eyebrow} title={copy.partnerships.title} /></div><p className="max-w-3xl leading-8 text-slate-600">{copy.partnerships.description}</p><div className="mt-8"><Action href="/partnerships" locale={locale}>{copy.partnerships.link}</Action></div></div>
        <ul className="grid gap-3">{copy.partnerships.fields.map(field => <li key={field} className="border-l-2 border-[#d59b46] bg-white px-5 py-4 text-sm font-bold text-[#061b46]">{field}</li>)}</ul>
      </div>
    </section>

    <section data-home-section="founder" className="px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.7fr_1.3fr] lg:items-center lg:gap-16">
        <div className="relative mx-auto aspect-[4/5] w-full max-w-sm border border-[#d59b46] bg-[#f5f7fa]"><Image src="/brand/founder/edem-yawo-awutey-founder.png" alt={copy.founder.photoAlt} fill className="object-contain" sizes="(max-width: 440px) calc(100vw - 40px), 384px" /></div>
        <figure><h2 className="text-xs font-bold uppercase leading-6 tracking-[.2em] text-[#946020]">{copy.founder.eyebrow}</h2><blockquote className="mt-6 border-l-2 border-[#d59b46] pl-6 text-xl font-medium leading-9 text-[#061b46] sm:text-2xl sm:leading-10">{copy.founder.quote}</blockquote><figcaption className="mt-7 pl-6"><p className="text-lg font-bold text-[#061b46]">{copy.founder.name}</p><p className="mt-2 text-sm text-slate-600">{copy.founder.role}</p></figcaption><p className="mt-7 pl-6 text-sm leading-7 text-slate-600">{copy.founder.reach}</p><Link href={withLocale("/about", locale)} className="mt-5 inline-flex min-h-12 items-center gap-3 pl-6 text-sm font-bold text-[#061b46] underline underline-offset-4">{copy.founder.link}<span aria-hidden="true">→</span></Link></figure>
      </div>
    </section>

    <section data-home-section="collaboration" className="bg-[#061b46] px-5 py-16 text-white sm:px-8 sm:py-24">
      <div className="mx-auto max-w-7xl border-l-2 border-[#d59b46] pl-6 sm:pl-10"><p className="text-xs font-bold uppercase tracking-[.2em] text-[#e7ba75]">{copy.final.eyebrow}</p><h2 className="mt-5 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">{copy.final.title}</h2><p className="mt-6 max-w-3xl leading-8 text-slate-200">{copy.final.description}</p><div className="mt-9 flex flex-wrap gap-4"><Action href="/contact" locale={locale} variant="gold">{copy.final.contact}</Action><Action href="/partnerships" locale={locale} variant="outline">{copy.final.partnerships}</Action></div></div>
    </section>
  </main><Footer locale={locale} /></>;
}
