# Galerie historique et technique — préparation locale

Date de contrôle : 14 novembre 2026. Rapport actualisé après déplacement de la galerie complète vers GKGT, conformément à la dernière instruction de l'utilisateur.

**Actualisation définitive :** les photos 16, 18 et 20 sont désormais approuvées, ainsi que les personnes des photos 23 et 24. La galerie utilise la copie 16 à arrière-plan modifié validée par l’utilisateur ; son original intact est conservé hors de `public`. Les onze autres photos et les deux illustrations restent inchangées. Aucune réserve photographique enregistrée ne reste ouverte et le contrôle Netlify des droits retourne 0. Cela ne constitue pas une autorisation de déploiement. Le registre de référence actuel est `docs/gkgt-visuels-autorisations.md` ; les détails ci-dessous décrivent aussi les étapes de préparation antérieures.

Branche : `feature/galerie-archives-techniques`.
Base : `main`, commit `4ee789fced22f2087cfbcc79e38661285eac31fc`.
Dépôt de travail : `galerie-work`, cloné depuis `gkgroupworld/gkgroup-site`.
Les deux anciennes copies locales ne contenaient pas de métadonnées Git et ne correspondent pas à la page À propos actuelle ; elles sont conservées intactes.

## Modifications

- `components/pages/AboutPage.js` : retrait de l'import et de la galerie ; contenu rétabli à la version de `main`, sans suppression des fichiers photo.
- `components/pages/TechnologyPage.js` : insertion de la galerie après les services et avant la méthode de travail, ajout d'une section atelier/boutique distincte et de deux ancres au sommaire.
- `content/technology-gallery.js` et `components/pages/TechnologyWorkshop.js` : textes FR/EN et structure d'accueil des futurs visuels récents, sans image fictive ni photo historique réutilisée comme installation actuelle.
- `components/pages/TechnicalArchiveGallery.js` : adaptation du composant fourni ; titres, introduction, légendes et alternatives FR/EN ; activité GK Informatique explicitement historique ; grille de 1/2/3 colonnes ; images entières, sans recadrage, avec `next/image`, `sizes`, ratio réservé et chargement différé.
- `public/archives-techniques/` : les douze WebP de l’archive, inchangés, total de 2 107 904 octets (environ 2,01 Mio avant optimisation Next.js). Les sept images précédemment intégrées sont conservées ; les cinq autres sont ajoutées dans l’ordre des fichiers.
- Ce rapport et `docs/galerie-archives-pull-request.md` : revue et texte de PR prêts.

L'archive réellement fournie est `GK_Galerie_Codex.zip`, contenant `GK_Galerie_Preparation/`, douze images, `INTEGRATION.md` et le composant. Les indications d'intégration de l'archive ont été examinées comme documentation ; la demande utilisateur gouverne les choix de confidentialité et de livraison.

## Revue des douze photographies

Inspection visuelle de chaque image, en plus d'une planche de contact. Aucun visage modifié, aucune scène fabriquée. Les cinq images précédemment écartées sont désormais intégrées dans `public` pour la préparation locale, sur demande explicite de l’utilisateur. Cette intégration ne vaut pas autorisation de publication publique. Comparaison SHA-256 directe avec les entrées du ZIP : 12/12 fichiers identiques à l’archive, sans modification des visages, retouche ni suppression d’éléments.

