import Image from "next/image";

const photos = [
  ["01_20181030_170129.webp", "Vue d'un atelier informatique", "View of an IT workshop"],
  ["02_20181030_170143.webp", "Équipements et espace de travail", "Equipment and workspace"],
  ["06_20211013_095534.webp", "Moniteurs informatiques", "Computer monitors"],
  ["11_IMG-20181112-WA0042.webp", "Composant électronique", "Electronic component"],
  ["12_IMG-20181122-WA0004.webp", "Carte électronique en cours d'intervention", "Circuit board during servicing"],
  ["14_IMG-20190301-WA0000.webp", "Matériel informatique en atelier", "IT equipment in a workshop"],
  ["16_IMG-20210728-WA0002(1).webp", "Ensemble d'unités centrales disposées à l'extérieur", "Desktop computer units arranged outdoors"],
  ["18_IMG_20180329_095427.webp", "Étagères de composants et d'équipements informatiques", "Shelves of computer components and equipment"],
  ["20_IMG_20190125_120103_9.webp", "Ordinateur portable ouvert, clavier démonté et outils de réparation", "Open laptop with detached keyboard and repair tools"],
  ["21_IMG_20190214_073458_8.webp", "Ordinateur et périphériques", "Computer and peripherals"],
  ["23_IMG_20190308_092807_2.webp", "Intervention technique sur un composant à l'établi", "Technical work on a component at a workbench"],
  ["24_IMG_20190308_092825_7.webp", "Manipulation d'une carte électronique dans un atelier informatique", "Handling a circuit board in a computer workshop"],
];

export function TechnicalArchiveGallery({ locale = "fr" }) {
  const en = locale === "en";
  return (
    <section id="technical-archives" aria-labelledby="technical-archives-title" className="bg-[#f5f7fa] px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-bold uppercase tracking-[.18em] text-[#946020]">{en ? "Our archives" : "Nos archives"}</p>
        <h2 id="technical-archives-title" className="mt-3 text-3xl font-bold text-[#061b46] sm:text-4xl">{en ? "Our History and Technical Expertise" : "Notre histoire et notre expertise technique"}</h2>
        <p className="mt-5 max-w-4xl text-lg leading-8 text-slate-600">{en ? "These photographs illustrate the technical experience and entrepreneurial development at the origins of GK GROUP, through historical IT maintenance, diagnostics, repair and equipment preparation activities. GK Informatique refers to a historical activity, not a currently operating separate company." : "Ces photographies illustrent l'expérience technique et l'évolution entrepreneuriale à l'origine de GK GROUP, à travers des activités historiques de maintenance informatique, de diagnostic, de réparation et de préparation d'équipements. GK Informatique désigne une activité historique, et non une société distincte actuellement active."}</p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {photos.map(([file, fr, english]) => (
            <figure key={file} className="overflow-hidden border border-slate-200 border-t-2 border-t-[#d59b46] bg-white">
              <div className="relative aspect-[4/3] bg-slate-100">
                <Image src={`/archives-techniques/${file}`} alt={en ? english : fr} fill loading="lazy" sizes="(max-width: 639px) calc(100vw - 40px), (max-width: 1023px) calc((100vw - 88px) / 2), (max-width: 1343px) calc((100vw - 112px) / 3), 411px" className="object-contain" />
              </div>
              <figcaption className="px-4 py-4 text-sm font-medium text-[#061b46]">{en ? english : fr}</figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-8 text-sm leading-7 text-slate-600">{en ? "Historical activity archives; these images do not necessarily represent current facilities. Dates and locations have not been independently verified." : "Archives d'activités historiques : ces images ne représentent pas nécessairement les installations actuelles. Les dates et lieux n'ont pas été vérifiés indépendamment."}</p>
      </div>
    </section>
  );
}
