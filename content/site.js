export const CONTACT = {
  legalName: "GK GLOBAL GROUP SARLU",
  location: "Lomé, Togo — Adidogomé-Soviépé",
  phone: "+228 90 50 36 35", phoneHref: "tel:+22890503635",
  whatsapp: "+228 90 55 98 88", whatsappHref: "https://wa.me/22890559888",
  generalEmail: "info@gkgroup.app", generalEmailHref: "mailto:info@gkgroup.app",
  email: "gk.contactus@gkgroup.app", emailHref: "mailto:gk.contactus@gkgroup.app",
  website: "gkgroup.app",
};

export const SITE_COPY = {
  fr: {
    navigation: { home: "Accueil", about: "À propos", architecture: "Notre architecture", activities: "Nos activités", entities: "Nos entités", nexus: "GK NEXUS", esttrade: "UAB GK EstTrade", mobility: "GKGM", technology: "GKGT", partnerships: "Partenariats", news: "Actualités / Opportunités", contact: "Contact" },
    labels: { discover: "Découvrir", contact: "Nous contacter", language: "Langue" },
    hero: { eyebrow: "Architecture institutionnelle internationale", title: "Global Business Without Borders", description: "GK GROUP relie les opportunités, les expertises et les marchés entre l’Afrique, l’Europe, l’Asie, les Amériques et le reste du monde.", supporting: "Building Trust. Connecting Opportunities." },
    activities: { eyebrow: "Nos domaines d’activité", title: "Des expertises connectées à l’international" },
    entities: { eyebrow: "Notre écosystème", title: "Une architecture claire, des rôles distincts" },
    contact: { eyebrow: "Parlons de vos opportunités", title: "Connectez-vous à GK GROUP" },
    footer: "Architecture institutionnelle globale du groupe.", comingSoon: "Cette page est en préparation dans le cadre de la V2.",
  },
  en: {
    navigation: { home: "Home", about: "About", architecture: "Our architecture", activities: "Our activities", entities: "Our entities", nexus: "GK NEXUS", esttrade: "UAB GK EstTrade", mobility: "GKGM", technology: "GKGT", partnerships: "Partnerships", news: "News / Opportunities", contact: "Contact" },
    labels: { discover: "Discover", contact: "Contact us", language: "Language" },
    hero: { eyebrow: "International institutional architecture", title: "Global Business Without Borders", description: "GK GROUP connects opportunities, expertise and markets across Africa, Europe, Asia, the Americas and the rest of the world.", supporting: "Building Trust. Connecting Opportunities." },
    activities: { eyebrow: "Our areas of activity", title: "Expertise connected internationally" },
    entities: { eyebrow: "Our ecosystem", title: "A clear architecture with distinct roles" },
    contact: { eyebrow: "Let us discuss your opportunities", title: "Connect with GK GROUP" },
    footer: "The group’s global institutional architecture.", comingSoon: "This page is being prepared as part of V2.",
  },
};

export const ACTIVITIES = [
  { id: "technology", fr: "Technology & Digital Solutions", en: "Technology & Digital Solutions" },
  { id: "mobility", fr: "International Mobility", en: "International Mobility" },
  { id: "trade", fr: "International Trade & Import-Export", en: "International Trade & Import-Export" },
  { id: "development", fr: "Business Development", en: "Business Development" },
  { id: "consulting", fr: "Strategic Consulting", en: "Strategic Consulting" },
];

export const ACTIVITY_CONTENT = {
  fr: {
    hero: { eyebrow: "Portefeuille d’activités", title: "Nos activités", description: "GK GROUP développe un portefeuille d’activités complémentaires destiné à connecter les compétences, les marchés et les opportunités entre l’Afrique, l’Europe et les marchés internationaux.", motto: "Global Business Without Borders" },
    domains: { eyebrow: "Cinq domaines d’activité", title: "Des expertises complémentaires, une même ambition", items: [
      { title: "Technology & Digital Solutions", description: "Des solutions technologiques conçues pour accompagner les organisations dans leurs besoins opérationnels et leur évolution digitale.", services: ["Solutions informatiques", "Maintenance et services IT", "Infrastructures et réseaux", "Équipements technologiques", "Solutions digitales", "Accompagnement technologique des organisations"], structures: "Structure principalement liée : GKGT — GK GLOBAL TECHNOLOGY." },
      { title: "International Mobility", description: "Un accompagnement structuré des projets de mobilité internationale, adapté aux parcours académiques, professionnels et institutionnels.", services: ["Mobilité internationale", "Accompagnement des projets de mobilité", "Mobilité professionnelle", "Études à l’étranger", "Missions professionnelles et conférences", "Assistance documentaire et installation internationale"], structures: "Structure principalement liée : GKGM — GK GLOBAL MOBILITY." },
      { title: "International Trade & Import-Export", description: "Des activités dédiées au commerce international, au sourcing et au rapprochement entre marchés européens, africains et internationaux.", services: ["Commerce international et import-export", "Sourcing et recherche de fournisseurs", "Développement des échanges commerciaux", "Mise en relation de marchés", "Partenariats commerciaux", "Échanges Europe–Afrique et internationaux"], structures: "Structures principalement associées : UAB GK EstTrade et, dans le cadre du développement international du groupe, le projet GK Danube Trading DOO en cours de constitution en Serbie ainsi que le projet GK NEXUS Sh.p.k., sous réserve de son immatriculation, selon les projets." },
      { title: "Business Development", description: "Une approche de développement destinée à identifier, structurer et accompagner des opportunités sur des marchés complémentaires.", services: ["Identification d’opportunités", "Développement de marchés", "Structuration de projets", "Recherche et développement de partenariats", "Accompagnement de l’expansion internationale", "Mise en relation économique et commerciale"], structures: "Mise en œuvre par les structures compétentes du groupe selon les projets et les marchés." },
      { title: "Strategic Consulting", description: "Un accompagnement stratégique pour analyser, structurer et faire progresser les projets internationaux et les partenariats.", services: ["Analyse et structuration de projets", "Conseil en développement international", "Accompagnement stratégique", "Organisation et optimisation des projets", "Appui à la prise de décision", "Développement de partenariats stratégiques"], structures: "Mise en œuvre par les structures compétentes du groupe selon les projets et les marchés." },
    ] },
    complementarity: { eyebrow: "Modèle de complémentarité", title: "Des activités qui se renforcent mutuellement", description: "Ces domaines d’activité ne constituent pas des sociétés ou des filiales. Ils forment un portefeuille coordonné qui peut mobiliser des compétences complémentaires selon les besoins de chaque projet.", result: "Création de solutions et d’opportunités internationales intégrées" },
    structures: { eyebrow: "Structures et activités", title: "Des rôles adaptés à chaque activité", description: "Les activités sont mises en œuvre par différentes structures du groupe selon leur rôle, leur implantation et leurs compétences. Une même structure n’exerce donc pas nécessairement l’ensemble des activités.", links: [{ href: "/entities", label: "Découvrir nos entités" }, { href: "/architecture", label: "Voir notre architecture" }, { href: "/gk-nexus", label: "Découvrir GK NEXUS" }] },
    international: { eyebrow: "Positionnement international", title: "Connecter les marchés avec méthode", description: "Le portefeuille d’activités de GK GROUP vise à favoriser les connexions entre l’Afrique, l’Europe et les marchés internationaux. Cette orientation traduit une vocation internationale, sans assimiler l’horizon stratégique à une présence opérationnelle actuelle." },
    final: { title: "Construisons des opportunités ensemble", entities: "Découvrir nos entités", contact: "Nous contacter" },
  },
  en: {
    hero: { eyebrow: "Activity portfolio", title: "Our Activities", description: "GK GROUP develops a portfolio of complementary activities designed to connect skills, markets and opportunities across Africa, Europe and international markets.", motto: "Global Business Without Borders" },
    domains: { eyebrow: "Five areas of activity", title: "Complementary expertise, one shared ambition", items: [
      { title: "Technology & Digital Solutions", description: "Technology solutions designed to support organisations in their operational needs and digital evolution.", services: ["IT solutions", "IT maintenance and services", "Infrastructure and networks", "Technology equipment", "Digital solutions", "Technology support for organisations"], structures: "Mainly linked structure: GKGT — GK GLOBAL TECHNOLOGY." },
      { title: "International Mobility", description: "Structured support for international mobility projects, adapted to academic, professional and institutional paths.", services: ["International mobility", "Mobility project support", "Professional mobility", "Study abroad", "Professional assignments and conferences", "Documentary assistance and international settlement support"], structures: "Mainly linked structure: GKGM — GK GLOBAL MOBILITY." },
      { title: "International Trade & Import-Export", description: "Activities dedicated to international trade, sourcing and connections between European, African and international markets.", services: ["International trade and import-export", "Sourcing and supplier research", "Trade development", "Market connections", "Commercial partnerships", "Europe–Africa and international exchanges"], structures: "Mainly associated structures: UAB GK EstTrade and, as part of the group’s international development, the GK Danube Trading DOO company formation project in progress in Serbia, as well as the GK NEXUS Sh.p.k. project, subject to registration, depending on the project." },
      { title: "Business Development", description: "A development approach designed to identify, structure and support opportunities across complementary markets.", services: ["Opportunity identification", "Market development", "Project structuring", "Partnership research and development", "International expansion support", "Economic and commercial connections"], structures: "Implemented by the group’s relevant structures according to projects and markets." },
      { title: "Strategic Consulting", description: "Strategic support to analyse, structure and advance international projects and partnerships.", services: ["Project analysis and structuring", "International development consulting", "Strategic support", "Project organisation and optimisation", "Decision-making support", "Strategic partnership development"], structures: "Implemented by the group’s relevant structures according to projects and markets." },
    ] },
    complementarity: { eyebrow: "Complementarity model", title: "Activities that reinforce one another", description: "These areas of activity are not companies or subsidiaries. They form a coordinated portfolio that can bring together complementary expertise according to the needs of each project.", result: "Creation of integrated international solutions and opportunities" },
    structures: { eyebrow: "Structures and activities", title: "Roles tailored to each activity", description: "Activities are implemented by different group structures according to their role, location and expertise. A single structure does not necessarily carry out every activity.", links: [{ href: "/entities", label: "Discover our entities" }, { href: "/architecture", label: "Explore our architecture" }, { href: "/gk-nexus", label: "Discover GK NEXUS" }] },
    international: { eyebrow: "International positioning", title: "Connecting markets with purpose", description: "GK GROUP’s activity portfolio aims to foster connections between Africa, Europe and international markets. This direction expresses an international vocation, without equating a strategic horizon with a current operational presence." },
    final: { title: "Building Opportunities Together", entities: "Discover our entities", contact: "Contact us" },
  },
};

