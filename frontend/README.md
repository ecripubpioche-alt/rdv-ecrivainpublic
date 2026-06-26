# Déploiement de l'application "Rendez-vous Écrivain Public"

En tant qu'assistant IA, je génère le code mais je ne peux pas héberger directement cette application sur internet pour vous. Cependant, votre application est totalement prête à être publiée !

Puisqu'il s'agit d'une application front-end moderne fonctionnant directement dans le navigateur (sans serveur backend complexe requis grâce à EmailJS), le déploiement est extrêmement simple et **100% gratuit**.

Voici les méthodes les plus simples pour la rendre accessible à tous via une URL publique :

## Méthode 1 : Netlify Drop (La plus rapide, en 30 secondes)

C'est la méthode idéale si vous voulez mettre le site en ligne immédiatement sans créer de compte complexe.

1. Rassemblez **tous** les fichiers de l'application (`index.html`, `index.tsx`, `App.tsx`, et les dossiers `components`, `services`, `utils`) dans un seul dossier sur votre ordinateur (par exemple, nommez-le `app-ecrivain-public`).
2. Ouvrez votre navigateur et allez sur **[Netlify Drop](https://app.netlify.com/drop)**.
3. Glissez et déposez votre dossier `app-ecrivain-public` directement dans le cercle pointillé sur la page web.
4. Attendez quelques secondes. Netlify va générer un lien public (URL) unique.
5. **C'est en ligne !** Vous pouvez copier ce lien et l'envoyer aux usagers. (Vous pourrez ensuite créer un compte Netlify gratuit pour personnaliser le nom du lien, ex: `rdv-ecrivain-pioche.netlify.app`).

## Méthode 2 : Vercel ou GitHub Pages (Recommandé pour le long terme)

Si vous prévoyez de faire des mises à jour régulières du code :

1. Créez un compte gratuit sur [GitHub](https://github.com/).
2. Créez un nouveau dépôt (repository) et téléversez-y tous vos fichiers.
3. Créez un compte gratuit sur [Vercel](https://vercel.com/) (très optimisé pour React).
4. Cliquez sur "Add New Project", connectez votre compte GitHub et sélectionnez votre dépôt.
5. Laissez les paramètres par défaut et cliquez sur "Deploy".
6. Vercel vous fournira une URL publique. À chaque fois que vous modifierez un fichier sur GitHub, le site se mettra à jour automatiquement.

## ⚠️ Important : Sécurité EmailJS

Une fois votre site en ligne (par exemple sur `https://mon-site.netlify.app`), vous devez autoriser cette adresse web à envoyer des emails :

1. Connectez-vous à votre tableau de bord [EmailJS](https://dashboard.emailjs.com/).
2. Allez dans **Account** > **Security**.
3. Dans la section **"Allowed Origins"** (Origines autorisées), ajoutez l'URL de votre nouveau site web (ex: `mon-site.netlify.app`).
4. Sauvegardez. Cela empêchera d'autres personnes d'utiliser votre clé API depuis un autre site web.