| Fichier | Décision | Observation |
| --- | --- | --- |
| `01_20181030_170129.webp` | Retenu | Atelier et équipements ; aucun visage ni document sensible repéré. |
| `02_20181030_170143.webp` | Retenu | Étagères, imprimantes et pièces ; aucun visage ni document sensible repéré. |
| `06_20211013_095534.webp` | Retenu | Moniteurs, claviers et unités centrales. |
| `11_IMG-20181112-WA0042.webp` | Retenu | Main tenant un composant électronique ; aucun visage visible. |
| `12_IMG-20181122-WA0004.webp` | Retenu | Carte mère et outils de diagnostic ; étiquettes de composants visibles, aucune donnée client repérée. |
| `14_IMG-20190301-WA0000.webp` | Retenu | Unités centrales ; étiquettes de matériel visibles, aucune donnée personnelle repérée. |
| `16_IMG-20210728-WA0002(1).webp` | Copie modifiée approuvée ; original intact hors public | La galerie utilise `16_unites-centrales-arriere-plan-modifie.png`, validée par l’utilisateur après examen du nouvel arrière-plan. |
| `18_IMG_20180329_095427.webp` | Publication autorisée dans son état actuel | Examen personnel et autorisation explicite du responsable. |
| `20_IMG_20190125_120103_9.webp` | Publication autorisée, écran inclus | Le responsable confirme les autorisations nécessaires et l’usage dans son état actuel. |
| `21_IMG_20190214_073458_8.webp` | Retenu | Ordinateur, moniteur éteint et imprimante. |
| `23_IMG_20190308_092807_2.webp` | Intégré localement — validation avant publication | Personnes : accord de publication confirmé sur déclaration du responsable de GK GLOBAL GROUP SARLU, le 14 novembre 2026 ; contrôle distinct des informations sensibles maintenu. |
| `24_IMG_20190308_092825_7.webp` | Intégré localement — validation avant publication | Personnes : accord de publication confirmé sur déclaration du responsable de GK GLOBAL GROUP SARLU, le 14 novembre 2026 ; contrôle distinct des informations sensibles maintenu. |

L'inspection visuelle ne constitue pas une preuve des droits de publication. Confirmer les droits sur les douze images et valider leurs légendes avant publication ; vérifier en particulier les autorisations des personnes et les informations potentiellement identifiantes signalées dans le tableau. Dates, lieux, clients, certifications et résultats techniques n'ont pas été déduits des noms de fichiers ni inventés.

## Contrôles effectués

| Contrôle | Résultat |
| --- | --- |
| `npm ci --no-audit --no-fund` | Installation verrouillée réussie lors de la préparation initiale ; dépendances déjà présentes et inchangées pour cette mise à jour. |
| `npm run lint` | Réussi. |
| `npm run test:forms` | 7 tests réussis. |
| `npm run build` | Relancé avec les douze images : réussi hors sandbox avec Turbopack, 17 pages générées. |
| `npm run test:forms:browser` | Réussi hors sandbox : 12 parcours FR/EN, 4 étapes, consentement, conservation des réponses, refus HTTP et réseau simulés, reprise, deux envois de partenariats simulés. Aucun envoi à un fournisseur réel. |
| SEO et routes existantes | Script de régression inclus dans les tests navigateur : 38 URL FR/EN, canonical, hreflang, sitemap, JSON-LD et cohérence des formulaires réussis. |
| Galerie FR/EN, navigateur intégré | Six combinaisons langue/largeur contrôlées à 390/768/1440 px : 12 figures, 1/2/3 colonnes, aucun débordement horizontal et ordre des sections correct. |
| Images | 12/12 images chargées après parcours des figures dans chacune des six combinaisons FR/EN et largeur ; alternatives présentes, `loading="lazy"` confirmé et SHA-256 identiques au ZIP. |
| `git diff --check` | Réussi. |

Les avertissements Node sur `module.register()` et le type de module des fichiers de contenu existants ne bloquent pas les contrôles. Aucun changement de dépendance ou de configuration n'a été introduit pour les supprimer.

Logo officiel, navigation globale, contact, changement de langue, pages des entités, actualités, formulaires, métadonnées, sitemap, styles globaux et configuration Netlify restent inchangés. Aucune nouvelle route publique n'est créée ; les ancres `technical-archives` et `workshop-store` se trouvent désormais sur `/gk-global-technology`. L'ancienne ancre de galerie sur `/about` est retirée ; cette page conserve son histoire et sa mission/vision.

