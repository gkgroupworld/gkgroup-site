import Image from "next/image";
import { ENTITY_LOGOS } from "@/content/site";

export function EntityCard({ entity, locale }) { const logo = ENTITY_LOGOS[entity.id]; return <article className="border border-slate-200 bg-white p-6 shadow-sm">{logo && <div className="mb-5 flex h-20 items-center border border-slate-100 bg-white p-3"><Image src={logo.src} alt={logo.alt} width={1536} height={1024} className="h-full w-full object-contain" sizes="(max-width: 640px) 100vw, 240px" /></div>}<h3 className="text-base font-bold text-[#061b46]">{entity.name}</h3><p className="mt-3 text-sm leading-6 text-slate-600">{entity.kind[locale]}</p>{entity.location && <p className="mt-4 text-xs font-bold uppercase tracking-wider text-[#e87512]">{entity.location}</p>}</article>; }
