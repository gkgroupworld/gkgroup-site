# GKGM — revue finale avant activation (PR #7)

Préparation du 16 octobre 2026. Responsable légal : **GK GLOBAL GROUP SARL U**. Responsable opérationnel et seul accès interne approuvé : **Edem Yawo Awutey**. Le DPA Netlify et sa liste de sous-traitants ont été examinés par la direction, selon son instruction. Aucun contact Netlify par e-mail, modification de variable distante, envoi réel, suppression de données, fusion ou déploiement n’est exécuté dans cette mission.

## Notice et droits

La [notice FR/EN](gkgm-privacy-notice.md) reprend les finalités limitées, 12 mois depuis la réception initiale sans remise à zéro, le responsable unique, les contrôles hebdomadaires, Netlify et Zoho Mail, l’absence de démarchage et de transmission automatique aux partenaires. La case reste non précochée et ne vaut aucune autorisation de démarchage ou de partage. Les dossiers clients nécessitent une politique distincte.

Mentions juridiques à faire confirmer : adresse complète du responsable légal, réglementation et base juridique applicables, modalités/délais des droits, autorité de recours et garanties applicables aux flux internationaux réels. Aucune clause contractuelle, certification, décision d’adéquation ou base juridique n’est supposée. L’examen du DPA n’est pas une attestation de résidence des données ou de conformité de chaque transfert. Les pays de traitement et d’accès effectifs de Forms, Functions, Zoho, support, journaux et sauvegardes restent à consigner depuis les documents et paramètres disponibles, sans sollicitation e-mail de Netlify.

## Sécurité : périmètre vérifié

L’API exige le type URL-encoded, limite le corps à 20 Ko, refuse doublons, champs inconnus/inactifs, catégories/options invalides et honeypot renseigné, valide les requis, l’e-mail, le WhatsApp international et la reconnaissance de lecture. Les réponses et exceptions n’exposent pas les données soumises. Le transfert vise l’hôte Netlify configuré, pas une URL fournie par le demandeur, avec délai maximal et refus des redirections, erreurs et fichier statique retourné à la place du collecteur. Les réponses restent en mémoire du navigateur en cas d’échec. Aucun fichier, passeport ou outil marketing n’est ajouté. Le contenu relu est rendu comme texte par React.

Le contrôle d’origine protège le parcours navigateur habituel, sans authentifier un client HTTP capable de fabriquer ses en-têtes. L’API n’implémente pas de limitation distribuée de débit ni de CAPTCHA. Aucun test de charge, spam ou POST vers le site public n’a été effectué : ces actions peuvent consommer des crédits ou créer des données.

### Collecteur natif : risque non résolu par le verrou applicatif

Le nom `gkgm-project-inquiry` et sa définition HTML statique sont publics par conception. Un client peut soumettre directement au collecteur Netlify sans appeler `/api/gkgm-project`. Le honeypot peut être laissé vide. Ni `GKGM_PRIVACY_APPROVED`, ni le contrôle d’origine, ni les validations de l’API ne garantissent donc que toute donnée stockée par Netlify a passé ces contrôles. Une définition masquée ou `noindex` n’est pas un contrôle d’accès.

Avant activation, Edem Yawo Awutey doit vérifier l’exposition du formulaire natif dans le compte, les filtres antispam, les notifications effectivement déclenchées et les protections de débit disponibles pour le forfait, puis accepter explicitement le risque résiduel ou retenir une architecture empêchant l’écriture directe. Une simple règle sur le chemin HTML ne prouve pas que tous les POST reconnus par Netlify sont bloqués ; elle pourrait aussi bloquer le transfert serveur. Aucun filtrage global n’est appliqué, pour préserver `international-partnerships`.

Si l’exigence est « seules les soumissions validées par l’API peuvent être stockées/notifiées », l’architecture publique Netlify Forms actuelle ne permet pas d’en attester. Il faudra une protection d’ingestion vérifiée ou un stockage derrière une API authentifiée côté serveur, dans un changement distinct approuvé. Un tri ou une suppression après réception ne remplace pas ce contrôle. Tant qu’une définition native existe déjà dans un déploiement antérieur, le verrou de l’interface ne constitue pas une garantie d’absence totale de réception.

## Runtime : contrat vérifié dans le code, compte distant non audité

| Paramètre | Rôle / contrôle requis | État dans cette mission |
| --- | --- | --- |
| `GKGM_PRIVACY_APPROVED` | Seule la chaîne exacte `true` ouvre le verrou si les deux variables site sont présentes/valides. Après autorisation seulement : portée Functions/runtime, contexte Production exclusivement ; jamais toutes les branches ni Deploy Previews. | Non activé. Vérification locale via le script ; valeurs distantes non attestées. |
| `SITE_NAME` | Variable Netlify réservée, fournie en lecture seule au runtime ; nom DNS validé et utilisé pour construire l’origine HTTPS `*.netlify.app`. | Ne pas créer ni écraser manuellement. Vérifier la présence et la correspondance au bon site au runtime. |
| `SITE_ID` | Variable Netlify réservée, présence requise par le verrou. Le code n’effectue pas de requête pour prouver la correspondance nom/ID. | Ne pas créer ni écraser manuellement. Comparer au site attendu dans le compte lors de la revue runtime. |
| `NETLIFY`, `DEPLOY_URL`, `CONTEXT` | Ne sont pas utilisés pour autoriser l’envoi ; ne pas supposer qu’une variable de build existe au runtime. | Aucun nouveau contrôle ne dépend de ces valeurs. |
| Secrets GitHub / `NEXT_PUBLIC_*` | Aucun jeton n’est requis pour le transport Forms actuel ; aucune valeur privée ne doit être exposée au client. | Aucun secret GitHub créé ou modifié ; aucun jeton ajouté au code ou au HTML. |

