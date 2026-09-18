export function SectionTitle({ eyebrow, title, centered = false }) {
  return <div className={`mb-10 ${centered ? "text-center" : ""}`}><p className="mb-3 text-xs font-bold uppercase tracking-[.2em] text-[#e87512]">{eyebrow}</p><h2 className="max-w-3xl text-3xl font-bold tracking-tight text-[#061b46] sm:text-4xl">{title}</h2></div>;
}
