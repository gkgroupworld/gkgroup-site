# Ajouter et gérer une publication GK GROUP

## Source unique et catégories

Toutes les publications sont conservées dans `NEWS_ITEMS`, dans `content/site.js`. `NEWS_CONTENT` centralise les libellés FR/EN et `NEWS_CATEGORIES` définit les quatre catégories :

| Identifiant | Français | Anglais |
|---|---|---|
| group | Actualités GK GROUP | GK GROUP news |
| opportunities | Opportunités internationales | International opportunities |
| events | Événements et conférences | Events and conferences |
| announcements | Annonces officielles | Official announcements |

`lib/news.js` applique les mêmes règles à la liste, aux pages détaillées et au sitemap. Aucun CMS, compte administrateur ou second catalogue n’est nécessaire.

## Préparer un brouillon

Exemple de structure à adapter, uniquement documentaire. Ne pas copier cet exemple comme publication approuvée :

```js
{
  id: "identifiant-unique",
  slug: "titre-court-et-stable",
  category: "group",
  status: "draft", // draft | published | archived
  publicationApproved: false,
  date: "AAAA-MM-JJ", // date réelle de publication validée
  content: {
    fr: { title: "Titre à valider", summary: "Résumé à valider", body: ["Premier paragraphe à valider.", "Deuxième paragraphe."] },
    en: { title: "Title for review", summary: "Summary for review", body: ["First paragraph for review.", "Second paragraph."] },
  },
  // Facultatif, uniquement si une source pertinente a été vérifiée :
  source: { name: "Nom exact de la source", url: "https://source-officielle.example/" },
}
```

Le corps est une liste de paragraphes ou un texte séparé par des lignes vides. Il est rendu comme texte, sans exécuter de HTML, Markdown ou scripts. Les identifiants et slugs doivent être uniques. Un slug contient des lettres minuscules sans accents, des chiffres et des tirets. Ne pas modifier un slug déjà publié sans prévoir une redirection validée.

Une illustration n’est affichée que si l’objet `image` contient `src` (fichier local commençant par `/`), `width`, `height`, `alt: {fr, en}` et `publicationApproved: true`. Cette dernière propriété consigne une autorisation réelle de publication. Sans autorisation, l’image est ignorée ; aucune image de remplacement n’est inventée. Les proportions sont conservées avec object-fit: contain.

Les champs facultatifs `structure` (clé existante de ENTITY_LOGOS) et `structureName` permettent de citer une structure GK GROUP lorsque c’est pertinent. Ne pas les utiliser pour ajouter un logo externe.

## Opportunité internationale

Choisir `category: "opportunities"` et ajouter :

```js
opportunity: {
  region: { fr: "Pays ou région vérifié", en: "Verified country or region" },
  type: { fr: "Type vérifié", en: "Verified type" },
  organisation: "Organisme ou source vérifié",
  eligibility: { fr: "Conditions exactes vérifiées", en: "Verified eligibility requirements" },
  officialUrl: "https://source-officielle.example/programme",
  verifiedAt: "AAAA-MM-JJTHH:mm:ssZ", // vérification effectivement réalisée
  deadline: null, // date réelle, si connue ; sinon null
  status: "open", // open | expired | archived
  availabilityVerified: false,
  verificationValidUntil: null,
}
```

La source, l’organisme, la région, le type, les conditions FR/EN et une date de vérification passée sont nécessaires à la publication. Le protocole de la source doit être HTTPS. Ces contrôles techniques ne déterminent pas qu’un site est officiel : l’éditeur doit le vérifier réellement.

Pour afficher « Ouverte · disponibilité vérifiée », il faut aussi consigner `availabilityVerified: true` et une date réelle `verificationValidUntil` encore valide, choisie selon les conditions vérifiées auprès de la source. Cette date n’est pas une date limite inventée ; c’est la limite de validité de la vérification éditoriale. Sans cette confirmation, l’interface affiche « Disponibilité à revérifier » et ne présente pas l’opportunité comme disponible.

