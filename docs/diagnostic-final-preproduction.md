# Diagnostic final de préproduction — GK GROUP

**Date : 15 novembre 2026**
**Mise à jour : 15 novembre 2026, décision explicite du responsable.** Périmètre : état local de `galerie-work`, branche `feature/galerie-archives-techniques`. Aucun test déjà validé n’a été relancé. Cette actualisation met à jour les deux rapports, sans toucher au site, aux images, dépendances ou réglages distants. Aucun commit, push, PR, merge ou déploiement.

## Synthèse

Les contrôles locaux documentés restent satisfaisants : pages FR/EN, navigation et contenu, identité de marque, formulaires simulés, galerie GKGT V2 et SEO passent dans les environnements contrôlés. Le responsable confirme explicitement que les neuf vues auparavant en réserve, ainsi que toutes les photos prévues sur le site, sont autorisées à être publiées. **Les neuf réserves sont levées dans le registre de décision documentaire** [audit final des réserves](audit-final-reserves-publication-gkgt.md). Aucun fichier photo n’a été modifié. Les réglages du compte Netlify/Zoho et l’environnement réellement publié ne sont pas audités depuis le checkout ; ils restent à vérifier dans une session autorisée avant toute validation de production.

## Bloquant

| Constat établi | Action requise avant validation finale |
|---|---|
| Les neuf réserves photo sont levées et synchronisées dans `content/gkgt-authentic-batch.json` : autorisation générale `confirmed-by-owner`, et N03, N04, N05, N06, N08, N09, N10, N13 et N15 `confirmed`. Le contrôle ciblé `scripts/check-gkgt-publication.mjs` en mode Netlify a retourné le code 0. | Aucun blocage photo ne reste dans le garde ciblé. Le garde est toujours actif et ses autres autorisations n’ont pas été modifiées. |
| Les rapports confirment des tests FR/EN locaux et un GET public antérieur du formulaire GKGM (`enabled: true`), mais aucun test réel de soumission/réception ; les paramètres de compte n’ont pas été consultés. La dernière configuration voulue est toutefois confirmée par le responsable : formulaire opérationnel, réception prévue à `gk.contactus@gkgroup.app`, conservation de 12 mois et règles d’accès existantes. | Avant de valider le lot de production, vérifier dans le compte authentifié que la destination réelle des notifications, les accès/MFA et la procédure de conservation/suppression correspondent à ces décisions, puis effectuer l’essai de réception autorisé. Ne pas désactiver le formulaire ni changer ces paramètres sur la seule base de cet audit. |
| Aucun contrôle du dernier déploiement Netlify n’est établi par le checkout : branche/SHA réellement publiés, base de build, version Node du cloud, previews/branch deploys/hooks, variables serveur et politique d’auto-publication restent inconnus. `netlify.toml` ne fixe que `npm run build`, `.next` et le plugin Next. | Dans une session autorisée, comparer le déploiement et les réglages de compte au lot approuvé ; confirmer la branche/SHA, les variables nécessaires au fonctionnement GKGM, le runtime et les déclencheurs de publication. N’engager ensuite que le processus de validation finale explicitement autorisé. |

## À corriger

| Constat | Action proportionnée |
|---|---|
| La version Node n’est pas épinglée dans le dépôt (`.nvmrc`, `.node-version` ou `engines` absents). Le build local documenté a utilisé Node 26.9.0 ; cela ne démontre pas le runtime Netlify. | Confirmer la version effectivement supportée/configurée sur Netlify. Si elle diffère, aligner et revérifier le build dans un changement autorisé avant publication. Aucune épingle de version n’est ajoutée ici. |
| ESLint 9 est encore en maintenance et le rapport de dépendances du 14 novembre indique zéro vulnérabilité connue à cette date (audit complet et production). Ce résultat est un instantané, pas un nouvel audit ni une garantie actuelle. | Refaire l’audit des dépendances et vérifier les avis connus au moment de la validation finale. Planifier la migration ESLint avec ses plugins lorsqu’elle est compatible ; ce point n’est pas un blocage démontré de la fonctionnalité locale actuelle. |
| Les contrôles de domaine/production tels que HTTPS et redirections, en-têtes réellement servis, `noindex`, réception Forms/Zoho et Search Console n’ont pas été effectués dans la chaîne de validation locale rapportée. | Contrôler le domaine et le déploiement réels lors de la mise en production autorisée ; confirmer les notifications après l’essai réel de formulaire. Les tests locaux existants ne se substituent pas à cette vérification. |

## Facultatif

- Approfondir l’accessibilité avec lecteur d’écran, appareils physiques et parcours clavier/zoom exhaustif ; les rapports actuels décrivent des contrôles ciblés, pas une certification WCAG.
- Mesurer Lighthouse/Core Web Vitals et les performances réseau sur l’hébergement et des appareils représentatifs. Les mesures HTTP locales rapportées ne prédisent pas l’expérience de production.
- Migrer ESLint hors de sa version en maintenance dans une évolution dédiée, une fois la compatibilité des plugins React, import et accessibilité confirmée.

## Contrôles déjà documentés — non relancés

- **FR/EN et pages :** les 13 pages principales et six articles (38 URL FR/EN du sitemap) sont répertoriés ; les tests de pages, repli linguistique, navigation, contenus bilingues, formulaires, SEO et liens/ressources locaux sont déclarés réussis dans [l’audit général, section 16](audit-general-avant-deploiement.md#16-audit-technique-final--corrections-locales-du-14-novembre-2026). La mise à jour ultérieure GKGT vérifie les légendes FR/EN des 21 vues.
- **Responsive GKGT :** 375, 768 et 1440 px, aucun débordement horizontal ; cinq séquences, 21 emplacements et ressources chargées ; le détail srcset/fallback V2 et la navigation de la modale sont consignés dans [la validation GKGT V2](gkgt-qualite-v2-validation.md).
- **Identité visuelle :** le rapport d’audit consigne la préservation/vérification d’identité des ressources de marque, dont le logo officiel ; ses fichiers ne sont pas modifiés dans le présent diagnostic. Le logo référencé par les métadonnées structurées et l’en-tête/pied de page est `public/brand/gk-group-official-logo.png`.
- **SEO/technique :** canonicals, hreflang, sitemap, robots, JSON-LD et 38 réponses HTTP locales sont indiqués comme vérifiés. Le build, lint, tests unitaires, tests de pages/formulaires simulés et audit npm ont réussi selon les comptes rendus cités ; ils ne sont pas rejoués ici.
- **Contact/formulaires :** les coordonnées codées incluent `gk.contactus@gkgroup.app`; le contact permet email/WhatsApp et les formulaires Netlify ont été testés en simulation. Les rapports précisent qu’aucune soumission externe réelle n’a été envoyée.

## Actions réellement nécessaires avant la validation finale

1. Vérifier les paramètres du site Netlify et la version Node réellement utilisée ; confirmer que l’exact lot soumis à revue correspond au déploiement candidat.
2. Vérifier la destination, les accès et la conservation GKGM dans Netlify/Zoho, puis la réception réelle par l’essai autorisé.
3. À l’approche de la publication, confirmer l’état HTTPS/redirections, en-têtes, indexation et réponse des formulaires sur le domaine de production.

La décision photographique est enregistrée, les neuf statuts machine sont confirmés et le contrôle ciblé du garde passe. Le présent audit ne modifie aucun paramètre Netlify/Zoho et n’autorise aucune publication.
