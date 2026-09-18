import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SITE_COPY } from "@/content/site";

export function InformationPage({ locale, title }) { return <><Header locale={locale} /><main className="mx-auto min-h-[55vh] max-w-7xl px-5 py-20 sm:px-8"><p className="text-xs font-bold uppercase tracking-[.2em] text-[#e87512]">GK GROUP</p><h1 className="mt-4 text-4xl font-bold text-[#061b46] sm:text-5xl">{title}</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">{SITE_COPY[locale].comingSoon}</p></main><Footer locale={locale} /></>; }
