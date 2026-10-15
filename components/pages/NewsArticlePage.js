import Image from "next/image";
import { InstitutionalFrame, InstitutionalAction } from "@/components/ui/InstitutionalPage";
import { NEWS_CATEGORIES, NEWS_CONTENT } from "@/content/site";
import { formatNewsDate, getNewsImage, getNewsStatus } from "@/lib/news";

export function NewsArticlePage({ item, locale, preview = false }) {
  const copy = NEWS_CONTENT[locale];
  const content = item.content[locale];
  const category = NEWS_CATEGORIES.find(category => category.id === item.category);
  const image = getNewsImage(item);
  const status = getNewsStatus(item);
  const paragraphs = Array.isArray(content.body) ? content.body : content.body.split(/\n\s*\n/);
  const source = item.category === "opportunities" ? { name: item.opportunity.organisation, url: item.opportunity.officialUrl }
    : item.category === "events" ? { name: item.event.organiser, url: item.event.officialUrl } : item.source;
  const facts = item.category === "opportunities" ? [
    [copy.article.region, item.opportunity.region[locale]], [copy.article.type, item.opportunity.type[locale]],
    [copy.article.organisation, item.opportunity.organisation], [copy.article.deadline, item.opportunity.deadline ? formatNewsDate(item.opportunity.deadline, locale) : copy.article.unknown],
    [copy.article.eligibility, item.opportunity.eligibility[locale]], [copy.article.verified, formatNewsDate(item.opportunity.verifiedAt, locale)],
  ] : item.category === "events" ? [
    [copy.article.event, item.event.name[locale]], [copy.article.country, item.event.country[locale]], [copy.article.city, item.event.city],
    [copy.article.dates, [item.event.startsAt, item.event.endsAt].filter(Boolean).map(date => formatNewsDate(date, locale)).join(" — ")],
    [copy.article.organiser, item.event.organiser], [copy.article.registration, item.event.registration?.[locale] || copy.article.unknown],
    [copy.article.verified, formatNewsDate(item.event.verifiedAt, locale)],
  ] : [];
  return <InstitutionalFrame locale={locale}><article className="px-5 py-16 sm:px-8 sm:py-20"><div className="mx-auto max-w-3xl">
    <InstitutionalAction href="/news" locale={locale}>{copy.article.back}</InstitutionalAction>
    <p className="mt-10 text-xs font-bold uppercase tracking-[.2em] text-[#946020]">{category.label[locale]}</p>
    <h1 className="mt-5 break-words text-4xl font-bold tracking-tight text-[#061b46] sm:text-5xl">{content.title}</h1>
    {preview ? <p className="mt-5 border-l-2 border-[#d59b46] bg-[#f5f7fa] p-4 text-sm font-bold text-[#805217]">{locale === "fr" ? "Brouillon — aperçu local uniquement. Non publié ; date de publication à confirmer." : "Draft — local preview only. Unpublished; publication date to be confirmed."}</p>
      : <p className="mt-5 text-sm text-slate-600">{copy.article.published} <time dateTime={item.date}>{formatNewsDate(item.date, locale)}</time></p>}
    {status && <p className="mt-5 border-l-2 border-[#d59b46] pl-4 font-bold text-[#805217]">{copy.statuses[status]}</p>}
    {status !== "archived" && (item.status === "archived" || item.opportunity?.status === "archived") && <p className="mt-3 text-sm text-slate-600">{copy.article.archived}</p>}
    <p className="mt-7 text-lg leading-8 text-slate-600">{content.summary}</p>
    {image && <Image src={image.src} alt={image.alt[locale]} width={image.width} height={image.height} preload className="mt-8 h-auto w-full object-contain" sizes="(max-width: 768px) 100vw, 768px" />}
    {facts.length > 0 && <dl className="mt-10 grid gap-6 border-y border-slate-200 bg-[#f5f7fa] p-6 text-sm leading-7 sm:grid-cols-2">{facts.map(([label, value]) => <div key={label}><dt className="font-bold text-[#061b46]">{label}</dt><dd className="mt-2 whitespace-pre-line break-words text-slate-600">{value}</dd></div>)}</dl>}
    <div className="mt-10 grid gap-6 whitespace-pre-line text-lg leading-8 text-slate-700">{paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>
    {item.relatedEntity && <div className="mt-10"><InstitutionalAction href={item.relatedEntity.href} locale={locale}>{item.relatedEntity.label[locale]}</InstitutionalAction></div>}
    {item.relatedLinks?.length > 0 && <div className="mt-10 flex flex-wrap gap-4">{item.relatedLinks.map(link => <InstitutionalAction key={link.href} href={link.href} locale={locale}>{link.label[locale]}</InstitutionalAction>)}</div>}
    {source && <p className="mt-10 border-t border-slate-200 pt-6 text-sm leading-7"><span className="font-bold text-[#061b46]">{copy.article.source} : </span><a href={source.url} rel="noopener noreferrer" className="break-words text-[#061b46] underline underline-offset-4">{source.name}</a></p>}
    {["opportunities", "events"].includes(item.category) && <p className="mt-7 border-l-2 border-[#d59b46] bg-[#f5f7fa] p-5 text-sm leading-7 text-slate-600">{item.category === "opportunities" ? copy.article.opportunityNotice : copy.article.eventNotice}</p>}
  </div></article></InstitutionalFrame>;
}
