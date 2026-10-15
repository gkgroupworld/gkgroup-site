# Uniformisation des bannières institutionnelles

Base : `b975dc4`. Branche : `codex/unified-institutional-banners`. Livraison locale uniquement.

## Composant partagé

`components/ui/InstitutionalBanner.js` et son CSS Module centralisent le titre, le sous-titre (`description`), le logo officiel, l’étiquette (`eyebrow`), la note institutionnelle, la signature et les boutons (`actions`). `InstitutionalHero` délègue à ce composant pour À propos et Activités. La disposition sans logo reste possible (`logo={null}`) pour un futur besoin justifié ; les 12 pages actuelles utilisent le logo officiel approprié.

Fond #061b46, accents or, titre blanc aligné à gauche, colonne logo à droite dès 1024 px ; empilement sous le texte sur tablette et mobile. Cadre 320 × 256 px, réduit automatiquement sur les écrans plus étroits ; image entière avec object-fit: contain. Marges verticales 80/64/48 px, horizontales 32/32/20 px. Titres 48/48/36 px ; sous-titres 18 px avec interligne 32 px et largeur maximale 680 px. Hauteur naturelle selon le texte et les boutons, sans bloc invisible de dimensionnement.

## Comparaison avant → après

Hauteurs mesurées en pixels, chaque paire représente FR / EN. Les différences restantes viennent du contenu conservé.

| Page | Ordinateur 1440 px | Tablette 834 px | Mobile 390 px |
|---|---|---|---|
| / | 710 / 648 → 576 / 544 | 963 / 963 → 832 / 800 | 1025 / 1025 → 966 / 913 |
| /about | 478 / 477 → 416 / 416 | 790 / 790 → 667 / 667 | 801 / 761 → 717 / 676 |
| /architecture | 451 / 451 → 416 / 416 | 744 / 744 → 667 / 667 | 785 / 753 → 749 / 717 |
| /activities | 478 / 477 → 416 / 416 | 790 / 758 → 667 / 635 | 801 / 801 → 717 / 696 |
| /entities | 324 / 324 → 416 / 416 | 324 / 324 → 619 / 619 | 316 / 316 → 607 / 607 |
| /gk-global-technology | 416 / 416 → 528 / 496 | 1021 / 1021 → 784 / 752 | 893 / 813 → 907 / 822 |
| /gk-global-mobility | 409 / 409 → 443 / 416 | 941 / 941 → 699 / 667 | 773 / 773 → 781 / 781 |
| /gk-nexus | 460 / 460 → 523 / 491 | 1017 / 1017 → 779 / 747 | 841 / 809 → 852 / 820 |
| /gk-esttrade | 416 / 416 → 416 / 416 | 1021 / 1021 → 667 / 667 | 893 / 813 → 687 / 655 |
| /partnerships | 490 / 490 → 523 / 523 | 1143 / 1143 → 779 / 779 | 951 / 919 → 925 / 893 |
| /news | 417 / 417 → 416 / 416 | 417 / 417 → 667 / 667 | 469 / 397 → 728 / 655 |
| /contact | 417 / 417 → 416 / 416 | 417 / 417 → 667 / 667 | 429 / 429 → 687 / 687 |

Avant : titres de 48 à 60 px sur ordinateur ; plusieurs structures de bannières, cadres de logos de 346–374 × 249–309 px, logos absents sur Entités, Actualités et Contact ; très grandes images empilées sur tablette. Après : une structure commune, titres et espacements communs, cadre 320 × 256 px sur les trois formats contrôlés, ajout du logo GK GROUP aux trois pages générales qui n’en avaient pas. Fichiers des logos inchangés.

## Aperçus locaux

Serveur : http://localhost:3100. Chaque page peut être consultée avec `?lang=fr` et `?lang=en`. La galerie contient les 72 captures en taille native.

[Ouvrir la galerie](hero-previews/index.html)

- / : [FR](http://localhost:3100/?lang=fr) · [EN](http://localhost:3100/?lang=en)
- /about : [FR](http://localhost:3100/about?lang=fr) · [EN](http://localhost:3100/about?lang=en)
- /architecture : [FR](http://localhost:3100/architecture?lang=fr) · [EN](http://localhost:3100/architecture?lang=en)
- /activities : [FR](http://localhost:3100/activities?lang=fr) · [EN](http://localhost:3100/activities?lang=en)
- /entities : [FR](http://localhost:3100/entities?lang=fr) · [EN](http://localhost:3100/entities?lang=en)
- /gk-global-technology : [FR](http://localhost:3100/gk-global-technology?lang=fr) · [EN](http://localhost:3100/gk-global-technology?lang=en)
- /gk-global-mobility : [FR](http://localhost:3100/gk-global-mobility?lang=fr) · [EN](http://localhost:3100/gk-global-mobility?lang=en)
- /gk-nexus : [FR](http://localhost:3100/gk-nexus?lang=fr) · [EN](http://localhost:3100/gk-nexus?lang=en)
- /gk-esttrade : [FR](http://localhost:3100/gk-esttrade?lang=fr) · [EN](http://localhost:3100/gk-esttrade?lang=en)
- /partnerships : [FR](http://localhost:3100/partnerships?lang=fr) · [EN](http://localhost:3100/partnerships?lang=en)
- /news : [FR](http://localhost:3100/news?lang=fr) · [EN](http://localhost:3100/news?lang=en)
- /contact : [FR](http://localhost:3100/contact?lang=fr) · [EN](http://localhost:3100/contact?lang=en)

## Vérifications

- ESLint et build Next.js : réussis.
- Scripts verify-home, verify-architecture, verify-institutional-pages, verify-seo : réussis.
- verify-heroes : 24 versions FR/EN comparées aux empreintes avant modification. Textes visibles, boutons, sections sous les bannières, navigation, pied de page, SEO et JSON-LD inchangés.
- 72 contrôles navigateur et captures : 12 pages × 2 langues × 3 formats. Fond bleu exact, cadres cohérents, object-fit contain, aucun débordement horizontal ni espace entre navigation et bannière. Revue des six planches FR/EN sur ordinateur, tablette et mobile : titres et logos visibles, textes non coupés, boutons conservés.
- Les espacements internes des sections suivantes sont conservés : ils dépendent de leurs composants existants.
- Seules les bannières des 12 pages institutionnelles sont concernées. Les articles individuels /news/[slug] conservent leur présentation éditoriale.
- Avertissement de build Node DEP0205 sur module.register : non bloquant ; aucune erreur de compilation.
- Aucun push ni déploiement. Validation visuelle attendue.
