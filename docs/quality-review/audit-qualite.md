# GKGT — Analyse approfondie de qualité des 21 photographies

14 novembre 2026 — **propositions séparées, aucune image du site remplacée et aucune reconstruction par IA**. La disposition en cinq séquences vient d’être validée par le responsable ; cette validation n’est pas confondue avec l’approbation de nouveaux fichiers ou droits de publication.

Comparaison locale : http://127.0.0.1:3119/

## Conclusion pratique

Le précédent traitement était insuffisant : il utilisait un réglage uniforme et les WebP historiques alors que cinq JPG plus définis étaient disponibles ; il ne supprimait pas la seconde compression effectuée par next/image. Augmenter encore la netteté générale ne résoudrait pas les limitations des sources et pourrait renforcer le grain ou produire des halos.

Trois causes sont distinguées : **source déjà douce, bruitée ou de petite définition** ; **pertes évitables dans les conversions successives** ; **ressource servie et densité de l’écran**. Les mesures ne montrent pas de déformation ni d’agrandissement excessif généralisé à la densité réellement testée 1×. Certaines vues et miniatures limitent toutefois la définition disponible pour un écran 2×, notamment N10. Les chiffres 2× sont calculés, pas issus d’un appareil Retina physique.

## Sources effectivement disponibles

Le ZIP historique contient douze WebP déjà préparés, pas les fichiers bruts d’appareil. Le second ZIP contient quinze JPG, dont six vues déjà connues. Cinq de ces doublons donnent une source plus définie pour les archives 01/02/06/18/21 : elles sont utilisées **uniquement dans les variantes de revue**, sans créer de doublon d’affichage sur le site. La sixième reprise est l’ancien fond de la photo 16 : elle n’est jamais utilisée. La référence 16 reste la copie PNG à arrière-plan modifié approuvée.

« Original » dans la comparaison signifie **meilleure source fournie disponible**, pas un RAW ou un fichier d’appareil dont la provenance et la qualité initiale seraient établies. Les aperçus source sont décodés en WebP sans perte et sans accentuation, sans EXIF/IPTC/XMP ; les fichiers originaux restent intacts.

## Inventaire de résolution et diagnostic individuel

