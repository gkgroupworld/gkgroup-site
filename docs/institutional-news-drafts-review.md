# Trois brouillons institutionnels finalisés

Branche : `codex/three-institutional-news-drafts`. Complément au commit `af85745`. Aucun push, fusion ou déploiement.

## Six aperçus locaux

| Article | Français | English |
|---|---|---|
| GKGT | [FR](http://127.0.0.1:3102/preview/news/gk-global-technology-expertise-solutions-numeriques?lang=fr) | [EN](http://127.0.0.1:3102/preview/news/gk-global-technology-expertise-solutions-numeriques?lang=en) |
| EstTrade | [FR](http://127.0.0.1:3102/preview/news/uab-gk-esttrade-commerce-international-lituanie?lang=fr) | [EN](http://127.0.0.1:3102/preview/news/uab-gk-esttrade-commerce-international-lituanie?lang=en) |
| Perspectives | [FR](http://127.0.0.1:3102/preview/news/gk-group-perspectives-developpement-international?lang=fr) | [EN](http://127.0.0.1:3102/preview/news/gk-group-perspectives-developpement-international?lang=en) |

[Galerie des douze captures ordinateur/mobile](institutional-news-previews/index.html).

L’article 6 contient le titre, le résumé et les onze paragraphes FR/EN fournis, conclusion comprise. Catégorie Actualités GK GROUP. Deux boutons bilingues mènent à Architecture et Nos entités. Le composant existant reçoit uniquement une liste facultative de liens ; le rendu des autres articles est préservé.

## Vérifications

- ESLint et build : réussis ; avertissement Node DEP0205 préexistant uniquement.
- Huit scripts verify-*.mjs : réussis sur le build de production local, port 3109, avec GK_NEWS_LOCAL_PREVIEW=1.
- Test supplémentaire TEST_LOCAL_NEWS_PREVIEW=1 sur le port 3102 : six aperçus, textes intégraux, noindex/nofollow, absence de date et de JSON-LD d’article publié, liens bilingues, refus des Host externes.
- Trois articles draft, publicationApproved=false, date=null ; exclus des listes, filtres et sitemap. Routes normales et aperçus en production : 404.
- Audit des six aperçus à 1440 et 390 px : aucun débordement horizontal ni date. Captures GKGT/EstTrade conservées ; quatre captures Perspectives ajoutées.
- Liens Architecture et Entités activés par Entrée dans les deux langues : destinations correctes et titres localisés.
- Objets des articles 4 et 5 et des trois publications strictement identiques à af85745. Les 24 références institutionnelles et le SEO public à 30 URL restent inchangés.

Pour relancer l’aperçu en PowerShell, sans l’exposer par tunnel :

```powershell
$env:GK_NEWS_LOCAL_PREVIEW='1'
npm run dev -- --hostname 127.0.0.1 --port 3102
```

## Fichiers du complément

content/site.js, components/pages/NewsArticlePage.js, scripts/verify-news.mjs, ce rapport, l’archive de l’envoi initial tronqué, la galerie et son audit, et quatre captures Perspectives.

La publication groupée attend la validation explicite de l’utilisateur.
