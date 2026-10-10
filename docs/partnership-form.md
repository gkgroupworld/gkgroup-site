# Propositions de partenariat — Netlify Forms

## Compatibilité et architecture vérifiées dans le dépôt

Le projet utilise Next.js 16.2.6 (App Router), React 19 et `@netlify/plugin-nextjs` v5, avec `npm run build` et publication de `.next` dans `netlify.toml`. Il ne s'agit pas d'un export HTML statique. Les pages Next rendues à la demande ne suffisent donc pas à la détection Netlify Forms.

La solution suit la documentation de l'adaptateur : `public/__forms.html` est un véritable fichier statique, contenant le formulaire caché `international-partnerships` et tous ses champs. React envoie une requête POST URL-encodée vers `/__forms.html`, avec `form-name`, `locale`, `fax`, les dix champs de proposition et `consent=yes`. Ne pas renommer un champ sans mettre à jour les deux formulaires. Les attributs de détection sont uniquement dans le fichier HTML statique.

Le composant conserve les validations et les limites de longueur, exige le consentement, interdit les doubles clics pendant l'envoi, attend une réponse HTTP 2xx et refuse une redirection ou le retour du fichier de référence. Il affiche alors le message de succès. Une erreur HTTP, réseau ou un délai dépassant 30 secondes affiche une erreur et conserve les valeurs tant que la page reste ouverte. Aucun stockage local ou journal de données personnelles n'est ajouté. Une interruption réseau peut survenir après un enregistrement : vérifier la réception avant de renvoyer pour éviter les doublons.

Les liens email et WhatsApp restent disponibles, y compris sans JavaScript. L'envoi automatique exige JavaScript ; sans lui, les champs sont désactivés et les alternatives restent utilisables. Les liens alternatifs ouvrent les coordonnées officielles, sans transmettre automatiquement les champs saisis.

## Réglages Netlify avant activation

1. Ouvrir le projet Netlify réellement associé à `gkgroup.app` et vérifier le dépôt, la branche de production, la commande de build et l'utilisation effective de l'adaptateur Next.js v5 dans les logs. Un contrôle HTTP en lecture seule de la page publiée a retourné `Server: Netlify` et un identifiant `X-Nf-Request-Id`. Cela confirme le service du domaine par Netlify, mais pas les réglages Forms ni la version de l'adaptateur effectivement utilisée dans le dernier déploiement. La configuration du compte distant n'a pas été consultée depuis ce dépôt.
2. Dans **Forms**, sélectionner **Enable form detection** si nécessaire. L'activation ne prend effet qu'au déploiement suivant.
3. Après autorisation de publication, déployer cette branche dans un environnement de test Netlify autorisé avant une intégration en production. Une compilation Next locale ne remplace pas ce déploiement.
4. Garder `/__forms.html` accessible comme fichier statique. Aucun middleware, contrôle d'accès, redirect ou rewrite ne doit intercepter son POST. Ne pas contourner le contrôle de l'adaptateur avec `NETLIFY_NEXT_VERIFY_FORMS=false`.
5. Vérifier les quotas et conditions Forms du plan, les droits d'accès aux propositions et la durée de conservation retenue par l'entreprise. Ne pas mettre de secret SMTP dans le navigateur.

## Vérifier la détection

- Examiner le journal de déploiement/post-traitement pour la détection de `international-partnerships` et toute erreur de l'adaptateur.
- Dans **Forms**, confirmer que ce nom apparaît, avec les champs attendus et la protection honeypot.
- Ouvrir le fichier `/__forms.html` du déploiement : le formulaire reste caché et porte le champ `form-name`. Netlify retire normalement les attributs `data-netlify` et `netlify-honeypot` pendant le traitement.
- Si le formulaire n'apparaît pas, vérifier détection activée avant le build, présence de l'asset public dans le déploiement, noms identiques et adaptateur effectif. Ne pas considérer un simple HTTP 200 sur la page comme preuve d'enregistrement.

## Test réel après déploiement autorisé

