import { InstitutionalBanner } from "@/components/ui/InstitutionalBanner";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { CONTACT, CONTACT_CONTENT, ENTITY_LOGOS } from "@/content/site";
import { TECHNOLOGY_CONTENT } from "@/content/technology";
import { ContactForm } from "@/components/pages/ContactForm";
import { withLocale } from "@/lib/locale";

const buttonClass = "inline-flex min-h-11 items-center justify-center border border-[#d59b46] bg-[#061b46] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#0c3269] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d59b46]";

export function TechnologyPage({ locale }) {
  const copy = TECHNOLOGY_CONTENT[locale];
  const logo = ENTITY_LOGOS.gkgt;
  const contactHref = withLocale("/contact", locale);
  const formCopy = { ...CONTACT_CONTENT[locale], form: { ...CONTACT_CONTENT[locale].form, intro: copy.formIntro, privacy: copy.formPrivacy } };

  return <>
    <Header locale={locale} />
    <main lang={locale}>
      <InstitutionalBanner eyebrow={copy.eyebrow} title={copy.title} description={copy.intro} logo={logo} signature="Building Trust. Connecting Opportunities." />

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
          <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">{copy.steps.map((step, index) => <li key={step} className="border-t-2 border-[#e87512] pt-4"><span aria-hidden="true" className="text-sm font-bold text-[#e87512]">0{index + 1}</span><p className="mt-3 leading-7 text-slate-600">{step}</p></li>)}</ol>
        </div>
      </section>

      <section id="contact" className="px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl border-l-4 border-[#e87512] bg-[#f5f7fa] p-6 sm:p-10">
          <h2 className="text-3xl font-bold text-[#061b46]">{copy.contactTitle}</h2>
          <p className="mt-5 max-w-3xl leading-7 text-slate-600">{copy.contactText}</p>
          <div className="mt-7 flex flex-wrap gap-4"><a href="#contact-form" className={buttonClass} style={{ color: "#ffffff" }}>{copy.project}</a><Link href={contactHref} className={buttonClass} style={{ color: "#ffffff" }}>{copy.partner}</Link></div>
          <address className="mt-7 grid gap-2 text-sm not-italic leading-6 text-slate-600">
            <p>{CONTACT.legalName} · {CONTACT.location}</p>
            <a href={CONTACT.generalEmailHref} className="w-fit underline underline-offset-4">{CONTACT.generalEmail}</a>
            <a href={CONTACT.phoneHref} className="w-fit underline underline-offset-4">{CONTACT.phone}</a>
            <a href={CONTACT.whatsappHref} className="w-fit underline underline-offset-4">WhatsApp: {CONTACT.whatsapp}</a>
          </address>
          <div className="mt-8"><ContactForm copy={formCopy} locale={locale} defaultArea={formCopy.form.options[0]} /></div>
        </div>
      </section>
    </main>
    <Footer locale={locale} />
  </>;
}
