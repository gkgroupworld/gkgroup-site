// Update counts, periods and partner names here after editorial validation.
// Historical figures are owner-declared and are not aggregated across categories.
export const MOBILITY_TRACK_RECORD = {
  historicalHighlights: [
    {
      id: "canada",
      quantity: { fr: "Plus de 50", en: "More than 50" },
      country: { fr: "Canada", en: "Canada" },
      label: {
        fr: "Visas d’entrée pour études obtenus dans le cadre de nos accompagnements",
        en: "Entry visas for study obtained through our support",
      },
      note: {
        fr: "Les éventuels permis d’études ou documents d’approbation associés ne sont pas comptabilisés comme des résultats supplémentaires.",
        en: "Any associated study permits or approval documents are not counted as additional results.",
      },
    },
    {
      id: "albania",
      quantity: { fr: "Environ 10", en: "Approximately 10" },
      country: { fr: "Albanie", en: "Albania" },
      label: {
        fr: "Visas de travail obtenus dans le cadre de nos accompagnements",
        en: "Work visas obtained through our support",
      },
    },
  ],
  historicalVisitDestinations: [
    { id: "china", quantity: { fr: "Plusieurs dizaines", en: "Several dozen" }, country: { fr: "Chine", en: "China" } },
    { id: "singapore", quantity: { fr: "Plus de 15", en: "More than 15" }, country: { fr: "Singapour", en: "Singapore" } },
    { id: "malaysia", quantity: { fr: "10", en: "10" }, country: { fr: "Malaisie", en: "Malaysia" } },
    { id: "ecuador", quantity: { fr: "12", en: "12" }, country: { fr: "Équateur", en: "Ecuador" } },
    { id: "barbados", quantity: { fr: "7", en: "7" }, country: { fr: "Barbade", en: "Barbados" } },
  ],
  studentSupport: {
    count: 13,
    label: {
      fr: "Étudiants accompagnés dans leurs démarches Campus France",
      en: "Students supported through the Campus France process",
    },
  },
  companyFormations: [
    { id: "lithuania", count: 2, country: { fr: "Lituanie", en: "Lithuania" } },
    { id: "albania", count: 2, country: { fr: "Albanie", en: "Albania" } },
  ],
  eResidency: {
    count: 1,
    label: {
      fr: "Client accompagné dans l’obtention d’une carte d’e-résidence estonienne",
      en: "Client supported in obtaining an Estonian e-Residency card",
    },
  },
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
    title: "Nos résultats en mobilité internationale",
    eyebrow: "Expérience en mobilité internationale",
    intro: "Les chiffres présentés ci-dessous correspondent à des résultats historiques déclarés par GKGM et à des dossiers accompagnés par nos équipes. Ils illustrent notre expérience, sans préjuger des décisions des autorités compétentes.",
    historicalTitle: "Visas obtenus grâce à l’accompagnement de GKGM",
    visitsOutcome: "Visas de visite et de tourisme",
    achievementsTitle: "Autres accompagnements et réalisations",
    studentsTitle: "Accompagnement des étudiants",
    companiesTitle: "Créations d’entreprises accompagnées",
    eResidencyTitle: "E-résidence estonienne",
    permitsTitle: "Permis de travail obtenus — Pologne",
    permitsNote: "Ces permis sont présentés séparément des visas, car un permis de travail n’est pas un visa.",
    partnersTitle: "Nos partenaires B2B actuels",
    partnersNote: "Ces partenariats relèvent de relations B2B entre acteurs de la mobilité internationale. Ils n'impliquent aucune affiliation officielle à un gouvernement ou à une ambassade.",
    disclaimer: "Ces résultats témoignent de l’expérience de GKGM dans l’accompagnement de projets de mobilité internationale. Ils ne garantissent aucun visa, permis de travail ou résultat futur. Les décisions relèvent exclusivement des autorités compétentes ; GKGM accompagne la préparation des dossiers et ne délivre pas ces autorisations.",
  },
  en: {
    title: "Our International Mobility Results",
    eyebrow: "Experience in international mobility",
    intro: "The figures below reflect historical results reported by GKGM and applications supported by our teams. They demonstrate our experience without prejudging decisions made by the competent authorities.",
    historicalTitle: "Visas obtained with GKGM’s support",
    visitsOutcome: "Visitor and tourism visas",
    achievementsTitle: "Other support and achievements",
    studentsTitle: "Student support",
    companiesTitle: "Business incorporations supported",
    eResidencyTitle: "Estonian e-Residency",
    permitsTitle: "Work permits obtained — Poland",
    permitsNote: "These permits are presented separately from visas because a work permit is not a visa.",
    partnersTitle: "Our current B2B partners",
    partnersNote: "These partnerships are B2B relationships between international mobility organisations. They do not imply any official affiliation with a government or embassy.",
    disclaimer: "These results demonstrate GKGM’s experience in supporting international mobility projects. They do not guarantee any visa, work permit or future outcome. Decisions rest exclusively with the competent authorities; GKGM supports application preparation and does not issue these authorisations.",
  },
};
