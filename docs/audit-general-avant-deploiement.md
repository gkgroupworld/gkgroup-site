# Audit général GK GROUP — avant déploiement

Date : 14 novembre 2026, fuseau Atlantic/Reykjavik.

Mise à jour : ajout local de la section réalisations/partenaires GKGM, détaillé en section 11. Les sections 1 à 10 décrivent l'audit initial ; la section 11 complète cet état sans lever les réserves de publication.

## 1. Conclusion et périmètre

**Le site compile et ses principaux contrôles fonctionnels passent, mais la mise en production ne doit pas encore être considérée comme validée.** Les principaux points à traiter sont les alertes de sécurité des dépendances, les autorisations des photographies, les conditions d'ouverture du formulaire GKGM et les réglages/exigences opérationnelles Netlify. Des corrections d'accessibilité et de maintenance des tests sont également identifiées.

L'audit initial n'a modifié aucune fonctionnalité, aucun contenu publié, aucune dépendance et aucun logo ; son seul livrable était ce rapport. La mise à jour fonctionnelle ultérieure demandée par l'utilisateur est consignée en section 11. Aucun push, aucune PR, aucune fusion et aucun déploiement Netlify n'ont été effectués. Les essais de formulaires sont locaux et simulés, sans message ni soumission fournisseur réelle.

Périmètre principal : `galerie-work`, branche locale `feature/galerie-archives-techniques`, HEAD `c9e25a8`. Base `main` / `origin/main` : `4ee789fced22f2087cfbcc79e38661285eac31fc`. Une lecture distante `git ls-remote origin refs/heads/main` confirme cette même référence au moment de l'audit. Il ne s'agit pas d'un audit du contenu effectivement servi par Netlify, ni d'un inventaire de toutes les branches ou PR distantes.

Méthodes : revue des routes, composants, contenus et configurations ; comparaison Git ; analyse de structure bilingue ; build de production ; scripts de vérification existants ; parcours navigateur ; contrôle HTTP local des liens, ancres et ressources ; consultation des avis npm de production. Les essais utilisent Node 26.9.0 local, Next.js 16.2.6, React 19.2.4 et le plugin Netlify Next.js 5.15.11. Les dépendances déjà installées n'ont pas été réinstallées ou mises à jour pendant cet audit.

## 2. Inventaire des pages et fonctionnalités

Les 13 pages principales et les 6 articles représentent **19 chemins publics, déclinés en 38 URL FR/EN** dans le sitemap. Le français est la langue de repli ; l'anglais utilise `?lang=en`. Les liens internes ajoutent généralement `?lang=fr` pour le français, tandis que le canonical français omet ce paramètre.

| Route | Contenu et fonctions existantes |
| --- | --- |
| `/` | Accueil institutionnel : vision, quatre domaines, écosystème, fonctions Nexus, partenariats, fondateur et contacts. |
| `/about` | Histoire en quatre étapes sans dates inventées, galerie de 12 photos, mission/vision, valeurs, organisation, message du fondateur et liens internes. |
| `/architecture` | Schéma institutionnel, structures et branches, types de relations, statuts et fonctions de coordination. |
| `/activities` | Technologie, mobilité, commerce et coordination ; sous-domaines et liens vers les pages spécialisées. |
| `/entities` | Profils des sociétés/projets ; branches GKGT et GKGM rattachées au cadre togolais ; statuts distincts. |
| `/gk-global-technology` | Services technologiques, équipements, assistance et maintenance ; appels à contact. |
| `/gk-global-mobility` | Mobilité internationale : études, projets professionnels et entrepreneuriaux, accompagnement ; limites de responsabilité et accès au parcours projet. |
| `/gkgm-project` | Formulaire GKGM bilingue à quatre étapes et six catégories ; activation conditionnelle, validation, récapitulatif, notice et reconnaissance de lecture. |
| `/gk-esttrade` | Présentation d'UAB GK EstTrade et de son périmètre commercial. |
| `/gk-nexus` | Coordination et développement ; société albanaise explicitement présentée comme projet dont l'immatriculation reste à confirmer. |
| `/partnerships` | Domaines de collaboration, annuaire soumis à approbation et formulaire Netlify. L'annuaire externe est volontairement vide : aucun partenaire non confirmé n'est affiché. |
| `/news` | Publications bilingues, filtres par catégorie, compteur et état vide ; opportunités/événements encadrés par des règles de validation. |
| `/contact` | Coordonnées, orientation par structure, formulaire qui prépare un message WhatsApp ou email ; ce formulaire n'est pas un troisième collecteur Netlify. |

Les six articles actuellement publiables selon les données et règles du dépôt sont :