export const NEXUS_CONTENT = {
  "fr": {
    "hero": {
      "eyebrow": "Projet de coordination et de développement international",
      "title": "GK NEXUS",
      "description": "GK NEXUS Sh.p.k. est un projet de société en Albanie dont l’immatriculation est en cours. Sous réserve de cette immatriculation, elle est destinée à devenir une plateforme de coordination et de développement international de l’écosystème GK GROUP.",
      "location": "Albanie · Immatriculation en cours"
    },
    "vocation": {
      "eyebrow": "Vocation envisagée",
      "title": "Deux dimensions complémentaires pour une future plateforme",
      "corporate": {
        "title": "Pilotage et coordination",
        "items": [
          "Pilotage stratégique",
          "Coordination du groupe",
          "Suivi des performances",
          "Coordination des projets transversaux",
          "Accompagnement des structures",
          "Contrôle et suivi des ressources",
          "Préparation des décisions stratégiques",
          "Développement international"
        ]
      },
      "operations": {
        "title": "Activités et projets envisagés",
        "description": "Sous réserve de son immatriculation, GK NEXUS pourrait également développer ses propres activités et projets selon les opportunités et les exigences applicables.",
        "items": [
          "Technology & Digital Solutions",
          "International Trade",
          "International Mobility",
          "Business Development",
          "Strategic Projects"
        ]
      }
    },
    "role": {
      "eyebrow": "Rôle envisagé au sein de GK GROUP",
      "title": "Un futur point de convergence stratégique",
      "description": "Après son immatriculation, GK NEXUS aurait vocation à soutenir la cohérence stratégique de l’écosystème, à faciliter les échanges entre les structures et à préparer le développement international progressif.",
      "items": [
        "Faciliter la coordination entre les structures",
        "Identifier et structurer de nouvelles opportunités",
        "Suivre les projets transversaux",
        "Soutenir la gouvernance",
        "Contribuer au contrôle des risques et des ressources",
        "Préparer de nouvelles implantations et partenariats"
      ],
      "cta": "Voir notre architecture"
    },
    "albania": {
      "eyebrow": "Projet Albanie",
      "title": "Une future plateforme à vocation européenne",
      "description": "Le projet GK NEXUS Sh.p.k. vise une implantation en Albanie, sous réserve de son immatriculation. Cette orientation pourrait renforcer les connexions européennes de l’écosystème, sans constituer une présence opérationnelle actuelle.",
      "items": [
        "Coordination du développement international de GK GROUP",
        "Identification d’opportunités européennes",
        "Recherche de partenaires",
        "Développement de relations commerciales",
        "Recherche de fournisseurs et d’équipements",
        "Structuration de projets internationaux",
        "Soutien aux besoins des différentes structures du groupe"
      ]
    },
    "diagram": {
      "eyebrow": "Coordination envisagée",
      "title": "Relier les expertises, dans le respect des rôles",
      "note": "Ce schéma présente une logique fonctionnelle envisagée après l’immatriculation de GK NEXUS. Il ne représente ni une structure de détention ni une coordination déjà opérationnelle et ne remplace pas l’architecture institutionnelle du groupe.",
      "coordination": "Future plateforme de coordination",
      "brand": "Marque et écosystème international",
      "pending": "Projet · Immatriculation en cours",
      "serbia": "Projet · Constitution en cours"
    },
    "value": {
      "eyebrow": "Création de valeur envisagée",
      "title": "Des opportunités au développement durable",
      "steps": [
        "GK NEXUS — Pilotage • Coordination • Développement international",
        "Identification et structuration des opportunités",
        "Structures du groupe",
        "Clients • Partenaires • Marchés • Investisseurs",
        "Création de valeur durable"
      ]
    },
    "interactions": {
      "eyebrow": "Complémentarités envisagées",
      "title": "Des échanges futurs au service des projets",
      "items": [
        {
          "name": "GKGM",
          "text": "GK NEXUS peut contribuer à identifier et structurer des opportunités internationales liées à la mobilité et aux besoins professionnels."
        },
        {
          "name": "GKGT",
          "text": "GK NEXUS peut contribuer à identifier des fournisseurs, équipements, partenaires et opportunités technologiques."
        },
        {
          "name": "UAB GK EstTrade",
          "text": "Développement commercial, sourcing, commerce international et connexions Europe–Afrique."
        },
        {
          "name": "GK Danube Trading DOO",
          "text": "Projet de développement de relations commerciales et d’opportunités en Serbie et dans sa région ; constitution de la société en cours."
        },
        {
          "name": "GK GLOBAL GROUP SARLU",
          "text": "Coordination institutionnelle, reporting, mise en œuvre des orientations du groupe et développement depuis le Togo."
        }
      ],
      "description": "Les interactions ci-dessous décrivent des possibilités de coopération après immatriculation. Elles ne constituent ni des partenariats officiellement établis ni des activités actuelles de GK NEXUS."
    },
    "vision": {
      "eyebrow": "Vision stratégique 2026–2035",
      "title": "Préparer le développement international",
      "description": "Sous réserve de son immatriculation, GK NEXUS serait appelée à soutenir la gouvernance, la coordination, l’expansion progressive, la recherche de partenariats, l’innovation et la création de valeur durable."
    },
    "final": {
      "title": "Connecter. Coordonner. Développer.",
      "entities": "Découvrir nos entités",
      "contact": "Nous contacter",
      "description": "Pour échanger sur le projet GK NEXUS, utilisez les coordonnées officielles de GK GLOBAL GROUP SARL U au Togo."
    },
    "identityTitle": "Un projet, un statut institutionnel clair",
    "identity": [
      "GK GROUP est la marque et l’écosystème international, sans personnalité juridique propre.",
      "GK GLOBAL GROUP SARL U est une société légalement constituée au Togo, avec ses divisions opérationnelles GKGT et GKGM.",
      "GK NEXUS Sh.p.k. est un projet distinct en Albanie. Sa future mise en œuvre reste soumise à son immatriculation ; elle n’est pas présentée comme une société enregistrée ou opérationnelle."
    ],
    "contents": "Explorer le projet GK NEXUS"
  },
  "en": {
    "hero": {
      "eyebrow": "International coordination and development project",
      "title": "GK NEXUS",
      "description": "GK NEXUS Sh.p.k. is a proposed company in Albania with registration still in progress. Subject to registration, it is intended to become a coordination and international development platform within the GK GROUP ecosystem.",
      "location": "Albania · Registration in progress"
    },
    "vocation": {
      "eyebrow": "Intended purpose",
      "title": "Two complementary dimensions for a future platform",
      "corporate": {
        "title": "Steering and coordination",
        "items": [
          "Strategic steering",
          "Group coordination",
          "Performance monitoring",
          "Cross-functional project coordination",
          "Support for structures",
          "Resource oversight and monitoring",
          "Preparation of strategic decisions",
          "International development"
        ]
      },
      "operations": {
        "title": "Potential activities and projects",
        "description": "Subject to registration, GK NEXUS could also develop its own activities and projects according to opportunities and applicable requirements.",
        "items": [
          "Technology & Digital Solutions",
          "International Trade",
          "International Mobility",
          "Business Development",
          "Strategic Projects"
        ]
      }
    },
    "role": {
      "eyebrow": "Intended role within GK GROUP",
      "title": "A future strategic point of convergence",
      "description": "Following registration, GK NEXUS would aim to support the ecosystem’s strategic coherence, facilitate exchanges between structures and prepare progressive international development.",
      "items": [
        "Facilitate coordination between structures",
        "Identify and structure new opportunities",
        "Monitor cross-functional projects",
        "Support governance",
        "Contribute to risk and resource oversight",
        "Prepare new establishments and partnerships"
      ],
      "cta": "View our architecture"
    },
    "albania": {
      "eyebrow": "Albania project",
      "title": "A future platform with a European focus",
      "description": "The GK NEXUS Sh.p.k. project aims to establish a presence in Albania, subject to registration. This direction could strengthen the ecosystem’s European connections and does not represent a current operational presence.",
      "items": [
        "Coordination of GK GROUP’s international development",
        "Identification of European opportunities",
        "Partner research",
        "Development of commercial relationships",
        "Supplier and equipment research",
        "Structuring of international projects",
        "Support for the needs of the group’s various structures"
      ]
    },
    "diagram": {
      "eyebrow": "Proposed coordination",
      "title": "Connecting expertise while respecting distinct roles",
      "note": "This diagram presents a proposed functional approach following GK NEXUS registration. It represents neither an ownership structure nor existing operational coordination and does not replace the group’s institutional architecture.",
      "coordination": "Future coordination platform",
      "brand": "International brand and ecosystem",
      "pending": "Project · Registration in progress",
      "serbia": "Project · Company formation in progress"
    },
    "value": {
      "eyebrow": "Potential value creation",
      "title": "From opportunities to sustainable development",
      "steps": [
        "GK NEXUS — Steering • Coordination • International development",
        "Opportunity identification and structuring",
        "Group structures",
        "Clients • Partners • Markets • Investors",
        "Sustainable value creation"
      ]
    },
    "interactions": {
      "eyebrow": "Potential complementarities",
      "title": "Future exchanges in support of projects",
      "items": [
        {
          "name": "GKGM",
          "text": "GK NEXUS may contribute to identifying and structuring international opportunities related to mobility and professional needs."
        },
        {
          "name": "GKGT",
          "text": "GK NEXUS may contribute to identifying suppliers, equipment, partners and technology opportunities."
        },
        {
          "name": "UAB GK EstTrade",
          "text": "Commercial development, sourcing, international trade and Europe–Africa connections."
        },
        {
          "name": "GK Danube Trading DOO",
          "text": "Project for developing commercial relationships and opportunities in Serbia and the region; company formation in progress."
        },
        {
          "name": "GK GLOBAL GROUP SARLU",
          "text": "Institutional coordination, reporting, implementation of group directions and development from Togo."
        }
      ],
      "description": "The interactions below describe possible cooperation following registration. They represent neither officially established partnerships nor current GK NEXUS operations."
    },
    "vision": {
      "eyebrow": "Strategic Vision 2026–2035",
      "title": "Preparing international development",
      "description": "Subject to registration, GK NEXUS would aim to support governance, coordination, progressive expansion, partnership research, innovation and sustainable value creation."
    },
    "final": {
      "title": "Connect. Coordinate. Develop.",
      "entities": "Discover our entities",
      "contact": "Contact us",
      "description": "To discuss the GK NEXUS project, use GK GLOBAL GROUP SARL U’s official contact details in Togo."
    },
    "identityTitle": "A project with a clear institutional status",
    "identity": [
      "GK GROUP is the international brand and ecosystem, without legal personality of its own.",
      "GK GLOBAL GROUP SARL U is a legally constituted company in Togo, with its operational divisions GKGT and GKGM.",
      "GK NEXUS Sh.p.k. is a distinct project in Albania. Its future implementation remains subject to registration; it is not presented as a registered or operational company."
    ],
    "contents": "Explore the GK NEXUS project"
  }
};