| Vue | Meilleure source disponible | Résolution source | Copie v1 avant Next | Réponse actuelle de modale | Diagnostic / limite | Variante proposée |
| --- | --- | --- | --- | --- | --- | --- |
| archive-01 | source-assets/gkgt-authentic-15/originals/20181030_170129(1).jpg | 1152 × 2048 px | 1012 × 1800 px | 1012 × 1800 px, q75 | JPEG plus défini disponible ; détail des étagères déjà doux dans la source. Gain surtout de source et de transport ; pas de promesse de détails nouveaux. | Accentuation réduite, sigma 0.4 ; source native, sans perte ou q94 à comparer |
| archive-02 | source-assets/gkgt-authentic-15/originals/20181030_170143(1).jpg | 2048 × 1152 px | 1800 × 1013 px | 1800 × 1013 px, q75 | JPEG plus défini ; faible lumière et petits objets éloignés. Gain limité à modéré avec le JPEG et une seule conversion. | Accentuation réduite, sigma 0.4 ; source native, sans perte ou q94 à comparer |
| archive-06 | source-assets/gkgt-authentic-15/originals/20211013_095534(1).jpg | 2048 × 1153 px | 1800 × 1013 px | 1800 × 1013 px, q75 | JPEG original plus défini ; matériel lisible, petits marquages éloignés. Préserver la définition sans forcer les micro-contours. | Accentuation réduite, sigma 0.5 ; source native, sans perte ou q94 à comparer |
| archive-11 | public/archives-techniques/11_IMG-20181112-WA0042.webp | 1080 × 809 px | 1080 × 809 px | 1080 × 809 px, q75 | Source WebP de 1080 × 809 px et 54 Ko, détails et arrière-plan déjà comprimés ou doux. Pas d’amélioration fidèle importante ; ne pas recréer les inscriptions. | Aucune accentuation supplémentaire ; source native, sans perte ou q94 à comparer |
| archive-12 | public/archives-techniques/12_IMG-20181122-WA0004.webp | 1800 × 1013 px | 1800 × 1013 px | 1800 × 1013 px, q75 | Composants plus lisibles au centre ; profondeur de champ variable. Gain de transport ; pas de correction du flou hors plan de mise au point. | Accentuation réduite, sigma 0.4 ; source native, sans perte ou q94 à comparer |
| archive-14 | public/archives-techniques/14_IMG-20190301-WA0000.webp | 1080 × 710 px | 1080 × 710 px | 1080 × 710 px, q75 | 1080 × 710 px ; bruit et contours déjà marqués sur une scène sombre. Pas de récupération significative garantie ; conserver un affichage contenu. | Aucune accentuation supplémentaire ; source native, sans perte ou q94 à comparer |
| archive-16 | public/archives-techniques/16_unites-centrales-arriere-plan-modifie.png | 1086 × 1448 px | 1086 × 1448 px | 1086 × 1448 px, q75 | Copie PNG approuvée, 1086 × 1448 px ; version à fond modifié à préserver. Éviter les conversions successives ; aucune nouvelle reconstruction du fond. | Aucune accentuation supplémentaire ; source native, sans perte ou q94 à comparer |
| archive-18 | source-assets/gkgt-authentic-15/originals/IMG_20180329_095427(1).jpg | 1536 × 2048 px | 1350 × 1800 px | 1350 × 1800 px, q75 | JPEG de 1536 × 2048 px disponible ; étiquettes petites et rendu doux. Gain de résolution et moins de réencodages, sans inventer les étiquettes. | Accentuation réduite, sigma 0.4 ; source native, sans perte ou q94 à comparer |
| archive-20 | public/archives-techniques/20_IMG_20190125_120103_9.webp | 1800 × 1350 px | 1800 × 1350 px | 1800 × 1350 px, q75 | Plan de travail et clavier : netteté non uniforme déjà présente à la source. Amélioration locale modeste ; les zones hors foyer restent hors foyer. | Accentuation réduite, sigma 0.4 ; source native, sans perte ou q94 à comparer |
| archive-21 | source-assets/gkgt-authentic-15/originals/IMG_20190214_073458_8(1).jpg | 2048 × 1536 px | 1800 × 1350 px | 1800 × 1350 px, q75 | JPEG plus défini ; scène de matériel légèrement douce à la source. Le fichier source plus grand évite une perte évitable. | Accentuation réduite, sigma 0.4 ; source native, sans perte ou q94 à comparer |
| archive-23 | public/archives-techniques/23_IMG_20190308_092807_2.webp | 1350 × 1800 px | 1350 × 1800 px | 1350 × 1800 px, q75 | Faible lumière et grain visibles dans la source historique ; douceur sur les détails. Le gain fidèle reste faible ; accentuer davantage renforcerait le bruit. | Aucune accentuation supplémentaire ; source native, sans perte ou q94 à comparer |
| archive-24 | public/archives-techniques/24_IMG_20190308_092825_7.webp | 1350 × 1800 px | 1350 × 1800 px | 1350 × 1800 px, q75 | Personne et composants, définition inégale selon les zones. Préserver la fidélité ; pas de restauration du visage ou des petits composants. | Accentuation réduite, sigma 0.4 ; source native, sans perte ou q94 à comparer |
| N03 | source-assets/gkgt-authentic-15/originals/20181129_082000(1).jpg | 2048 × 1152 px | 2048 × 1152 px | 1920 × 1080 px, q75 | Photo intérieure bruitée ; écran surexposé et détails doux déjà dans le JPG de 2048 × 1152 px. Gain modeste de compression seulement ; les zones écrêtées ne sont pas récupérables ici. | Aucune accentuation supplémentaire ; source native, sans perte ou q94 à comparer |
| N04 | source-assets/gkgt-authentic-15/originals/20211013_092705(1).jpg | 1153 × 2048 px | 1153 × 2048 px | 1153 × 2048 px, q75 | Scène extérieure assez définie ; petits détails de l’unité éloignés. Accentuation très légère, pas de reconstruction de pièces. | Accentuation réduite, sigma 0.45 ; source native, sans perte ou q94 à comparer |
| N05 | source-assets/gkgt-authentic-15/originals/20211013_092710(1).jpg | 1153 × 2048 px | 1153 × 2048 px | 1153 × 2048 px, q75 | Bonne lumière, certaines zones ou gestes restent moins définis. Accentuation légère seulement. | Accentuation réduite, sigma 0.45 ; source native, sans perte ou q94 à comparer |
| N06 | source-assets/gkgt-authentic-15/originals/20211013_092719(1).jpg | 1153 × 2048 px | 1153 × 2048 px | 1153 × 2048 px, q75 | Contraste fort et détails des personnes/écrans de taille réduite. Éviter les halos sur les contours lumineux. | Accentuation réduite, sigma 0.35 ; source native, sans perte ou q94 à comparer |
| N08 | source-assets/gkgt-authentic-15/originals/20211013_100026(1).jpg | 1153 × 2048 px | 1153 × 2048 px | 1153 × 2048 px, q75 | Source de 1153 × 2048 px ; détails limités par la distance du sujet. Préserver la définition et limiter l’agrandissement des détails. | Accentuation réduite, sigma 0.4 ; source native, sans perte ou q94 à comparer |
| N09 | source-assets/gkgt-authentic-15/originals/20211013_113451(1).jpg | 1153 × 2048 px | 1153 × 2048 px | 1153 × 2048 px, q75 | Équipements assez lisibles, tableau et documents hors du plan principal. Ne pas reconstruire le texte ou les détails des écrans. | Accentuation réduite, sigma 0.35 ; source native, sans perte ou q94 à comparer |
| N10 | source-assets/gkgt-authentic-15/originals/FB_IMG_1550419220319(1).jpg | 720 × 720 px | 720 × 720 px | 720 × 720 px, q75 | Seulement 720 × 720 px et 55 Ko ; flou et compression déjà présents dans le JPG. Aucune amélioration fidèle importante sans meilleure source ; éviter une grande vue sur écran dense. | Aucune accentuation supplémentaire ; source native, sans perte ou q94 à comparer |
| N13 | source-assets/gkgt-authentic-15/originals/IMG_20180627_080541(1).jpg | 1536 × 2048 px | 1536 × 2048 px | 1536 × 2048 px, q75 | JPG de 1536 × 2048 px, faible microcontraste et douceur initiale. Gain modeste de transport ; aucune modification du visage. | Accentuation réduite, sigma 0.35 ; source native, sans perte ou q94 à comparer |
| N15 | source-assets/gkgt-authentic-15/originals/IMG_20190214_073528_2(1).jpg | 2048 × 1536 px | 2048 × 1536 px | 1920 × 1440 px, q75 | JPG de 2048 × 1536 px, netteté douce sur les équipements et l’emballage. Réduction de compression secondaire ; pas de reconstruction des textes ou reflets. | Accentuation réduite, sigma 0.4 ; source native, sans perte ou q94 à comparer |

