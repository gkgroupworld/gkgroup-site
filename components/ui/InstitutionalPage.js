import { InstitutionalBanner } from "./InstitutionalBanner";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { withLocale } from "@/lib/locale";
// Reuse the approved homepage's scoped visual language without changing it.
import styles from "@/components/pages/Home.module.css";

export { styles as institutionalStyles };

export function InstitutionalFrame({ locale, children }) {
  return <><Header locale={locale} /><main lang={locale}>{children}</main><Footer locale={locale} /></>;
}

export function InstitutionalHero(props) {
  return <InstitutionalBanner {...props} signature="GLOBAL BUSINESS WITHOUT BORDERS" />;
}

export function InstitutionalHeading({ eyebrow, title, dark = false }) {
  return <div className={dark ? styles.darkHeading : styles.heading}><SectionTitle eyebrow={eyebrow} title={title} /></div>;
}

export function InstitutionalAction({ href, locale, children, variant = "navy" }) {
  const tone = variant === "gold" ? "border-[#d59b46] bg-[#d59b46] hover:bg-[#e7ba75]" : variant === "outline" ? "border-white/50 bg-transparent hover:bg-white/10" : "border-[#061b46] bg-[#061b46] hover:bg-[#0c3269]";
  return <Link href={withLocale(href, locale)} className={`inline-flex min-h-12 items-center justify-center gap-3 border px-5 py-3 text-sm font-bold transition-colors ${tone}`} style={{ color: variant === "gold" ? "#061b46" : "#ffffff" }}>{children}<span aria-hidden="true">→</span></Link>;
}

export function InstitutionalClosing({ locale, copy }) {
  return <section className="bg-[#061b46] px-5 py-16 text-white sm:px-8 sm:py-24"><div className="mx-auto max-w-7xl border-l-2 border-[#d59b46] pl-6 sm:pl-10"><InstitutionalHeading eyebrow={copy.eyebrow} title={copy.title} dark /><p className="max-w-3xl leading-8 text-slate-200">{copy.description}</p><div className="mt-8 flex flex-wrap gap-4">{copy.links.map((link, index) => <InstitutionalAction key={link.href} href={link.href} locale={locale} variant={index === 0 ? "gold" : "outline"}>{link.label}</InstitutionalAction>)}</div></div></section>;
}
