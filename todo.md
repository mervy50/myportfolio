# Refonte portfolio aqua / noir

- [x] Valider la palette aqua principale, les noirs et les niveaux de contraste.
- [x] Valider la direction typographique et le style du logo/wordmark.
- [x] Valider la structure des pages inspirée des références : accueil, à propos, portfolio, certifications, contact.
- [x] Remplacer la direction éditoriale actuelle par une interface sombre à grille technique et cartes compactes.
- [x] Ajouter les interactions : navigation active, onglets projets/certifications/stack, cartes ouvrables et états de survol.
- [x] Ajouter les contenus réels de l’utilisateur après validation de la structure.
- [x] Vérifier l’accessibilité, le responsive mobile et le rendu final.
- [x] Recevoir le fichier CV PDF réel ; intégrer le bouton de téléchargement après copie dans les assets du projet.
- [x] Choisir le canal d’envoi du formulaire : backend du projet.
- [x] Ajouter des interactions plus visibles : menu mobile, transitions de pages, états actifs, modales ou aperçus de projets.
- [x] Tester la soumission du formulaire et les états de succès/erreur après configuration backend.
- [x] Ajouter la notification propriétaire intégrée pour la livraison opérationnelle des messages.

- [x] Implémenter un aperçu modal de projet avec animation d’entrée et revalider les interactions avancées.
- [x] Ajouter la validation testée du schéma contact.send et vérifier l’UI de soumission ; le test d’écriture réel reste volontairement exclu pour ne pas créer de données fictives.
- [x] Effectuer une passe finale d’accessibilité et de responsive après les changements backend : navigation clavier, focus et messages d’état.
- [x] Ajouter un test d’intégration serveur pour contact.send avec succès et erreur DB simulée, sans écriture réelle de données.
- [x] Refaire une vérification responsive mobile après les changements backend et capturer les pages concernées.
- [x] Améliorer l’accessibilité de la modale projet avec Escape et focus initial.
- [x] Recevoir et configurer les secrets SMTP Gmail avec une clé d’application, sans utiliser le mot de passe principal.
- [x] Envoyer les messages du formulaire vers l’adresse Gmail de Merveille et conserver la notification propriétaire.
- [x] Copier et publier la photo de profil fournie via le stockage webdev.
- [x] Remplacer les portraits temporaires de l’accueil et de la page À propos par la photo réelle.
- [x] Tester la configuration SMTP, le téléchargement du CV et le rendu photo sur desktop/mobile.
- [x] Vérifier l’accessibilité de l’URL de téléchargement du CV PDF depuis le bouton dédié.
- [x] Refaire les contrôles mobile après intégration de la photo sur l’accueil et la page À propos.
- [x] Corriger la barre de navigation : liens desktop et mobile cliquables vers les bonnes routes.
- [x] Retirer les numéros 01, 02, 03 et 04 des libellés de la navbar.
- [x] Vérifier la navigation au clavier, le menu mobile et les routes principales après correction.
- [x] Tester réellement la navbar corrigée sur mobile : ouverture, fermeture et clic sur chaque lien.
- [x] Vérifier au clavier le focus visible, Enter/Espace et le bouton du menu mobile.
- [x] Ajouter un test UI couvrant tous les liens de la navbar en mode mobile : Accueil, À propos, Portfolio et Contact.
- [x] Ajouter un test UI clavier pour le bouton mobile et la navbar : focus visible, Enter et Espace.
- [x] Vérifier explicitement le focus visible de la navbar et du bouton mobile au clavier, puis revalider l’item clavier.
- [x] Ajouter une transition fluide entre les routes du portfolio en respectant prefers-reduced-motion.
- [x] Ajouter un fil d’Ariane accessible sur les pages de détail projet.
- [x] Intégrer la nouvelle photo uniquement sur la page À propos et conserver la première photo sur l’accueil.
- [x] Vérifier les deux portraits, les transitions et le fil d’Ariane sur desktop/mobile.
- [x] Refaire une vérification mobile de la page d’accueil pour confirmer que le premier portrait reste correct après l’ajout du second portrait.
- [x] Effectuer une vérification documentée des transitions entre routes sur desktop et mobile : Accueil → À propos → Détail projet.
- [x] Tester réellement les transitions en navigation sur desktop pour le parcours Accueil → À propos → Détail projet, puis documenter le résultat.
- [x] Tester réellement les transitions en navigation sur mobile pour le parcours Accueil → À propos → Détail projet, puis documenter le résultat.
- [x] Vérifier en navigateur desktop le parcours Accueil → À propos → Détail projet et confirmer l’animation à chaque route.
- [x] Vérifier en navigateur mobile le parcours Accueil → À propos → Détail projet et confirmer l’animation à chaque route.
- [x] Ajouter une vérification browser-level documentée ciblant l’apparition de `.page-transition`.
- [x] Auditer l’état actuel de l’authentification et du panel administrateur.
- [x] Définir les entités administrables : projets et certifications pour cette première version.
- [x] Créer les tables et migrations nécessaires sans données fictives.
- [x] Ajouter les procédures tRPC CRUD protégées par le rôle administrateur.
- [x] Construire le panel admin avec listes, création, modification et suppression confirmée.
- [x] Connecter le portfolio public aux données CRUD et ajouter les tests de permissions/opérations.
- [x] Définir les tables persistantes `portfolio_projects` et `portfolio_certifications` sans supprimer les données existantes.
- [x] Ajouter les helpers DB de lecture, création, modification et suppression pour projets et certifications.
- [x] Ajouter les procédures tRPC publiques de lecture et protégées par `adminProcedure` pour les mutations.
- [x] Créer une route `/admin` avec authentification et contrôle explicite du rôle `admin`.
- [x] Construire le panel CRUD pour projets et certifications avec formulaires, édition, suppression confirmée et états d’erreur.
- [x] Connecter les pages Portfolio et détail projet aux données de la base avec gestion loading/empty/error.
- [x] Ajouter les tests de permissions admin et de validation des opérations CRUD sans données de test persistées.
- [x] Ajouter de vrais états loading/error/empty sur Portfolio et ProjectDetail, au lieu de masquer les erreurs via des fallbacks statiques.
- [x] Ajouter un empty state explicite pour la liste de projets, la liste de certifications et le cas projet introuvable.
- [x] Ajouter des tests serveur mockés couvrant create/update/delete/list/bySlug pour projets et certifications, avec succès et échec.
- [x] Ajouter des tests mockés d’échec pour les certifications, notamment create et update/delete.
- [x] Ajouter des tests d’échec pour projects.bySlug/list et au moins une mutation update/delete.
- [x] Ajouter une table persistante pour le profil éditable et une table pour les compétences techniques groupées.
- [x] Ajouter un champ `displayOrder` aux projets et une mutation admin de réordonnancement.
- [x] Ajouter les procédures tRPC publiques/admin pour lire et modifier profil et compétences.
- [x] Construire les formulaires admin du profil et des compétences avec création, modification et suppression.
- [x] Ajouter le glisser-déposer des projets avec sauvegarde de l’ordre et alternative clavier.
- [x] Connecter l’accueil, À propos et Tech Stack aux données dynamiques du profil et des compétences.
- [x] Ajouter les tests de permissions, CRUD profil/compétences et réordonnancement des projets.
- [x] Intégrer le panel admin au DashboardLayout partagé et vérifier le build de production.

