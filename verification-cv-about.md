# Vérification du déplacement du CV

Sur desktop, l’accueil ne contient plus le lien « Télécharger mon CV » dans le bloc d’actions du hero. La page À propos affiche le bouton « Télécharger mon CV » à côté de « Parler d’un projet », dans la zone de présentation du profil. Le bouton conserve son style aqua/noir, son attribut de téléchargement et l’événement `trackCvDownload` avec le chemin `/about`.

## Vérification mobile

Sur mobile, l’accueil conserve uniquement ses deux CTA principaux sans bouton CV. Dans À propos, le lien « Télécharger mon CV » reste visible à côté du CTA de contact, sans débordement ni chevauchement, et la page conserve ses cartes de compétences et sa mise en page verticale.

Les tests ciblés ont validé le parcours Accueil → À propos et la présence du lien CV sur `/about`. TypeScript et le build de production sont également passés.
