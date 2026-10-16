# GKGM — confidentialité : décisions et mise en œuvre

Révision du 16 octobre 2026, PR #7. Les six décisions ci-dessous viennent de la direction de GKGM. Elles ne constituent pas une autorisation d’activer l’envoi, de fusionner ou de publier en production. `GKGM_PRIVACY_APPROVED` reste inchangé et non activé par cette révision.

## Règles approuvées

- Demandes de projet sans suite : 12 mois maximum, puis suppression.
- Accès interne : uniquement le personnel GKGM expressément habilité.
- Prestataires techniques nécessaires, notamment Netlify : intervention dans le cadre de leurs prestations.
- Aucune transmission automatique aux universités, employeurs, recruteurs ou autres partenaires.
- Finalités exclusives : étude préliminaire, préparation d’une réponse, prise de contact.
- Dossiers devenus clients : politique de conservation distincte, à définir séparément. L’ancienne hypothèse de cinq ans est retirée.

La case reste une reconnaissance de lecture, obligatoire et non précochée. Elle n’autorise ni démarchage commercial ni partage avec des partenaires ; ce n’est pas la détermination de la base juridique du traitement. Aucun abonnement, destinataire partenaire ou intégration marketing n’est ajouté.

## Points à confirmer avant activation

GKGM doit désigner un responsable et conserver les éléments de validation pour :

1. Les mentions complètes du responsable du traitement, son adresse et son contact, la base juridique, la réglementation applicable, les modalités/délais des droits et l’autorité de recours compétente.
2. Le point de départ des 12 mois et la définition de « sans suite ». Proposition opérationnelle à valider : date de réception comme point de départ, sans remise à zéro au dernier échange ; qualification explicite de la conversion en client. Ne pas laisser une demande non qualifiée dépasser l’échéance.
3. La politique distincte des dossiers clients : déclencheur, données nécessaires, durée, droits d’accès et suppression des doublons de préinscription. Une conversion ne justifie pas de conserver toutes les copies.
4. La liste nominative des personnes habilitées, les accès Netlify et messagerie, leur retrait au départ d’un collaborateur, les mesures de sécurité et les obligations contractuelles des prestataires.
5. L’inventaire réel des traitements ci-dessous, les transferts, les garanties contractuelles applicables et les délais d’effacement des sauvegardes. La présente révision ne conclut pas à la conformité juridique de ces transferts.
6. Le propriétaire de la purge, son remplaçant, le suivi des échéances et un test de suppression synthétique de bout en bout. Aucun effacement réel n’est exécuté ici.

## Lieux de traitement : inventaire à vérifier

Le code établit le trajet navigateur → API Next.js hébergée par Netlify → Netlify Forms → éventuelle notification à `gk.contactus@gkgroup.app`. `netlify.toml` ne fixe aucune région. Le nom du site et son domaine ne prouvent pas une résidence des données. Aucun accès au tableau de bord, au contrat du compte ou à la messagerie n’a été réalisé pour cette révision.

| Traitement | Ce qui est connu / ce qui reste à établir | Preuve à obtenir |
| --- | --- | --- |
| Consultation par GKGM | L’entité est présentée à Lomé, Togo ; les lieux effectifs de connexion du personnel restent à inventorier. | Pays d’accès des personnes habilitées, appareils et copies autorisés. |
| API Next.js / Functions | Région effective inconnue. La documentation Netlify indique `cmh`, Ohio (États-Unis), par défaut pour les nouveaux sites ; ce n’est pas une preuve pour ce site existant. | Région du site et de la fonction générée par l’adaptateur, éventuelles surcharges, contexte de déploiement et journaux techniques. |
| Netlify Forms | Stockage des soumissions, antispam, accès support et sauvegardes à confirmer auprès de Netlify. La région Functions ne détermine pas celle de Forms. | DPA applicable au compte, pays du stockage et des accès, sous-traitants concernés et délais de purge. |
| Réseau, sécurité et journaux Netlify | Les infrastructures de réception et éventuels journaux peuvent constituer des traitements distincts. Le code applicatif ne journalise pas les réponses saisies. | Services réellement actifs, contenu des logs, pays, accès et rétention ; ne pas supposer que le choix d’une région Functions couvre ces services. |
| Notifications e-mail | Destinataire prévu : adresse officielle. Hébergeur de boîte, routage, antispam, archives et sauvegardes inconnus. | Fournisseur et pays, transferts, redirections, boîtes partagées, terminaux synchronisés et rétention. |
| Copies internes | Aucun export ni stockage persistant dans le navigateur n’est ajouté par le formulaire. Les exports manuels et dossiers internes restent à inventorier. | Registre des CSV, téléchargements, espaces partagés, postes, éventuel outil client et sauvegardes. |

Les accès depuis le Togo et les traitements éventuels aux États-Unis ou dans d’autres pays peuvent impliquer des transferts internationaux selon les flux réels et le droit applicable. Identifier chaque origine/destination, prestataire et garantie avant de compléter la notice. Ne pas annoncer un stockage exclusivement togolais ou européen. Le Trust Center référence le DPA et les sous-traitants ; leur version applicable et leur périmètre doivent être obtenus et validés pour le compte GKGM, sans assimiler tous les fournisseurs de Netlify à des destinataires de ce formulaire.

