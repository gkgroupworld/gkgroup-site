# Partenariats — refonte premium

Base : origin/main ef4e95a, synchronisée avant modification. Branche locale : `codex/partnerships-premium`. Aucun push ni déploiement.

## Aperçus et captures

- [Français](http://localhost:3100/partnerships?lang=fr)
- [Anglais](http://localhost:3100/partnerships?lang=en)
- [Galerie ordinateur et mobile FR/EN](partnerships-premium-previews/index.html)

Les captures complètes sont prises à 1440 et 390 px. Les contrôles supplémentaires à 834 et 320 px sont consignés dans responsive-audit.json.

## Présentation

InstitutionalBanner premium est réutilisé sans modification : bleu marine, halo doré, anneaux, grille asymétrique et logo officiel GK GROUP. Les nouveaux titre et sous-titre FR/EN correspondent à la demande. Les autres sections réutilisent InstitutionalFrame, InstitutionalHeading, InstitutionalAction, InstitutionalClosing et les styles premium existants de l’Accueil.

Cinq principes structurent l’approche et cinq domaines de coopération sont présentés avec des icônes vectorielles décoratives sobres. Des fonds blancs et bleu marine alternent. La page distingue les possibilités de coopération des accords confirmés. Les mentions institutionnelles, le processus de collaboration, le formulaire, ses contacts et ses liens de destination existants sont conservés ; aucun composant partagé ni autre page n’est modifié.

## Répertoire prêt pour les validations futures

content/partnership-directory.js définit cinq catégories et trois statuts : prise de contact, échanges en cours, collaboration confirmée. Le répertoire est vide ; aucun exemple nominatif ni logo externe n’est ajouté.

Pour un ajout futur, l’éditeur devra consigner la validation humaine de l’accord et l’autorisation explicite de publication, puis renseigner les textes FR/EN et une catégorie. Le sélecteur public exige simultanément status=confirmed, agreementValidated=true et publicationApproved=true. Les inscriptions, candidatures et négociations sont exclues de la liste publique.

Un logo nécessite une autorisation distincte dans son propre objet, un fichier officiel local et ses dimensions naturelles. Sinon, la fiche approuvée reste affichée sans logo. Les fiches seront automatiquement groupées par catégorie avec leur statut confirmé, sans reconstruire la page. Ces indicateurs consignent une validation humaine : ils ne constituent pas une vérification automatique de contrat ou de droits.

## Vérifications

- Build Next.js et ESLint : réussis. Avertissement Node DEP0205 déjà présent, non bloquant.
- Sept scripts réussis : verify-partnerships, verify-entities, verify-heroes, verify-home, verify-architecture, verify-institutional-pages et verify-seo.
- Test dédié : cinq valeurs, cinq domaines, répertoire vide, conditions cumulatives de publication, autorisation de logo indépendante, prudence institutionnelle, formulaire et sept destinations bilingues.
- Avant actualisation des deux empreintes de Partenariats, comparaison des 22 autres versions FR/EN à leurs empreintes : aucune modification. Sur Partenariats, navigation, pied de page, SEO, JSON-LD et bouton de bannière restent identiques.
- PartnershipForm.js, content/partnerships.js, public/__forms.html, les métadonnées, canonical, hreflang et sitemap restent inchangés. La parité FR/EN des champs est vérifiée par le test SEO existant.
- Huit contrôles navigateur : FR/EN à 1440, 834, 390 et 320 px, sans débordement horizontal. Revue des captures ordinateur/mobile : cartes, titres, boutons et formulaire lisibles ; seul le logo GK GROUP est affiché dans le contenu.
- Test interactif du formulaire vide : activation après hydratation et affichage des erreurs requises. Aucune proposition ni donnée transmise.
- Identifiants uniques, cible du bouton #proposal valide, champs de formulaire étiquetés, icônes décoratives masquées aux lecteurs d’écran, liens avec intitulés contextuels.

## Fichiers modifiés

- components/pages/PartnershipsPage.js : composition premium.
- content/partnerships-premium.js : nouveaux textes FR/EN.
- content/partnership-directory.js : répertoire vide, catégories, statuts et règles d’affichage.
- scripts/verify-partnerships.mjs : contrôles dédiés.
- docs/hero-baseline.json : uniquement les deux entrées Partenariats actualisées.
- docs/partnerships-premium-review.md : ce rapport.
- docs/partnerships-premium-previews/ : galerie, captures et mesures.