- [x] Diagnostiquer et corriger la connexion au panel `/admin`.
- [x] Ajouter la collecte des visites publiques et des téléchargements du CV.
- [x] Ajouter une procédure admin de statistiques avec agrégats récents et totaux.
- [x] Construire le tableau de bord statistique léger dans `/admin`.
- [x] Ajouter les tests d’authentification, de permissions et de métriques.
- [x] Vérifier visuellement le panel admin et sauvegarder un checkpoint de livraison.

- [x] Vérifier le callback OAuth de bout en bout, le cookie de session, le rôle admin et le retour vers `/admin`.
- [x] Séparer les totaux historiques des agrégats des 30 derniers jours dans les statistiques.
- [x] Ajouter des tests ciblés pour le retour OAuth et les options de cookie de session.
- [x] Vérifier visuellement le dashboard admin authentifié avec les statistiques affichées.

- [x] Diagnostiquer la page d’erreur affichée après la connexion Google au callback OAuth.
- [x] Corriger le flux OAuth selon l’erreur observée et revalider le retour vers `/admin`.

- [x] Ajouter un statut de lecture aux messages de contact et les procédures admin associées.
- [x] Construire une boîte de réception admin pour consulter, marquer comme lu et supprimer les messages.
- [x] Ajouter les événements de clic GitHub et LinkedIn au suivi statistique.
- [x] Étendre les agrégats et le tableau de bord aux clics sociaux.
- [x] Ajouter les tests CRUD/permissions de la boîte de réception et du suivi social.
- [x] Vérifier le rendu admin et sauvegarder un checkpoint après validation.

- [x] Enregistrer un nouveau checkpoint après la boîte de réception admin et le suivi GitHub/LinkedIn validés.

- [x] Déplacer le bouton de téléchargement du CV de l’accueil vers la page À propos.
- [x] Conserver le suivi statistique et vérifier le téléchargement depuis À propos.
- [x] Vérifier le rendu responsive et enregistrer un checkpoint après la modification.

