# GKGT — visuels et autorisations de diffusion

État actualisé le 15 novembre 2026 sur `feature/galerie-archives-techniques` ; préparation locale uniquement. Ce document remplace les anciens états de réserves photographiques, conservés dans l'historique Git et les sections chronologiques du bilan général.

## Autorisations et décisions confirmées

Le responsable de GK GLOBAL GROUP SARLU autorise l'utilisation des douze photographies historiques et des deux illustrations modernes dans la présentation de GKGT sur gkgroup.app. Les autorisations sont enregistrées sur la base de ses déclarations, sans vérification indépendante de pièces individuelles :

| Photo | Décision actuelle | Base de validation |
| --- | --- | --- |
| 16 | Copie avec arrière-plan modifié approuvée pour utilisation ; original conservé intact hors du dossier public. | Approbation explicite après examen de la version proposée. La réserve sur l'ancien arrière-plan ne s'applique pas à cette copie approuvée. |
| 18 | Publication autorisée dans son état actuel. | Examen personnel et autorisation explicite du responsable. |
| 20 | Publication autorisée dans son état actuel, y compris les éléments visibles à l'écran. | Confirmation explicite par le responsable des autorisations nécessaires. |
| 23 et 24 | Autorisations des personnes confirmées. | Le responsable indique qu'il s'agit de lui-même et de membres de son équipe, et confirme leur accord pour gkgroup.app. |
| 01, 02, 06, 11, 12, 14 et 21 | Autorisation générale enregistrée ; aucune réserve spécifique non résolue identifiée dans la revue. | Autorisation du responsable et inspections visuelles précédentes. |
| Deux illustrations modernes | Utilisation autorisée avec mention explicite de leur caractère illustratif. | Confirmation du responsable ; badges, légendes, alternatives et introduction FR/EN présents. |

**Aucune réserve de statut d'autorisation photographique ne reste ouverte dans les registres actuels pour les douze archives, les deux illustrations et les neuf nouvelles vues retenues.** Les autorisations des neuf ajouts sont enregistrées comme confirmées dans `content/gkgt-authentic-batch.json`, sur la base de la déclaration explicite du responsable. Les points de confidentialité et de contrôle visuel restent documentés séparément. Cette confirmation ne vaut ni vérification indépendante des consentements individuels ni autorisation de déploiement. Aucun push, fusion ou PR n'est effectué dans cette étape.
## Photo 16 — original et copie approuvée

- Original intact : `source-assets/archives-techniques/originals/16_IMG-20210728-WA0002(1).webp`.
- Copie approuvée utilisée par la galerie : `public/archives-techniques/16_unites-centrales-arriere-plan-modifie.png`.
- Outil employé pour la proposition : ImageGen intégré, remplacement d'arrière-plan ; l'utilisateur a examiné et approuvé l'image générée avant son intégration.
- Légendes : « Ensemble d'unités centrales — arrière-plan modifié » / « Desktop computer units — edited background ». Les alternatives utilisent également cette mention. L'image n'est pas présentée comme un document établissant les locaux réels de GKGT.

L'original est déplacé, pas retouché ni détruit. Comparaison binaire avec sa version Git antérieure : identique. Il est conservé hors de `public` pour éviter de publier l'ancien arrière-plan par une URL directe. Les onze autres WebP historiques sont conservés au même emplacement et identiques octet pour octet à leur état précédent. Le PNG approuvé est copié sans retouche depuis le résultat ImageGen.

L'arrière-plan approuvé ne montre plus les véhicules, plaque et personne partielle de l'ancien environnement. La copie reste un montage à arrière-plan modifié, déclaré comme tel. L'approbation ne repose pas sur une affirmation de conservation pixel par pixel du sujet par le modèle ; l'image entière a été examinée et acceptée par l'utilisateur. Aucun nouveau changement graphique n'a été appliqué après cette approbation.

### Prompt utilisé pour la proposition approuvée

Built-in `image_gen`, image cible : original 16 ; fond non transparent. Prompt transmis :

> Edit target: the provided historical portrait photograph, 864 by 1152 pixels. Precise background replacement only. Keep the EXACT foreground stack of ten used desktop computer towers: two on top, four in the middle, four on the bottom. Preserve each computer's appearance, geometry, position, proportions, faceplates, optical drives, ports, stickers, scratches, colors and perspective as faithfully as possible. Do not redesign, add, remove, clean up or modernize the equipment. Keep original framing and foreground equipment scale. Replace the outdoor street background and surroundings with a modest realistic professional IT equipment workshop interior: neutral clean wall, discreet out-of-focus workbench and shelving, natural plausible light. Remove all original background vehicles, motorcycles, license plates, street stalls, chairs, partial people and identifying background elements. No people, no vehicles, no license plates, no legible documents, no new logos, no signage, no GK GROUP logo. Remove the foreground litter and replace outdoor ground with a plain neutral workshop floor while retaining equipment contact and realistic shadows. This is a deliberately edited-background candidate for user approval, not a documentary photograph of actual GKGT premises. Subject computer hardware must remain recognizably identical to the original; change only surroundings. Output one portrait image, same composition.

## Confidentialité et contenus de tiers

La revue précédente signalait les éléments identifiants de la photo 16 et les personnes/écrans/contenus de tiers des photos 18 et 20. Le premier cas est résolu pour la copie approuvée par remplacement de l'arrière-plan ; les deux autres sont validés dans leur état actuel par déclaration explicite du responsable. Les autorisations des personnes des photos 23 et 24 sont enregistrées séparément.

