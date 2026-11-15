import { TECHNOLOGY_GALLERY_COPY } from "@/content/technology-gallery";
import Image from "next/image";

export function TechnologyWorkshop({ locale }) {
  const copy = TECHNOLOGY_GALLERY_COPY[locale];

  return <section id="workshop-store" aria-labelledby="workshop-store-title" className="scroll-mt-6 px-5 py-16 sm:px-8 sm:py-20">
    <div className="mx-auto max-w-7xl">
      <p className="text-xs font-bold uppercase tracking-[.18em] text-[#946020]">{copy.workshopEyebrow}</p>
      <h2 id="workshop-store-title" className="mt-3 text-3xl font-bold tracking-tight text-[#061b46] sm:text-4xl">{copy.workshopTitle}</h2>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">{copy.workshopIntro}</p>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">{copy.workshopIllustrations.map((visual) => <figure key={visual.file} className="overflow-hidden border border-slate-200 border-t-2 border-t-[#d59b46] bg-white">
        <Image src={`/technology-illustrations/${visual.file}`} alt={visual.alt} width={1672} height={941} loading="lazy" sizes="(max-width: 639px) calc(100vw - 40px), (max-width: 1023px) calc(100vw - 64px), (max-width: 1343px) calc((100vw - 88px) / 2), 628px" className="h-auto w-full object-contain" />
        <figcaption className="p-5"><span className="text-xs font-bold uppercase tracking-[.14em] text-[#946020]">{copy.workshopIllustrationLabel}</span><p className="mt-2 text-sm font-bold leading-6 text-[#061b46]">{visual.caption}</p></figcaption>
      </figure>)}</div>
    </div>
  </section>;
}
