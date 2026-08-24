# Direction créative du portfolio

## Références confirmées — spécification de référence

Les captures fournies par l’utilisateur constituent la référence visuelle principale. Le portfolio doit adopter une interface sombre, compacte et technique, avec une navigation flottante, une grille de fond discrète, des cartes graphite, des bordures fines, des onglets segmentés et une hiérarchie proche d’un dashboard personnel premium. La référence privilégie la lisibilité, les blocs modulaires, les transitions sobres et l’utilisation de l’aqua comme accent d’action ou d’état actif.

Choix confirmés par l’utilisateur :

- **Aqua :** lumineux, proche de `#63E6E8`.
- **Fond :** noir légèrement bleuté, proche de `#080A0C`.
- **Accueil :** photo, nom, rôle et informations complémentaires.
- **Architecture :** plusieurs pages, avec une page Portfolio structurée par onglets.



## Trois pistes initiales

### Piste 1 — Le Minimaliste Élégant
Une direction éditoriale sobre, construite autour d’une typographie expressive, d’espaces généreux et d’une hiérarchie très lisible. L’interface mettrait la qualité des projets au premier plan, avec une sensation de calme et de précision.

**Probability:** 0.07

### Piste 2 — L’Interactif & Immersif
Une expérience de portfolio dynamique, pensée comme un parcours visuel : transitions fluides, cartes de projets vivantes, filtres de technologies, micro-interactions et composition plus audacieuse. L’objectif est de faire ressentir la curiosité, l’énergie créative et la maîtrise technique.

**Probability:** 0.04

### Piste 3 — Le Technique & Structuré
Un portfolio proche d’un laboratoire numérique, organisé autour des études de cas, des architectures et des résultats. La forme serait méthodique, informative et particulièrement adaptée à un profil d’ingénieur logiciel ou de développeur orienté produit.

**Probability:** 0.09

## Direction initiale remplacée

La direction éditoriale corail/encre de la première version est abandonnée. Elle ne doit plus guider la refonte.

## Direction retenue — Portfolio technique aqua/noir

### Design Movement
**Tech noir minimal / dashboard personnel premium**, influencé par les interfaces de développeurs montrées dans les références : surfaces sombres, grille technique, cartes modulaires, typographie nette et interactions discrètes. L’expérience doit être personnelle et élégante, mais rester très lisible et orientée contenu.

### Core Principles
1. **Le mouvement explique la structure.** Les animations servent à révéler les relations entre les projets, les compétences et le parcours, plutôt qu’à ajouter des effets gratuits.
2. **L’asymétrie crée le rythme.** Les sections alternent entre compositions décalées, grandes respirations et blocs éditoriaux afin d’éviter l’impression de template.
3. **Le contenu reste prioritaire.** Chaque interaction doit aider à comprendre le projet, son intention ou la technologie utilisée.
4. **La curiosité est récompensée.** Les survols, filtres et détails progressifs donnent envie d’explorer sans créer de parcours caché ou inaccessible.

### Color Philosophy
La base est un **noir légèrement bleuté** qui crée une atmosphère professionnelle et met en avant la photo, les cartes et les informations techniques. L’**aqua lumineux** devient la signature de l’identité : il sert à signaler les liens, l’onglet actif, les icônes, les indicateurs et les actions principales. Le contraste est volontairement maîtrisé : l’aqua attire l’œil sans transformer l’interface en écran néon.

### Layout Paradigm
Une page d’accueil en défilement vertical, organisée comme une succession de scènes. Le hero adopte une composition en deux plans : déclaration typographique à gauche et objet visuel abstrait à droite. Les projets se présentent dans une mosaïque irrégulière à deux colonnes, avec une grande carte dominante et des cartes secondaires plus compactes. Une ligne latérale discrète indique la progression dans la page, tandis que les sections « à propos » et « contact » cassent volontairement la grille.

### Signature Elements
- Un **curseur corail** et des accents de survol qui soulignent les mots-clés et les technologies.
- Des **étiquettes éditoriales numérotées** — `01 / SELECTED WORK`, `02 / CAPABILITIES`, etc. — comme des repères de carnet.
- Un **motif orbital** composé de lignes fines et de points, utilisé comme fil conducteur visuel dans le hero et autour des transitions.

### Interaction Philosophy
Les interactions doivent sembler directes, tactiles et rapides. Une carte de projet se soulève légèrement, son image se recadre avec douceur et ses métadonnées gagnent en contraste. Les filtres modifient la mosaïque sans rechargement et indiquent clairement le nombre de résultats. Les boutons ont un état pressé visible et un focus clavier évident. Les animations sont désactivées ou réduites lorsque l’utilisateur préfère réduire les mouvements.

### Animation
Les éléments du hero apparaissent en cascade courte, avec une translation verticale légère et une opacité progressive. Les cartes utilisent des transitions de 180 à 260 ms avec une courbe de sortie vive. Le motif orbital peut avoir un mouvement lent et presque imperceptible, mais il ne doit jamais distraire la lecture. Les changements de filtre utilisent une disparition/recomposition brève sans animation de hauteur. Aucun élément ne doit apparaître depuis une échelle nulle. Toutes les animations non essentielles sont protégées par `prefers-reduced-motion`.

### Typography System
- **Titres : Space Grotesk**, en graisses 500 à 700, pour son dessin géométrique mais chaleureux.
- **Texte courant : DM Sans**, en graisses 400 à 500, pour une lecture confortable.
- **Annotations : IBM Plex Mono**, en capitales espacées, pour les index, technologies et métadonnées.
- Les grands titres utilisent une échelle fluide, avec des retours à la ligne contrôlés et peu de mots par ligne. Les paragraphes restent courts et aérés.

### Brand Essence
Un portfolio de développeur qui transforme les projets numériques en expériences compréhensibles, vivantes et mémorables — pour les recruteurs, clients et équipes qui cherchent autant la qualité d’exécution que la curiosité.

**Personnalité :** curieux, précis, énergique.

### Brand Voice
Les titres sont directs et évocateurs, les CTA sont des invitations à explorer plutôt que des formules commerciales, et les microcopies restent concrètes. On parle du problème résolu, du choix effectué et de ce que l’utilisateur peut regarder ensuite.

Exemples :
- « Je construis des interfaces qui donnent envie de continuer. »
- « Ouvrir le projet, voir les choix. »

### Wordmark & Logo
Le logo est un symbole abstrait sans texte : une orbite ouverte traversée par un point corail, évoquant à la fois un curseur, une trajectoire et une idée en mouvement. Le motmark sera composé en Space Grotesk avec une ligature personnalisée sur la première lettre, tandis que le symbole restera utilisable seul pour le favicon.

### Signature Brand Color
**Aqua signal — `#63E6E8`**. Une couleur lumineuse et identifiable, réservée aux actions, aux états actifs, aux icônes importantes et aux détails de navigation.

## Règle de décision
À chaque choix de design, vérifier : **« Est-ce que cette décision renforce la curiosité et la compréhension, ou est-ce qu’elle ajoute seulement du bruit ? »**
