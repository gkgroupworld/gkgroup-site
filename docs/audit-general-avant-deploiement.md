Les statuts de réserves et les résultats de garde mentionnés dans les sections chronologiques décrivent la situation au moment de chaque étape. Pour l'état actuel des autorisations, se reporter à la section 25 et au document docs/gkgt-visuels-autorisations.md.

# Audit général GK GROUP — avant déploiement

Date : 15 novembre 2026, fuseau Atlantic/Reykjavik.

**État de référence GKGM : section 18, confirmation de la configuration GKGM déjà validée.** Les points techniques C1 à C5 sont corrigés. Le responsable confirme que GKGM doit rester accessible et opérationnel, avec réception prévue à `gk.contactus@gkgroup.app`, conservation de 12 mois et maintien des règles d'accès/confidentialité validées. L'activation publique observée en FR/EN est donc conforme à cette consigne et ne constitue plus un écart à corriger. Les destinataires réels, les accès et l'application de la conservation dans Netlify/Zoho restent non vérifiés faute d'accès authentifié. Aucun push, aucune PR, aucune fusion ni aucun déploiement effectué.

Mises à jour : réalisations/partenaires GKGM (section 11), galeries GKGT (12), illustrations et autorisations (13), personnes 23/24 (14), validation photographique définitive (15), corrections techniques (16), vérification Netlify (17), puis confirmation de la configuration GKGM existante (18). Les sections précédentes conservent l'historique ; leurs consignes de fermeture remplacées ne doivent plus être appliquées.

La section 19 consigne ensuite la proposition de direction visuelle internationale, **sans modification du site ni remplacement d'image**.

**Dernière mise à jour — section 25 :** intégration locale des copies photographiques GKGT V2 sans IA. Galerie de 21 photographies réparties dans cinq séquences éditoriales, avec douze archives, neuf nouvelles vues et deux illustrations préservées. Les autorisations des neuf nouvelles vues sont désormais enregistrées comme confirmées dans `content/gkgt-authentic-batch.json`. Les cinq dossiers historiques du registre `content/gkgt-publication-rights.json` sont également confirmés. Le contrôle local du garde avec `NETLIFY=true` a réussi le 15 novembre 2026 (code de sortie 0). La revue visuelle finale des 122 variantes WebP reste à effectuer. Préparation locale uniquement : aucun push, aucune PR, aucune fusion ni aucun déploiement. Les consignes GKGM des sections antérieures restent inchangées.

**État de présentation le plus récent : sections 21 et 22.** Les 21 vues GKGT sont désormais réparties dans cinq séquences éditoriales, sans répétition ni changement d'autorisation. GKGM présente les résultats historiques complémentaires déclarés pour le Canada, l'Albanie et quatre destinations de visite, avec clarification canadienne et anciens résultats/partenaires préservés. Les deux pages restent en préparation locale pour validation.

La section 23 consigne ensuite l'accentuation technique légère des copies GKGT, explicitement choisie sans IA, sans modification des originaux ni levée d'autorisation.

**Dernière revue — section 24 :** disposition des cinq séquences validée ; audit de définition et de diffusion photo par photo. Cinq meilleurs JPG retrouvés, limites de source et seconde compression Next q75 documentées. Vingt et une variantes sont proposées dans un support séparé, sans remplacer les images actuellement sélectionnées et sans reconstruction IA.

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

## 17. Vérification préproduction Netlify — 14 novembre 2026

**Actualisation : la section 18 remplace les demandes de fermeture ou de nouvelle autorisation d'activation de cette section.** Le constat technique `enabled: true` reste exact ; le responsable confirme ensuite que l'accessibilité et le fonctionnement du formulaire sont voulus et déjà validés. Aucun plan de fermeture n'est désormais demandé.

### Conclusion et limites d'accès

Revue en lecture seule du dépôt au commit local **`b3b2521`**, de la documentation officielle Netlify et de quatre URL publiques déjà déployées. Aucun fichier applicatif, paramètre Netlify, formulaire distant ou déclencheur n'a été modifié. La recherche d'une intégration Netlify n'en trouve pas ; pas de CLI Netlify installée ni de `.netlify/state.json` local. Le tableau de bord affiche **Log in** : aucune session authentifiée n'est disponible. Les valeurs confidentielles des variables et les soumissions des utilisateurs n'ont pas été consultées.

**Point prioritaire : l'affirmation de fermeture GKGM des sections antérieures concerne le checkout local, pas une observation de production.** Le GET de `https://gkgroup.app/gkgm-project?lang=fr`, confirmé à **13:57:38 UTC**, retourne 200 avec une action de formulaire `/__gkgm-forms.html`, un paramètre public de composant **`enabled: true`**, et sans le message d'envoi désactivé. Cela établit que l'interface servie est configurée pour autoriser l'envoi. Ce n'est ni un test de réception, ni une lecture des variables secrètes, ni une identification du commit déployé. Aucun POST n'a été fait. **La fermeture de la version publique n'est donc pas confirmée et exige une intervention autorisée du responsable.**

### Configuration et branche : confirmé / à vérifier

| Élément | Confirmé dans le dépôt | Encore à vérifier dans Netlify |
| --- | --- | --- |
| Dépôt Git | `origin` désigne `gkgroupworld/gkgroup-site`. | Le site qui sert gkgroup.app est-il effectivement relié à ce dépôt et à la bonne équipe ? |
| Branche de préparation | `feature/galerie-archives-techniques`, commit `b3b2521` au début de cette revue. | Son inclusion éventuelle dans les branch deploys ; aucune branche locale n'est présumée privée une fois poussée. |
| Branche principale | `main` local suit `origin/main`, référence locale `4ee789f`. Aucun rafraîchissement distant effectué pendant cette revue. | **Branche de production inconnue** : la présence de `main` ne prouve pas le réglage « Production branch ». Relever aussi le SHA du déploiement réellement publié. |
| Build | `netlify.toml` : `command = "npm run build"`, `publish = ".next"`, plugin `@netlify/plugin-nextjs` ; version verrouillée 5.16.7. Next.js 16.4.6, React 19.2.9, verrouillage npm présent. | Base directory, package directory, chemin du fichier de configuration, commande et dossier effectifs du dernier build. Le nom local `galerie-work` ne doit pas être copié automatiquement comme base du dépôt distant. |
| Installation / runtime | Aucune version Node fixée par `engines`, `.nvmrc` ou `.node-version`. Environnement local déjà testé : Node 26.9.0. | Versions Node/npm réellement utilisées pour build et fonctions, politique d'installation, cache et version de l'adaptateur effectivement déployée. |
| Contrôles automatiques | Le build npm lance le contrôle des droits photographiques puis Next. Lint et suites de tests ne sont pas inclus dans cette commande. Aucun workflow sous `.github/workflows` dans ce checkout. | Autres automatisations externes, contrôles GitHub, règles de déploiement et résultats du dernier build. |
| Arrêt de publication | Aucun verrou global ni restriction de branches/previews dans `netlify.toml`. Le contrôle des photos validées passe désormais. | État réel des builds, auto-publication, previews, branches et build hooks. Le contrôle photo ne vaut pas verrou de publication. |

