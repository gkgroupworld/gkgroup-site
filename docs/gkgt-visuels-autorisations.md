# GKGT — visuels et autorisations de diffusion

État enregistré le 14 novembre 2026 sur `feature/galerie-archives-techniques` ; préparation locale uniquement.

## Autorisations confirmées par le responsable

Le responsable de GK GROUP autorise l'utilisation et la publication sur gkgroup.app des douze photographies historiques fournies. Cette déclaration remplace sa réserve générale antérieure concernant leur diffusion. Il autorise également l'utilisation des deux illustrations modernes fournies dans `GKGT_visuels_modernes.zip`, sous réserve d'une mention claire de leur caractère illustratif.

Dans sa réponse complémentaire, il confirme toutefois que les autorisations individuelles et droits tiers des photos 16, 18, 20, 23 et 24 restent à vérifier. **Ces cinq photographies ne doivent pas être rendues publiques tant que leurs points en attente ne sont pas résolus.** Les douze originaux restent dans le projet local, sans suppression ni retouche.

Cette autorisation de contenu ne constitue pas une autorisation de push, de fusion, de PR ou de déploiement. Aucun de ces actes n'a été effectué.

## Contrôle visuel et confidentialité des archives

Revue de la planche des douze photos et examen détaillé renouvelé des cinq photos signalées, en complément des inspections individuelles précédentes. Les identifiants potentiels ne sont pas retranscrits dans ce rapport. L'absence de donnée sensible repérée ne constitue pas une garantie exhaustive ni une preuve de droit sur tout élément de l'image.

| Photo | Observations | État distinct de l'autorisation générale |
| --- | --- | --- |
| 01 — atelier | Équipements et emballages ; aucun visage reconnaissable ni document sensible repéré. | Autorisation générale du responsable enregistrée ; aucune réserve spécifique identifiée dans la revue. |
| 02 — équipements | Étagères et imprimantes ; pas de visage ni données d'écran repérés. | Autorisation générale enregistrée ; aucune réserve spécifique identifiée. |
| 06 — moniteurs | Écrans éteints, claviers et unités centrales. | Autorisation générale enregistrée ; aucune réserve spécifique identifiée. |
| 11 — composant | Main tenant un composant, sans visage visible. | Autorisation générale enregistrée ; aucune réserve spécifique identifiée. |
| 12 — carte mère | Étiquettes de pièces et codes-barres visibles ; aucune donnée client directement repérée. | Autorisation générale enregistrée ; vérifier le contexte des étiquettes si elles renvoient à un dossier confidentiel. |
| 14 — unités centrales | Étiquettes de matériel et codes-barres visibles. | Autorisation générale enregistrée ; même réserve de contexte sur les étiquettes. |
| 16 — unités extérieures | Personne partiellement visible, rue, véhicules et plaque visible à l'arrière-plan. | **En attente** : examen des éléments identifiants et éventuelles autorisations individuelles, confirmé par l'utilisateur. |
| 18 — pièces/atelier | Personne partiellement visible, contenu affiché sur un écran et étiquette visible. | **En attente** : confidentialité et éventuelles autorisations individuelles, confirmé par l'utilisateur. |
| 20 — portable démonté | Personnes et contenu tiers affichés sur l'écran. | **En attente** : droits sur les personnes et contenus affichés, confirmé par l'utilisateur. |
| 21 — ordinateur | Moniteur principal éteint ; pas de document sensible repéré. | Autorisation générale enregistrée ; aucune réserve spécifique identifiée. |
| 23 — intervention | Personne reconnaissable ; annotation murale à examiner dans son contexte, sans la reproduire ici. | **En attente** : autorisation individuelle non confirmée. |
| 24 — intervention | Personne reconnaissable ; équipements et emballages autour du poste. | **En attente** : autorisation individuelle non confirmée. |

Lecture des métadonnées via Sharp : aucune donnée EXIF, XMP ou IPTC détectée dans les douze WebP. Cela ne remplace pas l'examen des informations directement visibles dans les pixels. Les photos, leurs légendes et leurs alternatives historiques ne sont pas modifiées ; les fichiers sont identiques octet pour octet à l'état précédent.

