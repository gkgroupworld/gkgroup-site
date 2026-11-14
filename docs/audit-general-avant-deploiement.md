# Audit général GK GROUP — avant déploiement

Date : 14 novembre 2026, fuseau Atlantic/Reykjavik.

**État actuel : voir la section 16, audit technique final et corrections locales.** Les points C1 à C5 de l'audit initial sont corrigés et les tests locaux passent. Les contrôles du compte Netlify, les validations de confidentialité avant ouverture GKGM et l'accord final de publication restent nécessaires. GKGM demeure désactivé pour les envois réels. Aucun push, aucune PR, aucune fusion ni aucun déploiement.

Mises à jour : réalisations/partenaires GKGM (section 11), galeries GKGT (12), illustrations et autorisations (13), personnes 23/24 (14), validation photographique définitive (15), puis corrections techniques et tests finaux (16). Les sections 1 à 15 conservent l'historique ; leurs versions de dépendances, échecs de tests et réserves photographiques ne décrivent plus l'état actuel lorsqu'ils sont remplacés ci-dessous.

## 1. Conclusion et périmètre

**Conclusion de l'audit initial, remplacée pour l'état courant par la section 16.** Le site compile et ses principaux contrôles fonctionnels passent, mais la mise en production ne doit pas encore être considérée comme validée. Les points initialement identifiés concernaient la sécurité des dépendances, les autorisations photographiques, l'ouverture du formulaire GKGM, Netlify, l'accessibilité et les tests.

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

## 12. Réorganisation des galeries — état actuel pour validation

La galerie historique quitte `/about` et rejoint `/gk-global-technology`, après les services existants et avant la méthode de travail, avec le titre **« Nos archives techniques » / « Our Technical Archives »**. Le nouveau texte relie les archives à l'héritage technique de GKGT historiquement exercé sous l'appellation GK Informatique, sans présenter cette activité historique comme une société distincte actuelle.

La section suivante, **« Notre atelier et notre boutique » / « Our Workshop and Store »**, est une structure bilingue d'accueil des futurs visuels récents. Elle ne contient aucune image, aucun appel d'image manquant ni illustration fictive. Un texte d'attente distingue ces futurs visuels des archives historiques. Les véritables photos récentes devront être fournies et validées avant ajout ; aucun local, équipement moderne ou agencement n'a été inventé.

### Périmètre des modifications

- `components/pages/AboutPage.js` : suppression de l'import et de l'insertion de galerie ; contenu revenu à celui de `main`, à conventions de fins de ligne près. Les sections historiques, mission/vision et autres contenus sont conservés.
- `components/pages/TechnologyPage.js` : insertion des deux sections et ajout des deux liens d'ancre `technical-archives` et `workshop-store` dans le sommaire ; services, méthode, formulaire et contacts existants conservés.
- `components/pages/TechnicalArchiveGallery.js` : nouveau titre et nouvelle introduction seulement pour le contexte GKGT ; liste, ordre, alternatives et légendes des douze photographies conservés.
- `components/pages/TechnologyWorkshop.js` et `content/technology-gallery.js` : structure sans image et textes FR/EN des deux sections.
- Rapports de galerie, texte de PR locale et présent bilan actualisés. Les anciennes mentions d'une galerie sur À propos dans les sections historiques de ce rapport décrivent l'état antérieur ; la présente section les remplace pour l'emplacement actuel.

Les douze fichiers dans `public/archives-techniques/` n'ont été ni supprimés, ni déplacés, ni réencodés ; comparaison directe au commit `72fc075` réussie octet pour octet. Les légendes FR/EN ont été comparées à leur liste précédente et sont identiques. Le logo officiel est identique octet pour octet. Les trois fichiers fonctionnels de la section GKGM (`MobilityPage.js`, `MobilityTrackRecord.js`, `mobility-track-record.js`) sont identiques à `72fc075` hors conventions de fins de ligne. Aucune modification du parcours GKGM ou des autres formulaires.

### Résultats des contrôles après déplacement