## Procédure de suppression proposée — à rendre opérationnelle avant activation

1. **Enregistrer l’échéance.** À la réception, associer l’identifiant de soumission et la date de réception à une échéance au plus tard à 12 mois pour une demande sans suite, selon le point de départ validé. Désigner le responsable de suivi. Ne pas recopier le texte du projet dans le registre de purge. Prévoir les demandes d’effacement anticipé via l’adresse officielle et une vérification d’identité proportionnée, sans exiger systématiquement un passeport.
2. **Planifier avant l’échéance.** Revue hebdomadaire proposée avec alertes anticipées et échéance ferme ; une revue mensuelle seule ne garantit pas le maximum de 12 mois. Confirmer que l’outil de suivi, le calendrier et le remplaçant empêchent tout dépassement. Rien n’est automatisé par ce commit.
3. **Supprimer dans Netlify.** Sur le bon site, ouvrir Forms → `gkgm-project-inquiry`, vérifier séparément les soumissions vérifiées et les indésirables, sélectionner uniquement les enregistrements concernés et confirmer « Delete submission ». Ne pas supprimer le formulaire, ni toucher à `international-partnerships`. Ne pas exporter un CSV par précaution. Si une automatisation est ensuite retenue, la limiter aux identifiants de ce formulaire, avec contrôle préalable et secrets hors du dépôt ; aucun script destructif n’est installé ici.
4. **Supprimer les e-mails.** Rechercher les notifications, fils de réponse et transferts correspondant à la demande dans la boîte officielle et toutes les boîtes autorisées. Supprimer copies reçues/envoyées, archives et corbeilles, ainsi que copies synchronisées et téléchargements. Vérifier séparément les règles de conservation du fournisseur ; la suppression Netlify ne supprime pas ces messages.
5. **Supprimer les copies internes.** Rechercher par identifiant et coordonnées dans les exports CSV, téléchargements, partages, postes et éventuel outil client. Retirer aussi les copies de travail et corbeilles. Pour un dossier devenu client, appliquer uniquement la politique distincte approuvée aux éléments nécessaires et supprimer les duplications inutiles ; ne pas inventer une durée client.
6. **Traiter sauvegardes et exceptions.** Obtenir les engagements d’effacement/expiration de chaque fournisseur, y compris Netlify et messagerie. Documenter toute rétention légale applicable, son fondement et son périmètre, à faire valider ; ne pas créer une exception générale aux 12 mois. Limiter l’accès aux sauvegardes et prévoir la réapplication des suppressions après restauration. Ne pas promettre une purge complète tant que les cycles réels et leur compatibilité avec la règle approuvée ne sont pas confirmés.
7. **Vérifier et tracer.** Contrôler l’absence dans Forms (vérifiés et spam), e-mails et copies recensées. Consigner uniquement un identifiant de suivi minimal, les systèmes traités, la date, l’opérateur et le résultat ; pas de contenu de demande ni de copie d’e-mail. Définir aussi l’accès et la rétention de cette preuve minimale. Signaler tout échec au responsable, suivre jusqu’à résolution et confirmer au demandeur si nécessaire selon la procédure des droits validée.

## Technique et activation

Aucune modification du transport, des six parcours, des quatre étapes, des validations, du honeypot ou des partenariats n’est nécessaire pour cette révision éditoriale. L’API et l’interface conservent leur verrou existant ; aucune variable d’environnement ou notification n’est activée. Le collecteur Netlify peut recevoir des POST directs contournant l’API : vérifier dans le tableau de bord son exposition et le traitement des données brutes avant toute collecte autorisée ; le verrou applicatif ne garantit pas à lui seul l’absence de réception native.

Avant activation, mettre en place le suivi effectif des échéances et la suppression sur tous les systèmes. Si les outils existants ne le permettent pas de manière fiable, une automatisation devra être conçue et autorisée séparément. La mise à jour de PR peut déclencher un Deploy Preview automatique ; aucun déploiement manuel ou de production n’est demandé.

## Sources officielles consultées le 16 octobre 2026

- [Régions des fonctions Netlify](https://docs.netlify.com/build/functions/configuration/) : valeur par défaut, réglage du site et surcharge par fonction.
- [Gestion et suppression des soumissions](https://docs.netlify.com/manage/forms/submissions/) : suppression distincte des soumissions vérifiées et spam ; ne pas confondre suppression d’une soumission et du formulaire.
- [Notifications Forms](https://docs.netlify.com/manage/forms/notifications/) : configuration séparée des notifications.
- [Netlify Trust Center](https://www.netlify.com/trust-center/) : point d’accès au DPA et à la liste des sous-traitants, à vérifier pour le compte et les services utilisés.

Les versions contractuelles et pays effectifs ne sont pas attestés par ces pages générales. Aucun audit de configuration réelle ou test d’effacement fournisseur n’a été réalisé.
