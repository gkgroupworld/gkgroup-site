import Image from "next/image";
import Link from "next/link";
import { ENTITY_LOGOS, NEWS_CATEGORIES, NEWS_CONTENT } from "@/content/site";
import { formatNewsDate, getNewsImage, getNewsStatus } from "@/lib/news";
import { withLocale } from "@/lib/locale";

export function NewsCard({ item, locale, labels }) {
  const content = item.content[locale];
  const logo = ENTITY_LOGOS[item.structure];
  const category = NEWS_CATEGORIES.find(category => category.id === item.category);
  const image = getNewsImage(item);
  const status = getNewsStatus(item);
  return <article data-news-card className="flex min-w-0 flex-col border border-slate-200 border-t-2 border-t-[#d59b46] bg-white p-6 shadow-sm">
    {image && <Image src={image.src} alt={image.alt[locale]} width={image.width} height={image.height} className="mb-6 h-auto w-full object-contain" sizes="(max-width: 768px) 100vw, 400px" />}
    <p className="text-xs font-bold uppercase tracking-wider text-[#946020]">{category.label[locale]}</p>
    <time className="mt-3 block text-xs text-slate-500" dateTime={item.date}>{formatNewsDate(item.date, locale)}</time>
    {status && <p className="mt-3 border-l-2 border-[#d59b46] pl-3 text-sm font-bold text-[#805217]">{NEWS_CONTENT[locale].statuses[status]}</p>}
    {status !== "archived" && (item.status === "archived" || item.opportunity?.status === "archived") && <p className="mt-2 text-sm text-slate-600">{NEWS_CONTENT[locale].article.archived}</p>}
    <h3 className="mt-4 break-words text-xl font-bold text-[#061b46]">{content.title}</h3><p className="mb-6 mt-3 text-sm leading-7 text-slate-600">{content.summary}</p>
    {logo && item.structureName && <div className="mb-5 flex items-center gap-3 border-t border-slate-200 pt-4"><Image src={logo.src} alt={logo.alt} width={96} height={64} className="h-10 w-16 object-contain" /><p className="text-xs font-bold text-[#061b46]"><span className="block font-normal text-slate-500">{labels.structure}</span>{item.structureName}</p></div>}
    <Link href={withLocale(`/news/${item.slug}`, locale)} className="mt-auto inline-flex min-h-12 items-center font-bold text-[#061b46] underline decoration-[#946020] decoration-2 underline-offset-4">{labels.readMore}<span className="sr-only"> · {content.title}</span></Link>
  </article>;
}
