# Utiliser l'image officielle Node.js 18
FROM node:18.17.0

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install -g npm@10.2.3
RUN npm install

# Copier le reste des fichiers du projet
COPY . .

# Construire l'application React
RUN npm run build

# Exposer le port sur lequel l'application sera exécutée
EXPOSE 3000

# Commande pour démarrer l'application
CMD ["npm", "start"]