Les appréciations de douceur sont une revue visuelle, pas une mesure de mise au point absolue. Sans RAW, réglages de prise de vue et cible de référence, il n’est pas toujours possible de séparer avec certitude flou de mouvement, défaut de mise au point, profondeur de champ, débruitage antérieur et compression. Aucune métrique de contours n’est présentée comme un score de qualité : le bruit peut artificiellement augmenter ce type de métrique. Le poids d’un JPEG ne permet pas de déduire son réglage exact de compression.

## Vérification de l’affichage réel et de next/image

Le composant actuel utilise object-fit: contain : cadrage complet et proportions préservés. Les agrandissements sont plafonnés à 65dvh et à la largeur de la modale. Les 21 images ont été mesurées après identification de la bonne ressource et chargement effectif. Les réponses HTTP locales capturées sont conservées, pas seulement les fichiers WebP avant diffusion.

- Copies v1 : qualité 88 pour les grandes vues, 84 pour les miniatures, dont le grand côté est limité à 960 px. Une miniature portrait de 960 px de haut n’a que 540 ou 720 px de large : ce n’est pas une miniature de largeur 960 px.
- Aucun quality explicite dans les Image de la page/modale ; Next 16.4.6 ajoute **q=75**, mesuré dans currentSrc et les réponses réelles. Il y a donc une nouvelle compression après le WebP déjà encodé.
- La configuration Next est vide : les qualités autorisées par défaut ne comprennent pas 90. La requête locale q=90 testée retourne **HTTP 400**. Ajouter seulement quality={90} ne suffit donc pas à établir une diffusion à 90 ; la liste autorisée doit aussi être configurée.
- sizes est générique : 700px pour les grandes vues, 400px pour les autres sur desktop, 1400px pour la modale. Certains cadres de détail non marqués large atteignent 670px alors que sizes annonce 400px. Pour N10, l’image carrée réellement peinte fait environ 502px ; la requête sélectionne 640px. Ce n’est pas une déformation, mais le calcul doit tenir compte de la surface réellement peinte, pas seulement du cadre.
- Les modales testées demandent w=1920, mais Next ne fabrique pas cette définition quand la source est plus petite : N10 reste réellement à 720 × 720 px, archive-11 à 1080 × 809 px. Les 21 réponses ont été décodées pour vérifier leurs dimensions.

