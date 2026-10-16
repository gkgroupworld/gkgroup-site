# GKGM — formulaire de projet international

Branche : `codex/gkgm-project-inquiry` ; base `5e5bf32`.

## Aperçus

- FR : http://127.0.0.1:3111/gkgm-project?lang=fr
- EN : http://127.0.0.1:3111/gkgm-project?lang=en
- [Captures ordinateur, tablette, mobile et révision D2](gkgm-project-previews/index.html) : état initial avant révision de la notice ; la version actuelle fait foi dans `content/gkgm-project.js`.

Page `/gkgm-project`, accessible depuis le bouton de projet de la page GKGM. Quatre étapes, six catégories, champs conditionnels, révision et reconnaissance de la notice non précochée. Destination Portugal imposée pour le D2. Nationalité non collectée à cette étape ; aucune pièce jointe, donnée d’enfant, date de naissance ou pièce d’identité demandée. Budget facultatif. Aucune promesse d’admissibilité, d’emploi, d’admission ou de visa.

## État avant publication

La notice FR/EN intègre les six décisions approuvées par la direction le 16 octobre 2026 : demandes sans suite conservées 12 mois maximum puis supprimées, accès interne au seul responsable Edem Yawo Awutey, prestataires techniques nécessaires dont Netlify et Zoho Mail, absence de transmission automatique aux partenaires, finalités limitées et politique distincte pour les dossiers clients. L’ancienne hypothèse de cinq ans est retirée. Les points juridiques et opérationnels encore ouverts sont distingués des règles approuvées. Voir [inventaire des lieux de traitement, points à confirmer et procédure de suppression](gkgm-privacy-operations.md).

L’envoi réel est désactivé par défaut côté interface ET API. Aucune collecte locale et aucune conservation dans localStorage/sessionStorage ; les réponses restent uniquement dans l’état du formulaire jusqu’au rechargement/changement de langue ou fermeture de la page. Un changement de catégorie efface les anciennes réponses spécifiques ; un retour d’étape ou un échec d’envoi conserve les réponses du parcours courant.

L’activation exige de finaliser/remplacer la notice provisoire, obtenir sa validation et la publication explicite, puis définir `GKGM_PRIVACY_APPROVED=true` dans l’environnement runtime Netlify. Ne pas activer ce drapeau dans un aperçu public. L’API exige également les variables runtime Netlify réservées `SITE_NAME` et `SITE_ID`, fournies en lecture seule par Netlify (ne pas les créer ou les écraser manuellement), et construit l’origine HTTPS du site *.netlify.app. Le drapeau de validation doit être défini pour Functions/runtime uniquement dans le contexte de production autorisé. Aucune clé, API tierce de messagerie ou destinataire non validé n’est ajouté.

## Transport et Netlify Forms

Formulaire distinct `gkgm-project-inquiry`, détection statique `public/__gkgm-forms.html`, honeypot `fax`. L’ancien `public/__forms.html` et le formulaire `international-partnerships` sont strictement inchangés.

Le navigateur envoie au POST `/api/gkgm-project`. L’API vérifie origine, encodage, taille maximale de 20 Ko, doublons, catégorie, champs requis et options, e-mail, WhatsApp international, consentement et honeypot ; les champs inconnus/inactifs sont rejetés. Seuls les champs actifs autorisés sont transférés en URL-encoded à `/__gkgm-forms.html` sur l’origine Netlify configurée par SITE_NAME. Aucun journal ni réponse HTTP ne contient les données saisies. Délais maximum, erreurs réseau/HTTP, redirections et retour du fichier statique sont traités comme échecs. Une réception positive n’est affichée qu’après réponse positive de cette API et acceptation du collecteur, sans promesse de traitement ou de décision.

Limite : les validations serveur couvrent le point d’entrée de l’application ; le collecteur natif Netlify peut recevoir des POST directs qui contournent cette API. Ne pas considérer toutes les entrées brutes de Netlify comme des demandes validées. Avant mise en production, vérifier les filtres antispam/les règles opérationnelles et les procédures de tri/suppression. Le honeypot et la validation ne remplacent pas une protection anti-abus complète.

La suppression dans la limite approuvée de 12 mois n’est pas automatisée par ce changement. La procédure proposée couvre Netlify (vérifiés et spam), notifications et fils e-mail, exports et copies internes, sauvegardes et preuve minimale de purge. Le responsable Edem Yawo Awutey, le point de départ à la réception initiale et la revue hebdomadaire sont approuvés ; leur mise en œuvre et les délais techniques de purge restent à vérifier avant activation.

## Notification à configurer manuellement

Dans Netlify, activer/vérifier la détection Forms. Après le déploiement autorisé détectant ce nouveau formulaire, aller dans **Forms → Submission notifications**, ajouter une notification e-mail, choisir **gkgm-project-inquiry** et l’adresse **gk.contactus@gkgroup.app**. Vérifier la réception avec un seul test synthétique approuvé. Le dépôt ne configure pas les destinataires du tableau de bord ; une déclaration HTML ne suffit pas à prouver que l’e-mail est envoyé. Ne pas modifier la notification des partenariats.

