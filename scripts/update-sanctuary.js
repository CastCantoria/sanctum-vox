import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// 🌿 Résolution du chemin racine
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const root = path.resolve(__dirname, '..')
const resolveFile = (relativePath) => path.join(root, relativePath)

// 🔐 Sauvegarde avant modification
const backupFile = (filePath) => {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
  const backupPath = `${filePath}.backup-${timestamp}`
  fs.copyFileSync(filePath, backupPath)
  console.log(`🛡 Sauvegarde créée : ${backupPath}`)
}

// 🌿 Injection du layout
const injectBaseLayout = (content) => {
  if (!content.includes('BaseLayout')) {
    content = content.replace(
      '<template>',
      `<template>\n<BaseLayout>\n`
    ).replace(
      '</template>',
      `</BaseLayout>\n</template>`
    ).replace(
      '<script setup>',
      `<script setup>\nimport BaseLayout from '@/layouts/BaseLayout.vue'`
    )
  }
  return content
}

// 🎨 Injection du thème CSS
const injectThemeCSS = (content) => {
  if (!content.includes("theme.css")) {
    content = `import './assets/styles/theme.css'\n` + content
  }
  return content
}

// 🔁 Mise à jour ciblée
const updateFile = (filePath, updaterFn) => {
  const fullPath = resolveFile(filePath)
  if (!fs.existsSync(fullPath)) {
    console.warn(`⚠️ Fichier introuvable : ${filePath}`)
    return
  }

  const original = fs.readFileSync(fullPath, 'utf-8')
  const updated = updaterFn(original)

  if (updated !== original) {
    backupFile(fullPath)
    fs.writeFileSync(fullPath, updated, 'utf-8')
    console.log(`✅ Mis à jour : ${filePath}`)
  } else {
    console.log(`⏳ Aucun changement : ${filePath}`)
  }
}

// 🧘 Application des mises à jour
updateFile('src/views/Home.vue', injectBaseLayout)
updateFile('src/views/Profile.vue', injectBaseLayout)
updateFile('src/main.js', injectThemeCSS)