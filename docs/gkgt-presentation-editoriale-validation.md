# GKGT — Présentation photographique éditoriale

Préparation locale du 14 novembre 2026, sans autorisation de publication.

Prévisualisation FR : http://127.0.0.1:3000/gk-global-technology?lang=fr#gkgt-gallery

Preview EN: http://127.0.0.1:3000/gk-global-technology?lang=en#gkgt-gallery

## Nouvelle organisation

Les 21 vues ne sont plus réunies dans une longue galerie autonome. Elles accompagnent cinq séquences de la page, avec textes explicatifs FR/EN. Les services institutionnels existants, leurs listes et limites restent présents. Les deux illustrations modernes restent dans leur section distincte, sans changement et explicitement illustratives.

| Séquence / emplacement | Photographies, chacune utilisée une fois | Composition |
| --- | --- | --- |
| Expertise, après le cadre institutionnel | N13, archive-11, archive-12 | Grand portrait de travail, texte adjacent et deux détails de composants. La grande vue précède les détails dans l'ordre de lecture mobile. |
| Maintenance, dans la séquence du service correspondant | N03, N10, N04, N05 | Vue du portable, intervention sur écran et deux photographies de nettoyage, avec formats et colonnes variés. |
| Équipements et reconditionnement, dans la séquence du service correspondant | N15, N06, N08, archive-06, archive-16, archive-21 | Fond marine, grande vue d'équipements, duo de portraits et rangée de trois archives complémentaires. Pas de stock ou de garantie déduit. |
| Atelier et espaces de travail, après les services | archive-02, N09, archive-01, archive-18 | Alternance texte/grande photographie puis composition de trois vues. Pas d'attribution à des locaux actuels ni de localisation inventée. |
| Parcours historique, ancre `technical-archives` conservée | archive-14, archive-20, archive-23, archive-24 | Frise verticale avec alternance texte/image et quatre repères visuels sans dates. |

La frise est un **ordre de lecture documentaire**, pas une chronologie datée ou une succession d'étapes de société vérifiée. Les textes le précisent dans les deux langues. Le titre « Nos archives techniques » / « Our Technical Archives » et l'explication GK Informatique sont conservés. Les huit autres vues historiques sont réparties dans les séquences pertinentes et portent toutes un repère « Archives · GK Informatique » : leur caractère historique n'est pas effacé.

## Préservation et autorisations

- Exactement 21 emplacements photographiques éditoriaux et 21 identifiants distincts ; aucune vue répétée. La modale agrandit la vue demandée et ne constitue pas un second emplacement éditorial.
- Les quinze JPG originaux restent intacts ; six doublons restent uniquement dans les originaux. Les copies de diffusion ne sont ni recadrées, ni réencodées, ni retouchées par cette réorganisation.
- La photo historique 16 reste la copie à arrière-plan modifié déjà approuvée, avec sa légende inchangée. Tous les fichiers et légendes historiques FR/EN restent conservés.
- Aucun statut modifié : neuf vues restent en attente de publication ; dossiers et fiches d'autorisation précédents restent applicables. Les réserves sont visibles auprès des nouvelles vues.
- Le contrôle de build Netlify reste bloquant pour les neuf ajouts non confirmés ; aucune configuration distante ou règle de confidentialité GKGM n'est modifiée.
- Logo officiel et fichiers de marque, illustrations, formulaires GKGM/partenariats et métadonnées sont préservés.

## Agrandissement et accessibilité

Une modale commune dessert les cinq séquences. Les images conservent leurs proportions et leur intégralité (`object-fit: contain`). Légendes/alternatives FR/EN, liens nommés, chargement différé, commandes précédente/suivante et flèches, Échap, Tab/Maj+Tab, restauration du focus et du défilement sont maintenus. La navigation des agrandissements suit l'ordre éditorial déclaré, cohérent avec l'ordre du document après l'ajustement mobile.

## Vérifications

- Lint et build local réussis ; 17 entrées du build.
- Suite unitaire commune : **14 tests réussis**, dont couverture unique des 21 vues et textes des cinq séquences.
- Neuf scripts de pages/régression réussis, avec contrôle GKGT adapté aux cinq séquences, aux 21 identifiants distincts et aux douze vues d'archives réparties.
- SEO : 38 URL FR/EN, bannières, canonical, hreflang, sitemap et schémas préservés.
- Formulaires simulés existants : 12 parcours GKGM et deux parcours partenariats réussis ; aucune soumission fournisseur réelle.
- FR/EN à 390, 768 et 1440 px : cinq séquences, 21 vues uniques, aucun débordement, alternatives présentes et images contenues.
- Les 21 modales sont ouvertes et les images chargées après redistribution ; navigation au clavier et retour du focus vérifiés. Après le dernier ajustement d'ordre, contrôle de N13 en première position, Tab/Maj+Tab et Échap réussi.
- Tests d'identité des 24 ressources protégées et des quinze originaux réussis ; aucune modification de statut ou média.

Les essais sont locaux, sur viewports de navigateur. Aucun test physique, Safari/iOS, lecteur d'écran, Lighthouse ou déploiement de production n'est revendiqué. L'avertissement Node connu sur les modules implicites des tests reste non bloquant.

**En attente de validation de cette présentation et des autorisations photographiques distinctes. Aucun push, fusion, PR ou déploiement.**