export const CONTACT_CONTENT = {
  fr: {
    hero: { title: "Entrons en contact", description: "Une question, un projet ou une opportunité de partenariat ? Échangez avec GK GROUP et identifions ensemble l’interlocuteur adapté à votre demande.", signature: "Building Trust. Connecting Opportunities." },
    details: { eyebrow: "Coordonnées", title: "GK GROUP", generalEmail: "Email général", institutionalEmail: "Contact institutionnel", call: "Appeler", whatsapp: "WhatsApp", whatsappMessage: "Bonjour GK GROUP, je souhaite obtenir des informations concernant vos services." },
    form: { eyebrow: "Votre demande", title: "Parlez-nous de votre projet", intro: "Les champs marqués d’un astérisque sont obligatoires.", fields: { name: "Nom complet", email: "Email", phone: "Téléphone", country: "Pays", organisation: "Société / Organisation", subject: "Objet", area: "Domaine concerné", message: "Message" }, options: ["Technology & Digital Solutions", "Mobilité internationale", "Commerce international & Import-Export", "Business Development", "Strategic Consulting", "Partenariat", "Autre demande"], submit: "Envoyer via WhatsApp", emailAlternative: "Préférer l’email", whatsappInfo: "En choisissant WhatsApp, les informations saisies seront transférées vers WhatsApp afin que vous puissiez envoyer votre demande à GK GROUP.", privacy: "Les informations transmises via ce formulaire sont utilisées uniquement pour traiter votre demande. GK GROUP ne garantit ni visa, ni emploi, ni admission, ni résultat administratif ou commercial." },
    routing: { eyebrow: "Trouver le bon interlocuteur", title: "Une orientation adaptée à votre demande", items: [{ id: "gkgt", name: "GK GLOBAL TECHNOLOGY (GKGT)", text: "Technology & Digital Solutions" }, { id: "gkgm", name: "GK GLOBAL MOBILITY (GKGM)", text: "International Mobility" }, { id: "uab-gk-esttrade", name: "UAB GK EstTrade", text: "International Trade & Sourcing / échanges Europe–Afrique" }, { id: "gk-danube-trading", name: "GK Danube Trading DOO", text: "International Trade & Development / Projet Serbie en cours de constitution" }, { id: "gk-nexus", name: "GK NEXUS", text: "Projet GK NEXUS Sh.p.k. — immatriculation en cours ; coordination et développement envisagés après immatriculation" }, { id: "gk-global-group-sarlu", name: "GK GLOBAL GROUP SARLU", text: "Questions institutionnelles et corporate au Togo" }] },
    partnership: { title: "Construisons des opportunités ensemble", description: "GK GROUP développe des relations avec des entreprises, institutions, fournisseurs, établissements et partenaires internationaux autour de projets technologiques, de mobilité, de commerce, de développement d’affaires et de coopération stratégique.", cta: "Proposer un partenariat" },
  },
  en: {
    hero: { title: "Let’s Connect", description: "Have a question, a project or a partnership opportunity? Connect with GK GROUP and let us identify the right point of contact for your request.", signature: "Building Trust. Connecting Opportunities." },
    details: { eyebrow: "Contact details", title: "GK GROUP", generalEmail: "General Email", institutionalEmail: "Institutional Contact", call: "Call", whatsapp: "WhatsApp", whatsappMessage: "Hello GK GROUP, I would like to get information about your services." },
    form: { eyebrow: "Your inquiry", title: "Tell us about your project", intro: "Fields marked with an asterisk are required.", fields: { name: "Full name", email: "Email", phone: "Phone", country: "Country", organisation: "Company / Organisation", subject: "Subject", area: "Area of interest", message: "Message" }, options: ["Technology & Digital Solutions", "International Mobility", "International Trade & Import-Export", "Business Development", "Strategic Consulting", "Partnership", "Other inquiry"], submit: "Send via WhatsApp", emailAlternative: "Prefer Email", whatsappInfo: "By choosing WhatsApp, the information entered will be transferred to WhatsApp so you can send your inquiry to GK GROUP.", privacy: "Information submitted through this form is used only to process your inquiry. GK GROUP does not guarantee visas, employment, admission, administrative approvals or commercial outcomes." },
    routing: { eyebrow: "Find the Right Contact", title: "Guidance adapted to your inquiry", items: [{ id: "gkgt", name: "GK GLOBAL TECHNOLOGY (GKGT)", text: "Technology & Digital Solutions" }, { id: "gkgm", name: "GK GLOBAL MOBILITY (GKGM)", text: "International Mobility" }, { id: "uab-gk-esttrade", name: "UAB GK EstTrade", text: "International Trade & Sourcing / Europe–Africa trade" }, { id: "gk-danube-trading", name: "GK Danube Trading DOO", text: "International Trade & Development / Serbia company formation project" }, { id: "gk-nexus", name: "GK NEXUS", text: "GK NEXUS Sh.p.k. project — registration in progress; intended coordination and development following registration" }, { id: "gk-global-group-sarlu", name: "GK GLOBAL GROUP SARLU", text: "Institutional and corporate matters in Togo" }] },
    partnership: { title: "Building Opportunities Together", description: "GK GROUP develops relationships with companies, institutions, suppliers, educational organizations and international partners across technology, mobility, trade, business development and strategic cooperation.", cta: "Partnership Inquiry" },
  },
};