Sources officielles consultées : [détection/SSR/AJAX](https://docs.netlify.com/manage/forms/setup/), [notifications](https://docs.netlify.com/manage/forms/notifications/), [gestion des soumissions](https://docs.netlify.com/manage/forms/submissions/).

## Tests

- ESLint et build de production réussis.
- Huit scripts existants réussis : architecture, entities, heroes, home, institutional-pages, news, partnerships, seo (38 URL FR/EN).
- `node scripts/verify-gkgm-project.mjs http://127.0.0.1:3111` : six catégories × deux langues ; requis, options, consentement, WhatsApp, e-mail, minimisation, taille, origine, champs inconnus/doublons, honeypot, destination D2, parité du formulaire statique et routes.
- Transport : succès simulé, erreurs HTTP/réseau, fichier statique et page Next.js à la place du collecteur. Aucun envoi à Netlify ni e-mail réel effectué. La réception réelle Netlify ne pourra être confirmée qu’après validation juridique et publication autorisée.
- Navigateur : 12 parcours, uniquement les questions pertinentes, case initialement décochée, erreur de consentement, envoi bloqué, réponses préservées au retour. Audit JSON joint.
- FR/EN à 1440, 768 et 390 px : aucun débordement ; révision D2 et notice sur mobile.
- Formulaire de partenariats, données des publications et composants institutionnels inchangés. Seul le bouton de projet GKGM change de destination ; sa bannière, ses autres sections et son bouton de partenariat sont conservés.
- Avertissements Node DEP0205 préexistant et MODULE_TYPELESS_PACKAGE_JSON lors du test autonome : non bloquants ; aucun changement global de package.json.

## Livraison et crédits

Une branche et une seule Pull Request (#7) pour validation ; les révisions sont regroupées sur cette même branche. Aucun merge ni déploiement volontaire de production. Pour cette préparation finale, le titre de la PR et le commit portent `[skip netlify]` pour éviter tout nouveau déploiement avant revue. Les aperçus existants restent historiques. Prévisualisations locales fournies ci-dessus.

Variables runtime : [documentation officielle Netlify](https://docs.netlify.com/build/functions/environment-variables/). NETLIFY et DEPLOY_URL ne sont pas supposés disponibles dans les fonctions.

## Révision confidentialité du 16 octobre 2026

[Notice FR/EN complète](gkgm-privacy-notice.md) et [procédure/inventaire](gkgm-privacy-operations.md). Vérifications relancées après cette révision : lint, build, tests GKGM (12 combinaisons FR/EN, transport simulé, API locale bloquée à 503) et partenariats réussis. Diff nul sur le composant des quatre étapes, les validateurs, le transport, les références Forms et netlify.toml. Aucun changement d’environnement, envoi réel, purge réelle, activation, fusion ou déploiement de production. Les captures historiques ne représentent pas la notice révisée.

## Préparation finale avant production

Décisions de direction intégrées : responsable légal GK GLOBAL GROUP SARL U, responsable opérationnel et seul accès interne Edem Yawo Awutey, délai maximal de 12 mois depuis réception initiale, contrôle hebdomadaire, notifications approuvées vers la boîte Zoho officielle. DPA et sous-traitants Netlify examinés selon la direction ; aucune garantie ou localisation n’en est déduite. Voir le [rapport final de sécurité, runtime et points bloquants](gkgm-production-readiness.md).

Durcissement limité de l’API : type MIME URL-encoded exact (paramètre charset accepté) et erreur 403 pour origine malformée au lieu d’une erreur de transport. Aucun changement des parcours, étapes, champs, consentement, partenaires, canonical ou hreflang. Nouveau contrôle runtime local sans réseau ni affichage des valeurs : drapeau absent, envoi désactivé, variables site absentes localement. Configuration Netlify/Zoho réelle non auditée et non modifiée.

## Résultats de la vérification finale

- `npm run lint` et `npm run build` : réussis.
- `node scripts/verify-gkgm-project.mjs http://127.0.0.1:3113` : 12 combinaisons parcours/langues, requis et champs actifs, consentement, honeypot, limite 20 Ko, doublons, origine absente/malformée/externe, type MIME exact/charset, redirections et erreurs simulées : réussis. L’API locale renvoie 503 pour une demande valide tant que le verrou est fermé.
- Huit scripts de non-régression : architecture, entities, heroes, home, institutional-pages, news, partnerships et seo : réussis (38 URL FR/EN pour le SEO, canonical/hreflang inclus).
- Contrôle runtime local : drapeau absent, envoi applicatif désactivé ; nom et ID de site non disponibles localement. Le script ne vérifie pas le compte distant.
- Aucun diff du composant des quatre étapes, des six parcours/champs, du validateur de données, des références Forms, du formulaire partenaires, de la page/métadonnées, du sitemap ou de netlify.toml par rapport à la révision précédente.
- Aucun POST public, aucun e-mail, aucun test de charge ni effacement réel. Avertissements Node DEP0205 et MODULE_TYPELESS_PACKAGE_JSON non bloquants.