- [x] Enregistrer un checkpoint après le déplacement du bouton CV vers la page À propos, une fois la validation responsive terminée.

- [x] Ajouter une image d’attestation administrable à chaque certification.
- [x] Mettre en place l’import d’images via le stockage sécurisé et enregistrer l’URL en base.
- [x] Afficher un aperçu et un accès à l’attestation dans l’onglet Certifications.
- [x] Remplacer « Ouvrir l’étude de cas » par « Découvrir les détails » dans l’aperçu rapide.
- [x] Ajouter les tests de certification et du nouveau libellé projet.
- [x] Vérifier le rendu responsive et enregistrer un checkpoint après validation.

- [x] Enregistrer un nouveau checkpoint après l’import d’attestations, l’affichage public et le CTA « Découvrir les détails » validés.

- [x] Inventorier page par page tous les contenus affichés sur le front et les éléments encore codés en dur.
- [x] Définir les entités éditoriales manquantes pour administrer textes, liens, images et paramètres publics.
- [x] Ajouter les tables et migrations nécessaires sans écraser les contenus existants.
- [x] Ajouter les procédures tRPC publiques/admin et les validations associées.
- [x] Étendre le panel admin pour gérer tous les contenus éditoriaux identifiés.
- [x] Connecter le front aux contenus administrables et gérer les médias via le stockage sécurisé.
- [x] Ajouter les tests de CRUD, permissions, rendu public et régressions.
- [x] Vérifier desktop/mobile et enregistrer un checkpoint de livraison.

- [x] Corriger la validation `educationInput.year` et ajouter des tests serveur pour années valides/invalides.
- [x] Rendre administrables les libellés encore codés en dur : onglets Portfolio, labels du formulaire Contact et microcopies publiques.
- [x] Ajouter des tests dédiés pour `portfolio.content` et `portfolio.education` : lecture publique, CRUD admin, permissions et rendu public.
- [x] Enregistrer un checkpoint après la validation finale desktop/mobile de ce lot éditorial.

- [x] Étendre `portfolio_site_content` et le formulaire admin pour gérer les libellés d’onglets, labels/placeholders Contact et microcopies Home.
- [x] Connecter Home, Portfolio et Contact à ces nouveaux champs éditoriaux avec fallbacks et validations.
- [x] Ajouter des tests UI vérifiant que ces libellés proviennent bien de `portfolio.content.get`.

- [x] Ajouter un champ éditorial pour le placeholder du message Contact et le brancher dans l’admin et le front.
- [x] Compléter les tests UI explicites des libellés éditoriaux Home et Contact.

- [x] Auditer les métadonnées HTML, le favicon et les assets de partage social existants.
- [x] Ajouter les balises SEO de base, Open Graph, Twitter Cards, canonical et données structurées.
- [x] Générer et intégrer un favicon aqua/noir et une image de partage social cohérente avec la charte.
- [x] Ajouter les tests de présence des métadonnées et vérifier le build responsive.
- [x] Enregistrer un checkpoint après validation SEO et livrer la version mise à jour.

- [x] Régénérer l’image Open Graph au format paysage 16:9 et aligner ses dimensions déclarées.
- [x] Effectuer une vérification visuelle desktop/mobile après le lot SEO.
- [x] Enregistrer un nouveau checkpoint après validation complète du lot SEO.

- [x] Retirer le domaine fictif de la balise canonical et documenter le réglage à effectuer après choix de l’hébergement.
- [x] Valider tests et build après neutralisation de la canonical.
- [x] Comparer les options d’hébergement gratuit compatibles avec ce portfolio full-stack.

- [x] Préparer l’état Git et vérifier qu’aucun secret ou fichier sensible ne sera poussé.
- [x] Pousser la version actuelle vers `mervy50/myportfolio`.
- [x] Vérifier le commit et la branche distants, puis documenter le lancement local.

- [x] Repérer et retirer toutes les occurrences du bandeau « 01 / Disponible pour de nouveaux projets ».
- [x] Vérifier le rendu et les tests après suppression du bandeau.
- [x] Pousser la correction sur GitHub.

- [x] Retirer les préfixes « 01 / À propos », « 02 / Portfolio » et « 04 / Contact » des pages publiques.
- [x] Corriger la localisation affichée en « Porto-Novo, Bénin » dans les contenus administrables et le front.
- [x] Ajouter ou ajuster les tests, valider le rendu et pousser la correction sur GitHub.

- [x] Auditer le lien Admin public et confirmer la protection serveur de `/admin`.
- [x] Retirer le lien Admin du footer et de toute navigation publique.
- [x] Ajouter une régression UI de non-exposition et revalider l’accès admin protégé.
- [x] Pousser la correction sur GitHub et documenter l’accès privé au panel.

