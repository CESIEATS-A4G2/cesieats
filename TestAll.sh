#!/bin/bash

set -e

echo -e "\n \033[1;34m[1] BUILD DOCKERFILES\033[0m"
docker build -t test-api ./api || { echo "❌ Échec build API"; exit 1; }
docker build -t test-auth ./auth || { echo "❌ Échec build Auth"; exit 1; }
docker build -t test-react ./react || { echo "❌ Échec build React"; exit 1; }

echo -e "\n \033[1;34m[2] DOCKER COMPOSE UP\033[0m"
docker compose up -d --build

echo -e "\n \033[1;34m[3] SERVICES STATUS\033[0m"
docker compose ps

echo -e "\n \033[1;34m[4] REACT BUILD & TEST\033[0m"
cd react
npm install
npm run build
#npm test -- --watchAll=false
cd ..

echo -e "\n \033[1;34m[5] EXECUTION DES TESTS DES SERVICES \033[0m"
for file in ./tests/*.js; do
  echo "▶️ Exécution de $file"
  node "$file" || { echo "❌ Erreur dans $file"; exit 1; }
done

echo -e "\n \033[1;32m✅ TESTS PASSÉS !\033[0m"