export const NEWS_CATEGORIES = [
  { id: "group", label: { fr: "Actualités GK GROUP", en: "GK GROUP news" }, description: { fr: "Développements institutionnels, initiatives, projets et évolution des entités.", en: "Institutional developments, initiatives, projects and updates from the entities." } },
  { id: "opportunities", label: { fr: "Opportunités internationales", en: "International opportunities" }, description: { fr: "Études, mobilité professionnelle, entrepreneuriat et programmes de coopération, selon les informations vérifiées auprès des sources officielles.", en: "Education, professional mobility, entrepreneurship and cooperation programmes, based on information checked against official sources." } },
  { id: "events", label: { fr: "Événements et conférences", en: "Events and conferences" }, description: { fr: "Conférences, forums économiques, salons professionnels et rencontres institutionnelles.", en: "Conferences, economic forums, trade shows and institutional events." } },
  { id: "announcements", label: { fr: "Annonces officielles", en: "Official announcements" }, description: { fr: "Communiqués, informations importantes, mises à jour des services et avis aux partenaires et clients.", en: "Statements, important information, service updates and notices for partners and clients." } },
];

// Single publication source. Add content only after explicit editorial approval.
// Model, approval rules and bilingual examples: docs/publications-guide.md.
export const NEWS_ITEMS = [
  {
    "id": "gkgroup-international-perspectives",
    "slug": "gk-group-perspectives-developpement-international",
    "category": "group",
    "status": "draft",
    "publicationApproved": false,
    "date": null,
    "relatedLinks": [
      {
        "href": "/architecture",
        "label": {
          "fr": "Notre architecture",
          "en": "Our architecture"
        }
      },
      {
        "href": "/entities",
        "label": {
          "fr": "Nos entités",
          "en": "Our entities"
        }
      }
    ],
    "content": {
      "fr": {
        "title": "GK GROUP : construire des perspectives de développement entre les marchés internationaux",
        "summary": "GK GROUP présente sa vision de développement international, fondée sur la coopération économique, les technologies, la mobilité et les partenariats entre plusieurs régions du monde.",
        "body": [
          "Dans un monde où les échanges économiques, les compétences et les innovations circulent au-delà des frontières, le développement international repose de plus en plus sur la coopération et la complémentarité des expertises.",
          "GK GROUP poursuit une vision entrepreneuriale destinée à créer des connexions entre les entreprises, les marchés, les talents et les opportunités professionnelles.",
          "Cette ambition s'appuie sur plusieurs domaines complémentaires : les technologies et services informatiques, le commerce international, le conseil en mobilité et la coordination des projets.",
          "Au Togo, GK GLOBAL GROUP SARL U constitue une société légalement établie, avec ses branches GK Global Technology et GK Global Mobility.",
          "En Lituanie, UAB GK EstTrade contribue au développement de la dimension commerciale internationale de l'écosystème.",
          "GK Nexus représente une plateforme de coordination internationale associée au projet albanais, tandis que GK Danube Trading DOO demeure un projet de société en constitution en Serbie.",
          "Cette organisation reflète une volonté de développer progressivement des activités et des collaborations entre l'Afrique et l'Europe, tout en explorant les possibilités offertes par l'Asie, les Amériques et d'autres régions du monde.",
          "Les prochaines étapes reposent sur le renforcement des activités existantes, l'identification de partenaires appropriés, la structuration des projets et l'exploration de nouveaux marchés.",
          "GK GROUP privilégie une approche progressive, fondée sur la transparence, le respect des réglementations et la construction de relations professionnelles durables.",
          "Au-delà des frontières géographiques, l'ambition est de contribuer à un environnement dans lequel les compétences, les entreprises et les initiatives entrepreneuriales peuvent trouver de nouvelles perspectives de coopération.",
          "GK GROUP — Global Business Without Borders."
        ]
      },
      "en": {
        "title": "GK GROUP: Building International Development Opportunities Across Markets",
        "summary": "GK GROUP outlines its international development vision, connecting economic cooperation, technology, mobility and partnerships across world regions.",
        "body": [
          "In a world where economic exchanges, professional skills and innovation extend beyond borders, international development increasingly depends on cooperation and complementary expertise.",
          "GK GROUP pursues an entrepreneurial vision aimed at connecting businesses, markets, talent and professional opportunities.",
          "This ambition brings together several complementary fields: technology and IT services, international trade, mobility advisory services and project coordination.",
          "In Togo, GK GLOBAL GROUP SARL U is a legally established company operating through GK Global Technology and GK Global Mobility.",
          "In Lithuania, UAB GK EstTrade contributes to the international commercial dimension of the ecosystem.",
          "GK Nexus represents an international coordination platform associated with the Albanian development project, while GK Danube Trading DOO remains a company formation project in Serbia.",
          "This structure reflects an ambition to progressively develop activities and cooperation between Africa and Europe while exploring opportunities across Asia, the Americas and other world regions.",
          "Future priorities include strengthening existing activities, identifying suitable partners, structuring projects and exploring additional markets.",
          "GK GROUP favors a progressive approach based on transparency, regulatory compliance and the development of lasting professional relationships.",
          "Beyond geographical borders, the objective is to contribute to an environment where skills, businesses and entrepreneurial initiatives can discover new opportunities for cooperation.",
          "GK GROUP — Global Business Without Borders."
        ]
      }
    }
  },
  {
    "id": "gkgt-it-expertise",
    "slug": "gk-global-technology-expertise-solutions-numeriques",
    "category": "group",
    "status": "draft",
    "publicationApproved": false,
    "date": null,
    "relatedEntity": {
      "href": "/gk-global-technology",
      "label": {
        "fr": "Découvrir GK Global Technology",
        "en": "Discover GK Global Technology"
      }
    },
    "content": {
      "fr": {
        "title": "GK Global Technology : l'expertise informatique au service des entreprises et des organisations",
        "summary": "Découvrez les activités de GK Global Technology dans la maintenance informatique, les réseaux, les équipements et les solutions numériques destinées aux professionnels.",
        "body": [
          "À l'heure où les technologies numériques occupent une place essentielle dans le fonctionnement des entreprises et des organisations, la fiabilité des équipements et des infrastructures informatiques représente un enjeu majeur.",
          "GK Global Technology (GKGT), branche de GK GLOBAL GROUP SARL U au Togo, développe ses activités autour de l'assistance technique, de la maintenance informatique et des solutions adaptées aux besoins des professionnels.",
          "Son expertise couvre notamment le diagnostic et la réparation des équipements informatiques, l'installation et la maintenance des logiciels, la configuration des réseaux ainsi que l'accompagnement technique des utilisateurs.",
          "GKGT intervient également dans la fourniture d'équipements et d'accessoires informatiques, avec une attention particulière portée à la qualité, à la fonctionnalité et à l'adéquation des solutions proposées.",
          "L'activité s'inscrit dans une démarche visant à prolonger la durée d'utilisation des équipements lorsque leur reconditionnement est techniquement approprié, tout en contribuant à une gestion plus responsable des ressources informatiques.",
          "À travers son approche, GK Global Technology cherche à accompagner les entreprises, les établissements et les organisations dans l'amélioration de leur environnement technologique.",
          "Au sein de l'écosystème GK GROUP, cette expertise constitue un domaine complémentaire aux activités de commerce international, de mobilité et de coordination des projets.",
          "GK Global Technology — Des solutions informatiques adaptées aux besoins professionnels."
        ]
      },
      "en": {
        "title": "GK Global Technology: IT Expertise Supporting Businesses and Organizations",
        "summary": "Discover GK Global Technology's activities in IT maintenance, networking, equipment and digital solutions for professional users.",
        "body": [
          "As digital technologies become increasingly essential to the daily operations of businesses and organizations, reliable IT equipment and infrastructure are more important than ever.",
          "GK Global Technology (GKGT), a branch of GK GLOBAL GROUP SARL U in Togo, develops its activities around technical assistance, IT maintenance and solutions tailored to professional needs.",
          "Its expertise includes computer diagnostics and repairs, software installation and maintenance, network configuration and technical support for users.",
          "GKGT also provides IT equipment and accessories, with particular attention to quality, functionality and the suitability of proposed solutions.",
          "Its activities include extending the useful life of equipment through refurbishment where technically appropriate, contributing to a more responsible approach to IT resources.",
          "Through its services, GK Global Technology aims to support companies, institutions and organizations in improving their technological environments.",
          "Within the GK GROUP ecosystem, this expertise complements international trade, mobility and project coordination activities.",
          "GK Global Technology — IT Solutions Designed for Professional Needs."
        ]
      }
    }
  },
  {
    "id": "esttrade-international-trade",
    "slug": "uab-gk-esttrade-commerce-international-lituanie",
    "category": "group",
    "status": "draft",
    "publicationApproved": false,
    "date": null,
    "relatedEntity": {
      "href": "/gk-esttrade",
      "label": {
        "fr": "Découvrir UAB GK EstTrade",
        "en": "Discover UAB GK EstTrade"
      }
    },
    "content": {
      "fr": {
        "title": "UAB GK EstTrade : développer les échanges commerciaux internationaux depuis la Lituanie",
        "summary": "Présentation de UAB GK EstTrade, société établie en Lituanie, et de son orientation vers le commerce international, le sourcing B2B et les activités d'import-export.",
        "body": [
          "Dans un environnement économique où les chaînes d'approvisionnement et les relations commerciales dépassent les frontières nationales, les entreprises recherchent des solutions favorisant l'identification de fournisseurs et le développement de nouveaux marchés.",
          "UAB GK EstTrade est une société légalement constituée en Lituanie, associée à l'écosystème international GK GROUP.",
          "Son orientation commerciale repose sur le développement des échanges internationaux, notamment dans les domaines de l'import-export, du sourcing B2B et de la commercialisation d'équipements et de produits adaptés aux besoins des marchés ciblés.",
          "Le secteur des équipements informatiques constitue un domaine d'intérêt particulier, en lien avec l'expérience technologique développée au sein de l'écosystème GK GROUP.",
          "La société entend favoriser l'identification d'opportunités commerciales, les relations entre fournisseurs et acheteurs professionnels, ainsi que la préparation de projets d'approvisionnement transfrontaliers.",
          "Cette démarche repose sur l'analyse des besoins, la recherche de partenaires commerciaux appropriés et le respect des exigences réglementaires applicables aux opérations envisagées.",
          "À travers son implantation en Lituanie, UAB GK EstTrade contribue à la dimension européenne de la stratégie de développement international de GK GROUP.",
          "Son activité s'inscrit dans une vision de coopération économique durable, fondée sur la transparence, la qualité des relations professionnelles et la création de valeur entre marchés.",
          "UAB GK EstTrade — Connecting Markets Through International Trade."
        ]
      },
      "en": {
        "title": "UAB GK EstTrade: Developing International Trade Connections from Lithuania",
        "summary": "An introduction to UAB GK EstTrade, a company established in Lithuania, focusing on international trade, B2B sourcing and import-export activities.",
        "body": [
          "In an economic environment where supply chains and commercial relationships extend beyond national borders, businesses increasingly seek solutions to identify suppliers and explore new markets.",
          "UAB GK EstTrade is a legally incorporated company in Lithuania and part of the international GK GROUP ecosystem.",
          "Its commercial direction focuses on developing international trade activities, particularly import-export, B2B sourcing and the commercialization of equipment and products suited to target markets.",
          "IT equipment represents an area of particular interest, reflecting the technological experience developed within the GK GROUP ecosystem.",
          "The company aims to support the identification of commercial opportunities, relationships between suppliers and professional buyers, and the preparation of cross-border sourcing projects.",
          "This approach is based on needs assessment, identifying suitable commercial partners and complying with applicable regulatory requirements.",
          "Through its establishment in Lithuania, UAB GK EstTrade contributes to the European dimension of GK GROUP's international development strategy.",
          "Its activities reflect a vision of sustainable economic cooperation built on transparency, professional relationships and value creation between markets.",
          "UAB GK EstTrade — Connecting Markets Through International Trade."
        ]
      }
    }
  },
  {
    id: "gk-nexus-international-coordination",
    slug: "gk-nexus-coordination-internationale",
    category: "group",
    status: "published",
    publicationApproved: true,
    date: "2026-10-15",
    relatedEntity: {
      href: "/gk-nexus",
      label: { fr: "Découvrir GK Nexus", en: "Discover GK Nexus" },
    },
    content: {
      fr: {
        title: "GK Nexus : une plateforme de coordination au cœur de la vision internationale de GK GROUP",
        summary: "Découvrez comment GK Nexus contribue à la coordination des projets, au développement des partenariats et à la coopération internationale au sein de l'écosystème GK GROUP.",
        body: [
          "Le développement d'activités dans plusieurs pays nécessite une vision commune, une organisation structurée et une coordination efficace des projets.",
          "C'est dans cette perspective que GK Nexus occupe une place stratégique dans l'écosystème GK GROUP, en tant que plateforme internationale de gestion et de coordination.",
          "Associée au projet de développement de GK GROUP en Albanie, cette plateforme a vocation à faciliter la coopération entre les différentes activités de l'écosystème, tout en respectant l'autonomie juridique des sociétés concernées.",
          "Ses principaux domaines d'intervention sont la coordination des activités internationales, la gestion et le suivi des projets, le développement des partenariats, l'organisation des échanges et l'appui au développement commercial.",
          "GK Nexus vise également à favoriser une meilleure circulation de l'information entre les initiatives technologiques, commerciales et professionnelles de GK GROUP.",
          "Cette approche s'inscrit dans une ambition plus large : construire un réseau entrepreneurial capable de développer des collaborations durables entre plusieurs régions du monde.",
          "GK Nexus représente ainsi une fonction de coordination et de développement stratégique. Son rôle ne doit pas être confondu avec une relation de propriété juridique sur les autres sociétés de l'écosystème.",
          "GK Nexus — Connecting Businesses, Projects and Opportunities.",
        ],
      },
      en: {
        title: "GK Nexus: An International Coordination Platform Supporting GK GROUP's Global Vision",
        summary: "Discover how GK Nexus supports project coordination, partnership development and international cooperation across the GK GROUP ecosystem.",
        body: [
          "Developing activities across multiple countries requires a shared vision, structured organization, and effective project coordination.",
          "Within this framework, GK Nexus holds a strategic role in the GK GROUP ecosystem as an international management and coordination platform.",
          "Associated with GK GROUP's development project in Albania, the platform is intended to facilitate cooperation across the ecosystem while respecting the separate legal identities of the companies involved.",
          "Its main functions include international activity coordination, project management and monitoring, partnership development, communication between entities, and business development support.",
          "GK Nexus also aims to improve information sharing across GK GROUP's technology, commercial, and professional initiatives.",
          "This approach reflects a broader ambition: building an entrepreneurial network capable of fostering lasting cooperation between different regions of the world.",
          "GK Nexus therefore represents a coordination and strategic development function. Its role should not be interpreted as legal ownership of the other companies within the ecosystem.",
          "GK Nexus — Connecting Businesses, Projects and Opportunities.",
        ],
      },
    },
  },
  {
    id: "gkgm-international-mobility",
    slug: "gk-global-mobility-accompagnement-international",
    category: "group",
    status: "published",
    publicationApproved: true,
    date: "2026-10-15",
    relatedEntity: {
      href: "/gk-global-mobility",
      label: { fr: "Découvrir GK Global Mobility", en: "Discover GK Global Mobility" },
    },
    content: {
      fr: {
        title: "GK Global Mobility : accompagner les talents et les entrepreneurs vers de nouvelles perspectives internationales",
        summary: "GK Global Mobility accompagne les étudiants, les professionnels et les entrepreneurs dans la préparation de leurs projets de mobilité internationale, grâce à une approche personnalisée et structurée.",
        body: [
          "Dans un environnement où les études, les compétences et les activités économiques dépassent de plus en plus les frontières, GK Global Mobility (GKGM) développe une approche personnalisée du conseil en mobilité internationale.",
          "Branche de GK GLOBAL GROUP SARL U, établie au Togo, GKGM accompagne les étudiants, les professionnels et les entrepreneurs dans la préparation et l'organisation de leurs projets internationaux.",
          "Ses domaines d'intervention comprennent notamment l'orientation vers les études à l'étranger, l'accompagnement documentaire, la coordination avec les partenaires spécialisés et le conseil relatif aux projets de mobilité professionnelle.",
          "GKGM s'intéresse également à la mobilité entrepreneuriale, en orientant les porteurs de projets vers les informations et les interlocuteurs pertinents pour leurs démarches d'implantation internationale.",
          "L'approche repose sur l'analyse des besoins, la préparation des dossiers, la transparence et le suivi des démarches, dans le respect des réglementations applicables.",
          "GK Global Mobility ne délivre pas de visas et ne garantit ni admission, ni emploi, ni autorisation de séjour. Les décisions relèvent exclusivement des établissements, employeurs et autorités compétents.",
          "À travers ses activités, GKGM entend faciliter l'accès à une information structurée et contribuer à une mobilité internationale mieux préparée.",
          "GK Global Mobility — Une branche de GK GLOBAL GROUP SARL U.",
        ],
      },
      en: {
        title: "GK Global Mobility: Supporting Talent and Entrepreneurs in Their International Ambitions",
        summary: "GK Global Mobility supports students, professionals and entrepreneurs in preparing their international mobility projects through a personalized and structured approach.",
        body: [
          "As education, professional skills, and business activities increasingly cross borders, GK Global Mobility (GKGM) is developing a personalized approach to international mobility advisory services.",
          "As a branch of GK GLOBAL GROUP SARL U in Togo, GKGM supports students, professionals, and entrepreneurs in preparing and organizing their international projects.",
          "Its services include international education guidance, document preparation support, coordination with specialized partners, and advice related to professional mobility projects.",
          "GKGM also addresses entrepreneurial mobility by helping project holders identify relevant information and qualified contacts for international business establishment procedures.",
          "Its approach emphasizes needs assessment, document preparation, transparency, and procedural guidance in accordance with applicable regulations.",
          "GK Global Mobility does not issue visas or guarantee admission, employment, or residence authorization. Decisions remain the responsibility of the relevant institutions, employers, and authorities.",
          "Through its services, GKGM aims to make international mobility information more accessible and help individuals prepare their projects more effectively.",
          "GK Global Mobility — A branch of GK GLOBAL GROUP SARL U.",
        ],
      },
    },
  },
  {
    id: "gkgroup-international-ecosystem",
    slug: "gk-group-ecosysteme-entrepreneurial-international",
    category: "group",
    status: "published",
    publicationApproved: true,
    date: "2026-10-15",
    content: {
      fr: {
        title: "GK GROUP : un écosystème entrepreneurial international au service des opportunités sans frontières",
        summary: "Technologies, mobilité internationale, commerce et coordination de projets : GK GROUP développe un écosystème fondé sur la coopération et les complémentarités.",
        body: [
          "GK GROUP poursuit le développement de sa vision entrepreneuriale internationale, fondée sur la coopération, l'innovation et la création de passerelles entre les marchés, les entreprises et les talents.",
          "Porté par le fondateur Edem Yawo Awutey, cet écosystème réunit des activités complémentaires dans les technologies, la mobilité internationale, le commerce et la coordination des projets.",
          "Au Togo, GK GLOBAL GROUP SARL U constitue une société légalement établie, avec deux branches : GK Global Technology (GKGT), spécialisée dans les services informatiques et les solutions numériques, et GK Global Mobility (GKGM), dédiée au conseil et à l'accompagnement en mobilité internationale.",
          "En Lituanie, UAB GK EstTrade contribue au développement de la dimension commerciale internationale de l'écosystème, notamment à travers l'import-export, le sourcing et les relations B2B.",
          "GK Nexus représente la plateforme de coordination internationale de GK GROUP, avec une orientation vers la gestion de projets, les partenariats et le développement des affaires. L'écosystème comprend également le projet GK Danube Trading DOO en Serbie, actuellement en constitution.",
          "À travers cette organisation, GK GROUP ambitionne de développer des relations économiques et professionnelles durables entre l'Afrique, l'Europe, l'Asie, les Amériques et d'autres marchés internationaux.",
          "GK GROUP — Global Business Without Borders.",
        ],
      },
      en: {
        title: "GK GROUP: an international entrepreneurial ecosystem creating opportunities without borders",
        summary: "Technology, international mobility, trade and project coordination: GK GROUP is developing an ecosystem built on cooperation and complementary expertise.",
        body: [
          "GK GROUP continues to develop its international entrepreneurial vision, built on cooperation, innovation and connections between markets, businesses and talent.",
          "Led by founder Edem Yawo Awutey, this ecosystem brings together complementary activities in technology, international mobility, trade and project coordination.",
          "In Togo, GK GLOBAL GROUP SARL U is a legally established company with two branches: GK Global Technology (GKGT), specialising in IT services and digital solutions, and GK Global Mobility (GKGM), dedicated to advisory services and support for international mobility.",
          "In Lithuania, UAB GK EstTrade contributes to the ecosystem’s international commercial development, particularly through import-export, sourcing and B2B relationships.",
          "GK Nexus serves as GK GROUP’s international coordination platform, with a focus on project management, partnerships and business development. The ecosystem also includes the GK Danube Trading DOO project in Serbia, currently in the process of incorporation.",
          "Through this organisation, GK GROUP aims to develop lasting economic and professional relationships between Africa, Europe, Asia, the Americas and other international markets.",
          "GK GROUP — Global Business Without Borders.",
        ],
      },
    },
  },
];

