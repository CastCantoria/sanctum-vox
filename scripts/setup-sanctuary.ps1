# setup-sanctuary.ps1
Write-Host "🌿 Initialisation du sanctuaire..."

# 1. Initialiser le projet npm (si package.json absent)
if (!(Test-Path "package.json")) {
  npm init -y
  Write-Host "✅ package.json créé"
}

# 2. Installer Vue et Firebase
npm install vue firebase
Write-Host "✅ Vue et Firebase installés"

# 3. Installer Tailwind CSS v3 + PostCSS + Autoprefixer
npm install -D tailwindcss@3 postcss autoprefixer
Write-Host "✅ Tailwind CSS v3 installé"

# 4. Initialiser Tailwind config
npx tailwindcss init
Write-Host "✅ tailwind.config.js généré"

# 5. Créer postcss.config.js si absent
$postcssPath = "postcss.config.js"
if (!(Test-Path $postcssPath)) {
  Set-Content -Path $postcssPath -Value @"
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
"@
  Write-Host "✅ postcss.config.js créé"
}

# 6. Installer Vite (si utilisé)
npm install -D vite
Write-Host "✅ Vite installé"

# 7. Installer Vue Router
npm install vue-router
Write-Host "✅ Vue Router installé"

# 8. Installer Inquirer (pour scripts interactifs)
npm install inquirer
Write-Host "✅ Inquirer installé"

# 9. Nettoyer le cache npm
npm cache clean --force
Write-Host "🧘 Cache npm nettoyé"

Write-Host "`n🌟 Sanctuaire prêt. Tu peux lancer : npm run dev"