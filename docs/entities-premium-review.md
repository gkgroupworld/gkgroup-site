# Nos entités — refonte institutionnelle premium

Base synchronisée avec origin/main : b20ab08. Branche locale : `codex/entities-premium`. Aucun push ni déploiement.

## Aperçus

- [Français](http://localhost:3100/entities?lang=fr)
- [Anglais](http://localhost:3100/entities?lang=en)
- [Galerie ordinateur et mobile FR/EN](entities-premium-previews/index.html)

La galerie contient les captures complètes à 1440 et 390 px. Les aperçus complémentaires montrent la bannière, la fiche togolaise et la section Nexus.

## Présentation

La page conserve InstitutionalBanner premium, sans modifier ce composant ni les styles partagés. Les titres et sous-titres correspondent à la demande. Les autres sections utilisent InstitutionalFrame, InstitutionalHeading, InstitutionalAction et InstitutionalClosing, ainsi que les styles premium existants de l’Accueil.

La présentation distingue la marque GK GROUP sans personnalité juridique propre, les sociétés constituées au Togo et en Lituanie, la plateforme fonctionnelle Nexus et son projet de société porteuse albanaise, et le projet serbe en constitution. Les deux branches GKGT/GKGM sont imbriquées dans la fiche de la société togolaise. Aucun logo n’est utilisé pour le projet serbe.

Les mentions Nexus relatives à l’immatriculation non confirmée, aux missions non toutes opérationnelles et à l’absence de propriété juridique sont réutilisées depuis le contenu validé de la page Architecture. Les informations légales existantes de Togo et EstTrade sont réutilisées sans modification depuis content/site.js. Aucune date d’immatriculation ou participation au capital n’est ajoutée.

## Vérifications

- Build Next.js : réussi ; seul avertissement non bloquant Node DEP0205 déjà présent.
- ESLint : réussi.
- verify-entities : FR/EN, quatre fiches, deux branches dans la fiche Togo, cinq fonctions Nexus, prudence des statuts, absence de logo serbe, quatre domaines complémentaires, coordonnées légales conservées, identifiants uniques, libellés ARIA résolus et sept destinations bilingues accessibles.
- verify-home, verify-architecture, verify-institutional-pages, verify-seo et verify-heroes : réussis sur le build local.
- Avant actualisation des empreintes de Nos entités, les 22 autres versions FR/EN sont comparées à leurs empreintes existantes : aucun changement de contenu, bannière, navigation, pied de page, SEO ou JSON-LD.
- Sur Nos entités, les empreintes du SEO, du JSON-LD, de la navigation et du pied de page restent inchangées. Seuls le contenu et le sous-titre volontairement refondus sont actualisés dans le fichier de référence du test.
- Huit contrôles responsive : FR/EN à 1440, 834, 390 et 320 px. Aucun débordement horizontal. Logos officiels entiers en object-fit: contain, textes et boutons adaptatifs. Revue des captures ordinateur et mobile, avec chargement des six logos confirmé.
- Aucun changement des métadonnées, des URL canoniques, du hreflang ou du sitemap ; aucun changement des autres pages ou composants partagés.

## Fichiers modifiés

- components/pages/EntitiesPage.js : structure premium de la page.
- content/entities.js : contenu FR/EN propre à cette page.
- scripts/verify-entities.mjs : vérification dédiée.
- docs/hero-baseline.json : actualisation des deux seules entrées Nos entités.
- docs/entities-premium-review.md : rapport de livraison.
- docs/entities-premium-previews/ : galerie, captures et mesures responsive.