| Contrôle | Résultat |
| --- | --- |
| Lint et build de production | Réussis ; 17 entrées du build, avertissements Node connus non bloquants. |
| Tests unitaires Forms | 7 réussis. |
| Tests navigateur Forms | 12 parcours GKGM FR/EN et deux soumissions de partenariats simulées réussis ; aucun envoi réel. |
| Sept scripts de contenu/régression/SEO | `verify-home`, `verify-architecture`, `verify-entities`, `verify-institutional-pages`, `verify-partnerships`, `verify-news`, `verify-seo` réussis. |
| Galerie GKGT FR/EN à 390, 768 et 1440 px | Six combinaisons : 12 images chargées sur 12, aucun débordement horizontal, titres bilingues, sommaire et formulaire existant présents. |
| Atelier/boutique FR/EN | Titre et texte d'attente présents ; zéro image dans les six combinaisons. |
| À propos FR/EN | Galerie absente ; histoire et mission/vision présentes. |
| SEO | Les 38 URL sont conservées ; métadonnées, canonical, hreflang et sitemap inchangés. Aucune nouvelle route, uniquement deux ancres GKGT. |
| Test historique `verify-heroes` | Réexécuté : il passe désormais À propos puis échoue sur `/gk-global-technology?lang=fr`, dont le contenu sous bannière a volontairement changé. Aucune référence réenregistrée. La réserve C2 demeure pour GKGT et la modification GKGM précédente. |