Les inspections antérieures ont aussi repéré des étiquettes de matériel, codes-barres et une annotation murale ; aucune donnée client ou information confidentielle spécifique non résolue n'a été établie. Les valeurs ne sont pas reproduites dans les rapports. Aucune donnée EXIF/XMP/IPTC n'avait été détectée dans les douze WebP originaux ; ce constat ne remplace pas l'examen des pixels. Aucune pièce d'identité ou autorisation nominative n'est ajoutée au dossier public.

## Illustrations modernes préservées

Les fichiers `GKGT_Atelier_Illustration.png` et `GKGT_Boutique_Illustration.png` restent dans `public/technology-illustrations/`, sans modification. Leurs textes FR/EN précisent qu'il s'agit d'illustrations et non de photographies des installations réelles. L'autorisation d'usage est confirmée ; aucun partenariat fabricant, stock ou agrément n'est déduit de ces visuels.

## Contrôle Netlify et absence d'autorisation de déploiement

`content/gkgt-publication-rights.json` conserve les cinq dossiers suivis, désormais tous au statut `confirmed`, avec dates et motifs. Pour la photo 16, il précise le fichier publiable et le chemin de l'original privé. La propriété historique `pendingHistoricalPhotos` conserve son nom pour compatibilité avec le contrôle ; elle ne signifie pas que ses entrées confirmées sont encore en attente.

Le hook npm `prebuild` et son script restent présents. Le contrôle des douze archives approuvées et celui du nouveau lot sont désormais satisfaits par les registres actuels. Le test local exécuté le 15 novembre 2026 avec `NETLIFY=true` s'est terminé avec le code de sortie 0, sans message de blocage. Les neuf nouvelles vues ont leur `publicationStatus` confirmé et l'autorisation générale est enregistrée comme confirmée. Ce contrôle vérifie les statuts déclarés dans les registres ; il ne constitue ni une revue visuelle exhaustive ni un accord final de mise en production. Aucun build distant ni déploiement n'est autorisé par ce résultat. Le garde ne bloque pas nécessairement un téléversement manuel qui le contournerait.
## Contrôles de cette intégration

- Lint, 7 tests unitaires et build local réussis ; avertissements Node connus non bloquants.
- Galerie : 12 images chargées sur 12 en FR et EN à 390, 768 et 1440 px, sans débordement ; la copie 16 approuvée et sa mention d'arrière-plan modifié sont présentes dans les six cas.
- Les deux illustrations restent dans leur section distincte.
- SEO : contrôle des 38 URL réussi ; métadonnées et sitemap inchangés.
- Contrôles HTTP locaux : nouvelle copie 16 en 200 ; ancienne URL publique de l'original en 404 ; tentative d'accès à `source-assets` en 404 ; optimisation de l'ancien chemin en 400 après purge des seules images de cache local générées.
- Original 16, onze autres photos, logo, illustrations et ajouts GKGM préservés. Aucun push, aucune PR, aucune fusion ni aucun déploiement.

## Nouveau ZIP de quinze photographies — traçabilité et contrôles

Les quinze JPG de `GKGT_15_photos_authentiques.zip` sont conservés intacts dans `source-assets/gkgt-authentic-15/originals`. Six reprennent des vues déjà présentes (archives 01, 02, 06, 16, 18 et 21) et ne sont pas réaffichés. La reprise de l'original 16 n'est pas publiée : seule la copie approuvée à arrière-plan modifié demeure dans la galerie. Neuf nouvelles vues, identifiées N03/N04/N05/N06/N08/N09/N10/N13/N15, sont ajoutées à la préparation locale, portant la galerie à 21 vues distinctes.

Le registre séparé `content/gkgt-authentic-batch.json` conserve les empreintes, les doublons, les catégories, les légendes FR/EN et les notes de contrôle. L'autorisation générale de publication et les statuts des neuf nouvelles vues sont désormais enregistrés comme confirmés, sur la base de la déclaration explicite du responsable. Huit vues montrent des personnes reconnaissables : N03/N04/N05/N06/N08/N09/N10/N13. N06 comprend une personne en arrière-plan. Les écrans, feuilles, tableau, livres, étiquettes, marques, emballage et reflet partiel de N15 restent des points de vigilance pour la revue visuelle. Aucune identité ni valeur sensible n'est transcrite dans ce document. Les statuts confirmés ne constituent pas une vérification indépendante des consentements individuels ni une certification de l'absence d'informations sensibles visibles.
Les originaux de N10 contiennent EXIF/IPTC/XMP et celui de N11 EXIF ; ils restent intacts hors public. Les neuf copies WebP retenues et leurs miniatures ne contiennent pas ces métadonnées. Aucun masquage, décor généré ou retouche de personne n'est effectué. Toutes les réserves et légendes ainsi que les tests sont détaillés dans `docs/gkgt-galerie-authentique-validation.md` ; cette mise à jour remplace les décomptes précédents pour la galerie complète, sans révoquer les confirmations historiques.

**Autorisations enregistrées et validation visuelle locale des copies V2 avant diffusion publique. Aucun push, fusion, PR ou déploiement.**

À la demande du responsable, les neuf fiches individuelles sont préparées dans `docs/gkgt-neuf-photos-autorisations.md` : noms des JPG et copies, repères visuels des personnes sans identification nominative, confidentialité distincte et autres droits/provenance. Une planche des neuf vues accompagne la revue. Les statuts d'autorisation sont désormais confirmés dans les registres et le garde Netlify a réussi son test local du 15 novembre 2026 (code 0). Les points de confidentialité restent à examiner lors de la revue visuelle des copies V2. Les quatre tests ciblés de conservation, d'optimisation et de garde ont été réexécutés et réussis. Aucune photographie originale ni configuration applicative n'est modifiée pour cette étape documentaire.