- [x] Auditer les transitions et micro-interactions actuellement présentes.
- [x] Ajouter une transition chic entre les routes et des feedbacks visuels au clic.
- [x] Respecter `prefers-reduced-motion` et préserver le focus clavier.
- [x] Ajouter ou ajuster les tests, vérifier desktop/mobile et pousser un checkpoint.

- [x] Définir un chemin admin configurable sans exposer le chemin public historique.
- [x] Adapter le routage client, le callback OAuth et la documentation à ce chemin privé.
- [x] Ajouter une alerte propriétaire pour les tentatives d’accès admin refusées, avec limitation anti-spam.
- [x] Documenter que la 2FA dépend du fournisseur OAuth et préciser la procédure de vérification.
- [x] Ajouter les tests de routage, autorisation et notification, puis valider et pousser la version.

- [x] Vérifier visuellement les nouvelles animations et micro-interactions en viewport mobile.
- [x] Enregistrer un checkpoint dédié après validation desktop/mobile des animations.

- [x] Enregistrer un checkpoint dédié après validation desktop/mobile des animations de navigation et de clic.

- [x] Rendre les transitions entre pages et les animations de blocs plus visibles dans le portfolio.
- [x] Vérifier les animations sur desktop et mobile, ainsi que `prefers-reduced-motion`.
- [x] Pousser et enregistrer un checkpoint de la nouvelle passe d’animation.

- [x] Pousser la passe d’animation sur GitHub et confirmer le SHA publié sur `main`.

- [x] Ajouter une introduction plein écran au premier chargement avec « Welcome to my Portfolio Website ».
- [x] Animer les groupes de mots depuis les côtés, les réunir au centre, maintenir l’intro quelques secondes puis révéler l’accueil.
- [x] Ralentir les transitions entre pages et les apparitions des blocs avec un rythme lisible.
- [x] Respecter `prefers-reduced-motion`, tester desktop/mobile et enregistrer un checkpoint.

- [x] Enregistrer un checkpoint dédié après l’introduction plein écran et le ralentissement des transitions.

- [x] Retirer la mention « LOKO-DADE. / PORTFOLIO » de l’introduction.
- [x] Réduire le temps d’écran noir avant l’animation principale de l’intro.
- [x] Ajouter un effet de survol élégant et accessible sur les cartes de projets.
- [x] Vérifier desktop/mobile, tester et enregistrer un checkpoint.

- [x] Réduire le délai de l’écran noir vide avant le début de l’introduction.
- [x] Augmenter la durée et la lisibilité des transitions entre les pages.
- [x] Valider les durées sur desktop/mobile, mettre à jour les tests et enregistrer un checkpoint.

- [x] Retirer le message du boot HTML pour éviter son apparition en double avec l’intro React.
- [x] Conserver un repère visuel aqua discret pendant le montage initial.
- [x] Ajouter un test anti-doublon, valider desktop/mobile et enregistrer un checkpoint.

- [x] Supprimer complètement le repère aqua de préchargement.
- [x] Vérifier que l’introduction apparaît directement sur desktop et mobile, puis enregistrer un checkpoint.

- [x] Auditer les timings actuels des transitions entre les pages.
- [x] Ralentir et équilibrer les transitions de routes pour un rendu plus cinématique.
- [x] Valider les transitions sur desktop, mobile et avec `prefers-reduced-motion`, puis enregistrer un checkpoint.

- [x] Augmenter encore la durée du balayage aqua entre les pages.
- [x] Synchroniser sa disparition avec la transition de route et valider le rendu.

- [x] Prolonger légèrement le balayage aqua actuel.
- [x] Créer plusieurs directions et types de transitions entre les pages.
- [x] Brancher les variantes selon la page de destination et la direction de navigation.
- [x] Tester desktop/mobile, `prefers-reduced-motion` et les régressions, puis enregistrer un checkpoint.

- [x] Transformer la Tech Stack en grille de cartes visuelles avec logos et noms.
- [x] Ajouter les données de logo/couleur nécessaires aux compétences existantes sans perdre les contenus actuels.
- [x] Permettre la gestion des logos depuis le panel admin et connecter le rendu public.
- [x] Tester la grille sur desktop/mobile, l’accessibilité et les régressions, puis enregistrer un checkpoint.

- [x] Préparer et pousser la version Tech Stack vers `mervy50/myportfolio`.
- [x] Vérifier l’état distant et documenter les limites de GitHub Pages pour le backend full-stack.
- [x] Fournir les commandes locales et les options d’hébergement compatibles.
