# GKGM — Phase B : développement et tests de préparation

## État de livraison et limites

PR #7, branche `codex/gkgm-project-inquiry`. L’architecture de l’étude `3b5417e` est approuvée pour développement et tests locaux/simulés uniquement. **Aucun projet externe, compte, widget, jeton ou abonnement n’a été créé ; aucune donnée réelle, notification réelle, migration, fusion ou collecte distante n’a été utilisée.** Conserver `[skip netlify]` dans le titre de la PR et le commit. Aucun déploiement n’est autorisé par cette livraison.

Le nouveau service est dans `services/gkgm-collector/`, avec son propre package/lockfile et sa configuration Netlify. Le site Next.js conserve son package et sa configuration existants. L’ancienne route `/api/gkgm-project` du site renvoie 503 sans transmettre le corps ; elle n’a plus de fallback Netlify Forms. La définition statique `public/__gkgm-forms.html` est **intacte** en attente d’autorisation de migration. Le collecteur natif déjà enregistré peut donc encore exister : la sécurité globale de la collecte déployée n’est pas affirmée.

## Code et parcours d’écriture

- **Entrée dédiée :** `functions/gkgm-ingest.mjs`, avec `/api/gkgm-project` et l’alias Function déclarés. Les deux passent par le même handler. POST strict, pas de données dans la query string, origine autorisée exacte, taille maximale de 20 Ko, délai de lecture du corps de cinq secondes, refus des doublons et des champs inactifs/inconnus. L’origine et le honeypot ne sont que des compléments.
- **Validation systématique :** schéma partagé des six parcours, champs requis, e-mail/WhatsApp, consentement, absence de `form-name` natif et d’upload ; normalisation des contacts avant quotas. Données rejetées conservées uniquement en mémoire de la requête, sans dossier ni notification. Les compteurs techniques ne stockent pas le texte soumis.
- **Turnstile :** vérification serveur obligatoire du succès, hostname et action `gkgm_project`. Erreur, jeton absent/expiré/rejoué ou service indisponible : refus. Le secret n’est jamais rendu au navigateur. Le widget ne se charge qu’à la quatrième étape quand le frontend est explicitement configuré.
- **Accès privé :** `@netlify/blobs` utilise l’identité serveur du projet dédié. Aucun jeton personnel large, URL de dépôt signée ou endpoint public de lecture/écriture/suppression n’est ajouté. Clés de dossiers aléatoires, sans nom/e-mail en métadonnées. Le store est explicitement en cohérence forte et dans une région configurée, sans choix implicite de pays par l’application.
- **Ordre des opérations :** quota de tentatives → lecture bornée et validation → Turnstile → santé des tâches de maintenance → réservation atomique des quotas/idempotence → pointeur de notification sans contenu → écriture privée du dossier. Une notification ne peut traiter que le dossier enregistré, marqué validé.
- **Réponse publique :** statut et codes d’erreur, éventuellement noms de champs invalides ; aucune réponse saisie, clé de stockage ou identité renvoyée. Aucun journal applicatif ne contient le corps, le jeton antispam ou les réponses brutes Netlify/Zoho. Les en-têtes et URL produits par notre code ne contiennent pas de données client.

Un appel direct à l’API reste possible et doit être possible : il subit les mêmes contrôles. Les opérations privilégiées du fournisseur, le code déployé et les accès d’administration restent dans le périmètre de confiance. Une personne possédant un accès administratif au stockage n’est pas assimilée à un client public.

## Compatibilité atomique Netlify Blobs

