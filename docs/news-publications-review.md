# Actualités & Perspectives — évolution des publications

Base synchronisée avec origin/main : 779a814. Branche locale : `codex/news-publications`. Aucun push ni déploiement.

## Aperçus et contenu disponible

- [Français](http://localhost:3100/news?lang=fr)
- [Anglais](http://localhost:3100/news?lang=en)
- [Galerie ordinateur/mobile](news-publications-previews/index.html)
- [Guide de création, validation, publication et archivage](publications-guide.md)

NEWS_ITEMS est vide dans la version publiée examinée. Aucune actualité, opportunité, image ou annonce réelle n’a été ajoutée. Il n’existe donc pas de publication approuvée permettant de fournir un exemple détaillé réel. L’état vide est volontairement conservé et les exemples ne figurent que dans la documentation et les tests.

## Évolution ciblée

La bannière InstitutionalBanner, ses textes, son logo, le halo et les anneaux restent inchangés. Navigation et pied de page sont conservés. Sous la bannière : introduction concise, titre des publications récentes, quatre filtres de catégorie et filtre global, compteur, grille conditionnelle et état vide adapté à la catégorie. Les liens de filtre sont utilisables sans JavaScript et au clavier. Le CTA Contact reste présent.

NEWS_CONTENT, NEWS_CATEGORIES et NEWS_ITEMS dans content/site.js demeurent la source éditoriale unique. Aucun CMS ni interface d’administration n’est installé. lib/news.js centralise les validations et sélections, sans second catalogue.

La route /news/[slug] existait déjà : elle est complétée avec date, catégorie, corps bilingue, retour aux actualités, métadonnées canonical/hreflang, Open Graph Article et JSON-LD Article/NewsArticle. Les brouillons, éléments non approuvés, incomplets, datés dans le futur ou ambigus restent exclus et renvoient 404. Les images nécessitent une autorisation et des textes alternatifs FR/EN.

Les modèles d’opportunité et d’événement précisent les sources, lieux, dates, conditions et statuts. Les opportunités ne sont affichées ouvertes qu’avec confirmation explicite et vérification encore valide. L’expiration est calculée selon l’échéance connue ; les archives ne sont pas supprimées. Les dates sans heure utilisent la fin du jour UTC pour les échéances ; les horodatages avec fuseau conservent leur instant exact. Une page ouverte doit être rechargée pour actualiser un statut temporel.

## Dépendance technique nécessaire

app/sitemap.js ajoute les seules publications autorisées via le même sélecteur, dans les deux langues. Son rendu devient dynamique pour appliquer les validations de date à chaque requête. Avec NEWS_ITEMS vide, ses 24 URL institutionnelles restent identiques. Le test SEO existant est adapté pour inclure automatiquement les articles autorisés futurs.

Aucune autre page institutionnelle ni composant de navigation, pied de page ou bannière n’est modifié. Les champs institutionnels de content/site.js hors NEWS_* restent inchangés.

## Vérifications

- Build Next.js et ESLint : réussis. Avertissement Node DEP0205 déjà présent, non bloquant.
- Huit scripts réussis : verify-news, verify-partnerships, verify-entities, verify-heroes, verify-home, verify-architecture, verify-institutional-pages et verify-seo.
- verify-news teste les quatre catégories et leurs filtres, toutes les combinaisons statut/validation, l’archivage, les dates futures et invalides, les traductions incomplètes, les identifiants ambigus, les dates d’expiration à la frontière UTC, la limite de validité de vérification, les statuts des événements, l’autorisation des images et le JSON-LD traduit.
- Contrôles HTTP FR/EN des filtres et de leur canonical ; état vide sans carte fictive ; routes inexistante, exemple documentaire brouillon et fixture de test : 404 ; aucune URL de brouillon dans le sitemap. Les sélections positives d’articles et de sitemap sont testées avec des fixtures uniquement en mémoire, jamais ajoutées à NEWS_ITEMS.
- Comparaison des empreintes des 22 autres versions FR/EN : contenu et bannières inchangés. Pour /news : bannière, navigation, pied de page, SEO et JSON-LD global inchangés ; seules les deux empreintes du corps de liste sont actualisées.
- Huit contrôles navigateur : FR/EN à 1440, 834, 390 et 320 px, sans débordement horizontal. Revue des captures ordinateur/mobile. Correction locale du contraste du filtre actif (texte blanc sur bleu marine) sans modifier les styles globaux.
- Activation du filtre Événements par la touche Entrée : URL, aria-current et message vide de catégorie corrects.

## Fichiers modifiés

- content/site.js : évolution des seuls exports NEWS_*.
- lib/news.js : modèle et règles communes de publication, dates, statuts et sélection.
- components/pages/NewsPage.js : introduction, filtres, résultats et état vide.
- components/ui/NewsCard.js : cartes et statuts, images autorisées, liens contextualisés.
- components/pages/NewsArticlePage.js : présentation détaillée et champs spécifiques.
- app/news/page.js et app/news/[slug]/page.js : filtres et route détaillée protégée.
- app/sitemap.js : inclusion des seules publications autorisées.
- scripts/verify-news.mjs et scripts/verify-seo.mjs : tests dédiés et sitemap extensible.
- docs/hero-baseline.json : seules les deux entrées /news sont actualisées.
- docs/publications-guide.md, docs/news-publications-review.md et docs/news-publications-previews/ : guide, rapport, galerie et captures.
