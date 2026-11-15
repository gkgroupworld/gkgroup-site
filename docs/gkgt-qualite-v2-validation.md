# GKGT — Diffusion photographique V2 sans IA

15 novembre 2026 — prévisualisation locale, sans publication.

## Résultat à examiner

- Prévisualisation FR : http://localhost:3116/gk-global-technology?lang=fr#gkgt-gallery
- Prévisualisation EN : http://localhost:3116/gk-global-technology?lang=en#gkgt-gallery
- Comparateur documentaire antérieur : `docs/quality-review/index.html` (sources, version servie avant V2 et candidat sans IA).

Les 21 photographies restent réparties dans les cinq séquences validées. Les 12 archives, les 9 nouvelles vues, leurs légendes FR/EN, leurs statuts de publication et la modale d’agrandissement sont conservés. Les 15 JPG d’origine, les versions `gkgt-sharpness-v1` et les fichiers de comparaison ne sont ni remplacés ni supprimés.

## Copies V2 et qualité

Le script `scripts/prepare-gkgt-display-v2.mjs` avait déjà terminé sa génération avant la reprise : 21 dossiers logiques, **122 WebP** et deux manifestes conservés dans `content/gkgt-display-v2.json` et `docs/gkgt-display-v2-processing.json`. Les sources sont vérifiées par empreinte avant traitement.

Les cinq archives ci-dessous repartent du JPG de meilleure définition identifié lors de l’audit :

| Archive | Source V2 | Définition source |
|---|---|---:|
| 01 | `20181030_170129(1).jpg` | 1152 × 2048 |
| 02 | `20181030_170143(1).jpg` | 2048 × 1152 |
| 06 | `20211013_095534(1).jpg` | 2048 × 1153 |
| 18 | `IMG_20180329_095427(1).jpg` | 1536 × 2048 |
| 21 | `IMG_20190214_073458_8(1).jpg` | 2048 × 1536 |

Chaque variante est créée avec Sharp/libvips, sans recadrage ni agrandissement, avec les réglages individuels de l’audit. Les images qui ne devaient pas être accentuées (archive-11, archive-14, archive-16, archive-23, N03 et N10) ne reçoivent pas de filtre de netteté. Les autres reçoivent uniquement une accentuation légère ciblée. Aucun modèle d’IA, débruitage génératif, reconstruction ou retouche de personne, écran, plaque ou décor n’est employé. La photo 16 utilise exclusivement la version validée à arrière-plan modifié.

## Livraison, poids et responsive

Le composant GKGT utilise un `picture` WebP avec `srcset` réel de 320 px à la largeur native et un fallback `next/image` marqué `unoptimized`. Ainsi, le navigateur choisit une des 122 copies déjà encodées ; la réponse ne passe pas une seconde fois par `/_next/image`. Le contrôle HTTP du build local confirme **21 photos, 21 `srcset` et 0 URL de recompression Next pour `gkgt-quality-v2`**.

| Mesure | V1 conservée | V2 proposée |
|---|---:|---:|
| Copies pleine définition | 5 298 420 octets | 5 982 966 octets |
| Ensemble des variantes locales | 6 822 444 octets | 16 064 214 octets |
| Variantes servies | 2 par photo | 4 à 7 par photo selon la source |

Le total V2 stocké est plus élevé car il couvre les formats nécessaires à un écran mobile, tablette ou grand écran, et parce que cinq archives repartent d’une meilleure source. Ce n’est pas le poids téléchargé par une page : le navigateur sélectionne une seule variante adaptée par image, et le chargement différé est conservé. Les fenêtres de modal limitent aussi l’affichage à la définition disponible à densité 2×/3×/4× afin d’éviter d’agrandir artificiellement les petites sources, en particulier N10 (720 × 720).

Les proportions sont conservées et chaque WebP est dépourvu de métadonnées EXIF/IPTC/XMP. Aucun test sur appareil physique Retina, Safari/iOS ou Lighthouse de production n’est revendiqué.

## Contrôle technique responsive — 15 novembre 2026