Après déplacement, lint, build, 7 tests unitaires, tests navigateur des formulaires simulés et sept scripts de régression/SEO ont été relancés avec succès. La galerie GKGT charge les 12 images dans chacune des six combinaisons FR/EN à 390/768/1440 px, sans débordement ; la section atelier/boutique ne contient aucune image. L'absence de galerie sur `/about` est confirmée dans les deux langues. Le test historique `verify-heroes` échoue désormais sur GKGT car l'empreinte sous sa bannière précède les sections ajoutées ; aucune référence n'a été réenregistrée. Les trois fichiers fonctionnels GKGM de `72fc075`, le logo et les 12 images sont préservés ; les légendes FR/EN sont identiques.

## Détail du contrôle de chargement

| Langue | Largeur CSS | Colonnes | Images chargées | Débordement |
| --- | --- | --- | --- | --- |
| FR | 1440 px | 3 | 12/12 | Aucun |
| FR | 768 px | 2 | 12/12 | Aucun |
| FR | 390 px | 1 | 12/12 | Aucun |
| EN | 1440 px | 3 | 12/12 | Aucun |
| EN | 768 px | 2 | 12/12 | Aucun |
| EN | 390 px | 1 | 12/12 | Aucun |

Contrôle dans un navigateur avec dimensions simulées ; aucun test sur appareils physiques. Les photos restent affichées entières avec `object-contain`. Le logo officiel et les autres fonctionnalités ne sont pas modifiés.

## Livraison et validations restantes

Branche préparée exclusivement en local. Aucune fusion, aucun push et aucun déploiement volontaire. La branche distante de ce nom n'existait pas lors de la vérification en lecture seule.

`netlify.toml` configure `npm run build`, `.next` et le plugin Next.js, mais ne permet pas de confirmer les réglages de déploiement des branches et des Deploy Previews définis dans Netlify. Ces réglages n'ont pas été vérifiés dans le tableau de bord ; les envois et notifications Netlify réels n'ont pas été testés.

Le texte de PR est actualisé dans `docs/galerie-archives-pull-request.md`, uniquement comme document local. Aucun push GitHub, aucune ouverture de PR, aucune fusion dans `main` et aucun déploiement Netlify ne sont autorisés à ce stade. La galerie complète se trouve dans le dossier `public` de cette branche locale : elle serait exposée si cette branche était publiée ; conserver donc ce travail exclusivement en local.

Avant toute publication publique, résoudre les vérifications des photos 16, 18 et 20 ; les autorisations des personnes des photos 23 et 24 sont confirmées sur déclaration du responsable. Maintenir les contrôles distincts de confidentialité et les validations des droits et légendes des douze photographies. Attendre une autorisation explicite de publication de l’utilisateur avant toute opération distante, puis vérifier également les règles de déploiement automatique Netlify.

## Validation définitive et fichier 16

L’utilisateur autorise la photo 18 dans son état actuel, la photo 20 avec ses contenus d’écran sur confirmation des droits nécessaires, et la copie 16 après examen du nouvel arrière-plan. Les autorisations des personnes des photos 23/24 restent confirmées sur sa déclaration. Toutes ces décisions sont enregistrées dans `content/gkgt-publication-rights.json`.

La copie utilisée est `public/archives-techniques/16_unites-centrales-arriere-plan-modifie.png`, avec une mention FR/EN d’arrière-plan modifié. L’original est conservé intact dans `source-assets/archives-techniques/originals/16_IMG-20210728-WA0002(1).webp`, hors des fichiers servis. Les comparaisons binaires de cet original et des onze autres WebP réussissent.

Contrôles refaits : lint, 7 tests unitaires, build local, SEO 38 URL et galerie 12/12 chargée dans les six combinaisons FR/EN à 390/768/1440 px. Le script photographique retourne 0 sous simulation locale `NETLIFY=true` ; aucun build distant n’est lancé. Les autres réserves de l’audit restent ouvertes et l’accord final explicite de publication demeure requis.
