# Intégrer la galerie historique et technique bilingue à la page À propos

Document préparatoire local uniquement. Branche : `feature/galerie-archives-techniques`. Aucun push GitHub, aucune PR, aucune fusion dans `main` et aucun déploiement Netlify avant autorisation explicite de publication.

## Modification

La page `/about` présente douze photographies authentiques immédiatement après « Notre histoire » et avant « Mission et vision ». La galerie reprend les couleurs institutionnelles marine et or, avec légendes et alternatives FR/EN, grille responsive et images optimisées par Next.js. L'introduction rappelle que GK Informatique est une activité historique.

Les cinq photos précédemment écartées sont intégrées à la préparation locale sur demande de l’utilisateur ; leurs autorisations et les éléments potentiellement identifiants restent à vérifier avant publication. Le détail de la sélection et des validations est dans `docs/galerie-archives-review.md`.

## Vérification

- Installation verrouillée, lint et build de production réussis.
- 7 tests de formulaires réussis ; 12 parcours navigateur FR/EN et deux soumissions de partenariats simulées réussis, sans envoi réel.
- Régression SEO vérifiée sur 38 URL ; métadonnées et sitemap inchangés.
- Galerie contrôlée en FR/EN à 390, 768 et 1440 px, sans débordement ; 12/12 images chargées à chacune des trois largeurs dans les deux langues, chargement différé confirmé et SHA-256 identiques aux originaux du ZIP.

## Avant publication

Confirmer les droits et les légendes des douze photographies. Vérifier les autorisations des personnes et les informations potentiellement sensibles avant toute publication publique. Attendre l’autorisation explicite de publication avant le premier push ou toute autre opération distante, puis vérifier les réglages Netlify de branches et de Deploy Previews.
