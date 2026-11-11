# GKGM — branche dédiée Netlify Forms

## Périmètre et état

Branche locale : feature/gkgm-netlify-forms. Base : origin/main, 5e5bf32c2979fcac089f710e5c0ece64ca8d8e1f, vérifiée par fetch le 17 octobre 2026. La branche v2-preproduction (7ee418c) contient un état différent qui ne reprend pas les partenariats et le SEO actuels : elle n'a pas été utilisée pour éviter leur régression. Aucun commit du collecteur n'a été cherry-pické.

Le travail est isolé dans un worktree. La branche codex/gkgm-project-inquiry et ses changements non publiés restent dans leur dossier d'origine. Aucun dossier services/gkgm-collector, code Blobs/PostgreSQL/Turnstile, ancienne API de collecte, étude d'architecture ou rapport technique du collecteur n'est inclus dans cette branche. Le projet externe et ses secrets sont conservés sans action distante.

Aucun push, nouvelle PR, fusion de la PR #7, déploiement, changement de variable Netlify ou modification de gkgroup.app n'est autorisé par cette préparation. La branche n'a pas d'upstream afin d'éviter de cibler main par erreur lors d'une publication future.

## Fonctionnement préparé

- Six catégories, quatre étapes, français/anglais, validations côté navigateur, réponses conservées lors des retours et erreurs.
- Envoi AJAX URL-encoded vers /__gkgm-forms.html avec le nom gkgm-project-inquiry, langue, reconnaissance de notice, version de notice et honeypot fax vide. Définition HTML statique dédiée, indépendante de /__forms.html.
- Aucun fichier ou document sensible demandé. Téléphone facultatif sauf contact WhatsApp ; questions complémentaires facultatives sauf l'information principale du parcours. Pas de stockage persistant dans le navigateur.
- Pas de secret dans le navigateur ou les URL. Aucun SDK de stockage ou compte supplémentaire pour l'exécution. Playwright est seulement une dépendance de développement, autonome par rapport à l'ancien collecteur.
- L'envoi reste fermé par défaut : GKGM_FRONTEND_ENABLED et GKGM_PRIVACY_APPROVED doivent être explicitement vrais côté serveur pour le permettre. Aucune variable n'a été modifiée. Le futur cloisonnement production/previews devra être vérifié ; ces indicateurs ne ferment pas les POST directs au collecteur Forms natif.
- Le lien du bouton projet de la page Mobilité pointe vers le nouveau parcours. Le sitemap ajoute uniquement ses deux URL FR/EN ; aucune URL existante n'est retirée. La fonction SEO existante génère canonical et hreflang. Les fichiers de partenariats et lib/seo.js restent identiques à main.

## Limites avant ouverture

La version native n'impose pas les validations métier GKGM avant tout enregistrement : un POST direct peut contourner les requis, la catégorie et la reconnaissance de notice. Le honeypot et le filtrage Akismet documentés par Netlify ne remplacent ni authentification, ni quotas atomiques, ni déduplication. Un HTTP 200 peut correspondre à un filtrage silencieux : l'interface confirme une prise en charge, pas une preuve d'enregistrement. Les tests locaux n'émulent pas les décisions antispam réelles.

Une nouvelle soumission après timeout peut créer un doublon. L'utilisateur est invité à contacter GKGM avant de recommencer en cas d'incertitude. reCAPTCHA n'est pas configuré et aucun prestataire ou secret Google n'a été ajouté. Si cette protection est exigée, elle doit être intégrée et éprouvée avant ouverture.

Les notifications natives peuvent inclure les réponses : leur corps minimal sans données personnelles n'est pas garanti. La notice FR/EN indique cette duplication et maintient les finalités limitées, l'absence de démarchage et de transmission automatique aux partenaires, le responsable légal et Edem Yawo Awutey comme seul accès interne autorisé. Les mentions juridiques et les pays/transferts effectifs restent à confirmer ; aucune résidence UE n'est déduite de la région de l'ancien stockage.

## Exploitation à préparer après autorisation distincte

