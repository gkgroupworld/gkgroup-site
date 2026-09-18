import Image from "next/image";
import Link from "next/link";
import { ENTITY_LOGOS } from "@/content/site";
import { withLocale } from "@/lib/locale";

export function NewsCard({ item, locale, labels }) {
  const content = item.content[locale];
  const logo = ENTITY_LOGOS[item.structure];
  const date = new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-US", { dateStyle: "long" }).format(new Date(item.date));
  return <article className="border border-slate-200 bg-white p-6 shadow-sm">{item.image && <Image src={item.image} alt="" width={1200} height={675} className="mb-6 h-auto w-full object-cover" />}<p className="text-xs font-bold uppercase tracking-wider text-[#e87512]">{item.category[locale]}</p><time className="mt-3 block text-xs text-slate-500" dateTime={item.date}>{date}</time><h3 className="mt-3 text-xl font-bold text-[#061b46]">{content.title}</h3><p className="mt-3 text-sm leading-6 text-slate-600">{content.summary}</p>{logo && <div className="mt-5 flex items-center gap-3 border-t border-slate-200 pt-4"><Image src={logo.src} alt={logo.alt} width={96} height={64} className="h-10 w-16 object-contain" /><p className="text-xs font-bold text-[#061b46]"><span className="block font-normal text-slate-500">{labels.structure}</span>{item.structureName}</p></div>}<Link href={withLocale(`/news/${item.slug}`, locale)} className="mt-6 inline-flex min-h-11 items-center font-bold text-[#061b46] underline decoration-[#e87512] decoration-2 underline-offset-4 hover:text-[#e87512]">{labels.readMore}</Link></article>;
}