Pour lever les réserves, faire confirmer les autorisations par les personnes concernées et les titulaires des contenus tiers, et vérifier le contexte des éléments identifiants. Si un traitement devient nécessaire, il devra être décidé séparément, avec conservation des originaux ; aucune retouche n'a été exécutée ici.

## Deux illustrations modernes intégrées

L'archive contient uniquement deux PNG, sans document d'instruction :

| Fichier | Caractéristiques | Présentation |
| --- | --- | --- |
| `GKGT_Atelier_Illustration.png` | 1672 × 941 px ; 2 296 644 octets | « Illustration d'un atelier de maintenance informatique » / « Illustration of an IT maintenance workshop ». |
| `GKGT_Boutique_Illustration.png` | 1672 × 941 px ; 2 153 607 octets | « Illustration d'une boutique d'équipements informatiques » / « Illustration of a computer equipment store ». |

Les PNG sont copiés sans retouche dans `public/technology-illustrations/`. Les copies ont été comparées aux fichiers extraits : identiques octet pour octet. Ils sont servis via `next/image`, avec dimensions réservées, chargement différé et tailles responsive. Aucun nouveau visuel n'a été généré.

La section « Notre atelier et notre boutique » conserve son titre, affiche un badge **Illustration**, des légendes et alternatives FR/EN et une introduction indiquant expressément que les images ne sont pas des photographies des installations réelles. Les archives authentiques restent dans une section distincte.

À l'inspection des illustrations : pas de personne ni plaque de véhicule repérée ; écrans et emballages stylisés, sans donnée personnelle lisible identifiée. Les marques/détails représentés ne sont pas présentés comme des partenariats, agréments, stocks disponibles ou équipements réellement possédés. L'autorisation d'utilisation des deux illustrations a été expressément confirmée par le responsable ; aucune vérification indépendante de leur chaîne de création n'est revendiquée.

## Protection de la préparation et limites

`content/gkgt-publication-rights.json` distingue l'autorisation générale, celle des illustrations et les cinq dossiers de droits encore en attente. Un hook npm `prebuild` exécute `scripts/check-gkgt-publication.mjs` :

- En local, le build continue et permet de revoir les douze archives et les deux illustrations.
- Avec `NETLIFY=true`, le contrôle bloque le build avant Next.js et énumère les cinq réserves non confirmées. Il vise les builds Netlify, y compris les previews exécutant la commande npm prévue par le dépôt.
- Ce contrôle ne crée aucun droit, ne remplace pas l'accord final de déploiement et n'est pas un contrôle d'accès aux fichiers. Les douze photos sont encore dans `public` : ne pas téléverser ce dossier ni un build préexistant vers un hébergement. Une autre commande ou un envoi manuel contournant le hook n'est pas protégé par ce mécanisme.

La liste ne doit être mise à jour qu'après confirmation réelle des droits et résolution des données sensibles, puis revue des preuves dans un espace privé approprié. Ne pas ajouter de pièces d'identité ou d'autorisations signées dans le dossier public du site. L'accord final explicite de publication reste nécessaire même après résolution des droits.

## Vérification technique de cette mise à jour

- Lint, 7 tests unitaires et build local réussis.
- Contrôle de publication testé en processus local : `NETLIFY=false` retourne 0 ; `NETLIFY=true` retourne 1 et liste les photos 16, 18, 20, 23 et 24. Aucun build distant lancé.
- Deux illustrations chargées et légendées en FR/EN aux largeurs 390, 768 et 1440 px ; aucun débordement horizontal ; douze figures historiques toujours présentes.
- Tests navigateur Forms et régression SEO : 12 parcours GKGM FR/EN, deux soumissions de partenariats simulées et 38 URL SEO réussis ; aucun envoi réel.
- Origines historiques, logo et ajouts GKGM préservés. Réserve connue de référence des bannières et alertes de sécurité des dépendances toujours ouvertes, sans nouvelle mise à jour de dépendance.
