import Image from "next/image";
import { SITE_COPY } from "@/content/site";
import { ContactBlock } from "@/components/ui/ContactBlock";

export function Footer({ locale }) { return <footer className="bg-[#03102c] text-white"><div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 sm:px-8 md:grid-cols-2"><div><Image src="/brand/gk-group-official-logo.png" alt="GK GROUP — Global Business Without Borders" width={951} height={762} className="h-24 w-auto bg-white object-contain" sizes="120px" /><p className="mt-3 max-w-sm text-sm leading-6 text-slate-300">{SITE_COPY[locale].footer}</p></div><div className="[&_address]:text-slate-300 [&_strong]:text-white [&_a]:hover:text-[#f5a24e] [&_address_span]:text-slate-300"><ContactBlock locale={locale} /></div></div></footer>; }
