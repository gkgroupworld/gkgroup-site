import { TECHNOLOGY_GALLERY_COPY } from "@/content/technology-gallery";

export function TechnologyWorkshop({ locale }) {
  const copy = TECHNOLOGY_GALLERY_COPY[locale];

  return <section id="workshop-store" aria-labelledby="workshop-store-title" className="scroll-mt-6 px-5 py-16 sm:px-8 sm:py-20">
    <div className="mx-auto max-w-7xl">
      <p className="text-xs font-bold uppercase tracking-[.18em] text-[#946020]">{copy.workshopEyebrow}</p>
      <h2 id="workshop-store-title" className="mt-3 text-3xl font-bold tracking-tight text-[#061b46] sm:text-4xl">{copy.workshopTitle}</h2>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">{copy.workshopIntro}</p>
      {/* Add only approved, authentic recent photographs here when supplied. */}
      <p className="mt-8 max-w-4xl border-l-2 border-[#d59b46] bg-[#f5f7fa] p-6 text-sm leading-7 text-slate-600">{copy.workshopPending}</p>
    </div>
  </section>;
}
