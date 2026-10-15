import { notFound } from "next/navigation";
import { NewsArticlePage } from "@/components/pages/NewsArticlePage";
import { getPublishedArticle, getArticleStructuredData } from "@/lib/news";
import { getLocale } from "@/lib/locale";
import { getPageMetadata } from "@/lib/seo";

export async function generateMetadata({ params, searchParams }) {
  const { slug } = await params;
  const locale = getLocale(await searchParams);
  const item = getPublishedArticle(slug);
  if (!item) notFound();
  const content = item.content[locale];
  const metadata = getPageMetadata(`/news/${item.slug}`, locale, { title: content.title, description: content.summary });
  return { ...metadata, openGraph: { ...metadata.openGraph, type: "article", publishedTime: item.date } };
}

export default async function Page({ params, searchParams }) {
  const { slug } = await params;
  const locale = getLocale(await searchParams);
  const item = getPublishedArticle(slug);
  if (!item) notFound();
  const metadata = getPageMetadata(`/news/${item.slug}`, locale, { title: item.content[locale].title, description: item.content[locale].summary });
  return <><script id="news-article-structured-data" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getArticleStructuredData(item, locale, metadata.alternates.canonical)).replace(/</g, "\\u003c") }} /><NewsArticlePage item={item} locale={locale} /></>;
}