export const NEWS_CONTENT = {
  fr: {
    hero: { title: "Actualités & Perspectives", description: "Retrouvez les actualités, initiatives, partenariats et développements stratégiques de GK GROUP et de ses structures.", signature: "Building Trust. Connecting Opportunities." },
    state: { eyebrow: "Communication corporate", title: "Nos actualités arrivent bientôt", description: "Cette section présentera les annonces, initiatives, partenariats et développements de GK GROUP et de ses structures." },
    latest: { eyebrow: "Actualités", title: "Dernières publications", readMore: "Lire la suite", structure: "Structure concernée" },
    intro: "Communications institutionnelles, perspectives et informations internationales : consultez les publications validées de GK GROUP et leurs sources, lorsqu’elles sont nécessaires.",
    filters: { label: "Filtrer les publications par catégorie", all: "Toutes les publications", results: "publication(s)", emptyTitle: "Aucune publication dans cette catégorie", emptyDescription: "Aucune publication validée n’est actuellement disponible pour cette catégorie. Vous pouvez consulter l’ensemble des publications ou nous contacter." },
    article: { back: "Retour aux actualités", published: "Publié le", archived: "Publication archivée", source: "Source officielle", region: "Pays ou région", type: "Type d’opportunité", organisation: "Organisme ou source", deadline: "Date limite", eligibility: "Conditions d’éligibilité", verified: "Informations vérifiées le", unknown: "Non communiquée", event: "Événement", country: "Pays", city: "Ville", dates: "Dates", organiser: "Organisateur", registration: "Conditions d’inscription", opportunityNotice: "Consultez la source officielle pour confirmer les conditions et la disponibilité avant toute démarche. Aucun visa, recrutement ou admission n’est garanti.", eventNotice: "Les modalités de participation et toute éventuelle invitation doivent être confirmées auprès de l’organisateur." },
    statuses: { open: "Ouverte · disponibilité vérifiée", expired: "Expirée", archived: "Archivée", unverified: "Disponibilité à revérifier", scheduled: "Programmé", cancelled: "Annulé", postponed: "Reporté", past: "Date passée" },
    stayInformed: { title: "Restez informé", description: "Suivez les développements de GK GROUP et découvrez nos initiatives à travers nos différents domaines d’activité.", cta: "Nous contacter" },
  },
  en: {
    hero: { title: "News & Insights", description: "Discover news, initiatives, partnerships and strategic developments from GK GROUP and its structures.", signature: "Building Trust. Connecting Opportunities." },
    state: { eyebrow: "Corporate communication", title: "Our latest news is coming soon", description: "This section will feature announcements, initiatives, partnerships and developments from GK GROUP and its structures." },
    latest: { eyebrow: "News", title: "Latest publications", readMore: "Read more", structure: "Related structure" },
    intro: "Institutional communications, insights and international information: explore GK GROUP’s approved publications and their sources where relevant.",
    filters: { label: "Filter publications by category", all: "All publications", results: "publication(s)", emptyTitle: "No publications in this category", emptyDescription: "No approved publications are currently available in this category. Browse all publications or contact us." },
    article: { back: "Back to news", published: "Published on", archived: "Archived publication", source: "Official source", region: "Country or region", type: "Opportunity type", organisation: "Organisation or source", deadline: "Deadline", eligibility: "Eligibility requirements", verified: "Information checked on", unknown: "Not provided", event: "Event", country: "Country", city: "City", dates: "Dates", organiser: "Organiser", registration: "Registration requirements", opportunityNotice: "Check the official source to confirm conditions and availability before taking action. No visa, recruitment or admission outcome is guaranteed.", eventNotice: "Participation arrangements and any invitation must be confirmed directly with the organiser." },
    statuses: { open: "Open · availability verified", expired: "Expired", archived: "Archived", unverified: "Availability needs rechecking", scheduled: "Scheduled", cancelled: "Cancelled", postponed: "Postponed", past: "Date passed" },
    stayInformed: { title: "Stay Informed", description: "Follow GK GROUP developments and discover our initiatives across our areas of activity.", cta: "Contact Us" },
  },
};

