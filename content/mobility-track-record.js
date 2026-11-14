// Update counts, periods and partner names here after editorial validation.
// Work permits are deliberately separate from visas and excluded from their total.
export const MOBILITY_TRACK_RECORD = {
  since: 2023,
  visas: [
    { id: "portugal", count: 3, label: { fr: "Visas D Job Seeker — Portugal", en: "D Job Seeker visas — Portugal" } },
    { id: "uk", count: 2, period: "2025", label: { fr: "Visas visiteurs — Royaume-Uni", en: "Visitor visas — United Kingdom" } },
    { id: "indonesia", count: 1, period: "2026", label: { fr: "Visa C2 — Indonésie", en: "C2 visa — Indonesia" } },
  ],
  workPermits: { count: 8, period: "2025–2026", label: { fr: "Permis de travail — Pologne", en: "Work permits — Poland" } },
  partners: ["Dalimit Global", "ApplyBoard", "Elec Work Agency", "Live & Study in Europe"],
};

export const MOBILITY_TRACK_RECORD_COPY = {
  fr: {
    title: "Nos réalisations et partenariats internationaux",
    eyebrow: "Expérience et coopérations B2B",
    intro: "Des résultats obtenus dans le cadre de dossiers accompagnés et des partenariats B2B au service des projets de mobilité internationale.",
    since: "Réalisations depuis",
    visasTitle: "Visas obtenus",
    visasSummary: "visas obtenus dans le cadre de dossiers directement accompagnés par GKGM.",
    permitsTitle: "Permis de travail obtenus",
    permitsNote: "Ces permis de travail polonais sont présentés séparément : ils ne sont pas des visas délivrés.",
    partnersTitle: "Nos partenaires B2B actuels",
    partnersNote: "Ces partenariats relèvent de relations B2B entre acteurs de la mobilité internationale. Ils n'impliquent aucune affiliation officielle à un gouvernement ou à une ambassade.",
    disclaimer: "Les résultats passés ne garantissent aucun visa, permis de travail ou résultat futur. Les décisions relèvent exclusivement des autorités compétentes ; GKGM accompagne la préparation des dossiers et ne délivre pas ces autorisations.",
  },
  en: {
    title: "Our Track Record and International Partnerships",
    eyebrow: "Experience and B2B cooperation",
    intro: "Results achieved through supported applications and B2B partnerships serving international mobility projects.",
    since: "Track record since",
    visasTitle: "Visas obtained",
    visasSummary: "visas obtained through applications directly supported by GKGM.",
    permitsTitle: "Work permits obtained",
    permitsNote: "These Polish work permits are presented separately: they are not visas issued.",
    partnersTitle: "Our current B2B partners",
    partnersNote: "These partnerships are B2B relationships between international mobility organisations. They do not imply any official affiliation with a government or embassy.",
    disclaimer: "Past results do not guarantee any visa, work permit or future outcome. Decisions rest exclusively with the competent authorities; GKGM supports application preparation and does not issue these authorisations.",
  },
};