- `/news/gk-global-mobility-accompagnement-international`
- `/news/gk-global-technology-expertise-solutions-numeriques`
- `/news/gk-group-ecosysteme-entrepreneurial-international`
- `/news/gk-group-perspectives-developpement-international`
- `/news/gk-nexus-coordination-internationale`
- `/news/uab-gk-esttrade-commerce-international-lituanie`

Autres routes et ressources : `/robots.txt`, `/sitemap.xml`, les définitions statiques `/__forms.html` et `/__gkgm-forms.html`, la page 404 bilingue et `/preview/news/[slug]`. Cette dernière est désactivée en production ; en développement, elle exige un indicateur explicite et un Host de boucle locale. Les deux fichiers de définition Forms portent `noindex,nofollow`.

Fonctions communes : logo officiel, navigation bureau/mobile, changement de langue conservant les paramètres de recherche, footer et liens email/téléphone/WhatsApp ; `next/image`, alternatives d'images, styles de focus, prise en compte de la réduction des animations ; métadonnées sociales et données structurées. Les actualités exigent notamment un statut admissible, une approbation explicite, une date valide et du contenu bilingue ; les opportunités contrôlent aussi leur fenêtre de vérification et leur échéance. Aucun CMS ni espace d'administration applicatif n'est présent dans les routes examinées.

## 3. Modifications locales préparées

L'arbre de travail était propre avant l'audit. Deux commits locaux dépassent la base `main` :

| Commit | Objet |
| --- | --- |
| `60c3985` | Préparation de la galerie bilingue et de sa documentation. |
| `c9e25a8` | Intégration des cinq photos restantes et mise à jour des validations. |

Différence totale avec `main`, avant ce rapport : **16 fichiers, 141 lignes ajoutées** et 12 nouveaux fichiers binaires. Il n'y a aucune modification de configuration, de dépendance, de formulaire, de navigation ou de métadonnées dans ces deux commits.

| Fichiers | Changement |
| --- | --- |
| `components/pages/AboutPage.js` | Deux lignes ajoutées : import et insertion de la galerie entre `our-history` et `mission-vision`. |
| `components/pages/TechnicalArchiveGallery.js` | Nouveau composant : 12 photos, légendes et alternatives FR/EN, grille 1/2/3 colonnes, chargement différé, ratio réservé et affichage intégral sans recadrage. |
| `docs/galerie-archives-review.md` | Rapport de préparation et points de validation des photographies. |
| `docs/galerie-archives-pull-request.md` | Texte préparatoire local ; aucune PR ouverte. |
| `public/archives-techniques/` | 12 WebP provenant du ZIP, total 2 107 904 octets, soit environ 2,01 Mio. |

Fichiers photographiques : `01_20181030_170129.webp`, `02_20181030_170143.webp`, `06_20211013_095534.webp`, `11_IMG-20181112-WA0042.webp`, `12_IMG-20181122-WA0004.webp`, `14_IMG-20190301-WA0000.webp`, `16_IMG-20210728-WA0002(1).webp`, `18_IMG_20180329_095427.webp`, `20_IMG_20190125_120103_9.webp`, `21_IMG_20190214_073458_8.webp`, `23_IMG_20190308_092807_2.webp`, `24_IMG_20190308_092825_7.webp`.

Le rapport de galerie consigne leur identité SHA-256 avec les entrées de l'archive. Le logo `public/brand/gk-group-official-logo.png` a été comparé directement à celui de `main` pendant cet audit : **identique**.

### Autres copies présentes dans le dossier parent

Ces dossiers n'ont pas de métadonnées Git et ne constituent pas des branches supplémentaires prêtes à fusionner. Sur 76 fichiers source/configuration de `main` comparés :

| Copie | Fichiers présents mais différents | Fichiers de `main` absents |
| --- | --- | --- |
| `../gkgroup-site-main` | 29 | 34 |
| `../integration-review/main` | 27 | 33 |
| `../integration-review/base` | 3 | 73 |

`integration-review` contient aussi un ancien patch et des captures de contenu distant. Ces éléments ont été repérés comme archives de travail, sans être réintégrés. Les écarts ne prouvent pas l'existence de fonctionnalités supplémentaires approuvées : il faut confirmer tout autre travail souhaité avant le regroupement final. Les documents bureautiques et scripts sans rapport avec le site, dans le dossier parent, sont hors périmètre. Les fonctionnalités GKGM/SEO/partenariats déjà dans `main` ne sont pas comptées comme nouveaux changements de la branche galerie.

## 4. Éléments terminés et résultats des contrôles

