import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { CONTACT, ENTITY_LOGOS } from "@/content/site";
import { MOBILITY_CONTENT } from "@/content/mobility";
import { withLocale } from "@/lib/locale";

const buttonClass = "inline-flex min-h-11 items-center justify-center border border-[#d59b46] bg-[#061b46] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#0c3269] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d59b46]";

export function MobilityPage({ locale }) {
  const copy = MOBILITY_CONTENT[locale];
  const logo = ENTITY_LOGOS.gkgm;
  const contactHref = withLocale("/contact", locale);

  return <>
    <Header locale={locale} />
    <main lang={locale}>
      <section className="bg-[#061b46] text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.4fr_.6fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.22em] text-[#f5a24e]">{copy.eyebrow}</p>
            <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">{copy.title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">{copy.intro}</p>
            <p className="mt-8 text-sm font-bold tracking-wide text-[#f5a24e]">Building Trust. Connecting Opportunities.</p>
          </div>
          <div className="border border-[#d59b46] bg-[#d4e1ea] p-5">
            <Image src={logo.src} alt={logo.alt} width={1536} height={1024} priority className="h-auto w-full object-contain" sizes="(max-width: 1024px) 100vw, 360px" />
          </div>
        </div>
      </section>

      <section className="bg-[#f5f7fa] px-5 py-12 sm:px-8">
        <div className="mx-auto max-w-7xl border-l-4 border-[#e87512] pl-6">
          <h2 className="text-2xl font-bold text-[#061b46]">{copy.identityTitle}</h2>
          <div className="mt-5 grid gap-3 text-base leading-7 text-slate-600">{copy.identity.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
        </div>
      </section>

      <nav aria-label={copy.contents} className="border-b border-slate-200 px-5 py-8 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="font-bold text-[#061b46]">{copy.contents}</p>
          <ul className="mt-4 flex flex-wrap gap-3">{copy.sections.map((section) => <li key={section.id}><a href={`#${section.id}`} className="inline-flex min-h-11 items-center border border-slate-300 px-4 py-2 text-sm font-bold text-[#061b46] hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#061b46]">{section.title}</a></li>)}</ul>
        </div>
      </nav>

      <div className="mx-auto grid max-w-7xl gap-6 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-2">
        {copy.sections.map((section) => <section key={section.id} id={section.id} aria-labelledby={`${section.id}-title`} className="scroll-mt-6 border border-slate-200 border-t-2 border-t-[#d59b46] bg-white p-6 sm:p-8">
          <h2 id={`${section.id}-title`} className="text-2xl font-bold tracking-tight text-[#061b46]">{section.title}</h2>
          <p className="mt-4 leading-7 text-slate-600">{section.description}</p>
          <ul className="mt-6 grid gap-4">{section.items.map((item) => <li key={item} className="border-l-2 border-[#e87512] pl-3 text-sm leading-6 text-slate-600">{item}</li>)}</ul>
          <div className="mt-7 border-t border-slate-200 pt-5">
            <h3 className="text-sm font-bold text-[#061b46]">{copy.boundary}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{section.limit}</p>
          </div>
        </section>)}
      </div>

      <section className="bg-[#f5f7fa] px-5 py-12 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle title={copy.stepsTitle} />
          <ol className="grid gap-6 md:grid-cols-3">{copy.steps.map((step, index) => <li key={step} className="border-t-2 border-[#e87512] pt-4"><span aria-hidden="true" className="text-sm font-bold text-[#e87512]">0{index + 1}</span><p className="mt-3 leading-7 text-slate-600">{step}</p></li>)}</ol>
        </div>
      </section>

      <section id="contact" className="px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl border-l-4 border-[#e87512] bg-[#f5f7fa] p-6 sm:p-10">
          <h2 className="text-3xl font-bold text-[#061b46]">{copy.contactTitle}</h2>
          <p className="mt-5 max-w-3xl leading-7 text-slate-600">{copy.contactText}</p>
          <div className="mt-7 flex flex-wrap gap-4"><Link href={contactHref} className={buttonClass} style={{ color: "#ffffff" }}>{copy.project}</Link><Link href={contactHref} className={buttonClass} style={{ color: "#ffffff" }}>{copy.partner}</Link></div>
          <address className="mt-7 grid gap-2 text-sm not-italic leading-6 text-slate-600">
            <p>{CONTACT.legalName} · {CONTACT.location}</p>
            <a href={CONTACT.generalEmailHref} className="w-fit underline underline-offset-4">{CONTACT.generalEmail}</a>
            <a href={CONTACT.phoneHref} className="w-fit underline underline-offset-4">{CONTACT.phone}</a>
          </address>
        </div>
      </section>
    </main>
    <Footer locale={locale} />
  </>;
}
