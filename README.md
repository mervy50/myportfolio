

## Lancer le projet en local

Pré-requis : Node.js 22 ou version compatible, pnpm et une base MySQL/TiDB accessible. Clonez ensuite le dépôt et installez les dépendances :

```bash
git clone https://github.com/mervy50/myportfolio.git
cd myportfolio
pnpm install
```

Configurez les variables d’environnement nécessaires dans votre environnement local, notamment `DATABASE_URL`, `JWT_SECRET`, les variables OAuth, les variables S3/Forge, `RESEND_API_KEY`, `RESEND_FROM_EMAIL` et `CONTACT_RECEIVER_EMAIL`. Resend doit disposer d’une adresse expéditrice ou d’un domaine vérifié. Ne committez jamais de fichier `.env` contenant des secrets.

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

Le compte administrateur dépend de l’authentification OAuth configurée et du rôle `admin` enregistré en base. Les secrets de production doivent être ajoutés dans l’interface de l’hébergement choisi, jamais dans le dépôt GitHub. Pour Render, ajoutez notamment `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `CONTACT_RECEIVER_EMAIL`, `DATABASE_URL`, `FRONTEND_URL`, les variables OAuth et les variables S3/Forge. Pour Vercel, ajoutez `VITE_API_URL` avec l’URL publique Render, ainsi que les variables `VITE_` nécessaires au navigateur. Le backend autorise uniquement les origines listées dans `FRONTEND_URL`, séparées par des virgules si nécessaire. OAuth démarre désormais sur Render afin que le cookie de session reste attaché au domaine API. GitHub Pages ne convient pas à cette architecture, car le backend doit rester exécuté sur un hébergeur Node.js.


## Accès au panel administrateur

Le panel d’administration n’est volontairement pas affiché dans la navigation ni dans le pied de page du portfolio public. Par défaut, utilisez directement l’URL `/espace-prive-mervy` de votre installation, par exemple `http://localhost:3000/espace-prive-mervy` en local. Vous pouvez définir `VITE_ADMIN_PATH` dans l’environnement de l’hébergeur pour choisir un autre chemin absolu privé ; la valeur doit être identique pour le build frontend et l’URL que vous utilisez. L’accès reste protégé par l’authentification OAuth et par le rôle `admin` enregistré en base : un visiteur non authentifié voit uniquement la porte de connexion, tandis qu’un compte sans rôle `admin` reste bloqué et ne peut pas gérer le contenu.

La double authentification ne se configure pas dans le portfolio lui-même : elle doit être activée dans le compte du fournisseur OAuth utilisé pour la connexion. Activez la 2FA dans les paramètres de sécurité de ce compte, puis utilisez cette identité protégée pour accéder au panel. Le projet conserve le contrôle du rôle `admin`, mais ne contourne ni ne remplace les mécanismes de sécurité du fournisseur OAuth.
