# GKGT — Accentuation technique de netteté

14 novembre 2026 — préparation locale, sans publication.

Le responsable choisit explicitement l'option **accentuation technique légère, sans IA et sans reconstruction de détails** pour les 21 photographies. Les copies affichées utilisent désormais cette variante ; les sources et les versions précédentes restent intactes.

Prévisualisation : http://127.0.0.1:3000/gk-global-technology?lang=fr#gkgt-gallery et variante anglaise `?lang=en#gkgt-gallery`.

## Traitement réalisé

- Accentuation modérée de la luminance avec Sharp/libvips, sans génération, restauration faciale, débruitage, modification du décor, recadrage ou ajout d'éléments.
- Paramètres reproductibles : sigma 0,55 ; m1 0,45 ; m2 1,1 ; x1 2 ; y2 5 ; y3 8.
- Les nouvelles vues repartent des JPG originaux ; les archives repartent des fichiers historiques approuvés disponibles. Pour la photo 16, seule la copie à arrière-plan modifié approuvée est utilisée, jamais l'ancien arrière-plan privé.
- Agrandissements limités à 2048 px de grand côté, sans agrandir une source plus petite ; WebP qualité 88. Miniatures jusqu'à 960 px, qualité 84, pour limiter la douceur d'affichage des petites copies précédentes. Les grandes photographies utilisent les copies de plus haute définition.
- Aucun original ni ancienne copie écrasé : 21 agrandissements et 21 miniatures versionnés sous `public/gkgt-sharpness-v1/`. Sélection de diffusion dans `content/gkgt-gallery.js` via `content/gkgt-sharpness.json`.
- Métadonnées EXIF/IPTC/XMP exclues des copies, sources intactes. Proportions conservées ; aucun détail absent n'est prétendu recréé.

Le gain combine accentuation douce, définition de diffusion et compression de meilleure qualité. Les photographies initialement floues ou petites, notamment N10, restent limitées par leur source. Une accentuation excessive ajouterait du grain ou des contours artificiels : aucune promesse de restauration parfaite n'est faite.

## Revue et vérifications

Comparaison locale de trois exemples : `docs/gkgt-nettete-comparaison.jpg` (N03, N10, archive-23 ; avant à gauche, après à droite). Comparaison examinée visuellement, sans filtre créatif ajouté pour amplifier la différence.

Lint et build local réussis ; **15 tests unitaires réussis**, dont contrôle des 21 sources et variantes, intégrité des quinze originaux, ressources de marque/archives/illustrations protégées, proportions et absence de métadonnées. Le contrôle HTTP GKGT/GKGM FR/EN passe : 21 identifiants distincts, fichiers versionnés et miniatures accessibles, légendes et cinq séquences préservées. Les copies totalisent 5 298 420 octets pour les agrandissements et 1 524 024 pour les miniatures ; le chargement reste différé et les vues agrandies sont chargées sur demande.

Les suites de formulaires et de responsive précédentes ne sont pas présentées comme intégralement rejouées pour cette accentuation : leurs codes/styles ne sont pas modifiés. Aucun test Lighthouse ou mesure de production n'est revendiqué.

Les neuf autorisations nouvelles restent **en attente** et le contrôle Netlify reste bloquant. Les autorisations anciennes ne sont pas étendues aux nouvelles photos par cette opération. Logo, illustrations, organisation éditoriale, formulaires et réglages de confidentialité sont inchangés.

**Aucun push, aucune fusion, aucune PR et aucun déploiement. Résultat local à examiner avant publication.**

## Mise à jour V2 — 15 novembre 2026

La version V1 ci-dessus est conservée à titre de comparaison. La diffusion locale GKGT utilise désormais les copies V2 à variantes responsives et encodage unique ; le détail de la reprise des cinq JPG de meilleure définition, des paramètres individuels et des contrôles est consigné dans `docs/gkgt-qualite-v2-validation.md`. Aucun original, fichier V1, statut d’autorisation ou réserve de publication n’est modifié par cette mise à jour.
