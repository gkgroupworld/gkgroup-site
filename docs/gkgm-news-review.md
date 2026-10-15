# Publication n° 2 — GK Global Mobility (brouillon local)

Branche : `codex/gkgm-news-draft`. Base synchronisée : `a12ccf4`.

## Aperçus

- FR : http://127.0.0.1:3102/preview/news/gk-global-mobility-accompagnement-international?lang=fr
- EN : http://127.0.0.1:3102/preview/news/gk-global-mobility-accompagnement-international?lang=en
- Galerie : [captures ordinateur/mobile](gkgm-news-previews/index.html).

Les textes, résumés et conclusions FR/EN fournis sont conservés. Le bouton final renvoie vers la page GKGM dans la langue courante. Le composant du premier article est réutilisé, sans nouvelle bannière ni illustration.

## Protection et date

`status: "draft"`, `publicationApproved: false`, `date: null`. L'article reste absent de la liste, de tous les filtres et du sitemap ; sa route normale `/news/gk-global-mobility-accompagnement-international` renvoie 404 en FR/EN.

La route d'aperçu nécessite simultanément NODE_ENV=development, `GK_NEWS_LOCAL_PREVIEW=1` et un en-tête Host local. Elle est désactivée dans un build de production, même si le drapeau est activé. Le serveur d'aperçu écoute uniquement sur 127.0.0.1 ; ne pas l'exposer par un tunnel ni le déployer. Métadonnée noindex/nofollow, mention de brouillon et aucune date ni donnée structurée d'article publié.

Relancer en PowerShell si nécessaire :

```powershell
$env:GK_NEWS_LOCAL_PREVIEW='1'
npm run dev -- --hostname 127.0.0.1 --port 3102
```

La date réelle sera renseignée au moment de la publication, après validation. Aucun push ni déploiement effectué.

## Vérifications

- ESLint et build de production réussis (avertissement Node DEP0205 préexistant).
- Huit scripts `scripts/verify-*.mjs` réussis sur le serveur de production local, port 3103.
- `TEST_LOCAL_NEWS_PREVIEW=1 node scripts/verify-news.mjs http://127.0.0.1:3102` : contenu intégral FR/EN, lien GKGM, noindex, absence de date, rejet des hôtes externes et maintien des 404 publiques.
- Contrôle visuel FR/EN à 1440 et 390 px : titres, corps, mentions institutionnelles, lien final, absence de débordement horizontal. Voir `responsive-audit.json`.
- Premier article inchangé : empreinte SHA-256 de son objet validé conservée dans le test ; les 24 références institutionnelles et le sitemap public à 26 URL restent identiques.

## Fichiers

- `content/site.js` : second article en brouillon, premier article intact.
- `components/pages/NewsArticlePage.js` : affichage d'aperçu et bouton facultatif vers l'entité.
- `app/preview/news/[slug]/page.js` : aperçu limité au développement local.
- `scripts/verify-news.mjs` : contrôles du brouillon, de l'aperçu et de l'intégrité du premier article.
- Ce document, `gkgm-news-previews/index.html`, quatre captures JPG et leur audit JSON.
