# GKGM — Enrichissement des réalisations internationales

14 novembre 2026 — préparation locale FR/EN pour validation, sans publication.

- FR : http://127.0.0.1:3000/gk-global-mobility?lang=fr#track-record
- EN : http://127.0.0.1:3000/gk-global-mobility?lang=en#track-record

## Présentation préparée

Titre FR : **Nos réalisations en mobilité internationale**.

Title EN: **Our International Mobility Track Record**.

Les résultats sont explicitement présentés comme **historiques et déclarés par GKGM**, au titre de dossiers accompagnés. Les cartes Canada/Albanie sont mises en avant, puis les quatre destinations de visite, avant les résultats précédemment enregistrés et les partenaires B2B existants.

| Destination | Résultat affiché FR | English | Précision de comptage |
| --- | --- | --- | --- |
| Canada | **Plus de 50** visas d'entrée pour études obtenus dans le cadre des accompagnements | **More than 50** entry visas for study obtained through supported applications | À la clarification demandée, le responsable choisit « dossiers comprenant les deux » : visa d'entrée et permis d'études/approbation. La mention associée précise que ces documents ne sont pas comptés comme résultats supplémentaires. |
| Albanie | **Environ 10** visas de travail obtenus dans le cadre des accompagnements | **Approximately 10** work visas obtained through supported applications | L'approximation est conservée ; ni date, ni type officiel détaillé ou permis additionnel inventé. |
| Équateur | Accompagnements ayant abouti à des visas de visite | Supported applications resulting in visitor visas | Aucun nombre ni période fourni ou ajouté. |
| Singapour | Même résultat déclaré de visas de visite | Same reported visitor-visa outcome | Aucun nombre ni période ajouté. |
| Malaisie | Même résultat déclaré de visas de visite | Same reported visitor-visa outcome | Aucun nombre ni période ajouté. |
| Chine | Même résultat déclaré de visas de visite | Same reported visitor-visa outcome | Aucun nombre ni période ajouté. |

Les mots **Plus de / More than** et **Environ / Approximately** restent affichés avec les valeurs : celles-ci ne deviennent pas des comptes exacts. Il n'existe aucun total général additionnant estimations, quantités non communiquées, visas et permis.

## Résultats et partenaires conservés

Les trois visas D Job Seeker Portugal, deux visas visiteurs Royaume-Uni (2025), un visa C2 Indonésie (2026) et huit permis de travail Pologne (2025–2026) sont conservés. Le sous-total de six visas concerne **uniquement Portugal/Royaume-Uni/Indonésie**, comme auparavant. La Pologne reste une catégorie distincte de permis, jamais assimilée à des visas. Chaque destination apparaît une seule fois dans les résultats structurés.

La période « depuis 2023 » s'applique seulement à la série précédemment enregistrée ; elle n'est pas appliquée aux nouvelles déclarations, dont aucune période n'a été précisée. Les quatre partenaires restent inchangés : Dalimit Global, ApplyBoard, Elec Work Agency, Live & Study in Europe. Leurs relations restent présentées comme B2B, sans affiliation gouvernementale ou à une ambassade.

## Terminologie et niveau de vérification

Le contrôle terminologique a relevé que le permis d'études canadien est distinct du visa d'entrée ; la [documentation IRCC](https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/study-permit-tool.html) distingue ces documents. La clarification du responsable indique que les dossiers comprennent les deux ; la formulation de la prévisualisation reflète cette précision, sans additionner les documents d'un même dossier.

Pour l'Albanie, « visas de travail » reste un intitulé générique de résultat déclaré, sans ajout d'un code ou sous-type administratif non confirmé. Pour les quatre destinations de visite, aucune sous-catégorie « tourisme », « affaires » ou autre n'est déduite. Les pièces individuelles n'ont pas été consultées : les résultats ne sont pas présentés comme vérifiés indépendamment auprès des autorités. Aucun dossier ou justificatif contenant des données personnelles n'est demandé pour la prévisualisation.

Le texte existant reste explicite : GKGM accompagne la préparation des dossiers, ne délivre pas les autorisations et ne garantit aucun résultat futur. Les décisions appartiennent aux autorités compétentes.

## Fichiers et contrôles

- Données actualisables : `content/mobility-track-record.js`, avec résultats historiques complémentaires séparés de la série exacte existante. Structure du composant : `components/pages/MobilityTrackRecord.js`.
- Pas de changement de formulaire, d'activation, de destinataire, de conservation, d'accès, de logo, d'illustration ou de métadonnées.
- Lint et build local réussis ; **14 tests unitaires** communs réussis, dont contrôle des qualificatifs, absence de dates/comptes inventés, dix destinations distinctes et maintien des quatre partenaires.
- Neuf scripts de pages/régression passent ; 38 URL SEO FR/EN conservées. La vérification de réalisations contrôle deux cartes complémentaires, quatre destinations non chiffrées et l'ancien ensemble 3/2/1/8.
- Douze parcours GKGM et deux parcours partenariats simulés réussis, sans trafic fournisseur réel.
- FR/EN à 390, 768 et 1440 px : deux cartes, quatre destinations, quatre partenaires, aucun débordement horizontal ; titres et précisions bilingues présents.

L'accord sur ces contenus ne vaut pas autorisation de publication. Les réserves photographiques GKGT et les autres vérifications de compte Netlify ne sont pas levées par cette demande. Aucun test de réception réelle, build cloud, validation d'autorité ou mesure de performance de production n'est revendiqué.

**Prévisualisation à examiner ; aucun push, aucune fusion, aucune PR ni aucun déploiement.**
