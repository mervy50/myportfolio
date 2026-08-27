# Contrôle visuel Tech Stack

- La page Portfolio conserve la charte aqua/noir sur desktop en 1280 × 900.
- La mise en page des cartes projets reste équilibrée et les onglets restent lisibles.
- La page reste responsive sur mobile en 390 × 844 ; la navigation compacte et les cartes s’empilent correctement.
- La grille Tech Stack n’est pas directement sélectionnée par la capture statique, mais les tests UI couvrent l’onglet et la présence du logo React.
- Le serveur signale uniquement une invalidation Fast Refresh attendue pour le composant exportant des helpers ; le build de production et la suite Vitest restent valides.
