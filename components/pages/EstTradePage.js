import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { CTA } from "@/components/ui/CTA";
import { ENTITY_DETAILS, ENTITY_LOGOS } from "@/content/site";
import { withLocale } from "@/lib/locale";

const copy = {
  fr: {
    eyebrow: "Lituanie · Écosystème GK GROUP",
    intro: "Une société lituanienne dédiée au commerce international, à l’import-export, au négoce et à la distribution de matériel informatique.",
    title: "Connecter les marchés et les besoins d’approvisionnement",
    description: "UAB GK EstTrade participe au développement des échanges entre l’Europe et l’Afrique au sein de l’écosystème international GK GROUP. Elle intervient dans le sourcing, les relations commerciales et la distribution pour répondre aux besoins des entreprises et des partenaires.",
    activities: "Nos activités",
    services: [
      ["Commerce international", "Développement des relations commerciales entre marchés européens et africains, et mise en relation de partenaires."],
      ["Import-export", "Organisation des échanges et accompagnement des opérations d’approvisionnement international selon les besoins des partenaires."],
      ["Négoce et sourcing", "Identification de fournisseurs et recherche de produits adaptés aux demandes des entreprises."],
      ["Distribution informatique", "Négoce et distribution de matériel informatique, d’équipements et de périphériques pour les besoins professionnels."],
    ],
    status: "Identité institutionnelle",
    statusTitle: "Une société juridiquement distincte",
    statusText: "UAB GK EstTrade est une société établie en Lituanie, membre de l’écosystème GK GROUP. Elle est juridiquement distincte de GK GLOBAL GROUP SARL U, société établie au Togo, et n’en constitue pas une branche opérationnelle. GK GROUP désigne la marque et l’écosystème international, sans statut juridique propre à ce jour.",
    legal: "Informations légales",
    final: "Échangeons sur vos besoins commerciaux",
    finalText: "Pour une demande d’approvisionnement, de distribution ou de coopération commerciale, contactez GK GROUP en précisant UAB GK EstTrade comme société concernée.",
    contact: "Contacter GK GROUP",
    entities: "Nos entités",
    partnerships: "Proposer un partenariat",
  },
  en: {
    eyebrow: "Lithuania · GK GROUP ecosystem",
    intro: "A Lithuanian company dedicated to international trade, import-export, trading and IT equipment distribution.",
    title: "Connecting markets and sourcing needs",
    description: "UAB GK EstTrade contributes to trade between Europe and Africa within the international GK GROUP ecosystem. Its activities cover sourcing, commercial relationships and distribution to meet the needs of businesses and partners.",
    activities: "Our activities",
    services: [
      ["International trade", "Developing commercial relationships between European and African markets and connecting business partners."],
      ["Import-export", "Organising trade and supporting international sourcing operations according to partners’ needs."],
      ["Trading and sourcing", "Identifying suppliers and sourcing products suited to business requirements."],
      ["IT equipment distribution", "Trading and distributing IT equipment, hardware and peripherals for professional use."],
    ],
    status: "Institutional identity",
    statusTitle: "A legally distinct company",
    statusText: "UAB GK EstTrade is a company established in Lithuania within the GK GROUP ecosystem. It is legally distinct from GK GLOBAL GROUP SARL U, a company established in Togo, and is not one of its operational divisions. GK GROUP is the international brand and ecosystem, currently without legal status of its own.",
    legal: "Legal information",
    final: "Let’s discuss your trading needs",
    finalText: "For sourcing, distribution or commercial cooperation inquiries, contact GK GROUP and specify UAB GK EstTrade as the company concerned.",
    contact: "Contact GK GROUP",
    entities: "Our entities",
    partnerships: "Propose a partnership",
  },
};

export function EstTradePage({ locale }) {
  const text = copy[locale];
  const logo = ENTITY_LOGOS["uab-gk-esttrade"];
  const legal = ENTITY_DETAILS["uab-gk-esttrade"].legal[locale];
  return <><Header locale={locale} /><main>
    <section className="bg-[#061b46] px-5 py-16 text-white sm:px-8 sm:py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.3fr_1fr]">
        <div><p className="text-xs font-bold uppercase tracking-[.2em] text-[#f5a24e]">{text.eyebrow}</p><h1 className="mt-4 text-4xl font-bold sm:text-5xl">UAB GK EstTrade</h1><p className="mt-5 max-w-3xl text-lg leading-8 text-slate-200">{text.intro}</p><div className="mt-8 flex flex-wrap gap-4"><CTA href={withLocale("/contact", locale)}>{text.contact}</CTA><CTA href={withLocale("/entities", locale)} variant="secondary">{text.entities}</CTA></div></div>
        <div className="border border-white/20 bg-white p-6"><Image src={logo.src} alt={logo.alt} width={1536} height={1024} priority className="h-auto w-full object-contain" sizes="(max-width: 1024px) 100vw, 480px" /></div>
      </div>
    </section>
    <section className="px-5 py-16 sm:px-8 sm:py-20"><div className="mx-auto max-w-7xl"><SectionTitle eyebrow="UAB GK EstTrade" title={text.title} /><p className="max-w-4xl leading-8 text-slate-600">{text.description}</p></div></section>
    <section className="bg-[#f5f7fa] px-5 py-16 sm:px-8 sm:py-20"><div className="mx-auto max-w-7xl"><SectionTitle title={text.activities} /><div className="grid gap-5 md:grid-cols-2">{text.services.map(([title, description]) => <article key={title} className="border-t-2 border-[#e87512] bg-white p-6 sm:p-8"><h3 className="text-xl font-bold text-[#061b46]">{title}</h3><p className="mt-4 leading-7 text-slate-600">{description}</p></article>)}</div></div></section>
    <section className="px-5 py-16 sm:px-8 sm:py-20"><div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2"><div><SectionTitle eyebrow={text.status} title={text.statusTitle} /><p className="leading-8 text-slate-600">{text.statusText}</p></div><div className="border border-slate-200 bg-[#f5f7fa] p-6 sm:p-8"><h2 className="text-2xl font-bold text-[#061b46]">{text.legal}</h2><dl className="mt-6 grid gap-5">{legal.entries.map(({ label, value }) => <div key={label}><dt className="text-sm font-bold text-[#061b46]">{label}</dt><dd className="mt-1 text-slate-600">{value}</dd></div>)}</dl></div></div></section>
    <section className="bg-[#061b46] px-5 py-16 text-white sm:px-8"><div className="mx-auto max-w-7xl"><h2 className="text-3xl font-bold">{text.final}</h2><p className="mt-5 max-w-3xl leading-8 text-slate-200">{text.finalText}</p><div className="mt-8 flex flex-wrap gap-4"><CTA href={withLocale("/contact", locale)}>{text.contact}</CTA><CTA href={withLocale("/partnerships", locale)} variant="secondary">{text.partnerships}</CTA></div></div></section>
  </main><Footer locale={locale} /></>;
}
