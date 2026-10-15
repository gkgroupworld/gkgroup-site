import Link from "next/link";
import { InstitutionalBanner } from "@/components/ui/InstitutionalBanner";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CTA } from "@/components/ui/CTA";
import { NewsCard } from "@/components/ui/NewsCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { NEWS_CONTENT, NEWS_CATEGORIES } from "@/content/site";
import { filterNewsByCategory, getPublishedNews, normalizeNewsCategory } from "@/lib/news";
import { withLocale } from "@/lib/locale";

export function NewsPage({ locale, category }) {
  const copy = NEWS_CONTENT[locale];
  const selected = normalizeNewsCategory(category);
  const published = getPublishedNews();
  const items = filterNewsByCategory(published, selected);
  const filters = [{ id: "all", label: { [locale]: copy.filters.all } }, ...NEWS_CATEGORIES];
  const selectedCategory = NEWS_CATEGORIES.find(item => item.id === selected);
  return <><Header locale={locale} /><main lang={locale}>
    <InstitutionalBanner eyebrow="GK GROUP" title={copy.hero.title} description={copy.hero.description} signature={copy.hero.signature} />
    <section id="publications" className="scroll-mt-6 px-5 py-16 sm:px-8 sm:py-20"><div className="mx-auto max-w-7xl">
      <p className="mb-10 max-w-4xl text-lg leading-8 text-slate-600">{copy.intro}</p>
      <SectionTitle eyebrow={copy.latest.eyebrow} title={copy.latest.title} />
      <nav aria-label={copy.filters.label} className="mb-7 flex flex-wrap gap-3">{filters.map(filter => <Link key={filter.id} href={`${withLocale("/news", locale)}${filter.id === "all" ? "" : `&category=${filter.id}`}#publications`} aria-current={selected === filter.id ? "page" : undefined} style={{ color: selected === filter.id ? "#ffffff" : "#061b46" }} className={`inline-flex min-h-12 max-w-full items-center border px-4 py-3 text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#946020] ${selected === filter.id ? "border-[#061b46] bg-[#061b46] text-white" : "border-slate-300 bg-white text-[#061b46] hover:border-[#946020]"}`}>{filter.label[locale]}</Link>)}</nav>
      {selectedCategory && <p className="mb-6 max-w-4xl text-sm leading-7 text-slate-600">{selectedCategory.description[locale]}</p>}
      <p role="status" className="mb-6 text-sm text-slate-600">{items.length} {items.length === 1 ? "publication" : "publications"}</p>
      {items.length > 0 ? <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{items.map(item => <NewsCard key={item.id} item={item} locale={locale} labels={copy.latest} />)}</div> : <div data-news-empty className="border-l-4 border-[#d59b46] bg-[#f5f7fa] p-8 sm:p-12"><p className="text-xs font-bold uppercase tracking-[.2em] text-[#946020]">{copy.state.eyebrow}</p><h3 className="mt-4 text-2xl font-bold tracking-tight text-[#061b46] sm:text-3xl">{selected === "all" ? copy.state.title : copy.filters.emptyTitle}</h3><p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">{selected === "all" ? copy.state.description : copy.filters.emptyDescription}</p></div>}
    </div></section>
    <section className="bg-[#f5f7fa] px-5 py-16 sm:px-8 sm:py-20"><div className="mx-auto max-w-7xl border-l-4 border-[#d59b46] bg-white p-8 sm:flex sm:items-center sm:justify-between sm:gap-8 sm:p-12"><div><h2 className="max-w-xl text-3xl font-bold tracking-tight text-[#061b46] sm:text-4xl">{copy.stayInformed.title}</h2><p className="mt-4 max-w-2xl leading-7 text-slate-600">{copy.stayInformed.description}</p></div><div className="mt-8 sm:mt-0"><CTA href={withLocale("/contact", locale)}>{copy.stayInformed.cta}</CTA></div></div></section>
  </main><Footer locale={locale} /></>;
}
