"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function NotFoundContent() {
  const locale = useSearchParams().get("lang") === "en" ? "en" : "fr";
  const copy = locale === "fr" ? { title: "Page introuvable", text: "La page que vous recherchez n’existe pas ou n’est plus disponible.", cta: "Retour à l’accueil" } : { title: "Page Not Found", text: "The page you are looking for does not exist or is no longer available.", cta: "Back to Home" };
  return <main className="flex min-h-screen items-center bg-[#f5f7fa] px-5 py-16 sm:px-8"><section className="mx-auto w-full max-w-2xl border-l-4 border-[#e87512] bg-white p-8 shadow-sm sm:p-12"><p className="text-xs font-bold uppercase tracking-[.2em] text-[#e87512]">GK GROUP</p><h1 className="mt-5 text-4xl font-bold tracking-tight text-[#061b46] sm:text-5xl">{copy.title}</h1><p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">{copy.text}</p><Link href={`/?lang=${locale}`} className="mt-8 inline-flex min-h-11 items-center justify-center bg-[#e87512] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#c8610a]">{copy.cta}</Link></section></main>;
}

export default function NotFound() { return <Suspense fallback={null}><NotFoundContent /></Suspense>; }
