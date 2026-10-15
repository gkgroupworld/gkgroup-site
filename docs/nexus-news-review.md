# Article n° 3 — GK Nexus : validation locale

Branche : `codex/gk-nexus-news-draft`. Base synchronisée : `1c298ca`.

## Aperçus

- [Français](http://127.0.0.1:3102/preview/news/gk-nexus-coordination-internationale?lang=fr)
- [English](http://127.0.0.1:3102/preview/news/gk-nexus-coordination-internationale?lang=en)
- [Galerie FR/EN ordinateur/mobile](nexus-news-previews/index.html)

Les titres, résumés, huit paragraphes (conclusion comprise) de chaque langue reprennent les textes fournis. Catégorie « Actualités GK GROUP ». Bouton localisé vers `/gk-nexus`. Le composant `NewsArticlePage` et la protection de prévisualisation existants sont réutilisés sans modification de présentation ni du système éditorial.

GK Nexus reste une plateforme fonctionnelle associée au projet albanais. Le texte ne déclare aucune immatriculation de GK Nexus Sh.p.k., propriété juridique sur les autres sociétés, ni réalisation ou partenariat nouveau.

## État et protections

- `status: "draft"`, `publicationApproved: false`, `date: null`.
- Article absent des listes, des filtres et du sitemap ; URL normale FR/EN en 404.
- Route d'aperçu accessible uniquement en développement avec `GK_NEWS_LOCAL_PREVIEW=1` et un Host local ; serveur lié à 127.0.0.1.
- Production : aperçu en 404 même avec le drapeau activé. Hôtes externes refusés en développement.
- Aperçu : noindex/nofollow, indication de brouillon, aucune date ni JSON-LD d'article publié.
- Aucun push, fusion vers main ou déploiement effectué.

Si le serveur local doit être relancé (PowerShell) :

```powershell
$env:GK_NEWS_LOCAL_PREVIEW='1'
npm run dev -- --hostname 127.0.0.1 --port 3102
```

Ne pas exposer ce serveur de développement par tunnel. La date réelle sera renseignée uniquement lors d'une publication autorisée.

## Tests et contrôles

- ESLint : réussi.
- Build de production : réussi ; avertissement Node DEP0205 préexistant uniquement.
- Huit scripts `verify-*.mjs` : réussis sur le build local, port 3106, avec le drapeau d'aperçu activé.
- Test supplémentaire `TEST_LOCAL_NEWS_PREVIEW=1 node scripts/verify-news.mjs http://127.0.0.1:3102` : réussi, texte intégral FR/EN, lien Nexus, noindex, absence de date, refus d'Host externe.
- SEO public inchangé : 28 URL FR/EN, canonical, hreflang, sitemap, références institutionnelles, navigation et bannières conservés.
- Comparaison des deux articles publiés : objets strictement identiques au commit `1c298ca` et rendus `<main>` identiques au site public dans les deux langues.
- Captures FR/EN à 1440 et 390 px : aucun débordement horizontal ; lecture, titres et lien final contrôlés. Audit JSON joint.
- Clavier : Tab depuis « Retour aux actualités » atteint « Découvrir GK Nexus » ; Entrée ouvre `/gk-nexus?lang=fr`. Le sélecteur de langue activé par Entrée ouvre l'aperçu anglais.

## Fichiers modifiés

- `content/site.js` : ajout du seul brouillon Nexus.
- `scripts/verify-news.mjs` : contrôles du brouillon, de l'aperçu et de ses exclusions.
- `docs/nexus-news-review.md` : présent rapport.
- `docs/nexus-news-previews/index.html`, `responsive-audit.json`, quatre captures JPG : validation visuelle.
