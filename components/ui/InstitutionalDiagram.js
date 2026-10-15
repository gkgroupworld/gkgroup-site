import Image from "next/image";
import Link from "next/link";
import { ENTITY_LOGOS } from "@/content/site";
import { ARCHITECTURE_COPY, ARCHITECTURE_ENTITIES } from "@/content/architecture";
import styles from "@/components/pages/Architecture.module.css";

export function InstitutionalDiagram({ locale }) {
  const copy = ARCHITECTURE_COPY[locale];
  const companies = ARCHITECTURE_ENTITIES.filter(entity => !entity.branch);
  return <figure aria-label={copy.diagramLabel} aria-describedby="architecture-legend">
    <div className="border border-slate-200 bg-[#f5f7fa] p-4 sm:p-8">
      <div className="mx-auto max-w-xl border-t-2 border-[#d59b46] bg-[#061b46] px-6 py-7 text-center text-white">
        <p className="text-xs font-bold uppercase tracking-[.18em] text-[#f5a24e]">{copy.brand}</p>
        <h3 className="mt-3 text-3xl font-bold tracking-wide">GK GROUP</h3>
        <p className="mt-3 text-sm text-slate-200">Global Business Without Borders</p>
        <p className="mt-4 text-sm leading-6 text-slate-200">{copy.brandStatus}</p>
      </div>
      <div aria-hidden="true" className="mx-auto hidden h-10 w-px border-l border-dashed border-[#d59b46] xl:block" />
      <ul className={`relative mt-6 grid gap-6 md:grid-cols-2 xl:mt-0 xl:grid-cols-4 xl:gap-5 ${styles.nationalGrid}`}>
        {companies.map((entity, index) => {
          const logo = ENTITY_LOGOS[entity.id];
          return <li key={entity.id} data-architecture-entity={entity.id} className={`relative min-w-0 xl:pt-8 ${styles.entityGroup} ${styles.reveal}`} style={{ "--reveal-delay": `${index * 65}ms` }}>
            <div aria-hidden="true" className="absolute left-1/2 top-0 hidden h-8 border-l border-dashed border-[#d59b46] xl:block" />
            <div className={`border border-slate-200 border-t-2 border-t-[#d59b46] bg-white p-5 ${styles.card}`}>
              <p className="text-xs font-bold uppercase tracking-[.18em] text-[#9b651f]">{entity.country[locale]}</p>
              <div className="mt-4 flex h-20 items-center justify-center bg-[#f5f7fa] p-2"><Image src={logo.src} alt={logo.alt} width={1536} height={1024} className="h-full w-full object-contain" sizes="(max-width: 768px) 240px, 200px" /></div>
              <h3 className="mt-5 text-lg font-bold leading-6 text-[#061b46]">{entity.name}</h3>
              <p className={`mt-3 border-l-2 pl-3 text-xs font-bold leading-5 ${entity.project ? "border-[#d59b46] text-[#805217]" : "border-slate-300 text-slate-600"}`}>{entity.status[locale]}</p>
              <p className="mt-4 text-sm leading-6 text-slate-600">{entity.summary[locale]}</p>
              <Link href={`#profile-${entity.id}`} className="mt-4 inline-flex min-h-11 items-center text-sm font-bold text-[#061b46] underline underline-offset-4">{copy.detailLink}<span aria-hidden="true" className="ml-2">↓</span><span className="sr-only"> · {entity.name}</span></Link>
            </div>
            {entity.branches && <div className="mx-3">
              <div aria-hidden="true" className="mx-auto h-6 w-px bg-[#d59b46]" />
              <p className="mb-3 text-center text-xs font-bold leading-5 text-[#061b46]">{copy.branches}</p>
              <ul className="grid gap-3 border-l-2 border-[#d59b46] pl-3">
                {entity.branches.map(id => {
                  const branch = ARCHITECTURE_ENTITIES.find(item => item.id === id);
                  return <li key={id} data-architecture-branch={id}><Link href={`#profile-${id}`} className={`block border border-slate-200 bg-white p-4 transition-colors ${styles.branchLink}`}><span className="font-bold text-[#061b46]">{branch.shortName}</span><span className="mt-2 block text-xs leading-5 text-slate-600">{branch.summary[locale]}</span></Link></li>;
                })}
              </ul>
            </div>}
          </li>;
        })}
      </ul>
    </div>
    <figcaption id="architecture-legend" className="mt-6 grid gap-3 text-sm leading-6 text-slate-600">
      <p className="flex items-start gap-3"><span aria-hidden="true" className="mt-3 w-8 shrink-0 border-t border-dashed border-[#b58032]" />{copy.legendBrand}</p>
      <p className="flex items-start gap-3"><span aria-hidden="true" className="mt-3 w-8 shrink-0 border-t-2 border-[#b58032]" />{copy.legendBranch}</p>
    </figcaption>
  </figure>;
}