Une échéance dépassée déclenche « Expirée » à l’affichage, même si le champ status n’a pas été mis à jour. L’article reste consultable et figure toujours dans sa catégorie et le sitemap. Une publication archivée conserve sa mention d’archive en plus de l’expiration, le cas échéant. Aucune suppression automatique n’est effectuée.

Ne jamais inventer une rémunération, un quota, une échéance, une condition d’admission ou une garantie de visa, d’emploi ou d’admission.

## Événement ou conférence

Choisir `category: "events"` et ajouter :

```js
event: {
  name: { fr: "Nom vérifié", en: "Verified event name" },
  country: { fr: "Pays vérifié", en: "Verified country" },
  city: "Ville vérifiée",
  startsAt: "AAAA-MM-JJ", // date réelle
  endsAt: null, // fin réelle si connue
  organiser: "Organisateur vérifié",
  officialUrl: "https://organisateur-officiel.example/evenement",
  verifiedAt: "AAAA-MM-JJTHH:mm:ssZ",
  registration: null, // ou {fr, en} si les conditions sont connues
  status: "scheduled", // scheduled | cancelled | postponed | archived
}
```

L’organisateur, la source, la date de vérification et les dates de l’événement sont contrôlés. L’interface distingue les états programmé, annulé, reporté, archivé et « Date passée ». Lorsque la fin n’est pas connue, « Date passée » se réfère au jour de début, sans inventer de durée. Les conditions d’inscription inconnues sont signalées comme non communiquées. Aucune disponibilité d’invitation pour visa n’est annoncée automatiquement ; toute mention éventuelle dans le texte exige une confirmation expresse de l’organisateur.

## Dates, langues et mise en ligne

Utiliser des dates ISO valides. Les dates sans heure sont interprétées en UTC ; une date limite sans heure reste valable jusqu’à 23:59:59.999 UTC ce jour-là. Si la source impose un horaire et un fuseau, fournir un horodatage ISO avec fuseau (`Z` ou décalage explicite). La présentation des dates est localisée en français/anglais, en UTC. Les statuts sont recalculés à chaque chargement de page ; une page déjà ouverte doit être rechargée pour actualiser son état.

1. Rédiger et vérifier les deux langues, les faits, les droits d’image et les sources.
2. Conserver `status: "draft"` et `publicationApproved: false` pendant la préparation.
3. Obtenir la validation éditoriale explicite. Les indicateurs du code consignent cette décision humaine ; ils ne l’accordent pas.
4. Renseigner une date réelle non future, puis `status: "published"` et `publicationApproved: true` après validation. Les deux traductions (titre, résumé, corps) sont obligatoires.
5. Exécuter ESLint, build et `node scripts/verify-news.mjs http://localhost:3100`, puis contrôler la liste, le filtre, les deux routes détaillées et le sitemap sur le serveur local. Le test signale volontairement l’ajout de données dans NEWS_ITEMS : remplacer cette assertion de répertoire vide uniquement dans le cadre d’une publication réelle explicitement approuvée.
6. Publier le commit uniquement après autorisation de publication du site.

Les brouillons, contenus incomplets, dates futures, validations absentes et identifiants ambigus sont exclus des listes et du sitemap et renvoient 404 sur `/news/[slug]`. Il n’existe aucun paramètre public de prévisualisation permettant de contourner ces règles.

## Modifier et archiver

Modifier l’objet existant dans NEWS_ITEMS, vérifier à nouveau les deux langues et les sources puis faire valider le changement. Pour une correction en attente, remettre la publication en brouillon : elle disparaît aussi des routes publiques et du sitemap.

Pour archiver sans supprimer l’URL, utiliser `status: "archived"`, en conservant la validation éditoriale et le contenu complet. L’archive demeure dans les publications, son filtre de catégorie, sa page détaillée et le sitemap ; sa mention est visible. Les statuts spécifiques des opportunités et événements peuvent également être archivés.

Les métadonnées des articles sont dérivées du titre et du résumé traduits, avec canonical et hreflang FR/EN. Un JSON-LD NewsArticle est créé pour les actualités et annonces, Article pour les opportunités et événements. Aucun auteur, éditeur, résultat ou date de modification n’est inventé. Le sitemap ajoute automatiquement les deux versions des seules publications autorisées et reste calculé à la requête.
