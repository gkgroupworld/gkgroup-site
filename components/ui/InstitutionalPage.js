import Image from "next/image";
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

export function InstitutionalHero({ eyebrow, title, description }) {
  return <section className={`overflow-hidden bg-[#061b46] text-white ${styles.hero}`}>
    <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.4fr_.6fr] lg:gap-16 lg:py-24">
      <div className={styles.reveal}><p className="text-xs font-bold uppercase leading-6 tracking-[.2em] text-[#e7ba75]">{eyebrow}</p><div aria-hidden="true" className="mt-6 h-px w-16 bg-[#d59b46]" /><h1 className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">{title}</h1><p className="mt-7 max-w-3xl text-lg leading-8 text-slate-200">{description}</p><p className="mt-8 text-xs font-bold leading-6 tracking-[.18em] text-[#e7ba75]">GLOBAL BUSINESS WITHOUT BORDERS</p></div>
      <div className={`mx-auto w-full max-w-sm border border-[#d59b46] bg-white p-5 ${styles.reveal}`}><Image src="/brand/gk-group-official-logo.png" alt="GK GROUP — Global Business Without Borders" width={951} height={762} preload className="h-auto w-full object-contain" sizes="(max-width: 440px) calc(100vw - 82px), 340px" /></div>
    </div>
  </section>;
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
