# Présenter les archives techniques et la structure atelier/boutique sur GKGT

Document préparatoire local uniquement. Branche : `feature/galerie-archives-techniques`. Aucun push GitHub, aucune PR, aucune fusion dans `main` et aucun déploiement Netlify avant autorisation explicite de publication.

## Modification

La page `/gk-global-technology` présente douze photographies authentiques dans « Nos archives techniques » / « Our Technical Archives », après les services existants. Leur introduction décrit l'héritage technique de GKGT, historiquement exercé sous l'appellation GK Informatique. La galerie est retirée de `/about` sans suppression ni modification des photographies ou de leurs légendes FR/EN.

La section distincte « Notre atelier et notre boutique » / « Our Workshop and Store » prépare l'accueil de futurs visuels récents. Elle comporte uniquement des textes d'attente : aucune photographie fictive ou image historique présentée comme une installation actuelle.

La branche conserve également la section bilingue des réalisations et partenaires GKGM préparée dans `72fc075` ; ses fichiers fonctionnels sont inchangés par la réorganisation GKGT. Le logo officiel est préservé. Le bilan complet et les réserves sont dans `docs/audit-general-avant-deploiement.md`, notamment les alertes de sécurité des dépendances encore à traiter.

## Vérification

- Lint, build de production et 7 tests de formulaires réussis.
- 12 parcours GKGM FR/EN et deux soumissions de partenariats simulées réussis, sans envoi réel.
- Sept scripts de régression de contenu et de SEO réussis, dont les 38 URL FR/EN ; métadonnées et sitemap inchangés.
- Galerie GKGT : 12/12 images chargées en FR/EN à 390, 768 et 1440 px, sans débordement ; deux ancres et formulaire de contact présents ; aucune image dans la section atelier/boutique.
- Galerie absente de `/about` en FR/EN ; histoire et mission conservées.
- Les 12 fichiers photo et le logo sont inchangés octet pour octet par rapport à `72fc075` ; légendes et code GKGM conservés hors conventions de fins de ligne.
- Limite connue : `verify-heroes` compare le contenu à une ancienne référence et s'arrête sur GKGT après les ajouts volontaires. Référence à revoir après validation, sans masquer cet échec.

## Avant publication

Confirmer les droits et les légendes des douze photographies, les autorisations des personnes et les informations potentiellement sensibles. Fournir et valider séparément les futurs visuels modernes. Attendre l'autorisation explicite de publication avant toute opération distante, puis vérifier les réglages Netlify. Les autres réserves de l'audit général restent ouvertes.
