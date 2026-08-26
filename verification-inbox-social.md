# Vérification intermédiaire — boîte de réception et clics sociaux

Le dashboard `/admin` authentifié se charge avec les cartes Visites, Téléchargements CV, GitHub, LinkedIn et Événements suivis. L’onglet `Messages` est visible avec un compteur non lu (`0` dans la base actuelle) et affiche correctement l’état vide : « Aucun message reçu pour le moment. » Le bouton d’actualisation de la boîte de réception est présent. Les données de test ne sont pas injectées afin de préserver l’intégrité des messages réels.

La suite Vitest ciblée est passée : 14 tests réussis. La suite complète est ensuite passée : 27 tests réussis et 1 test ignoré.

## Vérification navigateur — liens sociaux

La page `/contact` affiche les liens GitHub et LinkedIn. Un clic réel sur GitHub a correctement ouvert `https://github.com/mervy50`, ce qui confirme que l’instrumentation ne bloque pas la navigation externe. Le compteur sera recontrôlé dans `/admin` après actualisation des statistiques.

## Vérification navigateur — ouverture externe

Après chargement, la page `/contact` affiche bien les liens GitHub et LinkedIn. Les liens sont désormais configurés avec `target="_blank"` et `rel="noreferrer"` afin que l’événement de clic puisse être envoyé sans interrompre la page courante.

## Vérification navigateur — CTA GitHub

Le clic GitHub depuis `/contact` ouvre bien le profil public `https://github.com/mervy50` dans la navigation externe, sans erreur d’interface. Le lien conserve donc le comportement attendu après l’ajout du suivi et de l’ouverture dans un nouvel onglet.
