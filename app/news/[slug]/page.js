import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { NEWS_ITEMS } from "@/content/site";
import { getLocale } from "@/lib/locale";

function getArticle(slug) {
  return NEWS_ITEMS.find((item) => item.slug === slug && item.status === "published");
}

export async function generateMetadata({ params, searchParams }) {
  const { slug } = await params;
  const locale = getLocale(await searchParams);
  const article = getArticle(slug);
  if (!article) return {};
  const content = article.content[locale];
  return { title: content.title, description: content.summary };
}

export default async function Page({ params, searchParams }) {
  const { slug } = await params;
  const locale = getLocale(await searchParams);
  const article = getArticle(slug);
  if (!article) notFound();
  const content = article.content[locale];
  return <><Header locale={locale} /><main className="px-5 py-16 sm:px-8 sm:py-20"><article className="mx-auto max-w-3xl"><p className="text-xs font-bold uppercase tracking-[.2em] text-[#e87512]">{article.category[locale]}</p><h1 className="mt-4 text-4xl font-bold tracking-tight text-[#061b46] sm:text-5xl">{content.title}</h1><p className="mt-6 text-lg leading-8 text-slate-600">{content.summary}</p><div className="mt-10 whitespace-pre-line leading-8 text-slate-700">{content.body}</div></article></main><Footer locale={locale} /></>;
}
