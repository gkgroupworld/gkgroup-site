import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CTA } from "@/components/ui/CTA";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ACTIVITY_CONTENT } from "@/content/site";
import { withLocale } from "@/lib/locale";

export function ActivitiesPage({ locale }) {
  const copy = ACTIVITY_CONTENT[locale];

  return <><Header locale={locale} /><main>
    <section className="bg-[#061b46] text-white"><div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20"><p className="text-xs font-bold uppercase tracking-[.22em] text-[#f5a24e]">{copy.hero.eyebrow}</p><div className="mt-5 h-px w-12 bg-[#e87512]" /><h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-6xl">{copy.hero.title}</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">{copy.hero.description}</p><p className="mt-8 text-sm font-bold tracking-wide text-[#f5a24e]">{copy.hero.motto}</p></div></section>

    <section className="px-5 py-16 sm:px-8 sm:py-20"><div className="mx-auto max-w-7xl"><SectionTitle eyebrow={copy.domains.eyebrow} title={copy.domains.title} /><div className="grid gap-5 lg:grid-cols-2">{copy.domains.items.map((domain, index) => <article key={domain.title} className={`border border-slate-200 bg-white p-7 sm:p-8 ${index === 4 ? "lg:col-span-2" : ""}`}><div className="flex items-start gap-5"><p className="text-sm font-bold text-[#e87512]">0{index + 1}</p><div><h2 className="text-2xl font-bold tracking-tight text-[#061b46]">{domain.title}</h2><p className="mt-4 leading-7 text-slate-600">{domain.description}</p></div></div><ul className="mt-7 grid gap-3 border-t border-slate-200 pt-6 sm:grid-cols-2">{domain.services.map((service) => <li key={service} className="border-l-2 border-[#e87512] pl-3 text-sm leading-6 text-slate-600">{service}</li>)}</ul><p className="mt-7 text-sm font-bold leading-6 text-[#061b46]">{domain.structures}</p></article>)}</div></div></section>

    <section className="bg-[#f5f7fa] px-5 py-16 sm:px-8 sm:py-20"><div className="mx-auto max-w-7xl"><SectionTitle eyebrow={copy.complementarity.eyebrow} title={copy.complementarity.title} /><p className="max-w-3xl text-lg leading-8 text-slate-600">{copy.complementarity.description}</p><div className="mt-10 border border-slate-200 bg-white p-6 sm:p-10"><div className="grid gap-3 text-center sm:grid-cols-[1fr_auto_1fr_auto_1fr] lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr]">{copy.domains.items.map((domain, index) => <div key={domain.title} className="contents"><p className="border-t-2 border-[#e87512] px-3 py-4 text-sm font-bold text-[#061b46]">{domain.title}</p>{index < copy.domains.items.length - 1 && <p aria-hidden="true" className="hidden self-center text-xl font-bold text-[#e87512] lg:block">+</p>}</div>)}</div><div className="mx-auto mt-7 h-8 w-px bg-[#e87512]" /><p aria-hidden="true" className="text-center text-xl font-bold text-[#e87512]">↓</p><p className="mx-auto mt-4 max-w-2xl bg-[#061b46] px-6 py-5 text-center text-sm font-bold text-white">{copy.complementarity.result}</p></div></div></section>

    <section className="px-5 py-16 sm:px-8 sm:py-20"><div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_.9fr]"><div><SectionTitle eyebrow={copy.structures.eyebrow} title={copy.structures.title} /><p className="max-w-3xl text-lg leading-8 text-slate-600">{copy.structures.description}</p></div><div className="border-l-4 border-[#e87512] bg-[#f5f7fa] p-7 sm:p-8"><nav aria-label={copy.structures.title} className="grid gap-3">{copy.structures.links.map((link) => <CTA key={link.href} href={withLocale(link.href, locale)}>{link.label}</CTA>)}</nav></div></div></section>

    <section className="bg-[#061b46] px-5 py-16 text-white sm:px-8 sm:py-20"><div className="mx-auto max-w-7xl"><p className="text-xs font-bold uppercase tracking-[.2em] text-[#f5a24e]">{copy.international.eyebrow}</p><h2 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">{copy.international.title}</h2><p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">{copy.international.description}</p></div></section>

    <section className="px-5 py-16 sm:px-8 sm:py-20"><div className="mx-auto max-w-7xl border-l-4 border-[#e87512] bg-[#f5f7fa] p-8 sm:flex sm:items-center sm:justify-between sm:gap-8 sm:p-12"><h2 className="max-w-xl text-3xl font-bold tracking-tight text-[#061b46] sm:text-4xl">{copy.final.title}</h2><div className="mt-8 flex flex-wrap gap-4 sm:mt-0"><CTA href={withLocale("/entities", locale)}>{copy.final.entities}</CTA><CTA href={withLocale("/contact", locale)}>{copy.final.contact}</CTA></div></div></section>
  </main><Footer locale={locale} /></>;
}
