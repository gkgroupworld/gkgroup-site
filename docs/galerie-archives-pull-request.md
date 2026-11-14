# Intégrer la galerie historique et technique bilingue à la page À propos

PR à ouvrir en **brouillon**, depuis `feature/galerie-archives-techniques` vers `main`, après vérification des déploiements automatiques Netlify. Ne pas fusionner ni déployer sans validation explicite.

## Modification

La page `/about` présente sept photographies authentiques immédiatement après « Notre histoire » et avant « Mission et vision ». La galerie reprend les couleurs institutionnelles marine et or, avec légendes et alternatives FR/EN, grille responsive et images optimisées par Next.js. L'introduction rappelle que GK Informatique est une activité historique.

Cinq photos de l'archive restent exclues du dossier public en raison de personnes visibles ou d'éléments de confidentialité à valider. Le détail de la sélection et des validations est dans `docs/galerie-archives-review.md`.

## Vérification

- Installation verrouillée, lint et build de production réussis.
- 7 tests de formulaires réussis ; 12 parcours navigateur FR/EN et deux soumissions de partenariats simulées réussis, sans envoi réel.
- Régression SEO vérifiée sur 38 URL ; métadonnées et sitemap inchangés.
- Galerie contrôlée en FR/EN à 390, 768 et 1440 px, sans débordement ; sept images chargées et chargement différé confirmé.

## Avant publication

Confirmer les droits et les légendes des sept photos retenues. Conserver les cinq autres hors publication jusqu'à validation. Vérifier les réglages Netlify de branches et de Deploy Previews avant le premier push. Conserver cette PR en brouillon et attendre la validation utilisateur avant toute fusion ou production.
