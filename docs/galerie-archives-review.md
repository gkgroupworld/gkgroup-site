# Galerie historique et technique — préparation locale

Date de contrôle : 14 novembre 2026.

Branche : `feature/galerie-archives-techniques`.
Base : `main`, commit `4ee789fced22f2087cfbcc79e38661285eac31fc`.
Dépôt de travail : `galerie-work`, cloné depuis `gkgroupworld/gkgroup-site`.
Les deux anciennes copies locales ne contenaient pas de métadonnées Git et ne correspondent pas à la page À propos actuelle ; elles sont conservées intactes.

## Modifications

- `components/pages/AboutPage.js` : import et insertion de la galerie immédiatement entre `our-history` et `mission-vision` ; aucun texte existant modifié.
- `components/pages/TechnicalArchiveGallery.js` : adaptation du composant fourni ; titres, introduction, légendes et alternatives FR/EN ; activité GK Informatique explicitement historique ; grille de 1/2/3 colonnes ; images entières, sans recadrage, avec `next/image`, `sizes`, ratio réservé et chargement différé.
- `public/archives-techniques/` : uniquement les sept WebP retenus, inchangés, total de 1 176 964 octets (environ 1,12 Mio avant optimisation Next.js).
- Ce rapport et `docs/galerie-archives-pull-request.md` : revue et texte de PR prêts.

L'archive réellement fournie est `GK_Galerie_Codex.zip`, contenant `GK_Galerie_Preparation/`, douze images, `INTEGRATION.md` et le composant. Les indications d'intégration de l'archive ont été examinées comme documentation ; la demande utilisateur gouverne les choix de confidentialité et de livraison.

## Revue des douze photographies

Inspection visuelle de chaque image, en plus d'une planche de contact. Aucun visage modifié, aucune scène fabriquée. Les cinq images écartées ne sont ni copiées dans `public`, ni ajoutées au dépôt.

| Fichier | Décision | Observation |
| --- | --- | --- |
| `01_20181030_170129.webp` | Retenu | Atelier et équipements ; aucun visage ni document sensible repéré. |
| `02_20181030_170143.webp` | Retenu | Étagères, imprimantes et pièces ; aucun visage ni document sensible repéré. |
| `06_20211013_095534.webp` | Retenu | Moniteurs, claviers et unités centrales. |
| `11_IMG-20181112-WA0042.webp` | Retenu | Main tenant un composant électronique ; aucun visage visible. |
| `12_IMG-20181122-WA0004.webp` | Retenu | Carte mère et outils de diagnostic ; étiquettes de composants visibles, aucune donnée client repérée. |
| `14_IMG-20190301-WA0000.webp` | Retenu | Unités centrales ; étiquettes de matériel visibles, aucune donnée personnelle repérée. |
| `16_IMG-20210728-WA0002(1).webp` | Écarté provisoirement | Personne partiellement visible à gauche, rue et plaque de véhicule à l'arrière-plan : validation de confidentialité nécessaire. |
| `18_IMG_20180329_095427.webp` | Écarté provisoirement | Personne partiellement visible ; contenu à l'écran et étiquette à vérifier avant publication. |
| `20_IMG_20190125_120103_9.webp` | Écarté provisoirement | Photographie de personnes sur l'écran du portable ; vérifier les droits sur le contenu affiché. |
| `21_IMG_20190214_073458_8.webp` | Retenu | Ordinateur, moniteur éteint et imprimante. |
| `23_IMG_20190308_092807_2.webp` | Écarté provisoirement | Technicien reconnaissable ; autorisation de publication non confirmée. |
| `24_IMG_20190308_092825_7.webp` | Écarté provisoirement | Technicien reconnaissable ; autorisation de publication non confirmée. |

L'inspection visuelle ne constitue pas une preuve des droits de publication. Confirmer les droits sur les sept images retenues et valider leurs légendes avant publication. Dates, lieux, clients, certifications et résultats techniques n'ont pas été déduits des noms de fichiers ni inventés.

## Contrôles effectués

| Contrôle | Résultat |
| --- | --- |
| `npm ci --no-audit --no-fund` | Réussi hors sandbox ; premier essai bloqué par le DNS de la sandbox. Verrouillage des dépendances conservé. |
| `npm run lint` | Réussi. |
| `npm run test:forms` | 7 tests réussis. |
| `npm run build` | Réussi avec Turbopack, 17 pages générées ; premier essai sandbox interrompu à la création du processus CSS, relance hors sandbox réussie. |
| `npm run test:forms:browser` | Réussi hors sandbox : 12 parcours FR/EN, 4 étapes, consentement, conservation des réponses, refus HTTP et réseau simulés, reprise, deux envois de partenariats simulés. Aucun envoi à un fournisseur réel. |
| SEO et routes existantes | Script de régression inclus dans les tests navigateur : 38 URL FR/EN, canonical, hreflang, sitemap, JSON-LD et cohérence des formulaires réussis. |
| Galerie FR/EN, navigateur intégré | 390/768/1440 px : 7 figures, 1/2/3 colonnes, aucun débordement horizontal, titres traduits et ordre des sections correct. |
| Images | Les sept images chargées dans le navigateur ; alternatives présentes et `loading="lazy"` vérifié. |
| `git diff --check` | Réussi. |

Les avertissements Node sur `module.register()` et le type de module des fichiers de contenu existants ne bloquent pas les contrôles. Aucun changement de dépendance ou de configuration n'a été introduit pour les supprimer.

Logo officiel, navigation, contact, changement de langue, pages des entités, actualités, formulaires, métadonnées, sitemap, styles globaux et configuration Netlify restent inchangés. Aucune nouvelle URL publique n'est créée ; seule une ancre est ajoutée à `/about`.

## Livraison et validations restantes

Branche préparée exclusivement en local. Aucune fusion, aucun push et aucun déploiement volontaire. La branche distante de ce nom n'existait pas lors de la vérification en lecture seule.

`netlify.toml` configure `npm run build`, `.next` et le plugin Next.js, mais ne permet pas de confirmer les réglages de déploiement des branches et des Deploy Previews définis dans Netlify. Ces réglages n'ont pas été vérifiés dans le tableau de bord ; les envois et notifications Netlify réels n'ont pas été testés.

Le texte de PR est préparé dans `docs/galerie-archives-pull-request.md`. La PR GitHub n'est pas ouverte : publier la branche pour l'ouvrir pourrait déclencher un déploiement automatique, contrairement à la contrainte de préparation sans déploiement. Vérifier d'abord les règles Netlify applicables, puis ouvrir une PR en brouillon vers `main` sans la fusionner.

Valider la sélection de sept images, les droits et légendes, puis les éventuelles autorisations des personnes sur les images écartées. Une autorisation explicite de l'utilisateur reste nécessaire avant l'unique déploiement de production regroupant les modifications validées.
