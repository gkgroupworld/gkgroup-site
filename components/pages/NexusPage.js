import { InstitutionalBanner } from "@/components/ui/InstitutionalBanner";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { CONTACT, ENTITY_LOGOS, NEXUS_CONTENT } from "@/content/site";
import { withLocale } from "@/lib/locale";

const cardClass = "border border-slate-200 border-t-2 border-t-[#d59b46] bg-white p-6 sm:p-8";
const buttonClass = "inline-flex min-h-11 items-center justify-center border border-[#d59b46] bg-[#061b46] px-5 py-3 text-sm font-bold transition hover:bg-[#0c3269] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d59b46]";

function Items({ items }) {
  return <ul className="mt-6 grid gap-4">{items.map((item) => <li key={item} className="border-l-2 border-[#e87512] pl-3 text-sm leading-6 text-slate-600">{item}</li>)}</ul>;
}

function FunctionalDiagram({ copy, locale }) {
  return <div className="mt-8 border border-slate-200 bg-white p-5 text-center sm:p-8">
    <div className="mx-auto max-w-xl bg-[#061b46] px-6 py-5 text-white"><p className="font-bold">GK GROUP</p><p className="mt-2 text-sm text-slate-200">{copy.brand}</p></div>
    <div aria-hidden="true" className="mx-auto h-8 w-px border-l border-dashed border-[#e87512]" />
    <div className="mx-auto max-w-xl border-2 border-dashed border-[#d59b46] bg-[#f5f7fa] px-6 py-5"><p className="font-bold text-[#061b46]">GK NEXUS Sh.p.k.</p><p className="mt-2 text-sm leading-6 text-slate-600">{copy.coordination}</p><p className="mt-3 text-sm font-bold text-[#061b46]">{copy.pending}</p></div>
    <div aria-hidden="true" className="mx-auto h-8 w-px border-l border-dashed border-[#e87512]" />
    <div className="grid gap-4 md:grid-cols-3">
      <div className="border border-slate-200 p-5 text-sm font-bold text-[#061b46]">GK GLOBAL GROUP SARL U<div className="mt-4 grid gap-3 border-t border-slate-200 pt-4"><Link href={withLocale("/gk-global-technology", locale)} className="inline-flex min-h-11 items-center justify-center underline underline-offset-4">GKGT</Link><Link href={withLocale("/gk-global-mobility", locale)} className="inline-flex min-h-11 items-center justify-center underline underline-offset-4">GKGM</Link></div></div>
      <Link href={withLocale("/gk-esttrade", locale)} className="border border-slate-200 p-5 text-sm font-bold text-[#061b46] underline underline-offset-4">UAB GK EstTrade</Link>
      <div className="border border-dashed border-slate-300 p-5 text-sm text-[#061b46]"><p className="font-bold">GK Danube Trading DOO</p><p className="mt-3 leading-6 text-slate-600">{copy.serbia}</p></div>
    </div>
  </div>;
}