### Risque lors d'un futur push et mesures manuelles possibles

Un push sur la branche de production peut lancer un build puis une publication ; un push sur la branche de préparation peut créer un branch deploy selon les réglages. Une PR peut créer une Deploy Preview. Hooks, API et actions manuelles sont d'autres voies. Ces possibilités sont à vérifier dans le compte ; aucune n'a été déclenchée ici.

Deux réglages distincts peuvent être proposés **à validation avant modification** :

- **Stopped builds**, dans `Project configuration > Developer settings > Continuous deployment > Build settings` : empêche les builds Netlify déclenchés par Git, previews, branches, hooks, API de build et interface, selon la [documentation officielle](https://docs.netlify.com/build/configure-builds/stop-or-activate-builds/). À vérifier avant tout futur push si l'objectif est de suspendre les builds. Ne pas l'assimiler à un blocage universel de tout téléversement manuel.
- **Lock to stop auto publishing**, depuis la liste Deploys : conserve le déploiement publié mais ne supprime pas les autres builds ni leurs URL de prévisualisation. Voir [gestion des déploiements](https://docs.netlify.com/deploy/manage-deploys/manage-deploys-overview/). Ce verrou ne ferme pas un formulaire déjà actif sur le déploiement conservé.

Ni un marqueur `[skip netlify]`, ni le simple fait de pousser hors `main`, ni le fait de verrouiller l'auto-publication ne doit être pris pour une garantie d'absence de prévisualisation publique. Aucun de ces réglages n'a été changé.

### Variables nécessaires — noms et portées, sans valeurs confidentielles

| Variable / famille | Usage et consigne |
| --- | --- |
| `GKGM_FRONTEND_ENABLED` | Interrupteur serveur de l'envoi GKGM ; **doit rester absent ou à `false` avant autorisation**. Valeur réelle Netlify non consultée. |
| `GKGM_PRIVACY_APPROVED` | Deuxième interrupteur indépendant ; même consigne de fermeture. Ne passer à `true` qu'après validation juridique/opérationnelle et autorisation explicite. |
| Portées des deux interrupteurs | Le rendu Next lit `process.env` côté serveur : contrôler la disponibilité dans **Functions**, et Builds si nécessaire à l'adaptateur. La portée Netlify appelée « Runtime » concerne notamment Forms et ne remplace pas Functions pour Next SSR. Contrôler les variables partagées d'équipe, leurs surcharges par site et par contexte. |
| `CONTEXT` | Contexte Netlify utilisé pour refuser les previews reconnues ; ne pas supposer sa présence au runtime des fonctions. Les deux interrupteurs doivent aussi être fermés dans les contextes de prévisualisation. Ne pas créer une fausse valeur de contexte pour contourner ce refus. |
| `NETLIFY` | Indicateur de build fourni par la plateforme et lu par le contrôle photographique. Ne pas le falsifier pour contourner le contrôle. |
| `NODE_ENV` / `GK_NEWS_LOCAL_PREVIEW` | La preview éditoriale exige le mode développement et l'option locale ; ne pas activer cette option en production. Laisser Netlify/Next gérer le mode de production. |
| Version Node | Paramètre de build tel que `NODE_VERSION`, et runtime fonctions à contrôler séparément. Aucune valeur cloud n'est confirmée ou choisie par ce rapport. |
| Secrets SMTP/Zoho, API Forms, base de données | **Aucun n'est requis par le code actuel** des deux collecteurs natifs et des liens email/WhatsApp. Ne pas ajouter de jeton Netlify, mot de passe SMTP ou secret `NEXT_PUBLIC_*` pour faire fonctionner ces formulaires. Les notifications natives se règlent dans le compte. |

Sources : [portées et contextes des variables](https://docs.netlify.com/build/environment-variables/overview/) ; [variables des fonctions](https://docs.netlify.com/build/functions/environment-variables/). Pour les fonctions, les variables sont attachées au déploiement : modifier une valeur dans le tableau de bord ne garantit pas la désactivation immédiate du déploiement existant ; la documentation prévoit un nouveau déploiement pour appliquer les mises à jour. **Aucun redéploiement, même de l'ancienne version, n'est autorisé par cette demande.** Le responsable devra décider d'un plan de fermeture compatible avec cette contrainte, avant toute intervention.

### Formulaires et destinations

| Parcours | Définition et destination technique locale | Destination humaine / statut distant |
| --- | --- | --- |
| Partenariats | `international-partnerships`, définition `public/__forms.html`, POST URL-encodé vers `/__forms.html`, honeypot `fax`, champs et consentement FR/EN. | Les pages existantes `/partnerships?lang=fr` et `/__forms.html` répondent 200. La définition servie conserve le bon nom. Le destinataire réel des notifications reste inconnu. `gk.contactus@gkgroup.app` est un contact prévu, pas une preuve du réglage Netlify. |
| Projet GKGM | `gkgm-project-inquiry`, définition `public/__gkgm-forms.html`, POST vers `/__gkgm-forms.html` seulement si l'interface est activée ; honeypot `fax`, version de notice, champs conditionnels et consentement. | La définition publique répond 200 et porte le bon nom. **L'interface publique observée transmet `enabled: true`**, contrairement au défaut local fermé. La notice prévoit des notifications à `gk.contactus@gkgroup.app` via Zoho ; configuration et réception réelles non vérifiées. |
| Contact / demandes techniques | `ContactForm` prépare un lien WhatsApp vers le numéro professionnel +228 90 55 98 88 ou un `mailto:` vers `gk.contactus@gkgroup.app`. | Ce n'est pas un collecteur Netlify : aucun enregistrement ou email n'est prouvé par l'ouverture d'un lien. `info@gkgroup.app` est l'adresse générale affichée, distincte de ces envois. |

Les deux ressources de définition publiques portent leurs marqueurs de référence et le nom de formulaire attendu ; cela ne prouve ni leur présence effective dans Forms, ni l'acceptation des POST, ni la destination des notifications. Les chemins statiques sont exclus du Proxy local. Vérifier dans le compte la détection, les champs, quotas, filtres, listes Verified/Spam et les notifications propres à chaque formulaire. Les [notifications Forms](https://docs.netlify.com/manage/forms/notifications/) peuvent viser un formulaire précis ou tous ; contrôler les destinataires, webhooks et intégrations. Selon le mécanisme disponible pour l'équipe, une adresse externe doit être confirmée ou correspondre à un membre actif ; l'adresse de réponse de l'expéditeur ne définit pas le destinataire des notifications.

**État local confirmé :** `projectDeliveryConfig({})`, la configuration avec les deux indicateurs faux et l'environnement local hérité retournent tous `enabled: false`. Les sept tests unitaires Forms ont été réexécutés et passent, y compris le refus en preview. Les interrupteurs ne ferment pas les POST directs à Netlify Forms. L'état public n'a pas été modifié pour essayer de le faire correspondre au local.

### Test réel possible sans publier le lot local — procédure proposée, non exécutée

La [détection Forms](https://docs.netlify.com/manage/forms/setup/) repose sur le HTML déployé. Les deux définitions existent déjà publiquement : **un test sur le formulaire de partenariat déjà publié peut donc être envisagé sans publier `b3b2521`**, sous réserve de confirmer sa présence dans Forms. Il vérifierait la chaîne existante, pas l'exécution du nouveau code local.

1. Dans le bon projet Netlify, relever le déploiement publié et vérifier que `international-partnerships` est détecté, avec les champs attendus et un destinataire autorisé/confirmé. Ne rien enregistrer si un réglage manque : rapporter l'écart avant changement.
2. Obtenir l'accord pour **une soumission réelle identifiée comme test**, avec données d'organisation fictives, aucun dossier personnel ni pièce, et une adresse de test détenue/contrôlée par GK GROUP. Convenir du destinataire et du créneau. Ne pas utiliser l'adresse d'un tiers inventé.
3. Après cet accord seulement, soumettre via le formulaire **déjà en ligne**, avec un marqueur unique tel que `TEST-RECEPTION-GK-AAAAMMJJ-01`, honeypot vide et message indiquant qu'aucun traitement commercial n'est demandé. Pas de push, pas de preview nouvelle, pas de déploiement.
4. Corréler la soumission dans Verified ou Spam avec le marqueur et l'heure ; vérifier la notification dans la boîte prévue, y compris les indésirables, et contrôler les champs FR/EN nécessaires. Une page de succès ou un HTTP 200 ne prouve pas la réception en boîte.
5. Consigner le résultat sans recopier de données personnelles ni de secrets ; gérer ensuite la conservation du test selon une décision autorisée. Aucune suppression distante n'est effectuée par cet audit.

**GKGM est exclu de cette proposition immédiate** : un test réel de son collecteur exige une autorisation spécifique distincte de la validation de ses photographies et une résolution préalable de la fermeture demandée. Sa présence active observée n'est pas une autorisation d'utilisation. Si un formulaire n'est pas enregistré ou si ses notifications doivent être modifiées, le test complet reste en attente ; aucune création de site, de preview, de nouveau collecteur ou de déploiement n'est autorisée implicitement. Les tests locaux simulés restent disponibles mais ne prouvent pas la réception Netlify/Zoho.

### Opérations manuelles à prévoir, sans les exécuter automatiquement

| Priorité | Écran / vérification | Intervention nécessitant décision |
| --- | --- | --- |
| Prioritaire — GKGM déjà public | Déploiement publié : SHA, date, code/configuration effective ; variables des fonctions et contextes. | Déterminer pourquoi `enabled: true` est servi et approuver un plan de fermeture. Changer des variables seules peut nécessiter un nouveau déploiement ; ne pas cliquer sur Trigger deploy/Retry sans accord. Fermer l'interface ne fermerait pas nécessairement le collecteur natif. |
| Avant futur push | Continuous deployment : Production branch, repository/base/package directories, Build status, branches/previews et hooks ; Deploys : auto-publication. | Décider d'arrêter les builds et/ou de verrouiller l'auto-publication. Ces deux opérations seraient des changements distants et ne sont pas réalisés ici. |
| Avant publication | Build settings et logs du déploiement existant, versions Node/npm/adaptateur, domaine principal et protections de previews. | Retenir et valider l'environnement cohérent, sans rejouer un build automatiquement. |
| Avant test réel | Forms : formulaires détectés, quotas, antispam, accès ; Submission notifications : destinataires et confirmations. | Approuver la soumission fictive réelle et toute modification de notification éventuellement nécessaire. Aucun test expédié ici. |
| Avant ouverture GKGM | Notice, transferts, conservation/sauvegardes, accès Zoho/Netlify et MFA, traitement des notifications/copies. | Valider les éléments encore ouverts de la section 16, puis donner une autorisation spécifique d'activation. |

### Bilan de cette vérification

**Confirmés :** configuration du dépôt, branche de travail, dépendances épinglées, deux définitions et endpoints, destinations de contact codées, défaut local GKGM fermé, sept tests Forms réussis ; quatre GET publics en 200, avec interface GKGM publiée configurée `enabled: true`. **Non confirmés :** branche de production réelle, SHA publié, réglages d'automatisation, valeurs/portées des variables de compte, détection Forms, destinataires et réception effective. L'accès à ces paramètres nécessite une session Netlify authentifiée du responsable ; aucun secret n'est demandé dans le rapport.

Seul le présent rapport est modifié localement. Lint/build, audit npm complet, parcours navigateur et responsive du lot `b3b2521` ne sont pas présentés comme réexécutés pour cette revue documentaire : leurs résultats restent ceux de la section 16. **Aucun POST distant, aucune modification distante, aucun push, aucune PR, aucune fusion et aucun déploiement.**

## 18. GKGM — configuration existante confirmée par le responsable

Le 14 novembre 2026, le responsable confirme que le formulaire **doit rester accessible et opérationnel sur gkgroup.app**, que l'adresse de réception prévue est **gk.contactus@gkgroup.app**, que la durée retenue est de **12 mois**, et que les règles d'accès et de confidentialité précédemment validées doivent être conservées. Cette confirmation remplace la consigne antérieure de maintenir GKGM désactivé ; elle n'autorise aucun push, PR, fusion ou déploiement. Aucun formulaire n'est recréé et aucune configuration applicative ou distante n'est modifiée.

### Vérification ciblée et résultat

| Paramètre | Projet local | Configuration publique / compte |
| --- | --- | --- |
| Accessibilité et envoi | `projectDeliveryConfig` autorise l'interface de production lorsque `GKGM_FRONTEND_ENABLED` et `GKGM_PRIVACY_APPROVED` valent exactement `true`. Défaut fermé hors configuration explicite et refus des previews reconnus conservés ; ce mécanisme ne nécessite pas de réécriture. | Deux GET FR/EN du 14 novembre à **14:04 UTC** retournent 200, le paramètre public `enabled: true` et l'action `/__gkgm-forms.html`. L'interface publique est configurée pour l'envoi, conformément à la consigne. Aucune soumission réelle n'est faite pour prouver la réception. |
| Adresse prévue | Les notices FR/EN et le contact du formulaire utilisent `gk.contactus@gkgroup.app` ; les notifications via Zoho Mail sont décrites. Le code utilise Netlify Forms, sans serveur SMTP applicatif. | Adresse présente dans les pages publiques. Le destinataire effectif des notifications ne peut pas être déduit de ce texte ; il reste à contrôler dans `Forms > Submission notifications`, sans modification automatique. |
| Conservation de 12 mois | FR/EN : demandes sans suite conservées **12 mois maximum depuis réception initiale**, puis supprimées ; contrôle hebdomadaire sous la responsabilité d'Edem Yawo Awutey. Netlify, Zoho et copies sont couverts. La politique distincte des dossiers devenus clients, déjà prévue, reste inchangée. | Aucun accès aux soumissions, copies de notifications ou journaux de suppression : application effective non vérifiée. Aucun mécanisme automatique de purge n'est défini dans le dépôt ; le respect de la règle repose sur l'exécution de la procédure prévue, non sur le texte seul. |
| Accès et confidentialité | Edem Yawo Awutey est indiqué comme seul accès interne autorisé ; finalités limitées à l'étude/réponse, pas de démarchage ni de transmission automatique aux partenaires. Reconnaissance de lecture non précochée et minimisation des champs conservées. | Permissions réelles des membres Netlify/Zoho, MFA et accès aux copies non consultés. Aucune autorisation ni donnée confidentielle n'est exposée ou changée. |

Les vérifications ciblées des deux contenus FR/EN confirment adresse, durée, responsable d'accès, absence de marketing et prise en compte des copies Zoho. Les **sept tests unitaires Forms passent** après cette confirmation. Les pages publiques initiales ne contiennent pas tout le texte de confidentialité du parcours client à plusieurs étapes ; cette absence dans le premier HTML n'est pas présentée comme une absence de notice dans le parcours. Aucun test du dernier écran public ou de réception réelle n'est revendiqué.

### Écarts constatés et corrections indispensables

1. **Documentation d'audit contradictoire : corrigée.** L'en-tête et le présent complément retirent la demande de fermeture du formulaire existant. Les anciennes mentions « avant ouverture », « activation non autorisée » ou équivalentes dans les états historiques décrivent les instructions antérieures ; elles ne doivent pas entraîner une désactivation ni une nouvelle demande de validation des paramètres que le responsable vient de confirmer. Les notices locales contiennent encore des réserves explicites sur certains détails juridiques/opérationnels non documentés ; aucun de ces détails n'est inventé ou effacé au titre de cette confirmation générale.
2. **Pas d'écart de fonctionnement démontré nécessitant une correction de code.** Le défaut local fermé reste un garde-fou de configuration ; pour un futur déploiement autorisé qui doit conserver GKGM opérationnel, vérifier que les deux indicateurs de production sont effectivement activés dans la portée serveur appropriée. Ne pas les remplacer par un défaut ouvert ni les activer dans les previews.
3. **Contrôles de compte non établis, sans présumer d'une non-conformité.** Vérifier le destinataire réel `gk.contactus@gkgroup.app`, les permissions effectives et la preuve du suivi/suppression à 12 mois dans Netlify et Zoho. Corriger uniquement si une divergence est constatée, après accord pour toute modification distante. Aucune purge automatique ou réorganisation d'accès n'est ajoutée sans constat justifiant ce changement.

**Bilan :** maintien du formulaire existant et de ses règles validées. Seul le rapport d'audit est actualisé ; aucun changement de code, de variables, de destinataires, de conservation ou de permissions. Aucun POST, aucun push, aucune PR, aucune fusion et aucun déploiement.

## 19. Direction visuelle internationale — dossier de proposition uniquement

Le responsable valide une orientation premium, institutionnelle et internationale, marine/or, avec photographies réalistes et logo officiel strictement inchangé. Il exige un inventaire et un plan page par page avant remplacement. Cette demande n'autorise pas l'intégration définitive de nouveaux visuels.

### Livrables locaux pour revue

- `docs/inventaire-visuels-actuels.md` : catalogue des 31 ressources existantes examinées, emplacements communs et propres à chacune des 19 pages, fonction, fichier source, composant et classement proposé conserver/remplacer/déplacer. Carte sociale, favicon, fichiers non affichés et original 16 privé distingués.
- `docs/inventaire-visuels-actuels.json` : relevé des 38 URL locales FR/EN, 208 occurrences d'images, alternatives, sources, classes et empreintes SHA-256 ; complément `productionSnapshot` séparé pour les 38 HTML publics lus sans téléchargement de média.
- `docs/proposition-visuelle-internationale.md` : palette et langage photographique, plan des 13 pages principales et six articles, onze briefs de sélection, règles de qualification FR/EN et preuves de droits nécessaires avant intégration.
- `docs/planche-direction-visuelle.html` : support autonome de revue, sélecteur des 19 pages, compositions et briefs FR/EN, catalogue des 24 ressources de diffusion actuelles (22 images de pages, carte sociale et favicon). Les zones photographiques proposées sont explicitement vides/en attente, sans photo fictive.

Prévisualisation locale de ce dossier : `http://127.0.0.1:3118/docs/planche-direction-visuelle.html`, distincte du site de développement sur le port 3000. Le serveur de revue est limité à 127.0.0.1, en lecture seule, aux documents de proposition et aux images publiques locales ; il ne sert pas `source-assets`, ne prend pas de POST et n'effectue aucun déploiement.

### Constats et recommandations à valider

La version locale complète affiche **22 fichiers d'images de contenu distincts**, 104 occurrences par langue. Les bannières utilisent des logos ; les autres images sont le portrait du fondateur, les douze archives et les deux illustrations. Le public déjà déployé affiche **huit chemins d'images distincts**, 90 occurrences par langue : sept identités graphiques et le portrait. Les quatorze visuels de préparation GKGT ne sont pas affichés dans les HTML publics observés. Une même URL ne prouve pas l'identité binaire d'un fichier distant ; aucun média distant n'a été téléchargé.

Proposition : architecture d'affaires contemporaine pour l'accueil, maintenance réelle pour GKGT, conseil humain pour GKGM ; schémas/identités privilégiés pour architecture et entités, sobriété pour formulaires/contact. Conserver strictement les logos et les douze archives. Prévoir le remplacement futur des deux illustrations par des photographies récentes authentifiées de l'atelier/boutique, et du portrait mis en scène par une nouvelle prise de vue naturelle autorisée. Aucun jugement sur la méthode de création du portrait n'est présenté comme un fait vérifié. Les cartouches de logos peuvent être proposés à un autre emplacement dans les futures compositions, sans altération de leurs fichiers.

Les onze briefs ne sont pas onze fichiers nouveaux acquis : **aucun candidat photographique n'est téléchargé, acheté, généré ou intégré**. Les labels existants des illustrations restent en place. Toute future photo de stock sera qualifiée d'illustrative quant à son lien avec GK GROUP ; elle ne sera pas décrite comme installation, équipe ou partenaire authentique. Le choix final exige source, licence et droits appropriés, revue des éléments sensibles, légendes FR/EN et validation fichier par fichier.

### Vérification et protection du projet

Les 38 URL locales et les 38 URL publiques du sitemap répondent 200 lors du relevé. Concordance des fichiers locaux entre FR/EN et classement des 208 occurrences vérifiés. Les 31 fichiers inventoriés sont identiques à leurs empreintes relevées avant la production du dossier ; le test `approved-assets.test.mjs` confirme aussi l'identité des 24 ressources protégées par le manifeste approuvé. Les douze archives restent dans leur rubrique, la copie 16 reste signalée, son original reste intact hors public. Aucun fichier applicatif, logo, photographie, illustration, formulaire, contenu validé, SEO ou configuration Netlify n'est modifié.

Le support de revue a été testé à 390, 768 et 1440 px, sans débordement ; sélecteur de pages et changement de langue des compositions vérifiés. Lint/build et suites fonctionnelles du site ne sont pas réexécutés pour ces ajouts documentaires sans changement applicatif ; leurs résultats restent ceux de la section 16. La future refonte intégrée devra repasser tous ces contrôles après validation.

**En attente : validation des compositions, des remplacements proposés et des sources à privilégier, puis présélection des fichiers avec droits avant toute intégration. Aucune modification du fonctionnement GKGM validé en section 18. Aucun push, aucune PR, aucune fusion, aucun déploiement.**

## 20. Photographies authentiques GKGT — galerie locale après dédoublonnage

Le ZIP `GKGT_15_photos_authentiques.zip` contient quinze JPG. Tous sont extraits sans modification dans `source-assets/gkgt-authentic-15/originals`, avec comparaison SHA-256 directe des quinze fichiers aux entrées ZIP. Les douze archives existantes et leurs légendes FR/EN restent conservées. Six JPG sont des reprises visuelles des archives 01/02/06/16/18/21 ; ils restent archivés hors public, sans vignette supplémentaire. La reprise de l'ancienne photo 16 n'est pas réintroduite dans la galerie : sa copie à arrière-plan modifié approuvée reste utilisée.

**Résultat : 12 + 15 − 6 = 21 vues distinctes**, conformément à la réserve de vérification des doublons. Les nouvelles vues N03/N04/N05/N06/N08/N09/N10/N13/N15 sont réparties en cinq interventions techniques, trois équipements et une vue d'espace de travail ; les douze précédentes forment la rubrique Archives historiques. Les deux illustrations modernes sont maintenues sans changement dans leur section séparée, avec leurs mentions illustratives ; elles ne sont pas ajoutées au compte de photographies authentiques.

La galerie ajoute un titre propre, une grille responsive marine/or et quatre catégories navigables par ancres. L'ancre `technical-archives`, le titre et l'introduction historique GK Informatique restent présents. Chaque photographie possède une légende/alternative bilingue. Agrandissement sur demande, précédente/suivante, flèches, Échap, Tab/Maj+Tab et retour du focus sont disponibles, sans ajout de dépendance ni modification des formulaires. Les images ne sont ni étirées ni recadrées.

Les neuf copies agrandies WebP totalisent 1 205 500 octets contre 4 677 380 octets pour leurs sources, soit environ 74 % de moins ; leurs neuf miniatures totalisent 255 230 octets. Limites de grand côté : 1600/640 px, sans agrandissement des petites sources. Seuls orientation, redimensionnement proportionnel et compression sont appliqués ; métadonnées retirées des copies, originaux intacts. Le script reproductible `scripts/prepare-gkgt-authentic.mjs` vérifie les empreintes avant traitement.

### Autorisations non étendues automatiquement

Le registre historique `content/gkgt-publication-rights.json` reste inchangé. Le registre distinct `content/gkgt-authentic-batch.json` contient les quinze fichiers, les six doublons, neuf légendes FR/EN et les réserves. Huit vues nouvelles montrent des personnes reconnaissables : **N03/N04/N05/N06/N08/N09/N10/N13**. Les contenus d'écran, documents/tableau, étiquettes, marques, emballage et reflet partiel de N15 sont signalés sans transcription de valeurs. L'origine et les droits de N10, dont le nom suggère un export de réseau social, sont à confirmer. Aucun accord sur les nouvelles vues n'est déduit d'une ressemblance ou d'une autorisation antérieure.

Le responsable doit valider les ajouts, les droits du photographe, les accords de personnes et les éventuels contenus de tiers avant publication. L'interface locale affiche une réserve sur les neuf ajouts. Le garde `prebuild` est étendu à ce lot : code 0 en local, code 1 sous simulation `NETLIFY=true`, avec les neuf réserves ; aucune réserve historique déjà résolue n'est rouverte. Aucun réglage de compte Netlify ni de confidentialité GKGM n'est modifié. Ce garde couvre la commande npm prévue, pas un téléversement manuel qui le contournerait.

### Validation technique et livrables

- Lint et build local réussis ; 17 entrées du build.
- **12 tests unitaires réussis**, incluant identité des ressources approuvées, quinze originaux, copies proportionnelles sans métadonnées et garde des neuf permissions en attente.
- Les neuf scripts de régression des pages passent, avec `verify-galleries` adapté au résultat dédoublonné ; les 38 URL SEO FR/EN, bannières et contenus validés sont conservés.
- 12 parcours GKGM et deux parcours partenariats simulés passent, sans trafic fournisseur ni envoi réel ; les formulaires et leurs réglages sont inchangés.
- Six combinaisons FR/EN × 390/768/1440 px : 21 figures, quatre catégories, douze archives, deux illustrations, aucune alternative vide ni débordement, images contenues.
- Les 21 agrandissements sont examinés et chargés sur ordinateur et sur téléphone ; commandes, bouclage, focus, Échap et restauration du défilement contrôlés. Quatre chargements desktop initialement en cours ont été revérifiés après disponibilité ; aucune image cassée ne reste identifiée.

Rapport détaillé : `docs/gkgt-galerie-authentique-validation.md` ; mesures : `docs/gkgt-authentic-optimisation.json` ; autorisations : `docs/gkgt-visuels-autorisations.md`. Les inventaires et propositions de section 19 décrivent l'état antérieur à cet ajout et ne sont pas des inventaires actualisés de la galerie de 21 vues.

Prévisualisation : `http://127.0.0.1:3000/gk-global-technology?lang=fr#gkgt-gallery` et variante `?lang=en#gkgt-gallery`. Le logo, les fichiers historiques, les illustrations, les contenus institutionnels, le SEO et les fonctionnalités hors galerie sont préservés. Aucun test d'appareil physique, Safari/iOS, lecteur d'écran, Lighthouse mobile, mesure de production ou réception réelle n'est revendiqué. La validation photographique demandée reste distincte de l'accord final de mise en production.

**Aucun push GitHub, aucune fusion, aucune PR, aucun déploiement. Revue et autorisations du nouveau lot en attente.**

Complément de revue préalable : `docs/gkgt-neuf-photos-autorisations.md` et sa planche `docs/gkgt-neuf-photos-revue.jpg` présentent les neuf ajouts avec noms de fichiers, personnes visibles, confidentialité et autres droits séparés. Les neuf statuts et l'autorisation générale restent en attente ; aucun nom de personne ou consentement n'est déduit des images. Quatre tests ciblés passent, dont la garde Netlify qui reste en refus pour ce lot. Organisation des 21 vues et six doublons privés inchangée ; aucun code, statut d'autorisation, original ou réglage distant modifié pour cette étape.

## 21. GKGT — photographie intégrée à la présentation de l'activité

À la demande du responsable, la galerie uniforme est remplacée par cinq séquences éditoriales réparties dans la page : expertise (3 vues), maintenance (4), équipements/reconditionnement (6), atelier/espaces de travail (4), parcours historique (4). **21 identifiants et 21 emplacements distincts** : aucune photographie répétée. Le grand portrait d'activité précède les détails de composants dans l'ordre mobile ; les autres séquences alternent grandes vues, duos/trios et texte/image. La frise est explicitement un ordre de lecture documentaire sans dates, pas une chronologie vérifiée de l'entreprise.

Les douze archives sont toutes conservées et identifiées comme archives dans les séquences pertinentes ; quatre forment la frise à l'ancre `technical-archives`, dont le titre et l'explication GK Informatique sont conservés. Les quinze JPG originaux, les six doublons exclus, les deux illustrations modernes, le logo et les fichiers photographiques ne sont pas modifiés. Les services et limites institutionnels restent présents. La modale commune conserve agrandissement, précédente/suivante, clavier, Échap et restauration du focus. Les nouvelles vues gardent leurs mentions de réserve ; le registre et le refus de build Netlify restent inchangés.

Rapport et répartition par identifiant : `docs/gkgt-presentation-editoriale-validation.md`. Prévisualisation : `http://127.0.0.1:3000/gk-global-technology?lang=fr#gkgt-gallery`, et variante anglaise. Les anciens passages décrivant une grille unique ou douze images toutes regroupées dans la rubrique historique décrivent l'état antérieur à cette nouvelle instruction.

## 22. GKGM — enrichissement des réalisations historiques déclarées

La section FR/EN porte désormais les titres demandés « Nos réalisations en mobilité internationale » / « Our International Mobility Track Record ». Deux cartes mettent en avant **plus de 50** pour le Canada et **environ 10** pour l'Albanie. Quatre destinations présentent des accompagnements ayant abouti à des visas de visite, **sans nombre inventé** : Équateur, Singapour, Malaisie et Chine. La source des résultats est clairement la déclaration de GKGM ; aucun résultat futur ni affiliation à une autorité n'est promis.

Une clarification du responsable précise que les dossiers canadiens comprennent visa d'entrée et permis d'études/approbation. La formulation « visas d'entrée pour études » est accompagnée d'une note sur ces documents, **sans les compter comme des résultats supplémentaires**. La distinction visa/permis a été vérifiée dans la documentation IRCC, référencée au rapport ; les pièces individuelles ne sont pas auditées. Les autres types restent génériques et conformes aux déclarations, sans ajout de sous-catégorie administrative.

Portugal (3 visas D Job Seeker), Royaume-Uni (2 visas visiteurs, 2025), Indonésie (1 visa C2, 2026) et Pologne (8 permis de travail, 2025–2026) sont conservés. Le sous-total de six concerne uniquement les trois anciens résultats de visas ; aucun total mondial ne mélange comptes exacts, approximations et nombres non fournis. Les permis polonais restent distincts. La période « depuis 2023 » est limitée à l'ancienne série ; aucune période nouvelle n'est inventée. Les quatre partenaires B2B et leurs précautions d'affiliation restent inchangés. Aucun formulaire ni réglage de confidentialité ou d'activation n'est modifié.

Rapport : `docs/gkgm-realisations-internationales-validation.md`. Données actualisables : `content/mobility-track-record.js`. Prévisualisation FR/EN : `http://127.0.0.1:3000/gk-global-mobility?lang=fr#track-record` et variante `?lang=en#track-record`.

### Contrôles communs aux deux présentations

Lint et build local réussis, **14 tests unitaires réussis**, neuf scripts de pages/régression réussis, 38 URL SEO FR/EN préservées. Douze parcours GKGM et deux parcours partenariats simulés passent sans trafic fournisseur réel. Sur chaque page, FR/EN × 390/768/1440 px : aucun débordement ; GKGT affiche 21 vues uniques dans cinq séquences, GKGM deux résultats complémentaires, quatre destinations non chiffrées et quatre partenaires. Les 21 agrandissements après redistribution chargent correctement ; clavier et focus sont vérifiés. Après le dernier ajustement d'ordre de lecture GKGT, nouveau build/lint/tests unitaires réussis et contrôle des trois largeurs avec N13 en première image et 21 identifiants uniques.

Les tests d'identité des ressources de marque/photos/illustrations et des quinze originaux passent. Les statuts photographiques restent en attente et la simulation `NETLIFY=true` reste en refus. Aucun test physique, lecteur d'écran, Lighthouse mobile, réception réelle de formulaire ou vérification indépendante de dossiers de visa n'est revendiqué. Les avertissements Node connus des tests restent non bloquants.

**Revue locale des présentations et autorisations distinctes encore nécessaires avant publication. Aucun push, aucune fusion, aucune PR, aucun déploiement.**

## 23. GKGT — netteté technique non générative

Le responsable choisit une accentuation légère sans IA. Vingt et une copies de diffusion et leurs miniatures sont créées dans `public/gkgt-sharpness-v1/`, sans écraser les fichiers précédents ni les originaux. Traitement Sharp/libvips limité à l'orientation, au redimensionnement proportionnel, à la netteté douce de luminance et à la compression WebP ; aucune reconstruction de détail, retouche de visage, modification de décor ou recadrage. La photo 16 repart exclusivement de la copie à arrière-plan modifié déjà approuvée.

Les copies agrandies utilisent la résolution disponible jusqu'à 2048 px, les miniatures jusqu'à 960 px, sans agrandissement artificiel. Le manifeste `content/gkgt-sharpness.json` conserve sources, empreintes, paramètres, dimensions et poids ; le script `scripts/prepare-gkgt-sharpness.mjs` permet de reproduire le traitement. La sélection de diffusion est appliquée aux mêmes 21 identifiants, avec les mêmes légendes, séquences et statuts. Le gain reste volontairement modéré et ne prétend pas restaurer une information absente.

Rapport : `docs/gkgt-nettete-validation.md` ; comparaison de trois vues : `docs/gkgt-nettete-comparaison.jpg`. Lint, build, **15 tests unitaires** et contrôle HTTP GKGT/GKGM FR/EN réussis. Les 21 sources, les quinze originaux et les ressources protégées restent intacts ; copies proportionnelles et sans EXIF/IPTC/XMP. Aucun test de formulaire ou campagne responsive complète supplémentaire n'est revendiqué pour cette opération sans changement des formulaires/styles.

Les neuf vues restent en attente de publication ; le refus de build Netlify est préservé. Aucun logo, illustration, formulaire, paramètre de confidentialité ou configuration distante n'est modifié. **Aucun push, fusion, PR ni déploiement.**

## 24. GKGT — analyse approfondie de qualité et variantes avant validation

Le responsable valide la disposition des 21 photographies dans les cinq séquences, mais demande une analyse de netteté et des comparaisons avant tout nouveau remplacement. **La sélection active et les images du site restent inchangées pendant cette revue.** Aucun traitement ou envoi à une IA n'est effectué ; l'autorisation précédente d'accentuation non générative n'est pas étendue à une reconstruction.

Rapport complet : `docs/quality-review/audit-qualite.md`. Inventaire des sources, recettes individuelles, poids, dimensions réelles des réponses Next et empreintes : `docs/quality-review/analysis.json`. Mesures navigateur : `docs/quality-review/browser-measurements.json`. Support interactif local en lecture seule : **http://127.0.0.1:3119/**, distinct du site conservé sur le port 3000.

### Causes identifiées

- Les archives fournies sont des WebP déjà préparés, pas des RAW ou des fichiers d'appareil attestés. Cinq vues disposent d'un JPG plus défini parmi les quinze sources reçues : archives 01/02/06/18/21. Le traitement uniforme précédent repartait de leurs WebP réduits ; les nouveaux candidats repartent de ces JPG. Le doublon 16 avec son ancien arrière-plan reste exclu : seule la copie PNG approuvée sert de référence.
- N10 est limitée à **720 × 720 pixels** ; archive-11 à 1080 × 809 et archive-14 à 1080 × 710. Les petites définitions, le grain, la compression antérieure et une netteté non uniforme existent déjà dans certaines sources. Une accentuation plus forte ne rétablit pas l'information absente.
- Les copies v1 qualité 88/84 sont recompressées par Next à **q75**, mesuré dans les requêtes et réponses décodées. La configuration ne permet pas q90 : la requête testée retourne HTTP 400. Les `sizes` génériques et miniatures limitées en grand côté plutôt qu'en largeur nécessitent une adaptation avant une éventuelle intégration.
- Les 21 agrandissements sont contrôlés après chargement de la ressource identifiée. À 1440 × 1000 et DPR 1, les proportions et la couverture de pixels sont correctes dans les mesures ; pas de déformation ou d'agrandissement excessif global démontré. La couverture 2× calculée révèle toutefois plusieurs limites, notamment N10 affichée autour de 525px de large avec seulement 720 pixels disponibles. Aucun appareil Retina physique n'est revendiqué.

### Variantes et comparaison

Les 21 fichiers sont traités individuellement dans le dossier documentaire de revue, sans écraser les sources ou les copies actives. Les réglages de netteté sont réduits et différenciés ; **aucune accentuation supplémentaire pour archive-11/14/16/23, N03 et N10**, afin de ne pas renforcer bruit ou halos. Les dimensions natives sont conservées, sans agrandissement ni recadrage ; métadonnées privées exclues des copies.

La comparaison affiche : meilleure source disponible décodée sans accentuation, réponse actuellement servie dans la page ou la modale, variante technique proposée. Référence sans perte et variante q94 sont sélectionnables ; le zoom est identique dans les trois colonnes. Les 21 variantes sans perte représentent environ 33,3 Mo ; la version q94 environ 8,1 Mo. Ce poids de référence ne constitue pas une recommandation de diffusion de toutes les images à pleine résolution. Une stratégie responsive à un encodage principal, qualité autorisée explicite et tailles correctes reste à valider ; aucun paramètre Next ou composant actif n'est modifié ici.

Les cas particulièrement limités sont N10, archive-11, archive-14, archive-23 et N03 ; N13/archive-20 conservent aussi une douceur initiale ou une profondeur de champ variable. La revue ne promet pas de gain significatif sur les plus faibles sources. Pour N10 notamment, une meilleure source ou un affichage plus contenu est préférable à un fichier plus lourd ou à des détails inventés.

### Étude IA, préservation et tests

Le rapport étudie le risque d'une amélioration d'apparence sans fidélité garantie, avec référence à la recherche sur le compromis perception/distorsion. Visages, inscriptions, écrans et composants ne doivent pas être réinventés sous couvert de netteté. Un essai IA éventuel exige un accord distinct par identifiant/périmètre et une identification FR/EN comme restauration IA ; **aucun essai n'est réalisé**.

Les **89 empreintes de fichiers actifs et sources protégés** correspondent à l'état avant analyse : images sélectionnées, sources, quinze JPG, ressources historiques, logos/illustrations, composants/styles, cinq séquences/légendes, configuration Next et registres d'autorisation restent intacts. Les neuf autorisations restent en attente et le garde Netlify reste en refus. Le support de comparaison est limité au dossier de revue et à 127.0.0.1, en lecture seule ; il ne remplace pas le site.

Lint et **16 tests unitaires** réussis, dont intégrité des 89 fichiers et des 21 variantes, proportions natives et absence de métadonnées privées. Sélecteurs, trois colonnes, zoom commun et chargement de cas représentatifs vérifiés ; support responsive à 390/768/1440 px sans débordement après ajustement de ses contrôles. Les neuf régressions de pages/SEO réussissent sur le site local conservé ; aucun build cloud, soumission réelle, essai physique ou mesure de production n'est revendiqué. Le build applicatif n'est pas relancé pour ces seuls scripts/documents et variantes non intégrées.

**À valider : choix des variantes et de la future correction de diffusion. Aucun remplacement définitif, aucune reconstruction IA, aucun push, fusion, PR ni déploiement.**

## 25. GKGT — copies V2 à encodage unique, en attente de revue visuelle

À la suite de l’autorisation explicite d’amélioration non générative, les copies de diffusion V2 déjà préparées sont maintenant activées uniquement pour les 21 photographies GKGT. Les originaux, les archives historiques, les versions V1, les deux illustrations, le logo, les légendes FR/EN, les cinq séquences et les droits enregistrés restent inchangés. Les archives 01/02/06/18/21 repartent des cinq JPG de meilleure définition ; la photo 16 repart exclusivement de la copie approuvée à arrière-plan modifié.

La diffusion utilise des variantes WebP responsives préparées une seule fois, avec `picture/srcset` et fallback `next/image` sans optimisation. Le contrôle du build local confirme 21 photos, 21 `srcset` et aucune requête `/_next/image` portant sur `gkgt-quality-v2` : la recompression q75 identifiée dans la revue précédente est donc évitée pour cette galerie. Les variantes, de 320 px à la largeur native, laissent le navigateur télécharger une seule taille adaptée ; le chargement différé est maintenu. Les modales plafonnent l’affichage à la définition disponible selon la densité afin de ne pas agrandir artificiellement N10 ou toute autre source limitée.

Les copies V2 emploient Sharp/libvips seulement : orientation, redimensionnement proportionnel, compression WebP qualité 90 (92 pour les sources limitées) et accentuation individuelle légère lorsque l’audit l’autorisait. Aucune IA, reconstruction, ajout de détail, recadrage ou retouche d’information visible n’est appliqué. N10, archive-11, archive-14, archive-16, archive-23 et N03 restent sans accentuation, car une accentuation plus forte risquerait de renforcer bruit ou halos.

Lint, build local, **17 tests unitaires**, tests de pages/SEO FR/EN, contrôle HTTP galerie et formulaires simulés passent. Les tests d’identité continuent de vérifier les originaux, les ressources de marque, les illustrations et V1 ; un test V2 vérifie sources, empreintes, réglages, proportions, métadonnées et variantes. Le poids de stockage V2 est de 16 064 214 octets pour 122 copies (contre 6 822 444 octets pour V1), mais ce total n’est pas transféré à chaque visite : le navigateur sélectionne une variante. Les pleines définitions V2 totalisent 5 982 966 octets, contre 5 298 420 en V1, en raison des cinq sources plus définies et de la qualité retenue.

Rapport et tableaux : `docs/gkgt-qualite-v2-validation.md`. Prévisualisation du build local : http://localhost:3116/gk-global-technology?lang=fr#gkgt-gallery et variante anglaise. Aucun test physique Retina/Safari/iOS, Lighthouse de production ou mesure de production n’est revendiqué. Les autorisations des neuf nouvelles vues sont enregistrées comme confirmées. Le garde Netlify a réussi le test local du 15 novembre 2026 avec `NETLIFY=true` (code de sortie 0). La revue visuelle finale des copies V2 reste à effectuer avant toute diffusion publique.

**À valider : revue visuelle des copies V2 dans la prévisualisation locale. Aucun push, fusion, PR ni déploiement.**