Ces vérifications utilisent le navigateur et le build locaux ; elles ne constituent pas des essais sur appareils physiques ni sur Netlify. Le retrait de l'ancienne ancre `/about#technical-archives` est volontaire ; aucune redirection de fragment n'a été inventée. Les futures références à la galerie doivent utiliser `/gk-global-technology#technical-archives` (avec `?lang=en` avant le fragment pour l'anglais).

### Livraison et validations encore nécessaires

La présentation est prête pour revue locale. Valider les deux sections FR/EN et fournir les futurs visuels modernes authentiques lorsqu'ils seront disponibles. Les autorisations et vérifications des douze photos restent nécessaires avant toute publication publique ; leur déplacement ne modifie pas leur exposition potentielle depuis le dossier `public`. Les autres réserves de l'audit, notamment les avis de sécurité des dépendances et les réglages Netlify, restent ouvertes.

**Aucun push GitHub, aucune PR, aucune fusion et aucun déploiement Netlify.** Le travail reste sur `feature/galerie-archives-techniques` pour validation utilisateur.

## 13. Illustrations modernes et autorisations distinctes — état actuel

Les deux visuels fournis dans `GKGT_visuels_modernes.zip` sont intégrés sans retouche dans « Notre atelier et notre boutique » : atelier et boutique illustratifs, en PNG de 1672 × 941 px. Le badge, les légendes, les alternatives et l'introduction FR/EN les décrivent comme **illustrations**, non comme des photographies des installations réelles. Les douze photos authentiques restent séparées dans « Nos archives techniques », sans modification des originaux ni légendes.

Le responsable de GK GROUP confirme son autorisation générale de diffusion des douze archives et autorise l'usage des deux illustrations sur gkgroup.app. Cette autorisation remplace sa réserve générale antérieure, **mais les autorisations individuelles des photos 23/24, les droits des personnes/contenus affichés sur la photo 20 et les éléments identifiants/autorisations éventuelles des photos 16/18 restent expressément non confirmés**. Aucune autorisation de déploiement n'est donnée. Ces cinq photos restent dans le projet local et ne doivent pas être rendues publiques avant validation ou traitement décidé séparément.

La vérification visuelle retrouve notamment des personnes reconnaissables, une plaque en arrière-plan et du contenu à l'écran sur les photos signalées. Les étiquettes et codes-barres d'équipements sont signalés au registre sans transcription de leurs valeurs. Aucune métadonnée EXIF/XMP/IPTC n'est détectée dans les douze WebP, ce qui ne garantit pas l'absence d'informations visibles dans les pixels. Les illustrations modernes ne montrent pas de personne ou donnée personnelle lisible identifiée lors de la revue.

Le détail photo par photo et la distinction des autorisations acquises/en attente sont enregistrés dans `docs/gkgt-visuels-autorisations.md`, avec un registre technique `content/gkgt-publication-rights.json`. Le hook npm **`prebuild`** appelle `scripts/check-gkgt-publication.mjs` : les builds locaux restent possibles ; les builds exécutant la commande npm avec **`NETLIFY=true` sont bloqués tant que les cinq réserves sont en attente**. Le contrôle a été testé en processus local (code 0 hors Netlify, code 1 sous simulation Netlify, avec les cinq noms attendus). Aucun service distant n'est contacté par ce contrôle. Il ne remplace ni l'accord final ni un contrôle d'accès : ne pas téléverser le dossier public ou un build préexistant en contournant la commande prévue.

Contrôles de la mise à jour : lint, build local et 7 tests unitaires réussis ; 12 parcours GKGM FR/EN, deux soumissions de partenariats simulées et contrôle SEO des 38 URL réussis ; deux illustrations chargées dans chacune des six combinaisons FR/EN à 390/768/1440 px, sans débordement, avec mentions illustratives. Comparaisons binaires réussies pour les douze archives et le logo par rapport à `488f840`, ainsi que pour les nouveaux PNG par rapport aux fichiers fournis. Aucun changement GKGM, de formulaire, de métadonnées ou de sitemap. Les dépendances sont inchangées et leurs alertes de sécurité restent ouvertes ; la référence historique des bannières n'a pas été réenregistrée.

Les mentions de section atelier/boutique vide dans les états précédents sont remplacées par les deux illustrations, désormais autorisées et clairement signalées. Les droits photographiques spécifiques restent une condition préalable distincte de la validation finale de déploiement. **Aucun push, aucune fusion, aucune PR et aucun déploiement : travail local uniquement.**

## 14. Confirmation des autorisations des personnes — photos 23 et 24

Le 14 novembre 2026, l'utilisateur déclare, en qualité de responsable de GK GLOBAL GROUP SARLU, que les personnes visibles sur les photographies historiques 23 et 24 sont lui-même et des membres de son équipe et que toutes ont donné leur accord pour la publication des photographies concernées sur gkgroup.app. Il réaffirme l'autorisation d'utiliser les douze archives et les deux illustrations modernes dans la présentation de GKGT.

Les autorisations relatives aux personnes des photos **23 et 24 sont donc enregistrées comme confirmées sur la base de cette déclaration**, sans vérification indépendante de pièces individuelles et sans ajout de noms ou de données personnelles. Cette confirmation remplace les mentions d'autorisations de personnes en attente pour ces deux photos dans les états antérieurs du présent rapport. Elle ne vaut pas certification d'absence d'informations sensibles dans les images.

Les contrôles distincts de confidentialité, des éléments identifiants et des contenus de tiers sont maintenus, notamment pour les photos **16, 18 et 20**, toujours en attente. Ces trois photos ne doivent pas être rendues publiques avant résolution ; aucune image n'est supprimée ou retouchée. Le registre détaillé est actualisé dans `docs/gkgt-visuels-autorisations.md` et le registre technique dans `content/gkgt-publication-rights.json`.

Vérification ciblée effectuée : les entrées 23/24 sont confirmées ; seules 16/18/20 restent en attente. Le contrôle local renvoie 0 avec `NETLIFY=false` ; en simulant `NETLIFY=true`, il renvoie toujours 1 et liste uniquement 16/18/20. Aucun build ou déploiement distant n'a été lancé. Les contrôles complets de rendu/build précédents ne sont pas présentés comme réexécutés pour cette mise à jour documentaire et de statut.

Les contenus, photographies, illustrations, logo, fonctionnalités et ajouts GKGM sont inchangés. **Aucune autorisation finale de déploiement n'est donnée : aucun push, aucune PR, aucune fusion et aucun déploiement Netlify.**

## 15. Validation photographique définitive — copie 16 intégrée

Le responsable autorise explicitement la publication de la photo 18 dans son état actuel et de la photo 20, y compris les éléments à l'écran, sur la base de sa confirmation des droits nécessaires. Après examen de la proposition ImageGen, il approuve également la version 16 à arrière-plan professionnel modifié. Les autorisations des personnes des photos 23/24 restent confirmées sur sa déclaration. Les cinq entrées suivies dans `content/gkgt-publication-rights.json` sont désormais `confirmed` ; les décisions sont datées et motivées.

La galerie utilise `public/archives-techniques/16_unites-centrales-arriere-plan-modifie.png`. La légende et l'alternative FR/EN indiquent l'arrière-plan modifié. Le fichier original 16 est conservé, sans retouche et identique octet pour octet, dans `source-assets/archives-techniques/originals/16_IMG-20210728-WA0002(1).webp`, hors du dossier public. Les onze autres WebP ne sont pas modifiés. Cette copie approuvée ne prouve pas l'existence des locaux représentés ; elle reste explicitement une image à arrière-plan modifié.

Le registre de référence `docs/gkgt-visuels-autorisations.md` est actualisé, avec les chemins, la traçabilité de la proposition, les confirmations et les vérifications. Les mentions antérieures de trois ou cinq réserves photographiques ouvertes sont remplacées par cette validation. Aucune autre réserve photographique concrète non résolue n'est enregistrée à ce stade pour les fichiers retenus, sur la base des déclarations du responsable et des revues visuelles.

**Blocage photographique levé :** le contrôle existant retourne 0 sous simulation locale `NETLIFY=true`. Il reste en place pour d'éventuelles nouvelles réserves, mais n'empêche plus le build pour les photographies validées. Aucun build Netlify n'a été demandé. Ce résultat ne vaut pas autorisation de mise en production et ne lève pas les autres points de l'audit, notamment les alertes de sécurité des dépendances.

Contrôles refaits : lint, 7 tests unitaires et build local réussis ; galerie chargée 12/12 en FR/EN à 390/768/1440 px, sans débordement, avec source et légende 16 correctes ; deux illustrations conservées ; SEO 38 URL réussi. Vérification HTTP locale : copie 16 en 200, ancienne URL de l'original et chemin `source-assets` en 404, optimisation de l'ancienne URL en 400 après purge du cache local d'images générées. Logo, illustrations, fonctionnalités, métadonnées et ajouts GKGM préservés.

**Aucun push, aucune fusion, aucune PR et aucun déploiement. L'accord final explicite de mise en production est toujours requis.**

## 16. Audit technique final — corrections locales du 14 novembre 2026

### Périmètre et résultat actuel

Reprise du checkout existant `galerie-work`, branche `feature/galerie-archives-techniques`, à partir du commit photographique validé `88253e0`. Aucun travail antérieur n'a été annulé. L'inventaire réel avant le présent rapport comprend 28 fichiers suivis modifiés et cinq nouveaux fichiers de vérification, soit davantage que les dix fichiers évoqués dans la demande de reprise. Le rapport constitue le 34e fichier du lot final. Les modifications concernent les dépendances, les styles accessibles, les messages et protections de formulaires, les tests et leur compte rendu. Aucun autre checkout n'a été substitué au projet.

**Les corrections C1 à C5 sont terminées et les contrôles locaux passent. La publication reste non autorisée.** Les autorisations photographiques de la section 15 restent acquises ; aucun nouvel obstacle photographique n'est identifié. Les conditions opérationnelles Netlify et les validations de confidentialité restent distinctes.

### Corrections terminées

| Point | Correction et preuve |
| --- | --- |
| C1 — Dépendances npm | Next.js et `eslint-config-next` épinglés à **16.4.6**, React/React DOM à **19.2.9**, adaptateur Netlify à **5.16.7** ; dépendances transitives actualisées et verrouillage conservé. L'audit npm complet passe de 18 paquets vulnérables (1 critique, 8 élevés, 8 modérés, 1 faible) à **0**, développement inclus ; `npm audit --omit=dev` retourne également 0. |
| C2 — Tests obsolètes | `verify-heroes` compare toujours les textes/actions approuvés des bannières, leurs logos, métadonnées et schémas. L'ancienne empreinte opaque de tout le contenu sous bannière est remplacée par les assertions de contenu existantes et un contrôle dédié des galeries/GKGM. Le fichier de référence historique n'a pas été réenregistré pour masquer les changements. Les 24 variantes de bannières passent. |
| C3 — Contraste | Textes orange et boutons concernés utilisent un or brun plus foncé (`#946020`, survol `#805217` pour les boutons), sans modification des fichiers de marque. Les libellés gris sur le panneau Contact sont assombris ; la numérotation EstTrade aussi. Le reset global des liens est placé dans la couche CSS de base afin que les couleurs Tailwind des liens puissent s'appliquer. Les éléments décoratifs orange restent présents. |
| C4 — ARIA et langues | Le nom accessible du menu mobile est « Navigation mobile » / « Mobile navigation ». Ajout d'un lien d'évitement FR/EN et d'une cible principale focalisable sur les pages. Premier Tab puis Entrée vérifiés : le focus atteint `main-content`. |
| C5 — Confirmation des partenariats | Messages FR/EN limités à la prise en charge par le service, avec réserve antispam et contacts de récupération ; aucune promesse de réception ou de traitement par l'équipe. Détection renforcée d'un faux succès lorsque le POST renvoie le fichier HTML de référence, y compris avec des apostrophes autour de l'attribut. Erreurs et réponses saisies restent visibles/préservées. |
| GKGM — Préparation | Les deux indicateurs restent nécessaires et doivent valoir exactement `true`. Les contextes reconnus `deploy-preview`, `branch-deploy` et `dev` refusent désormais l'activation même si les deux indicateurs sont vrais. Tests ajoutés pour ces contextes et les valeurs non valides. Aucune variable de compte n'a été modifiée et aucun collecteur réel n'a été activé. |
| Préservation | Test SHA-256 de 24 fichiers approuvés : logos, douze visuels historiques publiables, original 16 hors dossier public et deux illustrations. Identité binaire confirmée par rapport à `88253e0`. Les textes/chiffres/partenaires GKGM validés sont conservés. Aucun fichier sous `public` ou `source-assets` n'est modifié. |

La dernière chaîne ESLint/TypeScript disponible conserve une dépendance vulnérable à `minimatch` 10. Un override **limité à `@typescript-eslint/typescript-estree`** impose `minimatch` **11.0.1**, version corrigée de l'avis [GHSA-g3hv-75wg-m249](https://github.com/advisories/GHSA-g3hv-75wg-m249). Le consommateur utilise l'API nommée `minimatch` avec `dot: true` : six cas de correspondance représentatifs sont testés, et le lint réel passe. Aucun `npm audit fix --force` n'a été utilisé. Réexaminer cet override lorsque l'amont supprimera la dépendance affectée. La mise à jour Next correspond à la [release officielle 16.4.6](https://github.com/vercel/next.js/releases/tag/v16.4.6). Un audit à zéro porte sur les avis connus du registre au moment du contrôle, sans certification de sécurité absolue.

ESLint 9 reste utilisé avec sa configuration compatible. Son avertissement de fin de maintenance appelle une migration coordonnée ultérieure : ne pas forcer ESLint 10 tant que les plages de compatibilité des plugins React/import/accessibilité utilisés ne l'acceptent pas. Cela ne constitue pas une vulnérabilité npm encore ouverte dans le verrouillage vérifié.

### Tests réellement exécutés

| Contrôle | Résultat final et portée |
| --- | --- |
| `npm run lint` | Réussi, aucun diagnostic ESLint. |
| `npm run build` | Réussi avec Next.js 16.4.6 ; génération des 17 entrées, routes dynamiques/robots/sitemap et Proxy conservés. |
| `npm run test:unit` | **9 tests réussis**, aucun ignoré : transport Forms, champs/consentement/confidentialité, activation GKGM, protection des fichiers approuvés et compatibilité du matcher corrigé. |
| `npm run test:pages -- http://127.0.0.1:3116` | Les neuf scripts passent : accueil, architecture, entités, institutionnel, partenariats, actualités, SEO, bannières et galeries. Nouvelle commande reproductible ; le serveur local doit être démarré séparément. |
| SEO et indexabilité dans le code | **38 URL FR/EN**, canonical, hreflang, sitemap, JSON-LD, repli linguistique, exclusions des ressources et formulaires de référence vérifiés. Les métadonnées validées sont conservées. |
| Galerie et réalisations GKGM | 12 figures historiques FR/EN, deux illustrations signalées, copie 16 correcte, original 16 non servi, absence de galerie sur About ; six visas et huit permis distincts, quatre partenaires conservés. Les douze fichiers publiables répondent en HTTP 200 ; les chemins publics testés de l'original 16 répondent 404. |
| `npm run test:forms:browser` | **12 parcours GKGM FR/EN**, six catégories et quatre étapes ; réponses conservées, consentement non précoché, champs pertinents, erreurs HTTP/réseau/faux succès et reprise vérifiés. Deux parcours de partenariat FR/EN : chacun refuse un 503 et un faux succès HTML avant l'accusé simulé, avec texte final exact et conservation des réponses. |
| Isolation des formulaires simulés | Données fictives uniquement ; requêtes externes interceptées. L'activation des deux indicateurs n'existe que dans le processus de test local isolé sur 3115. Aucun envoi vers Netlify, Zoho, WhatsApp ou une boîte réelle. Résultats consignés dans `docs/gkgm-netlify-browser-audit.json`. |
| Responsive | **104 combinaisons** : 13 pages principales × FR/EN × 390/768/1280/1440 px, sans débordement horizontal ; une cible principale, lien d'évitement et nom mobile localisé contrôlés. Parcours formulaires simulés aussi à 390/768/1440 px ; menu anglais ouvert et vérifié à 390 px. |
| Accessibilité ciblée | Calcul des contrastes des textes visibles simples sur les 26 variantes des 13 pages, en tenant compte des couleurs CSS `lab`/`oklch` et du fond opaque hérité. Les écarts Contact et EstTrade repérés ont été corrigés et leurs couleurs effectives revérifiées. Contrôle clavier du lien d'évitement réussi. Ce contrôle ciblé n'est pas une certification WCAG exhaustive. |
| Mesure HTTP locale | Les 38 URL du sitemap retournent 200 ; corps HTML de **40 158 à 136 924 octets**, requêtes de **10 à 29 ms** sur boucle locale. Ces mesures ne représentent ni le chargement complet des images/scripts ni un réseau mobile ou l'hébergement final. |
| Audit et diff | Audit complet et production : zéro vulnérabilité signalée. `git diff --check` réussi. Aucun changement des fichiers de logo/photos/illustrations, des données de réalisations GKGM, du sitemap ou de `netlify.toml`. |

Un build lancé dans le bac à sable a rencontré une erreur de sous-processus Turbopack ; les vérifications réseau locales/npm ont aussi rencontré les restrictions du bac à sable. Le cache de sortie `.next` a été régénéré, sans toucher aux sources, puis le build et les contrôles HTTP/npm ont été relancés dans l'environnement local autorisé et ont réussi. Le dernier build incrémental a également réussi. L'avertissement Node sur le type de module implicite des imports de tests est non bloquant ; le mode des modules de tout le projet n'a pas été changé uniquement pour le supprimer. Environnement testé : Node **26.9.0** sous Windows.

### Netlify : risque de publication prématurée et contrôles non accessibles

`netlify.toml` reste inchangé : `npm run build`, `.next`, plugin Next.js. Aucun blocage global, règle de branches ou contexte de previews n'y garantit une suspension des déploiements. Le contrôle photographique passe désormais, conformément aux autorisations : **il ne doit plus être pris pour un verrou général de publication**. Un futur push, une PR, un build hook ou une action de compte pourrait déclencher une publication selon les réglages réels. Aucune de ces actions n'a été exécutée.

La recherche d'une intégration Netlify disponible n'en a pas trouvé ; aucune liaison CLI locale au site n'est présente. L'interface Netlify consultée présente un écran de connexion, sans accès aux paramètres du site. **Les réglages effectifs du compte n'ont donc pas été vérifiés ni modifiés.** Il faut contrôler avant toute opération distante : dépôt/base/branche de production, builds automatiques, Deploy Previews, branch deploys, hooks, éventuelles automatisations externes, protection des previews, variables et notifications.

Ne pas se fier à un marqueur de commit ou à une commande `ignore` pour couvrir tous les déclencheurs : la [documentation Netlify sur les builds ignorés](https://docs.netlify.com/build/configure-builds/ignore-builds/) précise notamment que les build hooks peuvent contourner la commande `ignore`. Le maintien du travail exclusivement local est la précaution appliquée pendant cet audit.

La version Node n'est pas fixée dans le dépôt. Il reste à confirmer une version supportée identique pour les builds et fonctions Netlify, puis à refaire les contrôles avec cette version ; la version Windows testée ne prouve pas celle du runtime cloud. Voir la [gestion des dépendances Netlify](https://docs.netlify.com/build/configure-builds/manage-dependencies/). Vérifier aussi domaine principal/HTTPS/redirections, en-têtes réels, absence de noindex en production, protection des previews et dernier déploiement stable disponible pour retour arrière.

### GKGM : maintien fermé et décisions de confidentialité

Le serveur de vérification normal utilise les deux indicateurs à `false` ; la page FR/EN annonce que l'envoi réel reste désactivé. Les variables Netlify réelles n'étant pas accessibles, leur valeur et leur portée restent à confirmer dans le compte. La protection des previews dans le code complète cette vérification mais ne la remplace pas : `CONTEXT` n'est pas supposé disponible dans toutes les exécutions serveur. Les indicateurs doivent rester absents ou faux jusqu'à autorisation explicite.

Les deux indicateurs ferment l'envoi dans l'interface ; **ils ne ferment pas les POST directs au collecteur natif Netlify Forms**, dont le fichier de définition reste présent. Ce comportement est conservé et doit être accepté explicitement, ou remplacé par une admission serveur dédiée dans un travail ultérieur autorisé. Aucune garantie de fermeture technique du collecteur distant n'est affirmée.

La préparation conserve validation et minimisation des champs, aucune pièce jointe/passeport demandé, reconnaissance de lecture non précochée et absence d'autorisation marketing/partenaires. La notice FR/EN reste préparatoire : confirmer l'adresse complète du responsable, base juridique et droit applicable, droits/délais/recours, pays et garanties des transferts Netlify/Zoho, accès/MFA et durées de sauvegarde. La règle de douze mois pour les demandes sans suite et le contrôle hebdomadaire exigent une mise en œuvre effective incluant notifications, exports et copies ; aucune suppression automatique n'est ajoutée. Ces points nécessitent une validation compétente et ne sont pas inventés ou déclarés conformes par cet audit.

### Décisions et validations encore nécessaires avant publication

| Point restant | Action / décision nécessaire |
| --- | --- |
| Déclencheurs et environnement Netlify | Faire contrôler les réglages ci-dessus dans une session authentifiée et convenir du mécanisme évitant toute publication anticipée ; fixer et tester le runtime retenu. Aucun changement de compte effectué. |
| GKGM | Maintenir fermé ; approuver séparément la notice complétée, les procédures d'accès/conservation/transferts et le mode de collecte avant toute activation. |
| Informations de confidentialité du site | Faire valider les mentions accessibles pour l'ensemble des formulaires ; aucune route autonome de mentions légales/confidentialité n'existe à ce jour. L'absence de cette route n'est pas assimilée à une validation juridique des notices intégrées. |
| Réception opérationnelle des formulaires | Après autorisation distincte, essai fictif réel : détection des deux définitions, champs, antispam, quotas, notifications Netlify/Zoho et réception par l'équipe. Un HTTP 200 simulé ne suffit pas. Voir le [dépannage officiel Forms](https://docs.netlify.com/manage/forms/troubleshooting-tips/). |
| Revue finale | Examiner ce rapport et les corrections FR/EN ; confirmer le lot exact et donner l'autorisation explicite avant push/PR/fusion/déploiement. Prévoir contrôles de domaine/SEO et retour arrière lors de l'unique mise en production autorisée. |

**Tests non effectués :** aucun déploiement ou build cloud Netlify ; aucun test réel de réception Forms/email/WhatsApp ; aucun contrôle Search Console/DNS/HTTPS du domaine final ; aucun test sur appareils physiques, Safari/iOS ou lecteur d'écran ; aucun audit WCAG exhaustif, Lighthouse avec réseau mobile ou mesure Core Web Vitals en production. Ces limites restent ouvertes ; les résultats locaux ne les remplacent pas.

**Améliorations recommandées après mesure/validation :** migration coordonnée de l'outillage ESLint, suivi de l'override minimatch, contrôle clavier/zoom/lecteur d'écran approfondi, mesure LCP/CLS/INP sur l'environnement autorisé, politique d'en-têtes compatible et documentation d'exploitation. Aucune réécriture de contenu validé, optimisation destructive d'images ou activation distante n'est engagée pour ces recommandations.

**Livraison : corrections et rapport réunis dans le commit local de cet audit sur la branche de préparation. Aucun push, aucune fusion, aucune PR et aucun déploiement Netlify. L'accord final explicite de publication reste requis.**
