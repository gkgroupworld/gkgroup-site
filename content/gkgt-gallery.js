import batch from "./gkgt-authentic-batch.json";
import displayV2 from "./gkgt-display-v2.json";

export const HISTORICAL_PHOTOS = [
  {
    "id": "archive-01",
    "category": "archives",
    "src": "/archives-techniques/01_20181030_170129.webp",
    "thumbnail": "/archives-techniques/01_20181030_170129.webp",
    "width": 1012,
    "height": 1800,
    "caption": {
      "fr": "Vue d'un atelier informatique",
      "en": "View of an IT workshop"
    },
    "approved": true
  },
  {
    "id": "archive-02",
    "category": "archives",
    "src": "/archives-techniques/02_20181030_170143.webp",
    "thumbnail": "/archives-techniques/02_20181030_170143.webp",
    "width": 1800,
    "height": 1013,
    "caption": {
      "fr": "Équipements et espace de travail",
      "en": "Equipment and workspace"
    },
    "approved": true
  },
  {
    "id": "archive-06",
    "category": "archives",
    "src": "/archives-techniques/06_20211013_095534.webp",
    "thumbnail": "/archives-techniques/06_20211013_095534.webp",
    "width": 1800,
    "height": 1013,
    "caption": {
      "fr": "Moniteurs informatiques",
      "en": "Computer monitors"
    },
    "approved": true
  },
  {
    "id": "archive-11",
    "category": "archives",
    "src": "/archives-techniques/11_IMG-20181112-WA0042.webp",
    "thumbnail": "/archives-techniques/11_IMG-20181112-WA0042.webp",
    "width": 1080,
    "height": 809,
    "caption": {
      "fr": "Composant électronique",
      "en": "Electronic component"
    },
    "approved": true
  },
  {
    "id": "archive-12",
    "category": "archives",
    "src": "/archives-techniques/12_IMG-20181122-WA0004.webp",
    "thumbnail": "/archives-techniques/12_IMG-20181122-WA0004.webp",
    "width": 1800,
    "height": 1013,
    "caption": {
      "fr": "Carte électronique en cours d'intervention",
      "en": "Circuit board during servicing"
    },
    "approved": true
  },
  {
    "id": "archive-14",
    "category": "archives",
    "src": "/archives-techniques/14_IMG-20190301-WA0000.webp",
    "thumbnail": "/archives-techniques/14_IMG-20190301-WA0000.webp",
    "width": 1080,
    "height": 710,
    "caption": {
      "fr": "Matériel informatique en atelier",
      "en": "IT equipment in a workshop"
    },
    "approved": true
  },
  {
    "id": "archive-16",
    "category": "archives",
    "src": "/archives-techniques/16_unites-centrales-arriere-plan-modifie.png",
    "thumbnail": "/archives-techniques/16_unites-centrales-arriere-plan-modifie.png",
    "width": 1086,
    "height": 1448,
    "caption": {
      "fr": "Ensemble d'unités centrales — arrière-plan modifié",
      "en": "Desktop computer units — edited background"
    },
    "approved": true
  },
  {
    "id": "archive-18",
    "category": "archives",
    "src": "/archives-techniques/18_IMG_20180329_095427.webp",
    "thumbnail": "/archives-techniques/18_IMG_20180329_095427.webp",
    "width": 1350,
    "height": 1800,
    "caption": {
      "fr": "Étagères de composants et d'équipements informatiques",
      "en": "Shelves of computer components and equipment"
    },
    "approved": true
  },
  {
    "id": "archive-20",
    "category": "archives",
    "src": "/archives-techniques/20_IMG_20190125_120103_9.webp",
    "thumbnail": "/archives-techniques/20_IMG_20190125_120103_9.webp",
    "width": 1800,
    "height": 1350,
    "caption": {
      "fr": "Ordinateur portable ouvert, clavier démonté et outils de réparation",
      "en": "Open laptop with detached keyboard and repair tools"
    },
    "approved": true
  },
  {
    "id": "archive-21",
    "category": "archives",
    "src": "/archives-techniques/21_IMG_20190214_073458_8.webp",
    "thumbnail": "/archives-techniques/21_IMG_20190214_073458_8.webp",
    "width": 1800,
    "height": 1350,
    "caption": {
      "fr": "Ordinateur et périphériques",
      "en": "Computer and peripherals"
    },
    "approved": true
  },
  {
    "id": "archive-23",
    "category": "archives",
    "src": "/archives-techniques/23_IMG_20190308_092807_2.webp",
    "thumbnail": "/archives-techniques/23_IMG_20190308_092807_2.webp",
    "width": 1350,
    "height": 1800,
    "caption": {
      "fr": "Intervention technique sur un composant à l'établi",
      "en": "Technical work on a component at a workbench"
    },
    "approved": true
  },
  {
    "id": "archive-24",
    "category": "archives",
    "src": "/archives-techniques/24_IMG_20190308_092825_7.webp",
    "thumbnail": "/archives-techniques/24_IMG_20190308_092825_7.webp",
    "width": 1350,
    "height": 1800,
    "caption": {
      "fr": "Manipulation d'une carte électronique dans un atelier informatique",
      "en": "Handling a circuit board in a computer workshop"
    },
    "approved": true
  }
];

export const GALLERY_CATEGORIES = [
  { id: "interventions", anchor: "gkgt-interventions", title: { fr: "Interventions techniques", en: "Technical Work" } },
  { id: "equipment", anchor: "gkgt-equipment", title: { fr: "Équipements informatiques", en: "Computer Equipment" } },
  { id: "workshop", anchor: "gkgt-workshop", title: { fr: "Atelier et boutique", en: "Workshop and Store" } },
  { id: "archives", anchor: "technical-archives", title: { fr: "Archives historiques", en: "Historical Archives" } },
];

export const GALLERY_PHOTOS = [
  ...batch.photos.filter(photo => photo.disposition === "included-local-preview").map(photo => ({
    id: photo.id, category: photo.category, src: photo.publicationFile, thumbnail: photo.thumbnailFile,
    width: photo.originalWidth, height: photo.originalHeight, caption: photo.caption,
    approved: batch.generalPublicationAuthorization === "confirmed-by-owner" && photo.publicationStatus === "confirmed",
  })),
  ...HISTORICAL_PHOTOS,
].map(photo => ({ ...photo, ...displayV2.photos[photo.id] }));