Version verrouillée : **`@netlify/blobs` 11.1.4**, Node **≥ 22.12**. Le SDK installé contient les conditions `onlyIfNew` et `onlyIfMatch`, les transmet en `If-None-Match: *` / `If-Match`, et renvoie `modified: false` pour une précondition refusée. La [documentation officielle Blobs](https://docs.netlify.com/build/data-and-storage/netlify-blobs/) décrit ces opérations comme atomiques.

Le code lit les ETags en cohérence forte et utilise un seul registre CAS pour **tous** les quotas d’admission et la réservation d’idempotence. Révision monotone à chaque écriture ; aucun incrément non conditionnel « lire/écrire », aucun compteur de processus. Les conflits sont réessayés au plus 24 fois, puis la demande échoue sans dossier. Un plafond de cardinalité des compteurs empêche leur croissance illimitée ; sous attaque, il peut aussi refuser des clients légitimes.

**Durcissement SDK important :** les branches d’écriture conditionnelle du SDK 11.1.4 peuvent considérer d’autres statuts que 412 comme un succès. `checkedStore` contrôle donc le statut HTTP avant que le SDK ne le traite et exige un ETag de succès. Les erreurs 401/500 sont testées et ne deviennent pas une admission. Les erreurs finales sont génériques, sans corps de fournisseur dans les journaux.

La suite utilise **le vrai SDK**, plusieurs clients indépendants et un transport HTTP simulé appliquant la précondition de façon atomique. Elle vérifie collision de création, ETag périmé, concurrence et erreurs. Elle ne prouve pas les internals du service cloud : la compatibilité repose sur le contrat officiel et le SDK observé. Le serveur filesystem de développement du SDK n’est pas utilisé comme preuve d’atomicité concurrente. Un test distant synthétique reste requis après autorisation d’un projet de test ; rien n’a été provisionné pour le réaliser ici.

## Seuils et idempotence

| Contrôle | Implémentation préparée |
| --- | --- |
| Tentatives | 10 sur une fenêtre glissante de 60 secondes par IP de plateforme ; contrôle applicatif persistant, en plus de la règle native 10/minute. |
| Dossiers/IP | 3 sur une heure glissante. |
| Dossiers/contact | 3 sur 24 heures glissantes, pour l’e-mail normalisé **et** le numéro normalisé séparément. Changer un seul des deux ne remet pas le quota à zéro. |
| Service | 100 sur 24 heures glissantes, tous alias/clients/instances confondus dans le store dédié. |
| Données techniques | HMAC IP/contact et empreinte du contenu, jamais contacts en clair dans le registre. Élagage à 47 h, exécuté aux admissions et toutes les 15 minutes pour rester sous 48 h en fonctionnement normal. Une panne des tâches peut retarder cet élagage : surveillance obligatoire. |

Le quota IP utilise `context.ip`, pas `X-Forwarded-For` fourni par le navigateur. Un sous-réseau partagé peut atteindre les seuils ; ils restent ajustables avant production. La limitation native Netlify peut avoir un délai d’application et ne constitue pas un plafond global : le contrôle applicatif reste autoritaire. Aucun dispositif n’est présenté comme bloquant tous les robots ou éliminant le coût des requêtes rejetées.

Le navigateur conserve en mémoire un UUID de tentative tant que le contenu ne change pas. La réservation atomique lie son HMAC à une empreinte canonique du contenu et à une clé de dossier serveur. Réessais concurrents ou réponse perdue : un seul dossier et même date de réception initiale. Même identifiant avec un contenu différent : conflit. Les réessais consomment des tentatives/minute, mais pas une nouvelle admission tant que la réservation existe.

Une réservation sans dossier est récupérable pendant une heure ; au-delà, le serveur refuse sa recréation et le frontend prépare un nouvel identifiant au prochain essai. L’idempotence n’est pas éternelle : son registre est volontairement limité à 47 h. Une réservation peut consommer conservativement une place après panne de stockage ; elle n’est pas remboursée par une opération non atomique qui pourrait dépasser le plafond.

## Notification Zoho : contenu et pannes

Pointeur de file = clé opaque du dossier et date technique uniquement. Il est écrit après validation/réservation, avant le dossier, pour qu’une panne ne laisse pas un dossier accepté sans travail de notification. Si le dossier manque, le worker ne notifie pas ; le pointeur orphelin est éliminé après une heure.

Le worker planifié toutes les 15 minutes traite au plus cinq pointeurs par passage et prend un lease CAS, relit l’existence d’un dossier validé non effacé et envoie via OAuth Zoho Mail. Expéditeur et destinataire sont fixes : `gk.contactus@gkgroup.app`. **Message statique sans nom, e-mail client, WhatsApp, description, identifiant individuel, pièce jointe ou lien public.** L’information qu’une nouvelle demande existe reste une métadonnée à gérer dans Zoho.

La confirmation client suit l’écriture privée, pas le succès immédiat de l’e-mail. Notification en panne : dossier conservé, trois essais maximum, puis état `failed` visible dans le dossier privé et compteur d’échecs persistant dans `system/notification-health`. Il n’y a pas de nouvel enregistrement à chaque erreur d’e-mail. Un crash après envoi et avant confirmation peut produire un doublon de ce message statique ; la livraison exactement une fois n’est pas affirmée. La résolution des échecs persistants relève du responsable.

L’API OAuth place les secrets dans le corps de la requête HTTPS et l’access token dans l’en-tête d’autorisation, jamais dans une URL. Domaine Zoho choisi parmi une liste fermée selon la région réelle du compte. L’accès API et le droit d’envoyer depuis cette boîte doivent être vérifiés dans le forfait existant, sans souscription.

## Conservation et suppression

- `receivedAt` est fixé par le serveur à la réservation initiale ; aucun réessai ne le repousse. `expiresAt` = 12 mois calendaires, avec plafonnement au dernier jour du mois cible (29 février testé).
- Purge horaire préparée à **chaque heure, minute 15 UTC**, examinant les dossiers arrivant à échéance dans les 48 heures. L’effacement anticipé évite d’attendre le lendemain du maximum de 12 mois. Ajuster cette avance si les délais techniques réels des prestataires l’exigent ; aucun engagement d’effacement de sauvegarde n’est inventé.
- Remplacement atomique du dossier par une preuve minimale : schéma, date d’effacement, échéance de preuve, raison et révision, d’abord sous la clé opaque existante. Suppression de tout payload, empreinte et état de notification, puis relecture forte vérifiant l’absence de ces champs. La preuve est copiée dans `proofs/<date>/`, vérifiée, puis la clé de dossier et le pointeur de file sont supprimés et leur absence vérifiée. Une interruption entre ces étapes reprend sans réintroduire les données.
- Preuve minimale préparée pour **30 jours**, puis suppression de la clé et vérification de son absence. Cette durée technique reste à valider avant activation. Il s’agit d’une suppression logique vérifiable par l’application, pas d’une attestation de purge physique des anciennes versions ou sauvegardes du fournisseur.
- Un worker d’e-mail concurrent ne peut pas restaurer un payload supprimé : ses mises à jour CAS refusent de recréer un dossier ou de modifier une preuve. La purge peut tourner quand les nouvelles admissions sont fermées : ne pas désactiver la maintenance pour simplement suspendre la collecte.
- Le code purge tous les dossiers du collecteur au maximum prévu. Il n’établit pas de rétention client distincte ni de conversion automatique : un éventuel transfert de dossier client nécessite sa politique approuvée et ne suspend pas silencieusement cette purge.

Chaque purge traite au plus 20 clés, avec un budget souple de huit secondes avant d’entamer un nouvel élément ; une exécution reprend les éléments restants à l’heure suivante. Les notifications suivent le même budget souple. La limite documentée des tâches planifiées est de 30 secondes ; une opération fournisseur peut dépasser le budget souple et doit être testée à distance. Les progrès sont enregistrés par élément ; une interruption ne réintroduit pas de données.

La tâche enregistre `system/purge-health` avec horodatage et compteurs, sans contenu client. L’ingestion refuse de nouveaux dossiers si la dernière purge réussie dépasse trois heures ou si un backlog de purge subsiste, ou si la tâche de notification/élagage n’a pas réussi depuis 45 minutes. Initialiser ces deux tâches avant d’ouvrir la collecte. Cela ne supprime pas les dossiers existants en cas d’arrêt prolongé de la plateforme : contrôle hebdomadaire d’Edem Yawo Awutey et surveillance indépendante à mettre en place. Ne pas annoncer une garantie absolue de rétention si le suivi des échecs, les crédits et les sauvegardes ne sont pas maîtrisés.

## Variables et séparation des projets — aucune n’a été configurée

| Projet | Variable | Usage futur, après approbation distincte |
| --- | --- | --- |
| Site Next.js | `GKGM_FRONTEND_ENABLED` + `GKGM_PRIVACY_APPROVED` | Doivent valoir exactement `true` pour exposer le parcours d’envoi configuré. Absents ici. |
| Site Next.js | `GKGM_API_URL` | URL HTTPS exacte de l’API dédiée, chemin `/api/gkgm-project`, sans query, identifiants ou port. Configuration publique, pas un secret. |
| Site Next.js | `GKGM_TURNSTILE_SITE_KEY` | Clé publique du widget ; jamais le secret. Transmise au navigateur uniquement si le frontend est activé. |
| Collecteur | `GKGM_SERVICE_SITE_ID` | ID attendu du projet séparé ; correspondance obligatoire avec `context.site.id`. Aucun ID réel n’est ajouté au dépôt. |
| Collecteur | `GKGM_BLOBS_REGION` | Région explicite supportée par le SDK, à choisir après revue des lieux/transferts. Pas de défaut silencieux. |
| Collecteur | `GKGM_ALLOWED_ORIGIN` | Origine HTTPS du site institutionnel. Le hostname Turnstile est dérivé de cette valeur ; action fixe `gkgm_project`. |
| Collecteur | `GKGM_QUOTA_SECRET` | Secret HMAC serveur d’au moins 32 caractères, stable pour la fenêtre de quotas ; procédure de rotation à préparer sans réinitialisation silencieuse des limites. |
| Collecteur | `GKGM_TURNSTILE_SECRET` | Secret serveur de vérification. Jamais dans les props, bundles ou aperçus. |
| Collecteur | `GKGM_ZOHO_DOMAIN`, `GKGM_ZOHO_ACCOUNT_ID`, `GKGM_ZOHO_CLIENT_ID` | Configuration du compte et de son datacenter. Même ces valeurs ne sont pas affichées par le diagnostic. |
| Collecteur | `GKGM_ZOHO_CLIENT_SECRET`, `GKGM_ZOHO_REFRESH_TOKEN` | Secrets OAuth privés, scope minimal `ZohoMail.messages.CREATE`, région et droit d’envoi à vérifier dans le compte. |
| Collecteur | `GKGM_COLLECTION_ENABLED`, `GKGM_PRIVACY_APPROVED`, `GKGM_MIGRATION_APPROVED` | Trois accords distincts exigés à `true` ; ne pas définir le dernier avant migration autorisée et vérifiée. |
| Collecteur | `GKGM_MAINTENANCE_ENABLED`, `GKGM_NOTIFICATION_ENABLED` | Nécessaires avant admission, avec paramètres Zoho valides et tâches initialisées. Maintenance reste indépendante pour continuer la purge après fermeture des admissions. |

Le collecteur exige en plus `context.deploy.context === "production"`, `context.deploy.published === true` et le bon site. Aperçus, branch deploys et anciens déploiements non publiés restent fermés même si des flags étaient hérités. Le stockage d’un site est partagé entre ses déploiements : ces verrous ne remplacent pas la création de projets distincts et le contrôle du code autorisé à y être déployé.

Les variables Functions/runtime se configurent ultérieurement **dans Netlify**, pas dans GitHub, le fichier TOML, un `.env` commité ou une variable `NEXT_PUBLIC_*`. L’identité Blobs est fournie par la plateforme du collecteur ; aucun PAT de compte n’est prévu. `SITE_NAME` et `SITE_ID` de l’ancien transport ne suffisent plus à activer le nouveau système.

## Migration préparée, non exécutée

1. Obtenir l’autorisation distincte de créer les projets de test/collecte, configurer Turnstile Free et OAuth Zoho ; confirmer que le forfait existant suffit et les accès sont limités à Edem Yawo Awutey.
2. Valider les mentions juridiques encore ouvertes, les flux et pays réels Netlify/Cloudflare/Zoho, les durées techniques (48 h / preuve 30 jours) et les sauvegardes. La notice FR/EN proposée les présente explicitement ; l’examen préalable du DPA Netlify n’est pas une validation automatique de ces nouveaux flux.
3. Réaliser les tests distants autorisés avec données synthétiques dans un projet séparé, puis faire relire les résultats. Ne pas exposer de credentials de production aux aperçus du site.
4. Inventorier l’ancien formulaire natif GKGM, ses soumissions/notifications et les domaines, alias, aperçus ou anciens builds pouvant le réintroduire. Traiter ses données existantes selon la procédure de conservation approuvée. **Ne rien supprimer sans autorisation.**
5. Après autorisation de migration seulement : retirer `public/__gkgm-forms.html`, désenregistrer **uniquement** `gkgm-project-inquiry` dans Netlify, désactiver sa notification contenant éventuellement des données et traiter les anciens déploiements. Le fichier est conservé et sa parité est encore testée dans cette phase B. Ne pas désactiver Forms globalement et ne pas toucher à `international-partnerships`.
6. Tester les POST vers anciens HTML/racine/alias, les routes applicatives anciennes, les alias de la nouvelle Function, et les accès Blobs non authentifiés ; inspecter le stockage et les notifications, pas seulement les codes HTTP. Ces preuves ne sont pas réalisables sans projet déployé autorisé.
7. Après autorisation d’activation : configurer les variables privées du collecteur, initialiser/contrôler ses tâches de maintenance, vérifier l’absence d’accès public au stockage puis activer les flags de collecte et enfin le frontend. Un seul scénario synthétique bout en bout et sa purge, sous autorisation ; aucune donnée personnelle réelle pour les tests.
8. Conserver les protections de déploiement jusqu’à revue finale. Le retrait des marqueurs, le déploiement, la migration et la fusion sont des actions distinctes non autorisées ici.

Le formulaire de partenariats est préservé mais reste public et peut recevoir du texte libre sur un projet ; ses entrées ne sont pas des dossiers GKGM validés. Aucun import automatique ni notification GKGM depuis ce formulaire n’est ajouté.

## Exécution locale reproductible

Depuis la racine, avec Node ≥ 22.12 :

```text
npm ci --prefix services/gkgm-collector --ignore-scripts
npm test --prefix services/gkgm-collector
npm run check --prefix services/gkgm-collector
npm run lint
npm run build
npm run test:browser --prefix services/gkgm-collector
node scripts/verify-gkgm-runtime.mjs
```

Les tests navigateur utilisent Edge installé, un processus Next local isolé sur 3115, des paramètres publics synthétiques et l’interception de tous les appels externes. Les flags frontend à `true` n’existent que dans ce processus enfant ; aucun service distant n’est activé. La suite serveur interdit tout réseau externe et utilise un backend simulé via le vrai SDK. Les valeurs nommées `synthetic-*` sont des fixtures sans droit d’accès réel, pas des secrets de service.

Le build du collecteur vérifie les trois fonctions sans déploiement ni artefact écrit. Le projet séparé devra utiliser `services/gkgm-collector` comme répertoire de base et sa propre configuration ; le bundling local vérifie les imports du schéma partagé hors de ce répertoire. Le comportement effectif du packaging Netlify reste à valider en environnement de test autorisé.

## Résultats des tests et limites de preuve

Résultats du dernier passage : **19 tests serveur réussis** (incluant 12 combinaisons parcours/langues), **12 parcours navigateur réussis**, **lint et build Next.js réussis**, **bundling des trois fonctions réussi**, **huit contrôles de non-régression du site réussis** (SEO : 38 URL FR/EN). Le diagnostic local confirme le frontend désactivé et ses paramètres absents. Avertissements Node DEP0205 et MODULE_TYPELESS_PACKAGE_JSON non bloquants. L’audit des 12 parcours navigateur est dans [gkgm-phase-b-browser-audit.json](gkgm-phase-b-browser-audit.json).

- SDK/CAS : création concurrente, ancien ETag, refus 401/500, plusieurs clients indépendants ; limites et erreurs de stockage fermées.
- Validation : six parcours × FR/EN, consentement/requis, champs inconnus/inactifs, honeypot, type MIME, taille, doublons, méthode/origine/query, alias direct et absence d’IP de plateforme.
- Quotas : concurrence 10/minute, 3/heure/IP, 3/jour/contact normalisé, plafond 100 sur 24 h et libération des fenêtres. Un NAT partagé peut être limité ; le registre unique privilégie le refus en cas de forte contention.
- Idempotence : concurrence, contenu différent, échec avant écriture et acquittement perdu après écriture, récupération sans doublon ni report de réception initiale.
- Fournisseurs simulés : Turnstile hostname/action/rejeu/panne ; Zoho contenu et destinataire fixes, OAuth hors URL, aucun message depuis un dossier absent.
- Tâches : lease concurrent, trois essais bornés, purge calendaire/29 février, absence de payload après purge, aucune résurrection par worker, preuve minimale et expiration, panne de purge sans faux succès, refus d’admission si maintenance absente/périmée.
- Navigateur : 12 parcours, quatre étapes, champs pertinents, case initialement décochée, validation du consentement, retours et échec/réessai sans perte, identifiant stable après erreurs ordinaires (renouvelé après expiration de tentative) et jeton renouvelé, succès après stockage simulé ; 390/768/1440 px sans débordement.

Non vérifiés à distance : atomicité du compte réel, région/permissions Blobs, enforcement de la règle native et refus HTTP des tâches planifiées, anciens collecteurs, contrat OAuth du compte Zoho, envoi et réception réels, suppression physique/sauvegardes, monitoring et consommation réelle. Ces points bloquent l’activation, pas le développement local approuvé.

## Coûts estimés et exploitation

Objectif : **aucun abonnement supplémentaire**, sous réserve des crédits Netlify, des options du compte, de Turnstile Free et de l’API Zoho existante. Aucun achat ni changement de forfait. Le SDK et les dépendances sont verrouillés ; leur installation n’a créé aucun service.

Ordre de grandeur, pas un devis : sur 30 jours, 96 passages de notification/élagage par jour + 24 purges horaires = **3 600 exécutions planifiées**. Avec 1 000 admissions/mois et l’hypothèse arbitraire d’une seconde à 1 Go par invocation, environ **12,8 crédits de calcul**, plus environ **0,2 crédit pour 1 000 requêtes web**. Cela exclut les tentatives rejetées, retries SDK, attente réseau OAuth/Turnstile, scans Blobs, stockage/bande passante selon facturation effective, monitoring et déploiements futurs. À volume maximal (100/jour), recalculer le coût des objets et des purges ; les preuves restent 30 jours, pas indéfiniment.

Les compteurs CAS sur une clé sont adaptés au faible volume proposé, pas à un trafic massif : chaque conflit ajoute des lectures/écritures. Le SDK peut réessayer les échecs de transport jusqu’à cinq reprises ; un timeout peut donc dépasser celui du navigateur, d’où l’idempotence et la surveillance des crédits. Le coupe-circuit 100/jour ne plafonne pas le coût de tous les appels entrants. Aucune promesse de gratuité totale ou de facture inchangée.

Les barèmes Netlify consultés indiquent 10 crédits/Go-heure Functions, 2 crédits/10 000 requêtes et 15 crédits par déploiement de production. Le compte réel, les limites, la recharge et les éventuels frais Blobs à terme doivent être vérifiés avant activation. Si une option exige un abonnement ou une recharge, interrompre cette opération et demander l’autorisation.

## Sources officielles

- [Blobs : opérations conditionnelles, cohérence, régions et accès](https://docs.netlify.com/build/data-and-storage/netlify-blobs/).
- [Functions : contexte IP/site/deploy, routes et schedule](https://docs.netlify.com/build/functions/api/) ; [Scheduled Functions](https://docs.netlify.com/build/functions/scheduled-functions/).
- [Limitation native de débit](https://docs.netlify.com/manage/security/secure-access-to-sites/rate-limiting/) et [variables runtime](https://docs.netlify.com/build/functions/environment-variables/).
- [Turnstile côté serveur](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/) et [offres](https://developers.cloudflare.com/turnstile/plans/).
- [Zoho Mail : envoi](https://www.zoho.com/mail/help/api/post-send-an-email.html), [OAuth](https://www.zoho.com/mail/help/api/using-oauth-2.html), [suppression](https://www.zoho.com/mail/help/data-deletion-policy.html).
- [Tarification Netlify à crédits](https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/credit-based-pricing-plans/) et [exclusion des déploiements](https://docs.netlify.com/deploy/manage-deploys/manage-deploys-overview/).
