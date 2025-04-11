#!/bin/bash

set +e

log_result() {
  if [ $1 -eq 0 ]; then
    results+=("✅ $2")
  else
    results+=("❌ $2")
  fi
}

echo -e "\n \033[1;34m[1] BUILD DOCKERFILES\033[0m"
docker build -t test-api ./api || { echo "❌ Échec build API"; exit 1; }
log_result $? "Build API"
docker build -t test-auth ./auth || { echo "❌ Échec build Auth"; exit 1; }
log_result $? "Build Auth"
docker build -t test-react ./react || { echo "❌ Échec build React"; exit 1; }
log_result $? "Build React"

echo -e "\n \033[1;34m[2] DOCKER COMPOSE UP\033[0m"
docker compose up -d --build
log_result $? "Docker Compose up"

echo -e "\n \033[1;34m[3] SERVICES STATUS\033[0m"
docker compose ps

echo -e "\n \033[1;34m[4] REACT BUILD & TEST\033[0m"
cd react
npm install
log_result $? "npm install (React)"
npm run build
log_result $? "npm run build (React)"
npm test -- --watchAll=false
log_result $? "npm test (React)"
cd ..

echo -e "\n \033[1;34m[5] EXECUTION DES TESTS DES SERVICES \033[0m"
for file in ./tests/*.js; do
  echo "▶️ Exécution de $file"
  node "$file" || { echo "❌ Erreur dans $file"; exit 1; }
  log_result $? "Test $(basename "$file")"
done

echo -e "\n\033[1;36m RÉCAPITULATIF FINAL\033[0m"
for r in "${results[@]}"; do
  echo -e "$r"
done

has_failures=$(printf "%s\n" "${results[@]}" | grep "❌")
if [ -z "$has_failures" ]; then
  echo -e "\n\033[1;32m✅ Tout est passé avec succès !\033[0m"
else
  echo -e "\n\033[1;31m❌ Certaines étapes ont échoué.\033[0m"
fi