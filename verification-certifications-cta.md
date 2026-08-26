# Vérification attestations et CTA projet

La page Portfolio conserve la grille de projets sur desktop et mobile sans débordement. Le CTA de l’aperçu rapide est désormais « Découvrir les détails » et ouvre toujours la fiche projet détaillée.

L’onglet Certifications est préparé pour afficher une image d’attestation lorsque `attestationImageUrl` est renseignée. Une certification sans image conserve un emplacement visuel neutre afin de ne pas casser la grille. L’import admin accepte les images JPG, PNG et WebP jusqu’à 8 Mo, les envoie via le stockage S3 du projet, puis l’URL retournée est enregistrée avec la certification.

Tests ciblés et validation : TypeScript OK, 11 tests ciblés réussis ; la suite complète et le build production restent à exécuter après les derniers ajustements visuels.

## Vérification admin

Le panel admin authentifié s’affiche correctement en desktop avec la navigation persistante, le dashboard statistique, les onglets de contenu et la grille de projets. La section Certifications dispose du même espace de gestion et du champ d’import d’image prévu ; l’affichage public conserve une mise en page responsive.

Validation finale exécutée : 11 suites Vitest, 31 tests réussis et 1 test ignoré ; TypeScript et build production OK.

Le contrôle mobile du panel admin confirme que la navigation, les cartes statistiques, les onglets et les formulaires restent contenus dans la largeur de l’écran. L’onglet Certifications réutilise la grille responsive et les aperçus d’attestation sont dimensionnés pour éviter les débordements.
