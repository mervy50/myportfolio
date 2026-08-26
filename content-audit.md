# Audit du contenu public

## Déjà administrable

Le profil, les deux portraits, le CV, les coordonnées, les projets, les certifications avec attestations, les compétences, les statistiques et les messages de contact sont déjà persistés et exposés par tRPC. Les projets disposent également d’un ordre d’affichage.

## Contenus encore statiques identifiés

| Zone publique | Contenu à rendre éditable | Modèle recommandé |
| --- | --- | --- |
| Accueil | disponibilité, titres hero, accroche, titres des sections, libellés des statistiques | contenu de site singleton |
| À propos | titre, disponibilité, localisation, citation, note compétences, note formations | contenu de site singleton |
| Formations | titres, organismes, années et types | entité `education` avec CRUD |
| Portfolio | titre, description de page et libellés d’onglets | contenu de site singleton |
| Détail projet | microcopies, titre narratif, fonctionnalités, dépôt GitHub par projet | champs projet + fonctionnalités liées |
| Contact | titre, introduction, labels et localisation | contenu de site singleton |
| Header/Footer | nom de marque, labels de navigation, texte footer et année | réglages du site singleton |

## Décision d’architecture

Pour éviter une multitude de colonnes spécifiques, un singleton `portfolio_site_content` pourra regrouper les textes et réglages globaux sous forme de champs validés. Une table `portfolio_education` couvrira les formations. Les projets pourront ensuite recevoir un lien GitHub et une liste de fonctionnalités structurées. Les fallbacks historiques resteront uniquement comme protection d’affichage pendant le chargement ou en cas d’absence de contenu, sans remplacer les données administrées.
