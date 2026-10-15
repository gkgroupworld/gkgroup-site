# Bannières premium — proposition corrigée

Cette livraison remplace la proposition visuelle refusée du commit 613952c. Branche locale : `codex/unified-institutional-banners`. Aucun push ni déploiement.

## Référence examinée

Accueil publié : https://gkgroup.app/?lang=fr, observé dans le navigateur et capturé à 1440 px. Son HTML correspond à l’implémentation de `HomePage.js` au commit publié b975dc4. Le fichier HomePage.js est restauré intégralement à cette version ; Home.module.css reste inchangé.

Le design comporte un fond #061b46, un halo radial doré à 10 %, des anneaux discrets, une grille 1.35fr / .65fr à partir de 1024 px, un titre de 56 px sur ordinateur, 48 px sur tablette et 36 px sur mobile, une description limitée à 576 px et des espacements verticaux de 96 / 80 / 64 px. L’animation d’apparition respecte prefers-reduced-motion.

Le cadre blanc à filet doré et ombre douce est effectivement présent sur l’Accueil publié. Il est repris avec sa largeur maximale de 384 px et une hauteur naturelle, sans le ratio fixe 320 × 256 de la proposition refusée. Les fichiers des logos officiels sont inchangés et leur rendu utilise object-fit: contain.

## Réutilisation

InstitutionalBanner reprend les classes de composition de l’Accueil et importe directement Home.module.css pour les effets et l’animation. Son ancien CSS Module est supprimé. Les titres, sous-titres, logos, signatures, notes juridiques et boutons restent ceux de chaque page. Les notes spécifiques à Architecture et Nexus conservent leur mise en évidence dans la même composition.

Pages adaptées : À propos, Architecture, Nos activités, Nos entités, GK Global Technology, GK Global Mobility, GK Nexus, UAB GK EstTrade, Partenariats, Actualités et Contact. L’Accueil reste la référence publiée, sans dépendance au nouveau composant.

## Galerie et aperçus

[Galerie comparative et 72 captures](premium-hero-previews/index.html)

[Six bannières à largeur identique](premium-hero-previews/comparison-six.jpg) : Accueil publié, Nos activités, À propos, GKGT, Nexus et EstTrade. Les hauteurs restent naturelles selon les textes et les boutons ; les captures ne sont pas étirées pour les égaliser.

Serveur local : http://localhost:3100. Versions linguistiques : `?lang=fr` et `?lang=en`.

## Vérifications

- Build Next.js et ESLint réussis.
- verify-heroes : les 24 versions FR/EN conservent textes, boutons, sections sous les bannières, navigation, pied de page, SEO et JSON-LD par comparaison aux empreintes avant modification.
- verify-home, verify-architecture, verify-institutional-pages et verify-seo réussis.
- 72 contrôles navigateur : 12 pages × FR/EN × 1440/834/390 px. Aucun débordement horizontal, toutes les images chargées et en object-fit: contain, halo et anneaux présents.
- Revue visuelle de la comparaison des six bannières et des planches FR/EN tablette/mobile : titres lisibles, logos entiers, boutons et notes conservés, aucune coupure.
- HomePage.js identique à b975dc4 ; Home.module.css inchangé. Aucun changement des contenus, métadonnées, navigation ou fichiers de logo.
- Avertissement Node DEP0205 sur module.register pendant le build : non bloquant.

## Fichiers de cette correction

- components/pages/HomePage.js : restauration de l’Accueil publié.
- components/ui/InstitutionalBanner.js : composition et styles issus de l’Accueil.
- components/ui/InstitutionalBanner.module.css : supprimé.
- scripts/verify-heroes.mjs : contrôle de l’Accueil autonome et des onze bannières partagées.
- docs/premium-hero-audit.json : résultats responsive.
- docs/premium-hero-previews/ : référence, comparaison, galerie et captures.
- docs/premium-hero-review.md : ce rapport.
