# GK GROUP — Proposition visuelle internationale haut de gamme

14 novembre 2026 — **Proposition pour validation, aucune intégration.** Référence applicative : `b3b2521`, avec le rapport d'audit local conservé. Les décisions ci-dessous sont des recommandations et ne modifient ni les fichiers affichés, ni les fonctionnalités, ni les textes approuvés.

## Direction proposée

Une présence internationale crédible : photographie documentaire soignée, architecture contemporaine et gestes professionnels. La qualité repose sur une sélection courte, une composition calme et une identité constante. Éviter le luxe ostentatoire, les dorures brillantes, les fausses équipes, les gratte-ciel répétés et les scènes de poignées de main interchangeables.

La page d'accueil porterait une grande photographie d'architecture d'affaires ; GKGT montrerait le travail informatique réel ; GKGM une situation de conseil humain. Les pages d'organisation resteraient davantage éditoriales, avec leurs schémas et identités. Toutes les pages n'ont pas besoin d'une grande photographie : formulaires, contact et architecture doivent rester particulièrement lisibles.

### Palette et composition

| Rôle | Proposition |
| --- | --- |
| Marine principal | `#061b46`, déjà utilisé ; surfaces institutionnelles et titres. |
| Marine profond | `#03102c`, déjà utilisé ; pied de page. |
| Or d'accent | `#d59b46`, déjà utilisé ; filets et détails, sans l'utiliser pour de petits textes sur blanc. |
| Or pour texte/action sur fond clair | `#946020`, issu de la correction d'accessibilité ; contraste à vérifier sur chaque futur fond. |
| Fonds | Blanc et `#f5f7fa` ; photographie laissée dans ses couleurs naturelles. |
| Typographie | Conserver pour cette phase Arial/Helvetica et la hiérarchie existante. Aucun téléchargement de police ni changement de contenu. |
| Mise en page proposée | Largeur maximale proche de 1280 px, marges aérées, titres courts déjà validés, filets fins ; pas de multiplication de cartes décoratives ou d'effets 3D. |

**Logo officiel intangible :** `public/brand/gk-group-official-logo.png`. Ne pas redessiner, recolorer, détourer, déformer, faire générer ou incruster le logo dans des photographies. Conserver le fichier et ses proportions ; affichage sur une surface offrant le contraste nécessaire. Les logos d'entités sont également conservés sans retouche. Déplacer un cartouche dans une maquette signifie déplacer son emplacement dans la page, jamais modifier son fichier.

### Grammaire photographique

- Lumière de jour ou éclairage de travail naturel ; blancs neutres, teintes marine présentes sans coloration forcée de toute la scène.
- Perspectives maîtrisées, cadrages nets, contexte plausible, matériel réellement utilisé ; pas d'empilement d'équipements ou de tenues de luxe comme preuve d'expertise.
- Une image dominante par page stratégique, puis au maximum deux ou trois images utiles. Pas de carrousel, vidéo automatique ou nouveau comportement requis.
- Photographier un geste ou un échange identifiable : diagnostic informatique, présentation d'un projet, revue d'un équipement. Éviter la simple répétition d'un ordinateur et d'une tasse.
- Pour les futurs visuels uniquement : composition large pour desktop et cadrage mobile prévu dès la sélection. Aucun recadrage, réencodage ou traitement des archives validées.
- Garder titres, CTA et mentions hors des détails photographiques ; préférer un panneau marine adjacent à une superposition qui fragilise le contraste.

## Constat sur les visuels actuels

Le relevé local recense **22 fichiers d'images de contenu distincts**, avec 104 occurrences dans les 19 chemins français et les mêmes occurrences en anglais. Il comprend sept identités graphiques, un portrait du fondateur, douze visuels historiques publiables et deux illustrations. Une carte Open Graph/Twitter et un favicon complètent les surfaces de diffusion. L'inventaire détaillé donne les emplacements et fichiers exacts dans `inventaire-visuels-actuels.md` et les occurrences FR/EN dans `inventaire-visuels-actuels.json`.

