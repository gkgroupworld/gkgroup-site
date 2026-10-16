# GKGM — confidentialité : décisions et mise en œuvre

> Phase B : le transport applicatif est désormais remplacé dans le code par le service privé préparé, sans activation. Les sections antérieures décrivent les étapes précédentes ; voir le [rapport actuel](gkgm-phase-b-report.md) pour les variables, tests et procédures à appliquer. L’ancien collecteur natif reste intact en attente d’autorisation de migration.

Révision du 16 octobre 2026, PR #7. Les décisions ci-dessous viennent de la direction de GK GLOBAL GROUP SARL U. Le DPA Netlify et la liste des sous-traitants ont été examinés par la direction ; leur contenu exact et les paramètres du compte ne sont pas fournis au dépôt. Aucun contact e-mail avec Netlify n’est nécessaire pour cette préparation et aucun n’a été envoyé. Elles ne constituent pas une autorisation d’activer l’envoi, de fusionner ou de publier en production. `GKGM_PRIVACY_APPROVED` reste inchangé et non activé par cette révision.

## Règles approuvées

- Demandes de projet sans suite : 12 mois maximum depuis leur réception initiale, puis suppression. Aucun nouvel échange ne remet le compteur à zéro.
- Responsable légal : GK GLOBAL GROUP SARL U. Responsable opérationnel : Edem Yawo Awutey.
- Contrôle hebdomadaire des échéances et des suppressions par Edem Yawo Awutey.
- Notifications approuvées vers `gk.contactus@gkgroup.app`, hébergée chez Zoho Mail.
- Aucun démarchage commercial.
- Accès interne : Edem Yawo Awutey uniquement. Aucun remplaçant n’est habilité par cette décision. Toute délégation exige une nouvelle autorisation et une mise à jour des accès.
- Prestataires techniques nécessaires, notamment Netlify : intervention dans le cadre de leurs prestations.
- Aucune transmission automatique aux universités, employeurs, recruteurs ou autres partenaires.
- Finalités exclusives : étude préliminaire, préparation d’une réponse, prise de contact.
- Dossiers devenus clients : politique de conservation distincte, à définir séparément. L’ancienne hypothèse de cinq ans est retirée.

La case reste une reconnaissance de lecture, obligatoire et non précochée. Elle n’autorise ni démarchage commercial ni partage avec des partenaires ; ce n’est pas la détermination de la base juridique du traitement. Aucun abonnement, destinataire partenaire ou intégration marketing n’est ajouté.

## Points à confirmer avant activation

Edem Yawo Awutey conserve les éléments de validation pour les points restant ouverts :

1. L’adresse complète du responsable légal, la base juridique, la réglementation applicable, les modalités/délais des droits et l’autorité de recours compétente. Les responsables et le contact sont désormais approuvés ; aucune base juridique n’est déduite de la seule case de lecture.
2. La qualification de « sans suite » et de conversion en client, ainsi que l’outil de suivi. Le point de départ (réception initiale), le maximum de 12 mois et le contrôle hebdomadaire sont approuvés. Ne pas laisser une demande non qualifiée dépasser l’échéance.
3. La politique distincte des dossiers clients : déclencheur, données nécessaires, durée, droits d’accès et suppression des doublons de préinscription. Une conversion ne justifie pas de conserver toutes les copies.
4. La correspondance des accès réels Netlify, Zoho Mail (y compris super-administrateurs, délégations et eDiscovery) et copies internes avec le seul responsable autorisé ; MFA, sessions, appareils, règles de transfert et mesures de sécurité. Le rôle des administrateurs techniques ayant potentiellement accès au contenu doit être clarifié, sans les présenter comme déjà habilités par GKGM.
5. L’inventaire réel des traitements ci-dessous, les transferts, les garanties contractuelles applicables et les délais d’effacement des sauvegardes. La présente révision ne conclut pas à la conformité juridique de ces transferts.
6. Le suivi effectif par Edem Yawo Awutey, la continuité en cas d’absence sans délégation non autorisée et un test synthétique de suppression de bout en bout après autorisation. Aucun effacement réel n’est exécuté ici.

## Lieux de traitement : inventaire à vérifier

Le code établit le trajet navigateur → API Next.js hébergée par Netlify → Netlify Forms → éventuelle notification à `gk.contactus@gkgroup.app`. `netlify.toml` ne fixe aucune région. Le nom du site et son domaine ne prouvent pas une résidence des données. Aucun accès au tableau de bord Netlify, au contrat du compte ou à la messagerie Zoho n’a été réalisé pour cette révision ; les paramètres effectifs ne sont donc pas attestés.

