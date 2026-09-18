import Link from "next/link";
import { SITE_COPY } from "@/content/site";
import { withLocale } from "@/lib/locale";

const links = [["/", "home"], ["/about", "about"], ["/architecture", "architecture"], ["/activities", "activities"], ["/entities", "entities"], ["/gk-nexus", "nexus"], ["/news", "news"], ["/contact", "contact"]];
export function Navigation({ locale }) { const copy = SITE_COPY[locale].navigation; return <nav aria-label="Navigation principale" className="hidden items-center gap-4 xl:flex">{links.map(([href, label]) => <Link key={href} href={withLocale(href, locale)} className="whitespace-nowrap text-xs font-bold text-slate-600 transition hover:text-[#e87512]">{copy[label]}</Link>)}</nav>; }