Référence du comportement : [documentation officielle du composant Image](https://nextjs.org/docs/app/api-reference/components/image) et documentation embarquée de la version installée. Le défaut 75 et le rôle de sizes sont confirmés par les mesures locales ; une qualité plus élevée ne peut pas rétablir les détails déjà absents du fichier.

### Densité de l’écran : exemples concrets

N10, source 720 × 720, est peinte à environ 525 × 525 px en modale sur le viewport 1440 × 1000, DPR 1. À DPR 2, il faudrait environ 1050 × 1050 pixels pour couvrir exactement cette même taille physique : la source ne les contient pas. Pour éviter cet agrandissement sur un écran 2×, une limite proche de 360px CSS serait cohérente avec la définition native, mais ne retirerait pas le flou déjà présent. Aucun changement de taille du site n’est appliqué ici.

Archive-11 et archive-14, affichées autour de 787px de large en modale, ne disposent que de 1080 pixels de large. Plusieurs paysages de 1800px affichés à environ 1155px de large ne couvrent pas non plus entièrement le besoin 2× ; récupérer leurs JPG 2048px aide modestement sans atteindre 2310px. Les portraits de 1350/1536px de large peints autour de 488px disposent généralement de suffisamment de pixels pour cette taille à 2× ; leur douceur peut alors venir surtout de la source et de la compression.

Toutes les mesures par vue, fichiers, paramètres et couvertures calculées sont dans analysis.json et browser-measurements.json. La capture de la page est à 1440 × 1000, DPR 1 ; aucun écran haute densité ou appareil physique n’est présenté comme testé.

## Améliorations obtenues sans reconstruction par IA

Vingt et une variantes sont préparées **hors de la sélection active**, sous docs/quality-review/assets. Aucune n’est référencée par le site. Les paramètres sont individuels et documentés :

1. Archives 01/02/06/18/21 : repartir du JPG plus défini de la même photographie au lieu du WebP déjà réduit ; aucune réintroduction de l’ancienne photo 16.
2. Référence native : aucune réduction ou agrandissement de la source et aucune conversion avec perte supplémentaire. La copie de comparaison WebP sans perte privilégie la fidélité, pas le poids de production.
3. Accentuation très légère et adaptée (sigma 0,35 à 0,50, réglages de contours conservateurs) sur les vues où elle reste utile. **Aucune accentuation supplémentaire sur archive-11, archive-14, archive-16, archive-23, N03 et N10** : éviter bruit et halos, plutôt que prétendre récupérer des détails.
4. Variante q94 séparée pour comparer le compromis de poids. Pas de débruitage, exposition, contraste créatif, restauration faciale, texte reconstruit ou recadrage. Les sources et copies antérieures restent inchangées.

Les références sans perte totalisent **33 344 970 octets** pour les 21 propositions ; la variante q94 totalise **8 107 216 octets**. Ce ne sont pas des remplacements automatiquement recommandés pour chaque vignette : une diffusion responsive adaptée et le chargement différé restent nécessaires après validation. La hausse du poids sans gain de détail significatif est particulièrement peu justifiée pour N10.

### Photos prioritaires et limites

- **N10 : limitation la plus forte**, 720 × 720 et 55 041 octets. Le flou et la compression de la source ne peuvent pas être corrigés significativement par une simple accentuation fidèle. Chercher un fichier d’origine mieux défini, sinon conserver une taille d’affichage contenue.
- **Archive-11 et archive-14 : réserve de définition et de qualité source**, déjà réduites et comprimées ; la conversion sans perte évite d’aggraver leur état mais ne restitue pas les inscriptions, composants ou contours disparus.
- **Archive-23 : bruit et douceur en faible lumière**, davantage d’accentuation renforcerait le grain. Préservation de la source préférable à une apparence artificiellement dure.
- **N03 : bruit, douceur et écran très lumineux déjà dans le JPG** ; pas de récupération des zones écrêtées avec les seuls pixels fournis.
- **N13 et archive-20 : amélioration modeste**, douceur ou netteté non uniforme initiales ; éviter d’en déduire une possibilité de restauration uniforme de toute la scène.

## Comparaison avant / actuelle / proposition

La page de revue propose les **21 vues**, en commençant par les plus limitées. Trois colonnes de même taille : meilleure source décodée sans retouche, réponse Next effectivement servie (page ou modale au choix), proposition non générative. Deux variantes de proposition sont sélectionnables : sans perte ou q94. Le zoom central ×2/×3 applique la même transformation aux trois colonnes ; il ne s’agit pas d’une reconstruction ni d’une taille native 100 %. Aucun filtre n’est ajouté pour rendre artificiellement la colonne avant plus mauvaise.

Les réponses Next sont des captures locales de l’état actuel à q75, figées pour comparer ; elles ne changent pas quand le sélecteur change la proposition. Les pixels source ne sont pas les fichiers originaux avec leurs métadonnées ; leurs chemins et empreintes restent tracés pour vérification.

## Étude d’une restauration IA — aucune exécution

Une IA peut rendre une photographie visuellement plus nette, mais la netteté perçue ne garantit pas la fidélité des nouveaux détails. Le [travail de Blau et Michaeli sur le compromis perception/distorsion](https://arxiv.org/abs/1711.06077) explique pourquoi apparence plausible et proximité à l’original ne sont pas équivalentes. Aucun modèle, service externe ou reconstruction n’est exécuté pour ce dossier.

Pour N10, les visages et composants ont trop peu d’information pour promettre une reconstruction fidèle. Pour archive-11, les inscriptions et connecteurs seraient particulièrement exposés à l’invention ; pour archive-14, les marquages et ports d’équipements aussi. N03 ne doit pas recevoir un écran fictif ; les visages de N03/N13/archive-23 ne doivent pas être réinventés. Une restauration IA ne doit jamais être présentée comme preuve technique ou photographie originale intacte.

Si une expérimentation est souhaitée, obtenir d’abord votre accord explicite **sur les identifiants et le périmètre**, conserver original et proposition côte à côte, marquer « restauration IA » en FR/EN et effectuer une validation humaine des personnes, matériels et informations. L’autorisation de netteté non générative et la validation de la disposition ne valent pas cet accord. Une meilleure source fournie reste préférable.

## Corrections de diffusion proposées, non appliquées

Après validation des variantes : adapter sizes à chaque composition et au ratio ; calculer les ressources pour les densités visées ; repartir des masters pour éviter les conversions avec perte en cascade ; comparer un unique encodage responsive de qualité élevée à Next avec une qualité autorisée explicite. Une configuration possible est images.qualities: [75, 90] avec quality={90} limité aux photos concernées, mais elle doit être testée pour le poids et le rendu. Ne pas changer globalement tous les logos ou images du site. Une autre option est une famille de tailles préencodées servies sans seconde compression, avec srcset correct.

Pour les petites sources, plafonner l’agrandissement selon la définition disponible plutôt que télécharger un fichier plus lourd sans information supplémentaire. Ces changements de qualité, de taille ou de sélection **n’ont pas été appliqués** à next.config.mjs, aux composants ou aux données actives pendant cet audit.

## Préservation et validation

Les empreintes de **89 fichiers actifs ou sources protégés** sont vérifiées avant/après génération : sources, copies actuelles, sélection, composants/styles, cinq séquences, légendes, registres d’autorisation et configuration Next inchangés. Les quinze JPG originaux et les douze ressources historiques restent intacts. Le logo et les illustrations sont couverts par le manifeste protégé. Les neuf permissions nouvelles restent en attente ; le contrôle Netlify reste bloquant.

La nouvelle page de comparaison est un document de revue local distinct du site. Les tests vérifient les 21 variantes, dimensions natives, absence de métadonnées et intégrité des fichiers protégés. Le lint est exécuté ; les tests applicatifs existants sont relancés. Aucun build de production, formulaire réel, envoi à un service IA, test sur appareil physique ou déploiement n’est nécessaire à la création de cette comparaison et n’est revendiqué pour cette phase.

**À valider : choix des variantes et de la correction de diffusion, limites d’agrandissement acceptables, éventuel besoin de meilleurs originaux. Toute reconstruction IA reste conditionnée à un accord distinct. Aucun push, fusion, PR ou déploiement.**


### Résultats finaux de la revue

Lint réussi et **16 tests unitaires réussis**, dont le contrôle des 89 empreintes et des 21 variantes de comparaison. Support de revue vérifié à 390/768/1440 px, 21 choix disponibles, sans débordement horizontal ; sélection des variantes et zoom commun opérationnels. Contrôles de chargement des colonnes source/actuelle/proposition réussis sur des cas représentatifs, dont la copie 16 approuvée. Les neuf scripts de pages/régression, dont le SEO des 38 URL FR/EN, réussissent sur le site local conservé, sans changement de ses images actives.
