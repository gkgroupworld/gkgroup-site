import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { NEWS_ITEMS } from "@/content/site";
import { NewsArticlePage } from "@/components/pages/NewsArticlePage";
import { getLocale } from "@/lib/locale";

// No preview exists in production, even if an environment flag is accidentally set.
// Development previews require explicit opt-in and a loopback Host header.
export const metadata = { title: "Local draft preview", robots: { index: false, follow: false } };

export default async function Page({ params, searchParams }) {
  if (process.env.NODE_ENV !== "development" || process.env.GK_NEWS_LOCAL_PREVIEW !== "1") notFound();
  const host = (await headers()).get("host") || "";
  if (!/^(?:localhost|127\.0\.0\.1|\[::1\])(?::\d+)?$/.test(host)) notFound();
  const { slug } = await params;
  const item = NEWS_ITEMS.find(entry => entry.slug === slug && entry.status === "draft" && entry.publicationApproved === false);
  if (!item) notFound();
  return <NewsArticlePage item={item} locale={getLocale(await searchParams)} preview />;
}