export const ABOUT_CONTENT = {
  fr: {
    hero: { eyebrow: "Architecture institutionnelle internationale", title: "À propos de GK GROUP", description: "GK GROUP est une marque et un écosystème international, sans statut juridique propre à ce jour, réunissant des sociétés, branches et plateformes complémentaires.", motto: "Global Business Without Borders", signature: "Building Trust. Connecting Opportunities." },
    identity: { eyebrow: "Qui sommes-nous ?", title: "Construire un groupe international durable", description: "GK GROUP vise à relier l’Afrique et l’Europe, puis à développer progressivement sa présence internationale au moyen d’activités complémentaires, d’une gouvernance coordonnée et de partenariats durables.", currentLabel: "Présence actuelle et structures", current: ["Togo", "Lituanie"], plannedLabel: "Développement stratégique", planned: "Serbie — projet GK Danube Trading DOO, constitution en cours. Albanie — projet GK NEXUS Sh.p.k., immatriculation en cours." },
    vision: { eyebrow: "Vision stratégique 2026–2035", title: "Une organisation conçue pour traverser les générations", description: "Notre ambition est de construire une organisation internationale durable, capable de créer de la valeur avec rigueur, continuité et responsabilité.", pillars: ["Innovation", "Gouvernance", "Développement international", "Création de valeur durable", "Excellence opérationnelle", "Partenariats stratégiques", "Expansion progressive"] },
    founder: { eyebrow: "Mot du fondateur", name: "Edem Yawo Awutey", role: "Fondateur & Directeur Général — GK GROUP", message: ["Notre ambition est de bâtir un écosystème international capable de créer des passerelles entre l’Afrique et le reste du monde. À travers nos activités dans la technologie, la mobilité internationale, le commerce et le développement d’affaires, nous souhaitons connecter les marchés, les entreprises, les talents et les opportunités au-delà des frontières — en Europe, en Asie, dans les Amériques et partout où de nouvelles collaborations peuvent être développées.", "GK GROUP porte ainsi une vision résolument mondiale : construire des relations durables, faciliter les échanges internationaux et créer de nouvelles opportunités entre les continents."], motto: "Global Business Without Borders", emailLabel: "Contact institutionnel", whatsappLabel: "WhatsApp GK GROUP", emailAria: "Contacter GK GROUP par email", whatsappAria: "Contacter GK GROUP via WhatsApp", photoAlt: "Edem Yawo Awutey, Fondateur et Directeur Général de GK GROUP" },
    mission: { eyebrow: "Notre mission", title: "Connecter, structurer et développer", items: ["Connecter les opportunités entre marchés.", "Structurer et développer des activités complémentaires.", "Faciliter les échanges Afrique–Europe.", "Développer des solutions en technologie, mobilité, commerce international, business development et conseil stratégique.", "Construire des partenariats durables."] },
    model: { eyebrow: "Modèle institutionnel", title: "Une coordination claire, des structures autonomes", description: "GK GROUP associe un pilotage coordonné à l’autonomie opérationnelle de ses structures, afin de renforcer leur complémentarité, le suivi des performances et le développement international progressif.", cta: "Découvrir notre architecture", principles: ["Gouvernance et pilotage coordonnés", "Autonomie opérationnelle des structures", "Complémentarité entre les entités", "Contrôle et suivi des performances", "Développement international progressif"] },
    timeline: { eyebrow: "Notre évolution", title: "Une présence construite par étapes", items: [{ title: "Togo", text: "GK GLOBAL GROUP SARLU, société établie au Togo, développe ses activités à travers ses deux branches opérationnelles, GKGT et GKGM." }, { title: "Lituanie", text: "Présence internationale via UAB GK EstTrade, dédiée au commerce, au sourcing et au développement Europe–Afrique." }, { title: "Serbie", text: "Développement engagé à travers le projet GK Danube Trading DOO, dont la constitution est en cours." }, { title: "Albanie", text: "Projet GK NEXUS Sh.p.k. en Albanie, immatriculation en cours ; future plateforme de coordination et de développement international, sous réserve d’immatriculation." }] },
    domains: { eyebrow: "Nos domaines", title: "Cinq expertises complémentaires", cta: "Découvrir nos activités" },
    horizon: { eyebrow: "Horizon international", title: "Une vision géographique à long terme", description: "Au-delà de sa présence actuelle, GK GROUP envisage un horizon stratégique de long terme entre l’Afrique, l’Europe, les Amériques et l’Asie-Pacifique. Ces régions expriment une ambition de développement, et non des implantations opérationnelles actuelles." },
  },
  en: {
    hero: { eyebrow: "International institutional architecture", title: "About GK GROUP", description: "GK GROUP is an international brand and ecosystem, currently without legal status of its own, bringing together complementary companies, branches and platforms.", motto: "Global Business Without Borders", signature: "Building Trust. Connecting Opportunities." },
    identity: { eyebrow: "Who we are", title: "Building a sustainable international group", description: "GK GROUP aims to connect Africa and Europe, then progressively develop its international presence through complementary activities, coordinated governance and lasting partnerships.", currentLabel: "Current presence and structures", current: ["Togo", "Lithuania"], plannedLabel: "Strategic development", planned: "Serbia — GK Danube Trading DOO project, company formation in progress. Albania — GK NEXUS Sh.p.k. project, registration in progress." },
    vision: { eyebrow: "Strategic Vision 2026–2035", title: "An organisation designed to span generations", description: "Our ambition is to build a sustainable international organisation that creates value with rigour, continuity and responsibility.", pillars: ["Innovation", "Governance", "International development", "Sustainable value creation", "Operational excellence", "Strategic partnerships", "Progressive expansion"] },
    founder: { eyebrow: "Founder’s Message", name: "Edem Yawo Awutey", role: "Founder & Managing Director — GK GROUP", message: ["Our ambition is to build an international ecosystem capable of creating bridges between Africa and the rest of the world. Through our activities in technology, international mobility, trade and business development, we aim to connect markets, businesses, talent and opportunities across borders — in Europe, Asia, the Americas and wherever new international collaborations can be developed.", "GK GROUP therefore embraces a truly global vision: building lasting relationships, facilitating international exchanges and creating new opportunities across continents."], motto: "Global Business Without Borders", emailLabel: "Institutional contact", whatsappLabel: "GK GROUP WhatsApp", emailAria: "Contact GK GROUP by email", whatsappAria: "Contact GK GROUP via WhatsApp", photoAlt: "Edem Yawo Awutey, Founder and Managing Director of GK GROUP" },
    mission: { eyebrow: "Our mission", title: "Connect, structure and develop", items: ["Connect opportunities across markets.", "Structure and develop complementary activities.", "Facilitate Africa–Europe exchanges.", "Develop solutions in technology, mobility, international trade, business development and strategic consulting.", "Build lasting partnerships."] },
    model: { eyebrow: "Institutional model", title: "Clear coordination, autonomous structures", description: "GK GROUP combines coordinated steering with the operational autonomy of its structures to strengthen complementarity, performance oversight and progressive international development.", cta: "Discover our architecture", principles: ["Coordinated governance and steering", "Operational autonomy of structures", "Complementarity between entities", "Performance oversight and monitoring", "Progressive international development"] },
    timeline: { eyebrow: "Our evolution", title: "A presence built step by step", items: [{ title: "Togo", text: "GK GLOBAL GROUP SARLU, a company established in Togo, develops its activities through its two operational branches, GKGT and GKGM." }, { title: "Lithuania", text: "International presence through UAB GK EstTrade, dedicated to trade, sourcing and Europe–Africa development." }, { title: "Serbia", text: "Development underway through the GK Danube Trading DOO project, with company formation in progress." }, { title: "Albania", text: "GK NEXUS Sh.p.k. is a proposed company in Albania with registration in progress, intended as a future coordination and international development platform subject to registration." }] },
    domains: { eyebrow: "Our areas", title: "Five complementary areas of expertise", cta: "Discover our activities" },
    horizon: { eyebrow: "International horizon", title: "A long-term geographic vision", description: "Beyond its current presence, GK GROUP envisages a long-term strategic horizon across Africa, Europe, the Americas and Asia-Pacific. These regions express a development ambition, not current operational establishments." },
  },
};