La portée du drapeau s’applique à l’API et à la page Next.js qui lit la même configuration au rendu serveur. Une activation définie pour tous les contextes pourrait aussi ouvrir les aperçus : ce risque se traite par le contexte Netlify effectif, pas par une supposition sur l’URL.

Commandes de contrôle sans réseau et sans écriture de variable :

```text
node scripts/verify-gkgm-runtime.mjs
node scripts/verify-gkgm-runtime.mjs --expect-enabled
```

La première doit réussir pendant la préparation ; elle échoue aussi si le drapeau vaut `true` mais qu’une variable site manque. La seconde ne sert qu’à examiner un environnement déjà autorisé et échoue s’il n’est pas configuré ; elle n’active rien. Le rapport ne révèle aucune valeur de nom/ID ni aucun secret. Un succès local ne prouve pas la configuration distante. Ne pas créer de route publique de diagnostic ou exporter tout `process.env` pour cette vérification.

La documentation Netlify précise que les variables de Functions doivent être configurées via le compte et que les nouvelles valeurs prennent effet dans un nouveau déploiement. Leur définition dans `netlify.toml` ne suffit pas. Aucun changement distant ni déploiement de validation n’est autorisé avant revue finale.

## Opérations à terminer avant activation

1. Vérifier les accès réels Netlify/Zoho, y compris administrateurs et eDiscovery, pour respecter l’accès interne unique ; vérifier MFA, redirections et appareils.
2. Mettre en service le registre minimal des échéances et le contrôle hebdomadaire par Edem Yawo Awutey. Supprimer avant le prochain contrôle si l’échéance survient entre deux revues. Voir la [procédure complète Netlify / Zoho Mail / copies internes](gkgm-privacy-operations.md).
3. Vérifier les durées techniques de purge. Zoho documente des délais après suppression et des rétentions eDiscovery dépendant de la configuration ; vider la corbeille ne prouve pas à lui seul une purge de toutes les copies. Calculer une anticipation suffisante ou faire valider la compatibilité avec le maximum approuvé de 12 mois. La suppression globale d’une boîte, d’un formulaire ou d’autres dossiers n’est pas une procédure adaptée.
4. Vérifier Forms → Submission notifications pour **ce formulaire uniquement**, vers `gk.contactus@gkgroup.app`, sans copie ou webhook partenaire. L’adresse est approuvée mais le paramétrage effectif n’est pas attesté. Après autorisation, contrôler une seule soumission synthétique, sa réception, sa notification et sa suppression ; ne pas toucher à la notification des partenariats.
5. Faire confirmer les mentions juridiques et l’inventaire des flux ci-dessus, puis traiter le risque d’ingestion directe. L’activation n’est pas autorisée tant que la revue finale ne l’a pas expressément décidée.

## Mise à jour de la PR sans déploiement

Le titre de la PR #7 porte `[skip netlify]` avant publication du commit. Le commit de cette préparation porte également `[skip netlify]`. Netlify documente le marqueur dans le titre pour les Deploy Previews et dans le commit pour les déploiements de branche/production. Ne pas retirer les marqueurs, relancer un build ou appeler un build hook avant la revue finale. Les aperçus antérieurs sont historiques et ne prouvent pas cette version.

## Sources officielles consultées le 16 octobre 2026

- [Variables runtime Functions](https://docs.netlify.com/build/functions/environment-variables/) : variables réservées, scopes et prise d’effet au déploiement.
- [Détection et soumission Netlify Forms](https://docs.netlify.com/manage/forms/setup/) et [soumissions](https://docs.netlify.com/manage/forms/submissions/).
- [Exclusion des déploiements Netlify](https://docs.netlify.com/deploy/manage-deploys/manage-deploys-overview/).
- [Suppression Zoho](https://www.zoho.com/mail/help/data-deletion-policy.html), [eDiscovery](https://www.zoho.com/mail/help/adminconsole/manage-ediscovery.html) et [Backup](https://www.zoho.com/mail/help/adminconsole/backup-and-recovery.html).

## Résultats de la vérification finale

- `npm run lint` et `npm run build` : réussis.
- `node scripts/verify-gkgm-project.mjs http://127.0.0.1:3113` : 12 combinaisons parcours/langues, requis et champs actifs, consentement, honeypot, limite 20 Ko, doublons, origine absente/malformée/externe, type MIME exact/charset, redirections et erreurs simulées : réussis. L’API locale renvoie 503 pour une demande valide tant que le verrou est fermé.
- Huit scripts de non-régression : architecture, entities, heroes, home, institutional-pages, news, partnerships et seo : réussis (38 URL FR/EN pour le SEO, canonical/hreflang inclus).
- Contrôle runtime local : drapeau absent, envoi applicatif désactivé ; nom et ID de site non disponibles localement. Le script ne vérifie pas le compte distant.
- Aucun diff du composant des quatre étapes, des six parcours/champs, du validateur de données, des références Forms, du formulaire partenaires, de la page/métadonnées, du sitemap ou de netlify.toml par rapport à la révision précédente.
- Aucun POST public, aucun e-mail, aucun test de charge ni effacement réel. Avertissements Node DEP0205 et MODULE_TYPELESS_PACKAGE_JSON non bloquants.
