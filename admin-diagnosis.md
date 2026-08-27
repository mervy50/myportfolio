# Diagnostic Admin — 27 août 2026

La page `/espace-prive-mervy` se rend correctement sur desktop et mobile avec le tableau de bord, les onglets, les statistiques, les formulaires et les listes CRUD visibles.

Les derniers logs serveur et navigateur ne montrent pas d’erreur après correction. Des entrées historiques de la console contenaient toutefois des erreurs tRPC sur des requêtes SQL de projets, de contenu et de compétences, ainsi qu’un message `Unexpected token '<'`. La cause la plus probable des erreurs intermittentes est le traitement global des erreurs React Query : une erreur d’authentification pouvait déclencher une nouvelle navigation OAuth alors que l’utilisateur se trouvait déjà dans l’espace privé. Le guard analytics comparait aussi uniquement `/admin`, alors que le chemin actif est `/espace-prive-mervy`.

Corrections appliquées : le layout ignore maintenant tout le chemin Admin configurable pour le suivi analytics, et les providers `QueryClientProvider`/tRPC sont imbriqués dans l’ordre recommandé. Les captures desktop/mobile restent visuellement cohérentes après ces changements.

## Contrôle après correction

Les captures desktop 1280×720 et mobile 375×812 de `/espace-prive-mervy` affichent correctement le tableau de bord, les statistiques, les onglets, le formulaire projet et la liste de projets. Aucun défaut visuel bloquant n’est apparu après la correction. Les logs les plus récents de la console ne contiennent que les messages normaux de Vite/React DevTools ; les requêtes Admin observées répondent HTTP 200.