Un relevé complémentaire des 38 HTML publics de gkgroup.app retrouve huit chemins d’images de contenu distincts : les sept identités et le portrait, sans les quatorze visuels ajoutés dans la préparation GKGT. Le présent plan couvre bien la version locale complète ; le relevé public distinct figure en fin d’inventaire et dans le JSON. Aucun fichier image distant n’a été téléchargé.

Les grandes bannières actuelles montrent majoritairement des logos dans un cadre, pas une photographie d'activité. Ce choix explique une partie de la répétition visuelle. Les images d'atelier et de boutique sont des **illustrations déjà signalées comme telles**, pas des prises de vue des locaux. Le portrait du fondateur a une composition très mise en scène ; sa provenance photographique et celle de son décor ne peuvent pas être attestées par l'examen de l'image seule. Une nouvelle prise de vue naturelle est préférable à une nouvelle retouche de ce fichier.

### Arbitrages proposés sur les fichiers existants

| Famille | Classement proposé | Décision à valider |
| --- | --- | --- |
| Logo GK GROUP et six identités d'entités | **Conserver** | Fichiers intacts. Garder le logo du groupe dans l'en-tête/pied de page et les identités des entités dans leurs sections. Dans les futures bannières photographiques, proposer un cartouche d'identité plus compact : **déplacement d'emplacement**, sans suppression d'identité. |
| Portrait du fondateur, accueil et À propos | **Remplacer** | Nouvelle photographie authentique, sobre et autorisée de la même personne ; conserver le portrait actuel tant que la nouvelle sélection n'est pas validée. Ne pas remplacer par une personne fictive ou une image de stock. Citation, nom et fonctions inchangés. |
| Douze archives GKGT | **Conserver** | Maintien des douze dans `/gk-global-technology#technical-archives`, légendes FR/EN et statut historique. Ne pas les utiliser comme images des installations actuelles. |
| Atelier et boutique illustratifs | **Remplacer** | Cible : vraies photographies récentes des installations et équipements, avec autorisations. Jusqu'à acquisition et validation, garder les illustrations existantes et leur mention. Aucun faux local généré en substitution. |
| Carte de partage GK GROUP | **Conserver** | Garder la carte actuelle pendant cette phase ; toute future carte doit préserver strictement le logo et les métadonnées approuvées. |
| Favicon | **Conserver pour cette phase** | Aucun changement requis par la sélection photographique ; éventuelle adaptation de marque à valider séparément après examen de sa lisibilité. |

## Proposition page par page

Tous les choix s'appliquent aux variantes FR et EN. Les titres et textes mentionnés sont des repères de placement, pas des réécritures du contenu public. Les identifiants G/T/M/E/N/P renvoient au cahier de prises de vue ci-dessous.