| Contrôle effectué sur le build local | Résultat |
| --- | --- |
| `npm run lint` | Réussi. |
| `npm run test:forms` | 7 tests réussis. |
| `npm run build` | Réussi ; compilation Turbopack et génération des 17 entrées du build. Ce nombre n'est pas le nombre de chemins d'articles ou d'URL bilingues. |
| `npm run test:forms:browser` | Réussi : 12 parcours GKGM FR/EN à quatre étapes, catégories conditionnelles, consentement, retours et conservation des réponses, erreurs/reprises simulées ; deux soumissions de partenariat simulées. |
| `verify-home.mjs` | Réussi FR/EN. |
| `verify-architecture.mjs` | Réussi FR/EN. |
| `verify-entities.mjs` | Réussi FR/EN. |
| `verify-institutional-pages.mjs` | Réussi pour activités et À propos FR/EN. |
| `verify-partnerships.mjs` | Réussi FR/EN et règles d'approbation. |
| `verify-news.mjs` | Réussi : publications, filtres, dates, états, approbations, données structurées et exclusion des brouillons. |
| `verify-seo.mjs` | Réussi sur 38 URL FR/EN. |
| `verify-heroes.mjs` | **Échec** sur `/about?lang=fr` : empreinte du contenu sous la bannière différente de l'ancienne référence, en raison de l'ajout de la galerie. Voir C2 ci-dessous. |
| Contrôle HTTP des 38 URL | Toutes répondent 200, avec un seul H1. |
| Liens/ancres internes extraits | 51 destinations uniques vérifiées, aucune destination cassée ni ancre manquante détectée. |
| Images et scripts référencés extraits | 33 URL de ressources contrôlées, aucune erreur HTTP. Ce contrôle ne couvre pas chaque fichier CSS ou chaque variante d'image possible. |
| Responsive navigateur | 13 pages principales × 2 langues × 4 largeurs (390/768/1280/1440 px) : 104 combinaisons, sans débordement horizontal ni image dépourvue d'attribut alt. |
| Galerie | 12/12 images chargées après parcours des figures aux trois tailles 390/768/1440 px en EN pendant cet audit ; contrôle FR/EN complet déjà consigné lors de la préparation. |
| Navigation mobile | Menu EN ouvert à 390 px, 12 liens et lien de retour vers le français cohérents. |
| Routes non publiques/inexistantes | Route de preview testée et URL inexistante : 404 et noindex. Définitions Forms : 200 et noindex. |

Les scripts HTTP ci-dessus ont reçu la base `http://127.0.0.1:3116`. Les indicateurs GKGM vrais dans le test navigateur sont injectés uniquement dans le processus local de test. Ils ne prouvent pas l'activation effective sur Netlify. Aucune réception WhatsApp, email, Zoho ou Netlify n'a été testée par envoi réel.

Le build et les scripts émettent des avertissements Node sur `module.register()` et la détection du type de module des fichiers de contenu ; ils sont non bloquants dans cet environnement. Aucun ajustement n'a été appliqué pour les masquer.

## 5. Éléments à corriger — sans correction automatique

### C1 — Priorité haute : dépendances signalées vulnérables

La commande en lecture seule `npm audit --omit=dev --json`, exécutée le jour de cet audit, signale **6 paquets concernés : 1 critique, 4 élevés, 1 modéré**. Ce sont des classifications de paquets par npm, pas six failles distinctes ni une démonstration d'exploitation du site.

| Paquet signalé | Sévérité npm | Observation |
| --- | --- | --- |
| `next` | Critique | Dépendance directe 16.2.6 ; plusieurs avis, notamment optimisation d'images. |
| `sharp` | Élevée | 0.34.5 via Next.js ; avis sur bibliothèques de traitement d'images. |
| `postcss` | Élevée | Avis sur traitement CSS/source maps. |
| `nanoid` | Élevée | Avis de déni de service sur certaines fonctions de génération. |
| `source-map-js` | Élevée | Avis de déni de service sur certaines source maps. |
| `baseline-browser-mapping` | Modérée | Avis de terminaison de processus sur entrée invalide. |

La sortie npm propose notamment Next.js 16.4.6 comme possibilité de résolution ; cette proposition n'a été ni installée, ni validée avec Netlify ou le reste du projet. Préparer une correction ciblée des dépendances et du verrouillage, examiner l'applicabilité des avis, puis refaire lint, build, contrôles et audit npm avant production. Ne pas appliquer `npm audit fix --force` sans revue.