export const ENTITIES = [
  { id: "gk-global-group-sarlu", name: "GK GLOBAL GROUP SARLU", kind: { fr: "Société établie au Togo, avec deux branches opérationnelles : GKGT et GKGM", en: "Company established in Togo, with two operational branches: GKGT and GKGM" }, location: "Lomé, Togo" },
  { id: "gkgt", name: "GKGT — GK GLOBAL TECHNOLOGY", kind: { fr: "Branche opérationnelle Technology & IT de GK GLOBAL GROUP SARLU", en: "Technology & IT operational branch of GK GLOBAL GROUP SARLU" }, location: "Lomé, Togo" },
  { id: "gkgm", name: "GKGM — GK GLOBAL MOBILITY", kind: { fr: "Branche opérationnelle International Mobility de GK GLOBAL GROUP SARLU", en: "International Mobility operational branch of GK GLOBAL GROUP SARLU" }, location: "Lomé, Togo" },
  { id: "gk-nexus", name: "GK NEXUS", kind: { fr: "Projet GK NEXUS Sh.p.k. en Albanie, immatriculation en cours ; future plateforme de coordination sous réserve d’immatriculation", en: "GK NEXUS Sh.p.k. project in Albania, registration in progress; future coordination platform subject to registration" }, location: null },
  { id: "uab-gk-esttrade", name: "UAB GK EstTrade", kind: { fr: "Société de l’écosystème GK GROUP établie en Lituanie : commerce international, sourcing, import-export et relations Europe–Afrique", en: "GK GROUP ecosystem company established in Lithuania: international trade, sourcing, import-export and Europe–Africa relations" }, location: "Lituanie" },
  { id: "gk-danube-trading", name: "GK Danube Trading DOO", kind: { fr: "Projet de société en cours de constitution en Serbie", en: "Company formation project in progress in Serbia" }, location: "Serbie" },
];

