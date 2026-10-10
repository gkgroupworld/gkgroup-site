# Corrections SEO ciblées

## Portée

- `proxy.js` lit uniquement le paramètre URL `lang` et transmet une langue normalisée au layout par un en-tête de requête interne, écrasé systématiquement. `app/layout.js` utilise `await headers()` pour rendre `<html lang>` dès la réponse serveur.
- Le proxy exclut les ressources statiques, `/__forms.html`, les routes API et les ressources Next.js. Aucune redirection, réécriture ou modification des URL.
- Le sélecteur de langue existant utilise un lien HTML avec rechargement complet. Les layouts Next.js étant conservés pendant les navigations client, ce comportement reste nécessaire pour changer la langue du document. Les liens internes conservent la langue courante.
- Adaptation limitée, sans déplacement des pages. Les pages utilisent déjà `searchParams` et sont rendues dynamiquement. `headers()` rend aussi le layout dépendant de la requête. Le build conserve le sitemap et robots en statique. Le fonctionnement du proxy sur l'hébergement Netlify réel devra être confirmé dans un environnement autorisé avant production.
- GK GROUP est une `Brand`. GK GLOBAL GROUP SARL U est une `Organization` au Togo, avec deux `department` opérationnels (`Organization`). UAB GK EstTrade est une société distincte en Lituanie, associée à la marque sans lien capitalistique déclaré. GK NEXUS est un `Thing` décrivant explicitement un projet sous réserve d'immatriculation, sans adresse juridique ni identifiant de société.
- Identifiants `@id` stables et références résolues dans un seul `@graph`. Coordonnées reprises de `CONTACT`; seules les villes et pays déjà publiés sont utilisés pour les sociétés.
- Aucun historique éditorial fiable de modification des pages n'est enregistré : `lastModified` est omis pour les 22 URL. Ne pas utiliser la date de build, de commit ou la date d'immatriculation comme date de modification de page.

## Vérifications

- `npm run lint` : réussi.
- `npm run build` : réussi (Next.js 16.2.6). Avertissement de dépréciation `module.register()` provenant de l'outillage.
- Après `npm run start -- --port 3100`, exécuter `node scripts/verify-seo.mjs http://localhost:3100` : réussi.
- 22 réponses HTTP 200 : langue du HTML initial, canonical, trois variantes hreflang, graphe JSON-LD identique et références cohérentes.
- Sitemap : exactement les 22 URL attendues, sans doublons et sans `lastmod`, variantes linguistiques conservées.
- Langue : FR par défaut, EN via `?lang=en`, valeurs inconnues/majuscules/multiples traitées comme FR, autres paramètres conservés ; un en-tête de langue fourni par le client ne prévaut pas sur l'URL.
- Validation avec le vocabulaire officiel Schema.org : 7 entités, 43 propriétés contrôlées, types et propriétés reconnus, domaines et plages des relations entre objets valides. Références : https://schema.org/Brand et https://schema.org/department ; vocabulaire : https://schema.org/version/latest/schemaorg-current-https.jsonld.
- Formulaire de partenariats : rendu serveur FR/EN, parité des noms de champs avec la référence statique, langue cachée, consentement obligatoire, nom du formulaire, méthode POST et action `/__forms.html`. Fichier de référence servi identique ; proxy exclu de l'endpoint Forms. Aucun changement des composants, contenus, ressources publiques ou configuration Netlify.
- Aucun envoi réel, aucune vérification de réception ou notification distante, aucun déploiement. Le parcours navigateur complet n'a pas été rejoué ; le code du formulaire est inchangé.

Aucune fusion ou publication sans validation explicite du propriétaire.