Contrôle exécuté sur le build de production local existant, dans le navigateur intégré. Playwright 1.64.1 est déjà une dépendance du projet ; Edge stable est installé sur le poste. La méthode Playwright `channel: "msedge"` ne trouve pas Edge dans l’environnement de navigateur isolé, et le binaire Chromium Playwright n’est pas installé. Aucun téléchargement ni changement de dépendance n’a été effectué. Le serveur Next déjà présent sur le port 3116 a répondu au navigateur ; sa relance a confirmé que le port était déjà occupé.

| Viewport CSS | Largeur utile document | Largeur de défilement | Débordement horizontal |
|---:|---:|---:|---|
| 375 px mobile | 360 px | 360 px | Non |
| 768 px tablette | 753 px | 753 px | Non |
| 1440 px ordinateur | 1425 px | 1425 px | Non |

Les 15 px entre viewport et largeur utile correspondent à la barre de défilement verticale. Aux trois largeurs, les contrôles DOM ont relevé exactement cinq séquences (`expertise`, `maintenance`, `equipment`, `workshop`, `evolution`) et 21 emplacements photographiques. Les éléments `<picture>` déclarent `source type="image/webp"`, avec 4 à 7 choix `srcset` selon la photo. Le fallback React `next/image` porte `unoptimized` dans le composant ; les réponses réellement sélectionnées sont des URL directes `/gkgt-quality-v2/*.webp`, et zéro des 21 photos ne passe par `/_next/image`. L’image est différée (`loading="lazy"`) et chaque image a été chargée pendant le parcours de la page ; aucune réponse image en erreur n’a été relevée.

Les légendes et textes alternatifs FR ont été contrôlés sur la page française, puis leurs équivalents EN sur la page anglaise pour les 21 identifiants. Les pages GKGT FR et EN répondent et conservent le titre de page, les séquences et la galerie. Les 9 nouvelles vues conservent leurs légendes et leurs statuts de publication dans les deux langues. Leur autorisation est enregistrée comme confirmée dans le registre de publication. Cette confirmation administrative ne remplace pas la revue visuelle finale des copies V2.

La modale a été ouverte sur N13 : statut « Photographie 1 / 21 », image V2 chargée et légende présente. « Suivante » affiche « Photographie 2 / 21 » et archive-11 ; Échap ferme la modale et restaure le défilement normal. Aucun défaut nécessitant une correction n’a été constaté.

Les captures d’écran sont visibles dans les observations du navigateur de cette session, mais cet outil de navigateur ne fournit pas de chemin d’enregistrement PNG dans le workspace. Aucun fichier de capture n’est donc référencé comme artefact local. La page peut être rouverte ici : [FR](http://localhost:3116/gk-global-technology?lang=fr#gkgt-gallery) · [EN](http://localhost:3116/gk-global-technology?lang=en#gkgt-gallery).

## Vérifications effectuées

- Lint : réussi.
- Tests unitaires : **17 réussis**, dont intégrité des originaux, des archives, du logo, des illustrations, des versions V1 et des 21 variantes V2.
- Build de production local : réussi (17 routes).
- Régressions pages, SEO, FR/EN, galerie et formulaires simulés : réussies.
- Contrôle HTTP du build : 21 identifiants uniques dans cinq séquences, 12 archives, légendes et réserves conservées, fichiers V2 accessibles.

Les autorisations de publication des neuf nouvelles vues sont désormais enregistrées comme confirmées dans `content/gkgt-authentic-batch.json`. L'autorisation générale du responsable est également confirmée. Les cinq dossiers historiques du registre `content/gkgt-publication-rights.json` sont au statut `confirmed`. Le contrôle `NETLIFY=true` du garde `scripts/check-gkgt-publication.mjs` a été exécuté avec succès (code de sortie 0). Ces statuts reposent sur les déclarations du responsable et ne constituent pas une vérification indépendante des consentements individuels ni une certification de l'absence d'informations sensibles visibles dans les images. Les originaux JPG restent privés et les limites de contrôle visuel documentées sont maintenues.

Aucun push, fusion, PR ou déploiement n’a été effectué. La revue visuelle locale finale des 122 variantes WebP reste requise pour valider leur qualité de rendu avant toute diffusion publique. Cette étape de contrôle technique ne remet pas en attente les autorisations de publication déjà enregistrées.