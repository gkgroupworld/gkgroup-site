import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CTA } from "@/components/ui/CTA";
import { NewsCard } from "@/components/ui/NewsCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { NEWS_CONTENT, NEWS_ITEMS } from "@/content/site";
import { withLocale } from "@/lib/locale";

export function NewsPage({ locale }) {
  const copy = NEWS_CONTENT[locale];
  const published = NEWS_ITEMS.filter((item) => item.status === "published");
  return <><Header locale={locale} /><main>
    <section className="bg-[#061b46] text-white"><div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20"><p className="text-xs font-bold uppercase tracking-[.22em] text-[#f5a24e]">GK GROUP</p><div className="mt-5 h-px w-12 bg-[#e87512]" /><h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-6xl">{copy.hero.title}</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">{copy.hero.description}</p><p className="mt-8 text-sm font-bold tracking-wide text-[#f5a24e]">{copy.hero.signature}</p></div></section>
    <section className="px-5 py-16 sm:px-8 sm:py-20"><div className="mx-auto max-w-7xl">{published.length > 0 ? <><SectionTitle eyebrow={copy.latest.eyebrow} title={copy.latest.title} /><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{published.map((item) => <NewsCard key={item.id} item={item} locale={locale} labels={copy.latest} />)}</div></> : <div className="border-l-4 border-[#e87512] bg-[#f5f7fa] p-8 sm:p-12"><p className="text-xs font-bold uppercase tracking-[.2em] text-[#e87512]">{copy.state.eyebrow}</p><h2 className="mt-4 text-3xl font-bold tracking-tight text-[#061b46] sm:text-4xl">{copy.state.title}</h2><p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">{copy.state.description}</p></div>}</div></section>
    <section className="bg-[#f5f7fa] px-5 py-16 sm:px-8 sm:py-20"><div className="mx-auto max-w-7xl border-l-4 border-[#e87512] bg-white p-8 sm:flex sm:items-center sm:justify-between sm:gap-8 sm:p-12"><div><h2 className="max-w-xl text-3xl font-bold tracking-tight text-[#061b46] sm:text-4xl">{copy.stayInformed.title}</h2><p className="mt-4 max-w-2xl leading-7 text-slate-600">{copy.stayInformed.description}</p></div><div className="mt-8 sm:mt-0"><CTA href={withLocale("/contact", locale)}>{copy.stayInformed.cta}</CTA></div></div></section>
  </main><Footer locale={locale} /></>;
}
