import Image from "next/image";
import styles from "../pages/Home.module.css";

export const GROUP_BANNER_LOGO = {
  src: "/brand/gk-group-official-logo.png",
  alt: "GK GROUP — Global Business Without Borders",
  width: 951,
  height: 762,
};

// Height follows real content. Text-only layout is available when no logo exists.
// Actions are supplied by callers so destinations, labels and behaviour are preserved.
export function InstitutionalBanner({ title, description, eyebrow, logo = GROUP_BANNER_LOGO, signature, note, actions, layout = logo ? "split" : "text", ...sectionProps }) {
  return <section {...sectionProps} data-institutional-hero className={`overflow-hidden bg-[#061b46] text-white ${styles.hero}`}>
    <div className={`mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:gap-16 lg:py-24 ${logo && layout !== "text" ? "lg:grid-cols-[1.35fr_.65fr]" : ""}`}>
      <div className={`min-w-0 ${styles.reveal}`}>
        {eyebrow && <p className="text-xs font-bold uppercase leading-6 tracking-[.2em] text-[#e7ba75]">{eyebrow}</p>}
        <div aria-hidden="true" className="mt-6 h-px w-16 bg-[#d59b46]" />
        <h1 className="mt-6 max-w-2xl break-words text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-[3.5rem]">{title}</h1>
        {description && <p className="mt-7 max-w-xl text-base leading-8 text-slate-200 sm:text-lg">{description}</p>}
        {note && <p className="mt-7 max-w-xl border-l-2 border-[#d59b46] pl-4 text-sm leading-6 text-[#e7ba75]">{note}</p>}
        {signature && <p className="mt-7 text-xs font-bold leading-6 tracking-[.2em] text-[#e7ba75]">{signature}</p>}
        {actions && <div className="mt-9 flex flex-wrap gap-4">{actions}</div>}
      </div>
      {logo && layout !== "text" && <div className={`relative mx-auto w-full max-w-sm border border-[#d59b46] bg-white p-5 shadow-xl shadow-black/10 ${styles.reveal}`} style={{ "--reveal-delay": "80ms" }} data-hero-logo-frame>
        <Image src={logo.src} alt={logo.alt} width={logo.width || 1536} height={logo.height || 1024} preload className="h-auto w-full object-contain" sizes="(max-width: 440px) calc(100vw - 82px), 340px" />
      </div>}
    </div>
  </section>;
}
