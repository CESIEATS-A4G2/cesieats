# ATTENTION : NON TESTE !

# Stop script if any command fails
$ErrorActionPreference = "Stop"

Write-Host "`n[1] BUILD DOCKERFILES" -ForegroundColor Blue
docker-build -t test-api ./api      || throw "❌ Échec build API"
docker-build -t test-auth ./auth    || throw "❌ Échec build Auth"
docker-build -t test-react ./react  || throw "❌ Échec build React"

Write-Host "`n[2] DOCKER COMPOSE UP" -ForegroundColor Blue
docker-compose up -d --build

Write-Host "`n[3] SERVICES STATUS" -ForegroundColor Blue
docker-compose ps

Write-Host "`n[4] REACT BUILD & TEST" -ForegroundColor Blue
Set-Location react
npm install
npm run build
# npm test -- --watchAll=false
Set-Location ..

Write-Host "`n[5] EXECUTION DES TESTS DES SERVICES" -ForegroundColor Blue
Get-ChildItem ./tests -Filter *.js | ForEach-Object {
    Write-Host "▶️ Exécution de $($_.Name)"
    node $_.FullName
    if ($LASTEXITCODE -ne 0) {
        throw "❌ Erreur dans $($_.Name)"
    }
}

Write-Host "`n✅ TESTS PASSÉS !" -ForegroundColor Green