export function NexusPage({ locale }) {
  const copy = NEXUS_CONTENT[locale];
  const logo = ENTITY_LOGOS["gk-nexus"];
  const sections = [["vocation", copy.vocation.title], ["role", copy.role.title], ["albania", copy.albania.title], ["coordination", copy.diagram.title], ["value", copy.value.title], ["interactions", copy.interactions.title], ["vision", copy.vision.title]];
  return <>
    <Header locale={locale} />
    <main lang={locale}>
      <InstitutionalBanner eyebrow={copy.hero.eyebrow} title={copy.hero.title} description={copy.hero.description} logo={logo} note={copy.hero.location} signature="Building Trust. Connecting Opportunities." />

      <section className="bg-[#f5f7fa] px-5 py-12 sm:px-8"><div className="mx-auto max-w-7xl border-l-4 border-[#e87512] pl-6"><h2 className="text-2xl font-bold text-[#061b46]">{copy.identityTitle}</h2><div className="mt-5 grid gap-3 text-base leading-7 text-slate-600">{copy.identity.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></div></section>
      <nav aria-label={copy.contents} className="border-b border-slate-200 px-5 py-8 sm:px-8"><div className="mx-auto max-w-7xl"><p className="font-bold text-[#061b46]">{copy.contents}</p><ul className="mt-4 flex flex-wrap gap-3">{sections.map(([id, title]) => <li key={id}><a href={`#${id}`} className="inline-flex min-h-11 items-center border border-slate-300 px-4 py-2 text-sm font-bold text-[#061b46] hover:bg-slate-100">{title}</a></li>)}</ul></div></nav>

      <section id="vocation" className="scroll-mt-6 px-5 py-16 sm:px-8 sm:py-20"><div className="mx-auto max-w-7xl"><SectionTitle eyebrow={copy.vocation.eyebrow} title={copy.vocation.title} /><div className="grid gap-6 lg:grid-cols-2">{[copy.vocation.corporate, copy.vocation.operations].map((part) => <article key={part.title} className={cardClass}><h3 className="text-2xl font-bold tracking-tight text-[#061b46]">{part.title}</h3>{part.description && <p className="mt-4 leading-7 text-slate-600">{part.description}</p>}<Items items={part.items} /></article>)}</div></div></section>

      <div className="mx-auto grid max-w-7xl gap-6 px-5 pb-16 sm:px-8 sm:pb-20">
        {[["role", copy.role], ["albania", copy.albania]].map(([id, part]) => <section key={id} id={id} className={`scroll-mt-6 ${cardClass}`}><SectionTitle eyebrow={part.eyebrow} title={part.title} /><p className="max-w-3xl leading-7 text-slate-600">{part.description}</p><Items items={part.items} />{id === "role" && <div className="mt-7"><Link href={withLocale("/architecture", locale)} className={buttonClass} style={{ color: "#ffffff" }}>{copy.role.cta}</Link></div>}</section>)}
      </div>

      <section id="coordination" className="scroll-mt-6 bg-[#f5f7fa] px-5 py-16 sm:px-8 sm:py-20"><div className="mx-auto max-w-7xl"><SectionTitle eyebrow={copy.diagram.eyebrow} title={copy.diagram.title} /><FunctionalDiagram copy={copy.diagram} locale={locale} /><p className="mt-6 max-w-3xl text-sm leading-6 text-slate-600">{copy.diagram.note}</p></div></section>
      <section id="value" className="scroll-mt-6 px-5 py-16 sm:px-8 sm:py-20"><div className="mx-auto max-w-7xl"><SectionTitle eyebrow={copy.value.eyebrow} title={copy.value.title} /><ol className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">{copy.value.steps.map((step, index) => <li key={step} className="border-t-2 border-[#e87512] pt-4"><span aria-hidden="true" className="text-sm font-bold text-[#e87512]">0{index + 1}</span><p className="mt-3 text-sm leading-7 text-slate-600">{step}</p></li>)}</ol></div></section>
      <section id="interactions" className="scroll-mt-6 bg-[#f5f7fa] px-5 py-16 sm:px-8 sm:py-20"><div className="mx-auto max-w-7xl"><SectionTitle eyebrow={copy.interactions.eyebrow} title={copy.interactions.title} /><p className="mb-8 max-w-3xl leading-7 text-slate-600">{copy.interactions.description}</p><div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">{copy.interactions.items.map((item) => <article key={item.name} className={cardClass}><h3 className="text-xl font-bold text-[#061b46]">{item.name}</h3><p className="mt-4 text-sm leading-6 text-slate-600">{item.text}</p></article>)}</div></div></section>
      <section id="vision" className="scroll-mt-6 px-5 py-16 sm:px-8 sm:py-20"><div className="mx-auto max-w-7xl border-l-4 border-[#e87512] bg-[#f5f7fa] p-6 sm:p-10"><SectionTitle eyebrow={copy.vision.eyebrow} title={copy.vision.title} /><p className="max-w-3xl leading-7 text-slate-600">{copy.vision.description}</p></div></section>
      <section id="contact" className="px-5 pb-16 sm:px-8 sm:pb-20"><div className="mx-auto max-w-7xl border-l-4 border-[#e87512] bg-[#f5f7fa] p-6 sm:p-10"><h2 className="text-3xl font-bold text-[#061b46]">{copy.final.title}</h2><p className="mt-5 max-w-3xl leading-7 text-slate-600">{copy.final.description}</p><div className="mt-7 flex flex-wrap gap-4"><Link href={withLocale("/entities", locale)} className={buttonClass} style={{ color: "#ffffff" }}>{copy.final.entities}</Link><Link href={withLocale("/contact", locale)} className={buttonClass} style={{ color: "#ffffff" }}>{copy.final.contact}</Link></div><address className="mt-7 grid gap-2 text-sm not-italic leading-6 text-slate-600"><p>{CONTACT.legalName} · {CONTACT.location}</p><a href={CONTACT.generalEmailHref} className="w-fit underline underline-offset-4">{CONTACT.generalEmail}</a><a href={CONTACT.phoneHref} className="w-fit underline underline-offset-4">{CONTACT.phone}</a></address></div></section>
    </main>
    <Footer locale={locale} />
  </>;
}
