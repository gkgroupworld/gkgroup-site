import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { CTA } from "@/components/ui/CTA";
import { ENTITY_DETAILS, ENTITY_LOGOS } from "@/content/site";
import { TECHNOLOGY_CONTENT } from "@/content/technology";
import { withLocale } from "@/lib/locale";

const copy = {
  fr: {
    eyebrow: "Lituanie · Écosystème GK GROUP",
    intro: "Une société lituanienne dédiée au commerce international, à l’import-export, au négoce et à la distribution de matériel informatique.",
    title: "Connecter les marchés et les besoins d’approvisionnement",
    description: "UAB GK EstTrade participe au développement des échanges entre l’Europe et l’Afrique au sein de l’écosystème international GK GROUP. Elle intervient dans le sourcing, les relations commerciales et la distribution pour répondre aux besoins des entreprises et des partenaires.",
    activities: "Nos activités",
    scope: "Chaque demande fait l’objet d’une étude du besoin, des disponibilités et des conditions d’exécution avant confirmation commerciale. Les périmètres présentés ne constituent pas une offre de stock ni une garantie de disponibilité. Les opérations d’occasion, de reconditionné et de coordination logistique sont proposées à l’étude, sous réserve de confirmation des moyens et partenaires nécessaires.",
    clients: "Clients concernés",
    value: "Valeur ajoutée",
    services: [
      ["Commerce international et partenariats B2B", "Développement des relations commerciales entre l’Europe et l’Afrique : qualification des besoins, identification d’interlocuteurs et préparation des échanges entre acheteurs et fournisseurs. Les modalités de coopération sont définies pour chaque projet.", "Entreprises, importateurs, distributeurs et partenaires recherchant de nouveaux débouchés ou des fournisseurs internationaux.", "Un interlocuteur pour structurer les échanges, rapprocher les attentes commerciales et faciliter la construction de relations B2B durables."],
      ["Import-export et approvisionnement international", "Étude des demandes d’achat à l’international, comparaison des offres et préparation des conditions d’approvisionnement : références, quantités, délais et documents à prévoir. Les responsabilités de transport et les obligations applicables sont précisées avant engagement.", "PME, revendeurs et entreprises souhaitant organiser des achats entre plusieurs marchés.", "Une meilleure visibilité sur les conditions d’achat et les étapes d’approvisionnement pour préparer les décisions et limiter les incompréhensions."],
      ["Sourcing et négoce de produits", "Recherche de fournisseurs et sélection de propositions selon un cahier des charges : caractéristiques techniques, volumes, budget et destination. Le négoce peut inclure la préparation d’une offre commerciale et la négociation des conditions avec les parties concernées.", "Acheteurs professionnels, réseaux de distribution et porteurs de projets disposant d’un besoin produit défini.", "Des offres comparables et une sélection guidée par l’adéquation au besoin, la traçabilité des informations et les conditions commerciales."],
      ["Distribution informatique", "Approvisionnement et distribution de matériel informatique, d’équipements et de périphériques selon les références et disponibilités confirmées. L’étude porte sur la configuration, la compatibilité, les quantités et les conditions de livraison et de garantie de chaque offre.", "Entreprises, intégrateurs, revendeurs et organisations équipant ou renouvelant un parc informatique.", "Une sélection cohérente avec les usages professionnels et le budget, avec des caractéristiques et des conditions clairement définies avant commande."],
      ["Matériel informatique d’occasion et reconditionné", "Sur étude et sous réserve de disponibilité confirmée, recherche et négoce d’équipements d’occasion ou reconditionnés. Chaque proposition doit préciser l’état, les configurations, les contrôles déclarés par le fournisseur, les accessoires et les conditions de garantie. Aucun atelier de reconditionnement propre n’est revendiqué.", "Revendeurs, PME et organisations étudiant une solution de réemploi pour leur équipement informatique.", "Une comparaison transparente entre l’état du matériel, son usage attendu et son coût, afin de préparer un achat adapté sans assimiler occasion et reconditionné."],
      ["Coordination logistique et commerciale", "Sur étude, coordination des informations entre acheteurs, fournisseurs et prestataires retenus : préparation des commandes, calendrier, documents et suivi des étapes convenues. Les opérations de transport et de dédouanement relèvent des prestataires habilités et des responsabilités contractuelles définies.", "Entreprises menant une opération d’approvisionnement nécessitant plusieurs intervenants ou plusieurs marchés.", "Un suivi commercial structuré et une circulation plus claire des informations, pour anticiper les points de blocage sans promettre de moyens logistiques propres."],
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
    scope: "Each inquiry is assessed for requirements, availability and delivery conditions before commercial confirmation. These areas do not constitute a stock offer or a guarantee of availability. Used equipment, refurbished equipment and logistics coordination are subject to assessment and confirmation of the necessary resources and partners.",
    clients: "Who it serves",
    value: "Added value",
    services: [
      ["International trade and B2B partnerships", "Developing commercial relationships between Europe and Africa: qualifying requirements, identifying relevant contacts and preparing exchanges between buyers and suppliers. Cooperation arrangements are defined for each project.", "Businesses, importers, distributors and partners seeking new markets or international suppliers.", "A point of contact to structure exchanges, align commercial expectations and help build lasting B2B relationships."],
      ["Import-export and international procurement", "Assessing international purchasing requests, comparing offers and preparing procurement conditions: specifications, quantities, lead times and required documents. Transport responsibilities and applicable obligations are clarified before commitment.", "SMEs, resellers and companies organising purchases across markets.", "Greater visibility into purchasing conditions and procurement stages to support decisions and reduce misunderstandings."],
      ["Product sourcing and trading", "Researching suppliers and selecting proposals against a specification covering product features, volumes, budget and destination. Trading may include preparing a commercial offer and negotiating conditions with the relevant parties.", "Professional buyers, distribution networks and project teams with a defined product requirement.", "Comparable offers and a selection guided by suitability, traceable information and commercial terms."],
      ["IT equipment distribution", "Sourcing and distributing IT equipment, hardware and peripherals according to confirmed specifications and availability. Assessment covers configuration, compatibility, quantities, delivery conditions and the warranty terms of each offer.", "Businesses, integrators, resellers and organisations equipping or renewing an IT fleet.", "A selection aligned with professional uses and budgets, with specifications and conditions clearly defined before ordering."],
      ["Used and refurbished IT equipment", "Subject to assessment and confirmed availability, sourcing and trading used or refurbished equipment. Each proposal must specify condition, configurations, supplier-declared checks, accessories and warranty terms. No in-house refurbishment workshop is claimed.", "Resellers, SMEs and organisations considering reused IT equipment.", "A transparent comparison of equipment condition, intended use and cost to inform a suitable purchase while distinguishing used from refurbished equipment."],
      ["Logistics and commercial coordination", "Subject to assessment, coordinating information between buyers, suppliers and selected service providers: order preparation, scheduling, documents and progress through agreed stages. Transport and customs clearance are handled by authorised providers under defined contractual responsibilities.", "Companies managing procurement involving several parties or markets.", "Structured commercial follow-up and clearer information flows to anticipate bottlenecks without claiming an in-house logistics network."],
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
  const reference = TECHNOLOGY_CONTENT[locale];
  return <><Header locale={locale} /><main lang={locale}>
    <section className="bg-[#061b46] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.4fr_.6fr] lg:items-center">
        <div className="grid">
          {/* Reserve GKGT's text height at every viewport, without fixed heights or clipping. */}
          <div aria-hidden="true" className="invisible col-start-1 row-start-1 select-none">
            <p className="text-xs font-bold uppercase tracking-[.22em] text-[#f5a24e]">{reference.eyebrow}</p>
            <p className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">{reference.title}</p>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">{reference.intro}</p>
            <p className="mt-8 text-sm font-bold tracking-wide text-[#f5a24e]">Building Trust. Connecting Opportunities.</p>
          </div>
          <div className="col-start-1 row-start-1">
          <p className="text-xs font-bold uppercase tracking-[.22em] text-[#f5a24e]">{text.eyebrow}</p>
          <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">UAB GK EstTrade</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">{text.intro}</p>
          <p className="mt-8 text-sm font-bold tracking-wide text-[#f5a24e]">Building Trust. Connecting Opportunities.</p>
          </div>
        </div>
        <div className="border border-[#d59b46] bg-[#d4e1ea] p-5">
          <Image src={logo.src} alt={logo.alt} width={1536} height={1024} preload className="h-auto w-full object-contain" sizes="(max-width: 1024px) 100vw, 360px" />
        </div>
      </div>
    </section>
    <section className="px-5 py-16 sm:px-8 sm:py-20"><div className="mx-auto max-w-7xl"><SectionTitle eyebrow="UAB GK EstTrade" title={text.title} /><p className="max-w-4xl leading-8 text-slate-600">{text.description}</p><div className="mt-8 flex flex-wrap gap-4"><CTA href={withLocale("/contact", locale)}>{text.contact}</CTA><CTA href={withLocale("/entities", locale)}>{text.entities}</CTA></div></div></section>
    <section id="activities" className="bg-[#f5f7fa] px-5 py-16 sm:px-8 sm:py-20"><div className="mx-auto max-w-7xl"><SectionTitle eyebrow="UAB GK EstTrade" title={text.activities} /><p className="mb-10 max-w-4xl border-l-2 border-[#d59b46] pl-4 text-sm leading-7 text-slate-600">{text.scope}</p><div className="grid gap-6 lg:grid-cols-2">{text.services.map(([title, description, clients, value], index) => <article key={title} className="border border-slate-200 border-t-2 border-t-[#d59b46] bg-white p-6 sm:p-8"><p aria-hidden="true" className="text-sm font-bold text-[#c7862f]">0{index + 1}</p><h3 className="mt-3 text-2xl font-bold tracking-tight text-[#061b46]">{title}</h3><p className="mt-4 leading-7 text-slate-600">{description}</p><dl className="mt-6 grid gap-5 border-t border-slate-200 pt-5"><div><dt className="text-sm font-bold text-[#061b46]">{text.clients}</dt><dd className="mt-2 text-sm leading-7 text-slate-600">{clients}</dd></div><div className="border-l-2 border-[#d59b46] pl-4"><dt className="text-sm font-bold text-[#061b46]">{text.value}</dt><dd className="mt-2 text-sm leading-7 text-slate-600">{value}</dd></div></dl></article>)}</div></div></section>
    <section className="px-5 py-16 sm:px-8 sm:py-20"><div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2"><div><SectionTitle eyebrow={text.status} title={text.statusTitle} /><p className="leading-8 text-slate-600">{text.statusText}</p></div><div className="border border-slate-200 bg-[#f5f7fa] p-6 sm:p-8"><h2 className="text-2xl font-bold text-[#061b46]">{text.legal}</h2><dl className="mt-6 grid gap-5">{legal.entries.map(({ label, value }) => <div key={label}><dt className="text-sm font-bold text-[#061b46]">{label}</dt><dd className="mt-1 text-slate-600">{value}</dd></div>)}</dl></div></div></section>
    <section className="bg-[#061b46] px-5 py-16 text-white sm:px-8"><div className="mx-auto max-w-7xl"><h2 className="text-3xl font-bold">{text.final}</h2><p className="mt-5 max-w-3xl leading-8 text-slate-200">{text.finalText}</p><div className="mt-8 flex flex-wrap gap-4"><CTA href={withLocale("/contact", locale)}>{text.contact}</CTA><CTA href={withLocale("/partnerships", locale)} variant="secondary">{text.partnerships}</CTA></div></div></section>
  </main><Footer locale={locale} /></>;
}
