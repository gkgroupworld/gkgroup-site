"use client";

import { usePathname, useSearchParams } from "next/navigation";

export function LanguageSwitcher({ locale }) { const alternate = locale === "fr" ? "en" : "fr"; const pathname = usePathname(); const params = new URLSearchParams(useSearchParams().toString()); params.set("lang", alternate); return <a href={`${pathname}?${params.toString()}`} className="text-xs font-bold tracking-wider text-[#061b46] underline underline-offset-4" aria-label={locale === "fr" ? "Switch to English" : "Passer en français"}>{alternate.toUpperCase()}</a>; }
