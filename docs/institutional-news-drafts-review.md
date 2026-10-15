# Articles 4 et 5 — brouillons ; article 6 incomplet

Branche `codex/three-institutional-news-drafts`, synchronisée avec `17e83fc`.

## Livrables disponibles

- GKGT : [FR](http://127.0.0.1:3102/preview/news/gk-global-technology-expertise-solutions-numeriques?lang=fr) · [EN](http://127.0.0.1:3102/preview/news/gk-global-technology-expertise-solutions-numeriques?lang=en)
- EstTrade : [FR](http://127.0.0.1:3102/preview/news/uab-gk-esttrade-commerce-international-lituanie?lang=fr) · [EN](http://127.0.0.1:3102/preview/news/uab-gk-esttrade-commerce-international-lituanie?lang=en)
- [Galerie : huit captures ordinateur/mobile](institutional-news-previews/index.html).

Les textes complets fournis des articles 4 et 5 sont repris sans modification. Leur catégorie est Actualités GK GROUP ; leurs boutons localisés mènent à GKGT et EstTrade. Aucun changement de composant, style, bannière, navigation ou métadonnée existante.

Chaque article reste `draft`, `publicationApproved: false`, `date: null`. Les URL normales FR/EN et les aperçus en production renvoient 404. Ils sont absents de tous les filtres et du sitemap. Le modèle, le composant NewsArticlePage et l'aperçu local existants sont réutilisés.

## Article 6 en attente

Le fichier transmis s'interrompt après « le conseil en mobilité et la coordination ». La suite française, la conclusion et toute la version anglaise manquent. L'extrait exact est conservé dans [international-perspectives-incomplete.md](international-perspectives-incomplete.md), sans ajout à NEWS_ITEMS. Aucun contenu de remplacement n'a été inventé. La réponse « ok » à la demande de complément n'apporte pas le texte manquant.

## Vérifications

- ESLint, build et huit scripts de test : réussis.
- Production locale sur 127.0.0.1:3108 avec GK_NEWS_LOCAL_PREVIEW=1 : refus de tous les aperçus, listes/sitemap limités aux trois publications approuvées ; SEO à 30 URL inchangé.
- Développement sur 127.0.0.1:3102 : quatre aperçus FR/EN, textes intégraux, noindex/nofollow, absence de date/JSON-LD d'article publié ; Host externe refusé. Test : `TEST_LOCAL_NEWS_PREVIEW=1 node scripts/verify-news.mjs http://127.0.0.1:3102`.
- Responsive 1440 et 390 px, FR/EN : aucun débordement ; audit JSON et captures joints.
- Clavier : Tab depuis Retour aux actualités atteint le lien d'entité ; Entrée ouvre la bonne page FR pour chacun des deux articles.
- Objets des trois articles publiés strictement identiques à `17e83fc` ; contrôles existants des trois contenus validés et des 24 pages institutionnelles réussis.
- Avertissement Node DEP0205 préexistant ; aucune erreur bloquante pour les articles 4 et 5.

Relancer l'aperçu local si nécessaire, sans l'exposer par tunnel :

```powershell
$env:GK_NEWS_LOCAL_PREVIEW='1'
npm run dev -- --hostname 127.0.0.1 --port 3102
```

## Fichiers modifiés

`content/site.js`, `scripts/verify-news.mjs`, ce rapport, l'extrait incomplet de l'article 6, et `docs/institutional-news-previews/` (galerie HTML, audit JSON, huit captures JPG).

Aucune fusion vers main, aucun push ni déploiement.