| Page | Visuel / composition proposée | Ce qui reste protégé |
| --- | --- | --- |
| `/` — GK GROUP | **G01** : architecture contemporaine d'affaires, cadrage large, photographie réelle ; texte approuvé dans un panneau marine adjacent. Les activités sont distinguées par leurs logos existants et de petites accroches visuelles issues de T01/M01/E01/N01 si leur sélection est approuvée. **G03** : nouveau portrait dans le message du fondateur. | Logo officiel en en-tête/pied de page ; structures/statuts, citation et destinations des CTA. Aucun bâtiment présenté comme siège GK GROUP sans preuve. |
| `/about` | **G02** : environnement de travail réel ou réunion de direction documentée ; **G03** : même portrait approuvé que l'accueil, usage d'identité assumé. Organisation et histoire restent éditoriales. | Quatre étapes historiques sans dates ajoutées, message du fondateur, identités et statuts. Archives non déplacées ici. |
| `/architecture` | Priorité au schéma existant : fond clair, hiérarchie marine/or, pas de photographie derrière les liens d'organisation. **Pas de nouveau visuel photographique obligatoire.** | Relations institutionnelles, six profils, textes juridiques, tous les logos et liens. |
| `/activities` | Présentation éditoriale avec un visuel métier réellement pertinent par domaine seulement si utile : T01/M01/E01/N01, dans un format cohérent 3:2. Ne pas répéter G01 comme bannière universelle. | Domaines, périmètres et limites validés. Aucun assemblage qui inventerait un atelier ou une équipe commune. |
| `/entities` | Logos et informations légales sur fond neutre ; pas de paysage de pays présenté comme bureau. Photographie facultative, non nécessaire pour comprendre les statuts. | Distinction sociétés/branches/projets, immatriculations non confirmées, logos existants. |
| `/gk-global-technology` | **T01** : diagnostic/maintenance d'un poste, en ouverture ; **T02/T03** : vrais atelier et boutique pour remplacer les illustrations après validation. Archives dans leur rubrique distincte, en dessous du contenu contemporain. | Douze archives et originaux, légendes bilingues, copie 16 à arrière-plan modifié signalée, services et formulaire de devis. Pas de déduction d'agrément constructeur. |
| `/gk-global-mobility` | **M01** : entretien de conseil, cadrage humain et professionnel ; **M02** facultatif : préparation d'un parcours avec documents non identifiants. Résultats chiffrés et partenariats restent une section de données, pas des collages de visas. | Six visas distincts des huit permis, quatre partenaires nommés, absence de résultat garanti, liens et contenu validé. Aucun emblème d'ambassade ajouté. |
| `/gkgm-project` | Bannière compacte marine/or et identité GKGM ; **pas de nouvelle photographie dans le parcours**. La photographie M01 peut rester sur la page de présentation seulement. | Quatre étapes, champs, consentement, messages, réception et règles de confidentialité. Aucun changement d'activation. |
| `/gk-esttrade` | **E01** : inspection et préparation d'équipements destinés à des échanges B2B, ou vraie scène d'approvisionnement autorisée. Éviter les terminaux portuaires génériques en pleine page. | Identité UAB GK EstTrade, informations légales, limites de stock/garantie/logistique et CTA. Aucun entrepôt de tiers présenté comme propriété de l'entreprise. |
| `/gk-nexus` | **N01** : coordination de projet, supports anonymisés et environnement de travail sobre. Si image de stock, la qualifier d'ambiance illustrative ; aucun faux siège albanais. | Statut de projet, rôle fonctionnel, absence de relation de détention affirmée et contenus validés. |
| `/partnerships` | **P01** : vraie situation d'échange B2B, différente de M01 ; privilégier une scène contextuelle plutôt qu'une poignée de main isolée. | Annuaire soumis à validation, droits des logos tiers, formulaire et confirmations. Personnes représentées non présentées comme partenaires effectifs sans preuve. |
| `/news` | Liste éditoriale lisible ; aucun visuel générique ajouté systématiquement. Images propres aux articles seulement lorsqu'une source et des droits sont établis. | Catégories, filtres, statuts, dates, règles d'expiration, liens et SEO. Les six articles actuels n'affichent pas de photographie éditoriale. |
| `/contact` | Mise en page de contact claire ; identités des structures conservées. **Pas de photo d'équipe fictive, de centre d'appel ou de bureaux non documentés.** | Coordonnées, orientation et formulaire email/WhatsApp. |

### Six pages d'articles existantes

| Article sous `/news/` | Proposition spécifique |
| --- | --- |
| `gk-global-mobility-accompagnement-international` | M01/M02 seulement comme ambiance clairement qualifiée, ou conserver le format texte actuel. Aucune photographie de bénéficiaire sans autorisation. |
| `gk-global-technology-expertise-solutions-numeriques` | T01 authentique, légende décrivant le geste ; ne pas utiliser une archive comme réalisation récente. |
| `gk-group-ecosysteme-entrepreneurial-international` | G01 comme illustration éditoriale, sans prétention de propriété du bâtiment. |
| `gk-group-perspectives-developpement-international` | G02 ou un second cadrage autorisé de la même série ; éviter de réutiliser systématiquement G01. |
| `gk-nexus-coordination-internationale` | N01 avec qualification d'ambiance et statut du projet inchangé. |
| `uab-gk-esttrade-commerce-international-lituanie` | E01, sans attribuer une localisation lituanienne non prouvée à la prise de vue. |

