// Editorial order only: no date, location, client identity or current premises
// is inferred from a photograph. Every view is used once on the page.
export const GKGT_PHOTO_STORIES = [
  {
    id: "expertise", anchor: "gkgt-gallery", layout: "feature",
    photos: ["N13", "archive-11", "archive-12"],
    eyebrow: { fr: "L’expertise par le geste", en: "Expertise through practical work" },
    title: { fr: "Au plus près des équipements et des composants", en: "A closer look at equipment and components" },
    body: { fr: "Un ordinateur ouvert, un établi, une carte électronique : ces vues donnent à voir le travail technique et les éléments sur lesquels il porte. Elles associent une intervention sur un portable aux détails de composants conservés dans nos archives.", en: "An open computer, a workbench, a circuit board: these views show technical work and the parts it involves. A laptop intervention is paired with component details preserved in our archives." },
  },
  {
    id: "maintenance", anchor: "gkgt-interventions", layout: "maintenance",
    photos: ["N03", "N10", "N04", "N05"],
    eyebrow: { fr: "Maintenance et réparation", en: "Maintenance and repair" },
    title: { fr: "Observer, nettoyer et intervenir", en: "Inspect, clean and work on equipment" },
    body: { fr: "L’examen d’un portable, le nettoyage d’une unité centrale et l’ouverture d’un écran illustrent différentes situations de maintenance. Chaque photographie documente un geste ou un équipement ; elle ne permet pas, à elle seule, de conclure à une panne précise ou à une réparation achevée.", en: "Examining a laptop, cleaning a desktop computer and opening a monitor illustrate different maintenance situations. Each photograph documents a task or an item of equipment; it does not, on its own, establish a specific fault or a completed repair." },
  },
  {
    id: "equipment", anchor: "gkgt-equipment", layout: "equipment",
    photos: ["N15", "N06", "N08", "archive-06", "archive-16", "archive-21"],
    eyebrow: { fr: "Équipements et reconditionnement", en: "Equipment and refurbishment" },
    title: { fr: "Du composant au poste complet", en: "From individual parts to a complete workstation" },
    body: { fr: "Moniteurs, unités centrales, imprimante et accessoires donnent un aperçu des matériels photographiés au fil de l’activité. Leur présentation accompagne nos services d’équipement et de reconditionnement, sans attester l’état, la disponibilité ou la garantie d’un produit particulier.", en: "Monitors, desktop computers, a printer and accessories provide a view of the equipment photographed during the activity. Their presentation supports our equipment and refurbishment services without certifying the condition, availability or warranty of any particular product." },
  },
  {
    id: "workshop", anchor: "gkgt-workshop", layout: "workshop",
    photos: ["archive-02", "N09", "archive-01", "archive-18"],
    eyebrow: { fr: "Atelier et espaces de travail", en: "Workshop and working environments" },
    title: { fr: "Les espaces qui entourent le travail technique", en: "The spaces around the technical work" },
    body: { fr: "Étagères, postes installés sur une table et matériel en préparation replacent les équipements dans leur environnement. Ces vues documentaires ne sont pas une visite de nos installations actuelles ; aucune propriété des locaux ou localisation n’est déduite des images.", en: "Shelving, workstations arranged on a table and equipment being prepared place the hardware in its surroundings. These documentary views are not a tour of our current facilities; no ownership of the premises or location is inferred from the images." },
  },
  {
    id: "evolution", anchor: "technical-archives", layout: "timeline",
    photos: ["archive-14", "archive-20", "archive-23", "archive-24"],
    eyebrow: { fr: "Parcours et évolution de l’activité", en: "The activity’s journey and development" },
    title: { fr: "Nos archives techniques", en: "Our Technical Archives" },
    body: { fr: "Sous l’appellation historique GK Informatique, ces photographies conservent des repères de matériel, d’intervention et de travail au composant. La frise propose un parcours de lecture sans dates : elle ne prétend pas établir l’ordre réel des prises de vue ni des étapes de l’entreprise.", en: "Under the historical name GK Informatique, these photographs preserve examples of equipment, interventions and component work. The timeline offers an undated reading sequence: it does not claim to establish the actual order of the photographs or the company’s milestones." },
    steps: [
      { fr: "Le matériel en atelier", en: "Equipment in the workshop" },
      { fr: "L’ordinateur ouvert", en: "The open computer" },
      { fr: "L’intervention au composant", en: "Working on a component" },
      { fr: "La manipulation d’une carte", en: "Handling a circuit board" },
    ],
  },
];