1. Utiliser des données de test identifiables et une adresse email de test autorisée, sans documents sensibles.
2. Ouvrir `/partnerships?lang=fr`, remplir tous les champs, vérifier les erreurs de validation et le consentement obligatoire, puis envoyer une seule proposition.
3. Dans le navigateur, contrôler le POST vers `/__forms.html`, le corps URL-encodé et une réponse réussie ; le message de succès doit apparaître uniquement après cette réponse.
4. Dans **Forms > international-partnerships**, retrouver la proposition dans les soumissions vérifiées. Comparer tous les champs, `locale=fr` et `consent=yes`. Vérifier aussi la liste spam si nécessaire : un acquittement HTTP ne garantit pas le classement comme soumission vérifiée ni la notification email.
5. Refaire en anglais avec un autre identifiant et confirmer `locale=en` et le texte de succès anglais.
6. Simuler une connexion interrompue ou un échec HTTP dans un environnement de test ; vérifier erreur visible, valeurs conservées et nouvelle tentative possible. Vérifier ordinateur, tablette et téléphone.
7. Tester le honeypot dans l'environnement autorisé : le client bloque un champ `fax` rempli ; un POST direct avec ce champ rempli doit être rejeté par Netlify. Les rejets honeypot peuvent ne pas apparaître dans la liste spam.
8. Supprimer les soumissions de test après vérification selon les règles de conservation convenues.

## Notifications email — configuration manuelle obligatoire

Dans **Forms > Submission notifications > Add notification**, choisir la notification email et limiter au formulaire `international-partnerships`. Renseigner **gk.contactus@gkgroup.app**. Un sujet possible est `Nouvelle proposition — %{formName} (%{submissionId})`. Enregistrer la règle.

Envoyer ensuite une nouvelle proposition de test vérifiée et contrôler sa présence dans Netlify ET l'arrivée effective de la notification dans cette boîte, y compris le dossier indésirables. Vérifier le contenu et le Reply-To : le champ existant `email` permet à Netlify de reprendre l'adresse du proposant. Les notifications concernent les soumissions vérifiées ; une proposition classée spam peut ne pas les déclencher.

Le destinataire dans `content/site.js` ne configure pas les notifications Netlify. Aucun email automatique n'est annoncé comme opérationnel avant cette configuration et ce test. Aucun réglage distant, email réel ou déploiement n'est effectué par les tests locaux.

## Antispam et limites

Le champ caché `fax` est déclaré avec `netlify-honeypot="fax"` dans la référence statique et inclus dans le POST. Netlify applique aussi son filtrage antispam. Aucun CAPTCHA nécessitant une configuration supplémentaire n'est ajouté. Les validations de champs côté navigateur sont contournables : Netlify Forms ne remplace pas une validation métier serveur personnalisée. Le consentement obligatoire est contrôlé dans l'interface ; un POST fabriqué peut contourner ce contrôle, et doit être vérifié lors du traitement de la proposition.

`next dev` / `next start` ne fournissent pas le service Forms ; un envoi local doit échouer sans fausse confirmation. Les tests avec réponses simulées vérifient l'interface, pas la réception distante. La compatibilité du code avec le mécanisme documenté est établie ; la détection et l'enregistrement dans le projet Netlify précis restent à vérifier sur un déploiement autorisé.

Si le site réel n'est pas servi par Netlify, si Forms est indisponible pour ce projet ou si les POST statiques sont interceptés, ne pas activer cette intégration comme si elle fonctionnait. Conserver les contacts alternatifs et prévoir, dans un changement autorisé séparément, un endpoint serveur validant les données et le consentement, avec antispam et un fournisseur d'envoi transactionnel vérifié.

## Références officielles

- [OpenNext : Netlify Forms avec Next.js](https://opennext.js.org/netlify/forms)
- [Netlify : configuration et détection](https://docs.netlify.com/manage/forms/setup/)
- [Netlify : notifications](https://docs.netlify.com/manage/forms/notifications/)
- [Netlify : antispam](https://docs.netlify.com/manage/forms/spam-filters/)

## Vérifications effectuées sur cette branche

- `npm run lint` et `npm run build` réussis (Next.js 16.2.6).
- 24 contrôles navigateur automatisés : FR/EN, champs obligatoires et consentement, corps POST et parité des noms avec la référence HTML, honeypot, échecs HTTP/réseau/redirection/faux retour statique, conservation des valeurs et nouvelle tentative, succès après acquittement simulé, liens alternatifs, sans JavaScript et affichage à 390/768/1440 px.
- Captures du formulaire inspectées sur ordinateur et téléphone ; aucun débordement horizontal aux trois tailles testées.
- Le serveur Next local rejette le POST sans service Forms. Aucune soumission réelle, notification distante ou publication effectuée.
- Autres pages, logos, route, métadonnées SEO, sitemap et configuration de déploiement inchangés.
