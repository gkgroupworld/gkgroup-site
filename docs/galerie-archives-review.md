# Galerie historique et technique — préparation locale

Date de contrôle : 14 novembre 2026. Rapport actualisé après déplacement de la galerie complète vers GKGT, conformément à la dernière instruction de l'utilisateur.

**Actualisation des autorisations :** le responsable autorise désormais la diffusion générale des douze archives et l'usage des deux illustrations modernes, mais confirme que les droits distincts des photos 16, 18, 20, 23 et 24 restent en attente. Elles sont conservées exclusivement dans la préparation locale et ne doivent pas être publiées avant résolution. Le registre actuel, les vérifications et le blocage des builds Netlify sont détaillés dans `docs/gkgt-visuels-autorisations.md`. Ce registre remplace les réserves générales antérieures et les mentions devenues historiques de section atelier/boutique vide.

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
| `16_IMG-20210728-WA0002(1).webp` | Intégré localement — validation avant publication | Personne partiellement visible à gauche, rue et plaque de véhicule à l'arrière-plan : validation de confidentialité nécessaire. |
| `18_IMG_20180329_095427.webp` | Intégré localement — validation avant publication | Personne partiellement visible ; contenu à l'écran et étiquette à vérifier avant publication. |
| `20_IMG_20190125_120103_9.webp` | Intégré localement — validation avant publication | Photographie de personnes sur l'écran du portable ; vérifier les droits sur le contenu affiché. |
| `21_IMG_20190214_073458_8.webp` | Retenu | Ordinateur, moniteur éteint et imprimante. |
| `23_IMG_20190308_092807_2.webp` | Intégré localement — validation avant publication | Technicien reconnaissable ; autorisation de publication non confirmée. |
| `24_IMG_20190308_092825_7.webp` | Intégré localement — validation avant publication | Technicien reconnaissable ; autorisation de publication non confirmée. |

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

Avant toute publication publique, vérifier les autorisations des personnes et les informations potentiellement sensibles des cinq photos signalées, ainsi que les droits et légendes des douze photographies. Attendre une autorisation explicite de publication de l’utilisateur avant toute opération distante, puis vérifier également les règles de déploiement automatique Netlify.