Les articles peuvent partager un visuel avec leur activité lorsque le lien éditorial est réel ; limiter cette répétition à ces usages connexes. Aucune image ne sera ajoutée en contournant le contrôle d'approbation d'images déjà présent dans `lib/news.js`.

Pages utilitaires : 404 et preview éditoriale restent sobres et sans nouvelle photographie. La preview conserve son accès limité au développement ; les ressources de référence Forms restent invisibles et non indexables.

## Cahier de sélection des nouveaux visuels

Ces fiches sont des **briefs à valider**, pas des images générées, téléchargées ou déjà acquises. Aucune photographie candidate n'est présentée comme publiable à ce stade.

| ID | Sujet et cadrage précis | Origine privilégiée / qualification FR–EN |
| --- | --- | --- |
| G01 | Façade contemporaine en verre/pierre, lumière douce, lignes verticales maîtrisées ; présence humaine discrète, aucun logo tiers dominant ; format large 16:9, détail exploitable en 4:5. | Prise de vue commandée ou photographie sous licence commerciale vérifiée ; « Photographie d'ambiance — architecture contemporaine » / « Illustrative photograph — contemporary architecture ». Ne jamais légender « notre siège » sans preuve. |
| G02 | Espace de travail ou réunion stratégique naturelle, angle latéral, dossiers anonymisés, pas de pose collective générique ; 3:2. | Série réelle GK GROUP si disponible, autorisations individuelles ; à défaut photographie d'ambiance explicitement qualifiée, sans attribution d'équipe. |
| G03 | Portrait naturel du fondateur, lumière de jour, décor simple authentifié, regard et tenue choisis par lui, sans objets de marque ajoutés ; original vertical 4:5 avec marge autour du visage. | Nouvelle prise de vue fournie/commandée par le responsable, droit du photographe et accord du sujet. Légende avec identité déjà validée, sans nouveau titre inventé. |
| T01 | Intervention réelle sur ordinateur ouvert, outils plausibles, geste technique lisible, écran sans données clients ; plan large puis détail. | Priorité au reportage GKGT. Si image métier de stock, « Photographie illustrative — maintenance informatique » / « Illustrative photograph — IT maintenance », sans attribution à un technicien GKGT. |
| T02 | Vue récente de l'atelier réel : postes, outils et environnement effectivement présents ; lumière équilibrée, sans réaménagement fictif. | Exclusivement prise de vue authentifiée des installations pour conserver l'intitulé « Notre atelier ». Pas d'illustration IA ni de local de stock présenté comme le nôtre. |
| T03 | Vue récente de la boutique réelle : équipement présenté clairement, étiquettes/écrans examinés, aucune promesse de stock ou garantie induite. | Même exigence d'authenticité que T02 pour « Notre boutique ». Légende factuelle, sans adresse/date non confirmée. |
| M01 | Entretien de conseil à hauteur de regard, échange attentif, une table et un support de projet non confidentiel ; personnes naturelles, pas de foule de voyageurs. | Équipe/candidats réels avec accords, ou stock commercial qualifié d'ambiance. Aucun acteur présenté comme client satisfait. |
| M02 | Préparation d'un parcours : carnet, calendrier et ordinateur, informations fictives ou non lisibles ; aucun passeport, visa réel, nom ou numéro. | Prise de vue contrôlée ; « Préparation d'un projet de mobilité — photographie illustrative » / « Preparing a mobility project — illustrative photograph ». |
| E01 | Contrôle de références ou conditionnement d'équipements informatiques dans une opération réelle autorisée ; éviter les logos ou numéros de série lisibles. | Reportage réel ou stock sous licence qualifié d'illustratif. Aucun stock ou entrepôt attribué sans confirmation. |
| N01 | Coordination entre interlocuteurs autour d'un planning et d'un écran anonymisé ; environnement neutre, non géolocalisé ; 3:2. | Vraie scène documentée ou stock illustratif. Ne pas présenter les personnes comme équipe établie de la société en projet. |
| P01 | Échange B2B concret : revue d'une proposition à deux ou trois interlocuteurs, gestes et documents plausibles, pas de signature d'accord fictif. | Reportage autorisé de coopération réelle ou stock qualifié d'ambiance ; noms/logos des partenaires uniquement selon les autorisations existantes. |