| Traitement | Ce qui est connu / ce qui reste à établir | Preuve à obtenir |
| --- | --- | --- |
| Consultation par GKGM | L’entité est présentée à Lomé, Togo ; les lieux effectifs de connexion du personnel restent à inventorier. | Pays d’accès des personnes habilitées, appareils et copies autorisés. |
| API Next.js / Functions | Région effective inconnue. La documentation Netlify indique `cmh`, Ohio (États-Unis), par défaut pour les nouveaux sites ; ce n’est pas une preuve pour ce site existant. | Région du site et de la fonction générée par l’adaptateur, éventuelles surcharges, contexte de déploiement et journaux techniques. |
| Netlify Forms | Stockage des soumissions, antispam, accès support et sauvegardes à établir depuis le tableau de bord, les documents examinés et le Trust Center, sans demande par e-mail. La région Functions ne détermine pas celle de Forms. | DPA applicable au compte, pays du stockage et des accès, sous-traitants concernés et délais de purge. |
| Réseau, sécurité et journaux Netlify | Les infrastructures de réception et éventuels journaux peuvent constituer des traitements distincts. Le code applicatif ne journalise pas les réponses saisies. | Services réellement actifs, contenu des logs, pays, accès et rétention ; ne pas supposer que le choix d’une région Functions couvre ces services. |
| Notifications e-mail | Destinataire approuvé : adresse officielle chez Zoho Mail. Région du compte, routage, antispam, archives et sauvegardes à vérifier. | Fournisseur et pays, transferts, redirections, boîtes partagées, terminaux synchronisés et rétention. |
| Copies internes | Aucun export ni stockage persistant dans le navigateur n’est ajouté par le formulaire. Les exports manuels et dossiers internes restent à inventorier. | Registre des CSV, téléchargements, espaces partagés, postes, éventuel outil client et sauvegardes. |

Les accès depuis le Togo et les traitements éventuels aux États-Unis ou dans d’autres pays peuvent impliquer des transferts internationaux selon les flux réels et le droit applicable. Identifier chaque origine/destination, prestataire et garantie avant de compléter la notice. Ne pas annoncer un stockage exclusivement togolais ou européen. Le Trust Center référence le DPA et les sous-traitants ; la direction confirme leur examen ; la version applicable, les clauses et leur périmètre doivent être consignés pour le compte GKGM, sans assimiler tous les fournisseurs de Netlify à des destinataires de ce formulaire.

## Procédure opérationnelle — exécution par Edem Yawo Awutey après activation autorisée

1. **Enregistrer l’échéance.** À la réception, associer l’identifiant de soumission et la date de réception à une échéance au plus tard à 12 mois pour une demande sans suite, depuis la réception initiale. Edem Yawo Awutey est responsable du suivi. Une date de fin de mois est plafonnée au dernier jour du mois cible ; ne pas utiliser un calcul de 365 jours à la place de 12 mois calendaires. Ne pas recopier le texte du projet dans le registre de purge. Prévoir les demandes d’effacement anticipé via l’adresse officielle et une vérification d’identité proportionnée, sans exiger systématiquement un passeport.
2. **Planifier avant l’échéance.** Revue hebdomadaire approuvée : à chaque contrôle, traiter les demandes dont l’échéance surviendra avant le prochain contrôle, donc anticiper la suppression plutôt que dépasser 12 mois. Si un délai technique de purge existe, avancer encore l’action de ce délai et d’une marge documentée. Inscrire la prochaine revue dans l’outil opérationnel existant ; aucune automation Codex n’est créée. Sans outil, calendrier ou continuité fiables, ne pas activer la collecte.
3. **Supprimer dans Netlify.** Sur le bon site, ouvrir Forms → `gkgm-project-inquiry`, vérifier séparément les soumissions vérifiées et les indésirables, sélectionner uniquement les enregistrements concernés et confirmer « Delete submission ». Ne pas supprimer le formulaire, ni toucher à `international-partnerships`. Ne pas exporter un CSV par précaution. Si une automatisation est ensuite retenue, la limiter aux identifiants de ce formulaire, avec contrôle préalable et secrets hors du dépôt ; aucun script destructif n’est installé ici.
4. **Supprimer dans Zoho Mail.** Dans `gk.contactus@gkgroup.app`, rechercher les notifications par identifiant de soumission et les échanges par coordonnées ; inclure reçus, envoyés, archives, dossiers, spam et transferts. Vérifier les résultats avant de supprimer uniquement la demande concernée, puis supprimer ses éléments de la corbeille. Ne pas vider globalement une boîte ou la corbeille contenant d’autres dossiers. Effacer les copies IMAP/POP, téléchargements et exports associés. Consulter avec les droits nécessaires les règles de rétention, eDiscovery, legal holds et Backup de l’organisation : une suppression de boîte ne suffit pas à purger ces espaces. Si une rétention ou un hold empêche l’effacement, documenter le motif, le périmètre et l’échéance et faire valider le traitement de cette exception avant activation. Ne pas modifier globalement les règles Zoho ni supprimer le compte.
5. **Supprimer les copies internes.** Rechercher par identifiant et coordonnées dans les exports CSV, téléchargements, partages, postes et éventuel outil client. Retirer aussi les copies de travail et corbeilles. Pour un dossier devenu client, appliquer uniquement la politique distincte approuvée aux éléments nécessaires et supprimer les duplications inutiles ; ne pas inventer une durée client.
6. **Traiter sauvegardes et exceptions.** Consigner les engagements d’effacement/expiration disponibles dans les documents Netlify examinés et dans la configuration/documentation Zoho, sans contacter Netlify par e-mail. Documenter toute rétention légale applicable, son fondement et son périmètre, à faire valider ; ne pas créer une exception générale aux 12 mois. Limiter l’accès aux sauvegardes et prévoir la réapplication des suppressions après restauration. Ne pas promettre une purge complète tant que les cycles réels et leur compatibilité avec la règle approuvée ne sont pas confirmés.
7. **Vérifier et tracer.** Contrôler l’absence dans Forms (vérifiés et spam), e-mails et copies recensées. Consigner uniquement un identifiant de suivi minimal, les systèmes traités, la date, l’opérateur et le résultat ; pas de contenu de demande ni de copie d’e-mail. Définir aussi l’accès et la rétention de cette preuve minimale. Signaler tout échec au responsable, suivre jusqu’à résolution et confirmer au demandeur si nécessaire selon la procédure des droits validée.

