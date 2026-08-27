

## Lancer le projet en local

Pré-requis : Node.js 22 ou version compatible, pnpm et une base MySQL/TiDB accessible. Clonez ensuite le dépôt et installez les dépendances :

```bash
git clone https://github.com/mervy50/myportfolio.git
cd myportfolio
pnpm install
```

Configurez les variables d’environnement nécessaires dans votre environnement local, notamment `DATABASE_URL`, `JWT_SECRET`, les variables OAuth, les variables S3/Forge et les variables SMTP si vous souhaitez tester le formulaire de contact. Ne committez jamais de fichier `.env` contenant des secrets.

Synchronisez la base avec le schéma du projet, puis lancez le serveur de développement :

```bash
pnpm db:push
pnpm dev
```

Le site sera disponible sur l’URL locale indiquée par Vite, généralement `http://localhost:3000`. Pour contrôler le projet avant une livraison, utilisez :

```bash
pnpm test
pnpm build
```

Le compte administrateur dépend de l’authentification OAuth configurée et du rôle `admin` enregistré en base. Les secrets de production doivent être ajoutés dans l’interface de gestion de l’hébergement choisi, jamais dans le dépôt GitHub.


## Accès au panel administrateur

Le panel d’administration n’est volontairement pas affiché dans la navigation ni dans le pied de page du portfolio public. Pour l’ouvrir, utilisez directement l’URL `/admin` de votre installation, par exemple `http://localhost:3000/admin` en local. L’accès reste protégé par l’authentification OAuth et par le rôle `admin` enregistré en base : connaître l’URL ne permet donc pas à un visiteur non autorisé de gérer le contenu.