export const ENTITY_LOGOS = {
  "gk-global-group-sarlu": { src: "/brand/entities/gk-global-group-sarlu.png", alt: "Logo GK GLOBAL GROUP SARLU" },
  gkgt: { src: "/brand/entities/gk-global-technology.png", alt: "Logo GK GLOBAL TECHNOLOGY (GKGT)" },
  gkgm: { src: "/brand/entities/gk-global-mobility.png", alt: "Logo GK GLOBAL MOBILITY (GKGM)" },
  "gk-nexus": { src: "/brand/entities/gk-nexus.png", alt: "Logo GK NEXUS" },
  "uab-gk-esttrade": { src: "/brand/entities/uab-gk-esttrade.png", alt: "Logo UAB GK EstTrade" },
  "gk-danube-trading": { src: "/brand/entities/gk-danube-trading.png", alt: "GK Danube Trading DOO" },
};

export const ENTITY_DETAILS = {
  "gk-global-group-sarlu": { domain: { fr: "Cadre institutionnel et coordination", en: "Institutional framework and coordination" }, role: { fr: "Société établie au Togo, GK GLOBAL GROUP SARLU développe ses activités à travers deux branches opérationnelles : GK GLOBAL TECHNOLOGY (GKGT) et GK GLOBAL MOBILITY (GKGM).", en: "A company established in Togo, GK GLOBAL GROUP SARLU develops its activities through two operational branches: GK GLOBAL TECHNOLOGY (GKGT) and GK GLOBAL MOBILITY (GKGM)." }, legal: { fr: { title: "Informations légales", entries: [{ label: "Forme juridique", value: "SARL U" }, { label: "RCCM", value: "TG-LFW-01-2026-B13-02457" }, { label: "NIF", value: "1002141706" }, { label: "Siège social", value: "Lomé, Togo" }] }, en: { title: "Legal Information", entries: [{ label: "Legal form", value: "SARL U" }, { label: "RCCM", value: "TG-LFW-01-2026-B13-02457" }, { label: "Tax ID (NIF)", value: "1002141706" }, { label: "Registered office", value: "Lomé, Togo" }] } } },
  gkgt: { domain: { fr: "Technology & IT", en: "Technology & IT" }, role: { fr: "Branche opérationnelle de GK GLOBAL GROUP SARLU dédiée aux technologies, aux solutions informatiques, aux réseaux et aux services IT.", en: "Operational branch of GK GLOBAL GROUP SARLU dedicated to technology, IT solutions, networks and IT services." } },
  gkgm: { domain: { fr: "International Mobility", en: "International Mobility" }, role: { fr: "Branche opérationnelle de GK GLOBAL GROUP SARLU dédiée au conseil et à l’accompagnement en mobilité internationale.", en: "Operational branch of GK GLOBAL GROUP SARLU dedicated to international mobility consulting and support." } },
  "gk-nexus": { domain: { fr: "Corporate & International Operations", en: "Corporate & International Operations" }, role: { fr: "Projet de société en Albanie dont l’immatriculation est en cours ; future plateforme de coordination et de développement international, sous réserve d’immatriculation.", en: "Proposed company in Albania with registration in progress; future coordination and international development platform, subject to registration." }, location: { fr: "Projet Albanie / immatriculation en cours", en: "Albania project / registration in progress" } },
  "uab-gk-esttrade": { domain: { fr: "Commerce international, sourcing et développement Europe–Afrique", en: "International trade, sourcing and Europe–Africa development" }, role: { fr: "Commerce international, sourcing, import-export et développement des relations Europe–Afrique au sein de l’écosystème GK GROUP.", en: "International trade, sourcing, import-export and development of Europe–Africa relations within the GK GROUP ecosystem." }, legal: { fr: { title: "Informations légales", entries: [{ label: "Forme juridique", value: "UAB (société à responsabilité limitée)" }, { label: "Code société", value: "306154150" }, { label: "Siège social", value: "Vilnius, Lithuania" }] }, en: { title: "Legal Information", entries: [{ label: "Legal form", value: "UAB (Private Limited Liability Company)" }, { label: "Company code", value: "306154150" }, { label: "Registered office", value: "Vilnius, Lithuania" }] } } },
  "gk-danube-trading": { domain: { fr: "Commerce et développement international", en: "Trade and international development" }, role: { fr: "Développement d’un projet d’implantation en Serbie et dans la région ; constitution de la société en cours, sans implantation juridique opérationnelle à ce stade.", en: "Development of a planned establishment in Serbia and the region; company formation is in progress, with no operational legal establishment at this stage." } },
};