1. Vérifier la détection de gkgm-project-inquiry et le honeypot dans Netlify sans modifier international-partnerships. Confirmer les champs détectés, puis rapprocher un essai entièrement fictif de Verified ou Spam. Le post-traitement Netlify et l'enregistrement réel ne sont pas validés par le build local.
2. Configurer uniquement les notifications vérifiées de ce formulaire vers gk.contactus@gkgroup.app, avec objet fixe sans identité de demandeur, dans Forms > Submission notifications. Vérifier les notifications globales, règles de transfert et habilitations de la boîte Zoho ; ne pas toucher aux notifications des partenariats. Aucun message réel n'a été envoyé.
3. Auditer les rôles, membres, jetons API, exports, délégations et MFA. Une mention de responsable unique dans la notice ne restreint pas techniquement le compte. Vérifier le DPA, les sous-traitants, les flux antispam, les sauvegardes et les transferts effectifs.
4. Chaque semaine, contrôler Verified et Spam, supprimer les demandes sans suite arrivant à échéance dans les quatorze jours et vérifier leur absence, afin de respecter douze mois maximum depuis réception initiale. Ne pas réinitialiser l'échéance lors d'une copie ou reprise. Appliquer une politique distincte explicite aux dossiers clients.
5. Effacer aussi notifications, échanges et copies dans Zoho, archives/corbeille/synchronisations et éventuels exports internes. Ne pas exporter les réponses comme preuve. Journaliser seulement dates, nombres, opérateur et incidents, selon une durée approuvée. La suppression dans Netlify est possible par interface ou API ; aucun TTL ou ordonnanceur automatique n'est configuré par cette branche.
6. Après panne, reprendre en priorité les échéances et vérifier toutes les copies ; ne pas certifier un effacement sur la base d'un clic. Les délais de sauvegarde peuvent dépasser la marge de quatorze jours : faire approuver une anticipation ou une politique de copies adaptée. La purge de l'ancien collecteur n'agit pas sur Forms.

Sources officielles : [détection](https://docs.netlify.com/manage/forms/setup/), [Next.js](https://docs.netlify.com/manage/forms/troubleshooting-tips/), [antispam](https://docs.netlify.com/manage/forms/spam-filters/), [notifications](https://docs.netlify.com/manage/forms/notifications/), [suppression](https://docs.netlify.com/manage/forms/submissions/).

## Commandes de validation locale

- npm ci --ignore-scripts
- npm run test:forms
- npm run lint
- npm run build
- npm run test:forms:browser

Le navigateur utilise Edge installé et le build local sur 127.0.0.1. Tous les POST de formulaires et appels externes sont interceptés ; aucune soumission n'est enregistrée dans Netlify et aucun courriel n'est envoyé. Les indicateurs vrais n'existent que dans le processus enfant de test. Le script inclut le contrôle SEO complet existant et produit docs/gkgm-netlify-browser-audit.json, sans contenu client.

## Publication ultérieure

Préparer le commit avec [skip netlify], compatible avec le mécanisme Git natif Netlify. Ce marqueur ne bloque pas un déploiement manuel ou une automatisation tierce. Une éventuelle nouvelle PR devra également porter [skip netlify] pour éviter un Deploy Preview automatique. La PR #7 du collecteur n'est pas modifiée. Aucun push ne sera exécuté sans autorisation distincte et revue des déclencheurs ; les builds/variables des projets Netlify restent inchangés.

## Résultats de cette branche isolée

- 7 tests unitaires du transport Forms réussis.
- 12 parcours navigateur FR/EN et deux soumissions de partenariat simulées réussis, sans trafic fournisseur réel.
- Régression SEO complète : 38 URL FR/EN, canonical/hreflang, sitemap, JSON-LD, langues et parité du formulaire de partenariats vérifiés.
- Lint et build Next.js réussis ; 17 routes/pages générées, sans l'ancienne API du collecteur. Les avertissements Node de type de module et de dépréciation du chargeur sont non bloquants.
- Dépendances installées hors ligne avec scripts d'installation désactivés ; aucun service externe créé.
- Aucun fichier sous services et aucune étude du collecteur dans le périmètre. Le code d'exécution n'importe aucun SDK Blobs ou PostgreSQL.
- Fichiers de partenariats, lib/seo.js, proxy.js, app/robots.js, app/layout.js et netlify.toml identiques à origin/main. Seul le sitemap reçoit l'ajout GKGM, sans retrait d'URL.

### Fichiers du commit

- app/gkgm-project/page.js et app/sitemap.js
- components/forms/GkgmProjectForm.js et components/pages/MobilityPage.js
- content/gkgm-project.js
- lib/gkgm-netlify.js, lib/gkgm-project-server.js et lib/gkgm-project.js
- public/__gkgm-forms.html
- package.json et package-lock.json : commandes de test et Playwright épinglé en développement
- scripts/verify-seo.mjs : ajout du nouveau parcours aux attentes existantes
- tests/gkgm-fixtures.mjs, tests/gkgm-netlify.test.mjs et tests/gkgm-forms-browser.mjs
- docs/gkgm-privacy-notice.md, docs/gkgm-netlify-browser-audit.json et ce rapport

Les contrôles de secrets sont une recherche ciblée de motifs et une revue des fichiers candidats, pas une garantie sur tout format de secret possible. Les valeurs de test sont fictives ; les coordonnées professionnelles publiées dans la notice sont intentionnelles. Aucun fichier d'environnement, credential, export de compte ou donnée de demandeur réel n'est inclus.
