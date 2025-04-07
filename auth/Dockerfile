# Utiliser une image officielle Node.js comme image de base
FROM node:latest

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste de l'application dans le conteneur
COPY . .

RUN npm run build  # Compile TypeScript en JavaScript

# Exposer le port que l'application va utiliser
EXPOSE 3000

# Définir la commande pour démarrer l'application
CMD ["node", "dist/index.js"]