## Technique et activation

Les six parcours, les quatre étapes, les champs, le honeypot et les partenariats sont préservés. La préparation finale durcit uniquement la reconnaissance du type MIME de l’API et le rejet des origines malformées ; elle ajoute un script de contrôle runtime en lecture seule. L’API et l’interface conservent leur verrou existant ; aucune variable d’environnement ou notification n’est activée. Le collecteur Netlify peut recevoir des POST directs contournant l’API : vérifier dans le tableau de bord son exposition et le traitement des données brutes avant toute collecte autorisée ; le verrou applicatif ne garantit pas à lui seul l’absence de réception native.

Avant activation, mettre en place le suivi effectif des échéances et la suppression sur tous les systèmes. Voir le [rapport final de sécurité et runtime](gkgm-production-readiness.md). Si les outils existants ne le permettent pas de manière fiable, une automatisation devra être conçue et autorisée séparément. Cette préparation ne doit déclencher aucun déploiement : le titre de la PR et le commit portent `[skip netlify]`. Conserver ce marqueur jusqu’à autorisation explicite ; aucun build hook, retry ou deploy CLI ne doit être lancé.

## Sources officielles consultées le 16 octobre 2026

- [Régions des fonctions Netlify](https://docs.netlify.com/build/functions/configuration/) : valeur par défaut, réglage du site et surcharge par fonction.
- [Gestion et suppression des soumissions](https://docs.netlify.com/manage/forms/submissions/) : suppression distincte des soumissions vérifiées et spam ; ne pas confondre suppression d’une soumission et du formulaire.
- [Notifications Forms](https://docs.netlify.com/manage/forms/notifications/) : configuration séparée des notifications.
- [Netlify Trust Center](https://www.netlify.com/trust-center/) : point d’accès au DPA et à la liste des sous-traitants, à vérifier pour le compte et les services utilisés.

### Particularité Zoho à traiter avant activation

La [politique Zoho de suppression](https://www.zoho.com/mail/help/data-deletion-policy.html), mise à jour le 18 septembre 2026, décrit un passage en corbeille configurable et une rétention serveur supplémentaire de 30 jours après le nettoyage automatique ; eDiscovery dépend de la politique d’archivage. Ne pas assimiler « absent de la boîte » à « purgé de tous les systèmes ». Vérifier le comportement effectif de la suppression manuelle définitive et les options du forfait avant de fixer le délai d’anticipation. Voir aussi [eDiscovery](https://www.zoho.com/mail/help/adminconsole/manage-ediscovery.html) et [Backup](https://www.zoho.com/mail/help/adminconsole/backup-and-recovery.html). Aucun délai plus court n’est promis.

Les versions contractuelles et pays effectifs ne sont pas attestés par ces pages générales. Aucun audit de configuration réelle ou test d’effacement fournisseur n’a été réalisé.
