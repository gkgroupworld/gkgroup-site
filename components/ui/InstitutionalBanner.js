import Image from "next/image";
import styles from "./InstitutionalBanner.module.css";

export const GROUP_BANNER_LOGO = {
  src: "/brand/gk-group-official-logo.png",
  alt: "GK GROUP — Global Business Without Borders",
  width: 951,
  height: 762,
};

// Height follows real content. Text-only layout is available when no logo exists.
// Actions are supplied by callers so destinations, labels and behaviour are preserved.
export function InstitutionalBanner({ title, description, eyebrow, logo = GROUP_BANNER_LOGO, signature, note, actions, layout = logo ? "split" : "text", ...sectionProps }) {
  return <section {...sectionProps} data-institutional-hero className={styles.banner}>
    <div className={styles.container} data-layout={layout}>
      <div className={styles.text}>
        {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
        <div aria-hidden="true" className={styles.rule} />
        <h1 className={styles.title}>{title}</h1>
        {description && <p className={styles.description}>{description}</p>}
        {note && <p className={styles.note}>{note}</p>}
        {signature && <p className={styles.signature}>{signature}</p>}
        {actions && <div className={styles.actions}>{actions}</div>}
      </div>
      {logo && layout !== "text" && <div className={styles.frame} data-hero-logo-frame>
        <Image src={logo.src} alt={logo.alt} width={logo.width || 1536} height={logo.height || 1024} preload className={styles.image} sizes="(max-width: 359px) calc(100vw - 82px), 278px" />
      </div>}
    </div>
  </section>;
}