Priorité de sélection : **G01, T01, M01**, puis **T02/T03 et G03**. Les autres pages peuvent rester éditoriales jusqu'à disposer d'une image justifiée. Les onze briefs ne constituent pas une obligation d'acheter onze fichiers.

## Archives et authenticité : éléments non négociables

Les douze visuels publiables de GKGT restent dans leur rubrique dédiée. Onze fichiers WebP ne sont pas modifiés ; la copie 16 à arrière-plan modifié reste celle validée et conserve sa mention. L'original 16 reste intact dans `source-assets/archives-techniques/originals/16_IMG-20210728-WA0002(1).webp`, hors du dossier public. Aucun fichier historique n'est supprimé, déplacé, recadré ou réencodé par cette proposition.

L'ambiance photographique premium ne doit jamais transformer une illustration en preuve d'installations, de personnel, de présence géographique ou de partenariat. Une photographie de stock est une photographie réelle mais **illustrative quant à son lien avec GK GROUP** ; cette distinction doit apparaître au bon endroit en FR/EN. Les labels existants des illustrations restent visibles tant que celles-ci restent affichées.

## Droits et validation avant acquisition/intégration

Pour chaque candidat : identifiant du brief, source originale, auteur, lien de licence et justificatif, périmètre commercial web/communication, attribution exigée, restrictions et accords des personnes/lieux/contenus tiers selon le cas. Garder les preuves localement avec le registre des images, sans publier de pièces personnelles. Vérifier la confidentialité des écrans, plaques, documents et métadonnées avant sélection finale.

Ne pas importer une image repérée dans un moteur de recherche comme si sa présence en ligne donnait un droit de publication. Pour une image fournie par un photographe, obtenir les droits correspondant à l'usage prévu. Ne pas considérer une licence générale comme une preuve de tous les droits de personnes, marques ou bâtiments. Les exigences concrètes doivent être vérifiées pour la source retenue ; aucune assurance juridique universelle n'est donnée par ce dossier.

Le processus proposé est : **validation de ce plan → présélection de photographies avec preuves de droits → planche de candidats FR/EN avec légendes → votre validation de chaque fichier/cadrage → intégration locale autorisée → contrôles techniques → autorisation séparée de publication**. Aucune licence n'est achetée, aucune image tierce téléchargée et aucun nouveau visuel intégré ici.

### Décisions attendues sur cette proposition

1. Valider l'architecture d'affaires pour l'accueil, la maintenance réelle pour GKGT et le conseil humain pour GKGM.
2. Valider le remplacement futur des deux illustrations par des photographies réelles et la nouvelle prise de vue du fondateur ; conserver les fichiers actuels jusqu'à validation des remplaçants.
3. Choisir, pour G01/T01/M01, les sources : reportage fourni/commandé ou présélection sous licence, avec qualification illustrative si nécessaire.
4. Valider les pages volontairement sans photographie dominante : architecture, entités, formulaire GKGM et contact.

## Contrôles de cette phase

Relevé des 38 URL locales FR/EN et comparaison des emplacements ; vérification des références de composants, métadonnées et ressources non affichées ; examen visuel des deux illustrations et du portrait ; inventaire SHA-256 des fichiers existants. Les étiquettes de classement sont des propositions, pas des suppressions exécutées. Les fichiers de pages, styles applicatifs, formulaires, données validées et images sont inchangés.

Les tests applicatifs complets du commit `b3b2521` ne sont pas présentés comme réexécutés pour cette phase documentaire. Le test de conservation binaire des fichiers approuvés est relancé. La future refonte, une fois autorisée, exigera lint, build, formulaires simulés, SEO, contraste/clavier et contrôles responsive FR/EN avant publication.

**Travail local de proposition uniquement. Aucun push, aucune fusion, aucune PR et aucun déploiement.**