Deux avis ont été consultés directement : [avis Next.js sur l'optimisation SVG](https://github.com/advisories/GHSA-2464-fhr4-w9xw), qui décrit un impact conditionnel sous Linux glibc et cite un correctif via Sharp ; [avis Proxy/Turbopack](https://github.com/advisories/GHSA-6gpp-xcg3-4w24), conditionné notamment à une configuration i18n précise. Le projet utilise un paramètre de langue et n'emploie pas son Proxy comme contrôle d'authentification : ne pas lui attribuer automatiquement ce scénario. L'exposition effective dépend du code utilisé et de l'adaptateur/runtime Netlify ; aucun test offensif n'a été tenté.

### C2 — Priorité moyenne : référence historique des tests de bannières

`scripts/verify-heroes.mjs` compare la totalité du contenu sous la bannière à `docs/hero-baseline.json`. Le diff observé sur À propos concerne cette empreinte ; les champs bannière, navigation, footer, SEO et JSON-LD présentés dans l'erreur sont identiques. L'ajout volontaire de la galerie rend donc la référence obsolète, sans prouver une régression de la bannière.

Après validation du contenu, revoir la portée du test ou actualiser une référence approuvée et relancer les 24 variantes. Ne pas enregistrer aveuglément une nouvelle référence. Le script s'arrêtant au premier échec, les variantes restantes ne sont pas certifiées par ce script, malgré les autres contrôles réussis.

### C3 — Priorité moyenne : contraste de certains textes et boutons

Dans `ContactForm.js`, le bouton de soumission emploie du texte blanc sur `#e87512`, en taille `text-sm`. Le contraste calculé à partir des couleurs du code est d'environ **3,01:1** : insuffisant pour la cible de 4,5:1 d'un texte courant. Certains petits textes orange sur fond blanc emploient le même couple inversé. Revoir ces occurrences et les états focus/hover sans toucher au logo officiel. Les couleurs marine/or de la galerie ne nécessitent pas de modifier ses photographies.

### C4 — Priorité faible : libellé accessible mobile non traduit

Dans `components/layout/Header.js`, le menu mobile conserve `aria-label="Navigation mobile"` sur la version anglaise. Défaut reproduit dans le navigateur ; les douze libellés de liens visibles sont, eux, corrects. Prévoir un nom accessible EN, sans changer les destinations.

### C5 — Priorité moyenne : confirmation du formulaire partenariats

`PartnershipForm.js` détecte les erreurs HTTP et le faux succès d'un fichier statique, mais un succès HTTP ne démontre pas la réception en boîte ni le classement hors spam. Le message actuel annonce un envoi réussi et une future étude par l'équipe, alors que le formulaire GKGM emploie une formulation plus prudente. Harmoniser les confirmations FR/EN avec la preuve effectivement disponible et le parcours de récupération, puis vérifier la réception réelle dans Netlify après autorisation d'un essai.

## 6. Cohérence FR/EN, SEO et indexabilité

### Points validés

- Comparaison récursive des clés, types et longueurs des tableaux de **16 exports de contenu structurés FR/EN** : aucun écart structurel. Cela ne constitue pas une certification linguistique de chaque phrase ni de tous les objets imbriqués hors de ces exports.
- La langue du document est pilotée côté serveur par l'URL via le Proxy ; sa valeur remplace un éventuel en-tête client. Les contrôles incluent les valeurs invalides et le repli français.
- La version anglaise conserve quelques noms de marque, signatures et désignations métier en anglais dans les deux versions : ce n'est pas en soi un défaut de traduction. Les statuts de sociétés, branches et projets restent distincts dans les principaux contenus testés.
- Chaque URL du sitemap a répondu 200 avec un H1 ; titles, descriptions, canonical, hreflang FR/EN/x-default et métadonnées sociales sont couverts par `verify-seo.mjs`.
- `lib/seo.js` fixe `https://gkgroup.app`, les alternates et les références JSON-LD. `Brand` GK GROUP est distingué des sociétés ; Nexus n'est pas décrit comme une société immatriculée établie.
- Le sitemap inclut les 13 chemins principaux et les 6 articles admissibles, sans dates de modification inventées. Aucun nouveau chemin n'est créé par la galerie : seulement l'ancre `technical-archives`.
- `robots.txt` autorise l'exploration et déclare le sitemap ; les previews de brouillons ne sont pas publiques en production. Les pages introuvables testées portent noindex.
- La carte sociale `public/brand/gk-group-social-card.png` est présente. Les brouillons, événements et opportunités non validés ne sont pas introduits artificiellement pour remplir les catégories.

### Points à décider ou à vérifier

`/gkgm-project` reste indexable et présent dans le sitemap même si son interface d'envoi est fermée. Décider si cette page d'attente doit être indexée avant l'ouverture : aucune modification de robots ou sitemap n'a été effectuée. Les variantes filtrées d'actualités sont rattachées au canonical de la liste correspondante, ce qui évite de traiter chaque filtre comme une nouvelle page éditoriale.

L'indexabilité réelle, les exclusions ou erreurs Google, la soumission du sitemap, les URL canoniques choisies et les résultats enrichis ne sont pas confirmés par un build local. Les contrôler dans Search Console et sur le domaine final après autorisation. Vérifier aussi les redirections HTTP/HTTPS et www/sans-www dans Netlify/DNS ; aucune règle de redirection correspondante n'est définie dans les fichiers examinés.

## 7. Formulaires, confidentialité et validations avant publication

| Parcours | État technique constaté | Validation encore nécessaire |
| --- | --- | --- |
| Contact | Validation HTML puis ouverture de WhatsApp ou du client email avec message encodé ; aucun accusé serveur applicatif. | Confirmer les coordonnées et tester les applications destinataires avec données fictives après autorisation ; expliquer clairement le passage vers un service externe. |
| Partenariats | POST URL-encoded vers `/__forms.html`, définition statique `international-partnerships`, honeypot, consentement et erreurs ; essais simulés réussis. | Détection Forms, notifications, Verified/Spam, droits d'accès et notice de traitement applicable. |
| Projet GKGM | POST vers `/__gkgm-forms.html`, définition `gkgm-project-inquiry`, six catégories, quatre étapes, notice et validations ; fermé sauf si les deux indicateurs sont vrais. | `GKGM_FRONTEND_ENABLED=true` et `GKGM_PRIVACY_APPROVED=true` seulement après approbation opérationnelle et de confidentialité ; portée production/previews à vérifier. |

Les contrôles côté navigateur ne sont pas une frontière d'admission côté serveur pour Netlify Forms. Les deux indicateurs GKGM ferment l'interface, pas les POST directs au collecteur natif. Le code et la documentation décrivent les risques de soumissions directes et de doublons après timeout. Décider explicitement si ce fonctionnement natif satisfait les exigences ; si des règles métier doivent précéder tout enregistrement, une évolution serveur distincte devra être conçue et approuvée.

`docs/gkgm-privacy-notice.md` et `docs/gkgm-netlify-forms-readiness.md` laissent notamment à confirmer l'adresse complète du responsable, le cadre applicable, les droits et leurs modalités, les transferts, les pays de stockage/accès et les délais de sauvegarde. La notice prévoit la suppression des demandes sans suite sous douze mois maximum et un contrôle hebdomadaire ; aucun mécanisme automatique correspondant n'est configuré par cette branche. Vérifier Netlify, les copies de notifications Zoho et les éventuels exports. Ce constat documentaire n'est pas un avis juridique ni une validation de conformité.

Il n'existe pas de page autonome de mentions légales/confidentialité dans l'inventaire des routes. Les notices locales/embarquées ne doivent pas être considérées comme automatiquement suffisantes pour tous les formulaires. Faire valider la présentation et l'accès public aux informations nécessaires avant la collecte.

### Photographies — validation impérative avant publication publique

Les douze images sont présentes dans le dossier `public` de la préparation : **elles seraient accessibles directement si ce code était déployé**, indépendamment de l'indexation de la galerie. L'autorisation d'intégration locale n'est pas une autorisation de publication publique.

- `23_IMG_20190308_092807_2.webp` et `24_IMG_20190308_092825_7.webp` : personnes reconnaissables ; autorisations à confirmer.
- `16_IMG-20210728-WA0002(1).webp` : personne partielle, arrière-plan et plaque de véhicule à examiner.
- `18_IMG_20180329_095427.webp` : personne partielle, écran et étiquette à vérifier.
- `20_IMG_20190125_120103_9.webp` : personnes photographiées sur l'écran du portable ; droits sur ce contenu à vérifier.
- Confirmer les droits et légendes des douze images ; examiner aussi les étiquettes matérielles des autres vues si elles peuvent identifier un propriétaire ou une donnée confidentielle.

Aucun visage ou élément n'a été modifié. Ne publier la galerie complète qu'une fois ces validations documentées, ou faire décider par l'utilisateur la sélection publiable.

## 8. Mobile, accessibilité et performances

Les 104 combinaisons des pages principales ne présentent pas de débordement horizontal aux largeurs testées. Le menu mobile s'ouvre, les liens sont présents et la galerie passe à une, deux et trois colonnes. Les tests de formulaires couvrent des parcours à 390/768/1440 px. Les six articles sont contrôlés en HTTP/SEO, mais n'ont pas chacun fait l'objet d'un parcours visuel mobile exhaustif. Aucun appareil physique ni lecteur d'écran réel n'a été utilisé.

Les images comportent des alternatives ; les champs ont des labels et les formulaires spécialisés des messages d'erreur/statut et une gestion du focus. Les styles prennent en compte `prefers-reduced-motion`. Cela ne suffit pas à affirmer une conformité WCAG exhaustive : contraste C3 à corriger, navigation clavier et zoom à compléter. Aucun lien d'évitement vers le contenu principal n'a été repéré ; son ajout est recommandé.

Mesures indicatives de ce build local, sans limitation réseau :

| Indicateur | Observation | Limite |
| --- | --- | --- |
| Réponses HTML des 38 URL | 40 196 à 123 886 octets ; 9 à 28 ms lors du parcours HTTP local. | Tailles du corps lu et temps sur boucle locale, pas des temps de chargement Netlify/mobile. |
| 33 images/scripts extraits | Environ 5,83 Mo de corps de réponses cumulés sur l'ensemble des URL uniques contrôlées. | Ce n'est pas le poids d'une page ni le trafic d'une visite réelle ; inclut des URL de variantes d'images. |
| Dossier `public` | 29 fichiers, 18 097 154 octets, environ 17,26 Mio. | Poids source, pas trafic réellement transféré grâce au cache et à l'optimisation. |
| Galerie source | 12 WebP, environ 2,01 Mio ; chargement différé et ratio réservé. | Images servies selon les variantes sélectionnées par le navigateur. |
| Gros fichiers source | Portrait du fondateur : 2,27 Mo ; plusieurs PNG d'entités : environ 1,83 à 2,27 Mo. | Next.js peut les redimensionner ; ne pas déduire une mauvaise note LCP de leur seul poids source. |

Toutes les pages applicatives apparaissent en rendu dynamique dans le build, notamment du fait des paramètres de langue et de la lecture des headers. Évaluer l'intérêt d'une stratégie de cache/rendu adaptée après mesure sur Netlify ; ne pas changer l'architecture uniquement pour améliorer une estimation locale.

Améliorations recommandées, non appliquées : mesurer LCP/CLS/INP et un parcours Lighthouse sur un environnement autorisé avec réseau mobile ; examiner le JavaScript effectivement téléchargé par page ; vérifier les tailles responsive et le cache des images ; alléger éventuellement les ressources non officielles après validation visuelle. **Le logo officiel reste inchangé**. Ne pas réencoder ni retoucher les photos historiques sans nouvelle instruction. Aucun score Lighthouse, Core Web Vitals réel ou SLA de production n'est revendiqué ici.

## 9. Déploiement : dépôt vérifié / Netlify à contrôler

| Sujet | Visible dans le dépôt | Contrôle restant dans Netlify ou l'exploitation |
| --- | --- | --- |
| Build | `netlify.toml` : `npm run build`, publication `.next`, plugin `@netlify/plugin-nextjs`. | Répertoire de base du site connecté, dépôt et branche de production réellement sélectionnés. |
| Dépendances | `package-lock.json` présent ; versions directes et plugin identifiés. | Gestionnaire et commande d'installation effectifs, version Node, cache et compatibilité après correction sécurité. |
| Runtime | Pas de version Node explicitement fixée par `engines`, `.nvmrc` ou `.node-version` dans les fichiers examinés. | Fixer après validation une version cohérente entre local, build et fonctions ; contrôler les logs/runtime réels. |
| Déclenchement | Aucun contexte de branches/previews ou blocage global des builds dans `netlify.toml` ; pas de workflow GitHub Actions trouvé. | Builds automatiques, Deploy Previews, branch deploys, build hooks et automatisations externes. Une branche ou PR n'est pas présumée sans effet. |
| Préproduction | Les métadonnées par défaut sont index/follow ; seule la preview éditoriale est fermée en production. | Confidentialité des previews et réponse `X-Robots-Tag` si nécessaire. Noindex n'est pas un contrôle d'accès aux photos. |
| GKGM | Deux indicateurs serveur lus par `projectDeliveryConfig`. | Valeurs et portée production/previews, disponibilité au runtime, absence d'activation prématurée. Aucun secret ou valeur de compte n'a été demandé ou modifié. |
| Forms | Deux définitions HTML et deux endpoints statiques distincts ; noindex et exclusion du Proxy. | Détection des formulaires/champs/honeypots, quotas, spam, notifications et non-régression des partenariats. |
| Domaine et SEO | URL de référence `https://gkgroup.app`. | Domaine principal, DNS, HTTPS, www/sans-www, redirections et absence d'en-tête noindex en production. |
| Sécurité HTTP | Pas de politique dédiée `_headers`, CSP ou redirections applicatives dans les fichiers examinés. | En-têtes réellement fournis par Netlify/adaptateur ; décider d'une politique testée compatible avec scripts et formulaires. Ne pas ajouter une CSP aveuglément. |
| Exploitation | Documentation de conservation et de contrôles manuels. | Accès, MFA, notifications Zoho, sauvegardes, suppressions, incidents, journaux et responsable du suivi. |
| Retour arrière | Historique Git et commits locaux identifiés. | Identifier le dernier déploiement stable et la procédure de restauration avant l'unique publication autorisée. |

Les anciens documents évoquent des marqueurs `[skip netlify]` et d'autres branches historiques. Ces indications ne constituent pas une garantie technique universelle ni une autorisation de push. Aucun marqueur n'a été ajouté ou utilisé comme substitut à la consigne de conserver les modifications localement.

## 10. Améliorations recommandées et validations finales

### Améliorations recommandées

1. Après accord, préparer les corrections C1 à C5 dans un lot local distinct, sans publication automatique ; conserver une revue de diff claire.
2. Regrouper les scripts de vérification existants dans une commande reproductible et, si souhaité, une CI qui ne publie rien par elle-même. Le lint/build Netlify actuel ne garantit pas l'exécution de toutes ces vérifications.
3. Clarifier les anciens documents de branches et le README encore générique : police réelle Arial/Helvetica, procédures d'activation GKGM, variante Netlify Forms retenue et branche de référence. Ne pas récupérer une ancienne copie par remplacement massif.
4. Prévoir des contrôles de clavier, zoom et lecteur d'écran ; corriger le contraste, traduire le nom accessible du menu et envisager un lien d'évitement.
5. Mesurer les performances sur l'hébergement cible, puis optimiser les ressources et le cache sur la base de mesures. Examiner les dépendances inutilisées, telles que l'usage effectif de Framer Motion, avant d'envisager un retrait.
6. Continuer la revue éditoriale humaine FR/EN et des informations de sociétés ; garder un justificatif des affirmations publiables et des autorisations de logos/partenaires.

### Validations nécessaires avant publication

- [ ] Traiter les avis de sécurité ou faire documenter leur résolution/applicabilité, puis refaire l'audit des dépendances et les tests.
- [ ] Valider les douze photographies, les autorisations des personnes, les informations identifiantes et les légendes.
- [ ] Décider de l'ouverture GKGM ; compléter les mentions, accès, transferts, conservation et traitement des copies avant activation.
- [ ] Vérifier les réglages Netlify réels, les déclencheurs et la confidentialité/indexation des éventuelles previews avant toute opération distante.
- [ ] Revoir la référence `verify-heroes` après approbation de la galerie et vérifier les variantes restantes.
- [ ] Corriger les défauts d'accessibilité prioritaires et valider les confirmations des formulaires.
- [ ] Confirmer les coordonnées, statuts et textes FR/EN ; décider si d'autres travaux locaux sont réellement à inclure, sans réintroduire les anciennes copies.
- [ ] Préparer les essais opérationnels Forms/notifications avec données fictives et autorisation explicite ; ne pas les confondre avec les tests simulés déjà réussis.
- [ ] Donner l'autorisation explicite pour le lot final et l'unique mise en production ; prévoir vérification après publication et retour arrière.

**État de livraison de cet audit : rapport local uniquement. Aucune amélioration identifiée n'a été appliquée automatiquement.** Le tableau des tests conserve explicitement l'échec de la référence historique et les limites des simulations ; il ne certifie ni la sécurité complète, ni la conformité juridique, ni les paramètres du compte Netlify.

## 11. Mise à jour locale GKGM — réalisations et partenariats internationaux

### Modification terminée, en attente de validation de présentation

Sur instruction explicite de l'utilisateur, la page `/gk-global-mobility` reçoit la section **« Nos réalisations et partenariats internationaux » / « Our Track Record and International Partnerships »**, après les six rubriques d'accompagnement existantes et avant les étapes de préparation. Une ancre `#track-record` est ajoutée au sommaire local. Aucun contenu existant n'est supprimé.

Les données de cette section proviennent de la déclaration de l'utilisateur dans sa demande ; l'intégration ne constitue pas une vérification indépendante des dossiers ou des accords B2B. Aucun nom de bénéficiaire, pièce de visa ou document de partenaire n'est publié.

| Réalisation déclarée depuis 2023 | Nombre | Période affichée |
| --- | --- | --- |
| Visas D Job Seeker — Portugal | 3 | Inclus dans le bilan depuis 2023 ; aucune année propre à ces dossiers inventée. |
| Visas visiteurs — Royaume-Uni | 2 | 2025 |
| Visa C2 — Indonésie | 1 | 2026 |
| Permis de travail — Pologne | 8 | 2025–2026 |

Les **six visas** sont présentés comme obtenus dans le cadre de dossiers directement accompagnés par GKGM. Les **huit permis de travail** sont dans un encadré distinct, avec une mention explicite qu'ils ne sont pas des visas délivrés. Aucun total de « 14 visas » ni taux de réussite n'est utilisé.

Les quatre partenaires B2B actuels demandés sont affichés sous forme de noms : **Dalimit Global, ApplyBoard, Elec Work Agency, Live & Study in Europe**. Aucun logo tiers, URL supposée, exclusivité, agrément ou affiliation à une autorité publique n'a été ajouté. Le texte indique que ces relations B2B n'impliquent aucune affiliation officielle à un gouvernement ou à une ambassade. La liste centrale de la page `/partnerships` n'a pas été modifiée : le constat d'annuaire vide en sections 2 et 4 reste propre à cette page, et ne décrit plus l'ensemble des mentions de partenaires sur le site après cette mise à jour.

Une mention bilingue précise que les résultats passés ne garantissent aucun visa, permis de travail ou résultat futur, que les autorités compétentes décident, et que GKGM accompagne les dossiers sans délivrer ces autorisations.

### Fichiers et actualisation des chiffres

| Fichier | Modification |
| --- | --- |
| `content/mobility-track-record.js` | Nouvelle source unique des nombres, périodes, noms de partenaires et textes FR/EN. Le total des visas est calculé uniquement à partir des trois catégories de visas. |
| `components/pages/MobilityTrackRecord.js` | Nouveau composant serveur ; titres H2/H3, listes sémantiques, cartes responsive marine/or, encadré distinct des permis et réserves bilingues. |
| `components/pages/MobilityPage.js` | Deux imports, insertion du composant et ajout de l'ancre au sommaire. Les six rubriques, les étapes, les liens de contact et le parcours GKGM sont conservés. |
| `docs/audit-general-avant-deploiement.md` | Présent complément au bilan. |

Pour actualiser les chiffres, modifier `MOBILITY_TRACK_RECORD.visas`, `workPermits` et leurs périodes dans le fichier de contenu, puis valider le rendu FR/EN. Les valeurs numériques ne sont pas dupliquées dans les textes explicatifs ; le calcul des visas n'inclut jamais les permis de travail. Modifier `partners` pour une évolution de la liste B2B, après validation éditoriale. Aucun CMS, nouvelle dépendance ou nouveau service n'est nécessaire.

Avec cette mise à jour et l'ajout du présent rapport, le périmètre préparé par rapport à la base `main` comprend désormais les 16 fichiers de la galerie déjà recensés, les trois fichiers fonctionnels GKGM ci-dessus et ce rapport, soit **20 fichiers**. Le logo officiel, le contenu source antérieur `content/mobility.js`, les formulaires, les métadonnées, le sitemap et les configurations restent inchangés.

### Contrôles refaits après l'ajout

| Contrôle | Résultat |
| --- | --- |
| `npm run lint` | Réussi. |
| `npm run test:forms` | 7 tests réussis. |
| `npm run build` | Réussi, 17 entrées générées ; avertissements Node déjà connus, non bloquants. |
| `npm run test:forms:browser` | Réussi : 12 parcours GKGM FR/EN et deux soumissions de partenariats simulées, sans trafic de formulaire réel. |
| Scripts `verify-home`, `verify-architecture`, `verify-entities`, `verify-institutional-pages`, `verify-partnerships`, `verify-news`, `verify-seo` | Tous réussis ; SEO contrôlé sur les 38 URL existantes. |
| Navigateur, FR et EN, 390/768/1440 px | Six combinaisons sans débordement, titres corrects, chiffres visas `[3, 2, 1]`, permis `8`, quatre partenaires et ancre de sommaire présents. |
| Conservation des rubriques | `studies`, `careers`, `visas`, `business`, `partnerships`, `compliance` et `contact` présents dans toutes les combinaisons testées. |
| Logo officiel | Comparaison Git à `main` : inchangé. |

La référence historique `verify-heroes` reste à revoir conformément à C2 ; cette nouvelle modification volontaire du contenu sous la bannière GKGM concerne également sa référence. Aucune baseline n'a été réenregistrée pour masquer les changements. Les dépendances étant inchangées, les alertes de sécurité C1 restent ouvertes ; aucun nouveau résultat npm audit n'est revendiqué pour ce complément.

### Validation attendue

Valider la présentation FR/EN, les libellés de résultats et les quatre noms de partenaires avant publication ; conserver en interne les justificatifs de résultats et les éléments établissant le périmètre des relations B2B et leur communication. La présente instruction autorise leur intégration à la préparation locale, pas une opération de publication.

Les réserves de l'audit général et les droits photographiques restent ouverts. **Branche locale uniquement : aucun push, aucune fusion, aucune PR et aucun déploiement.**
