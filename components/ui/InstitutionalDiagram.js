import { ENTITIES } from "@/content/site";

function Node({ title, description, tone = "light" }) {
  const colors = tone === "root" ? "border-[#e87512] bg-[#061b46] text-white" : "border-slate-200 bg-white text-[#061b46]";
  return <article className={`border p-5 shadow-sm ${colors}`}><h3 className="text-base font-bold">{title}</h3><p className={`mt-2 text-sm leading-6 ${tone === "root" ? "text-slate-200" : "text-slate-600"}`}>{description}</p></article>;
}

export function InstitutionalDiagram({ locale }) {
  const e = Object.fromEntries(ENTITIES.map((entity) => [entity.id, entity]));
  const globalDescription = locale === "fr" ? "Architecture institutionnelle globale" : "Global institutional architecture";
  return <div className="overflow-hidden border border-slate-200 bg-slate-50 p-4 sm:p-8"><div className="mx-auto max-w-3xl"><Node title="GK GROUP" description={globalDescription} tone="root" /><div className="mx-auto h-8 w-px bg-[#e87512]" /><div className="grid gap-5 md:grid-cols-3"><div className="md:col-span-3"><Node title={e["gk-global-group-sarlu"].name} description={e["gk-global-group-sarlu"].kind[locale]} /><div className="mx-auto h-6 w-px bg-slate-300" /><div className="grid gap-4 sm:grid-cols-2"><Node title="GKGT" description={e.gkgt.kind[locale]} /><Node title="GKGM" description={e.gkgm.kind[locale]} /></div></div><Node title="GK NEXUS" description={e["gk-nexus"].kind[locale]} /><Node title="UAB GK-EstTrade" description={e["uab-gk-esttrade"].kind[locale]} /><Node title="GK Danube Trading DOO" description={e["gk-danube-trading"].kind[locale]} /></div></div></div>;
}
