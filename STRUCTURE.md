# 🎶 CastCantoria — Sanctum Vox

**CastCantoria** est une plateforme web collaborative dédiée à la célébration artistique et spirituelle par le chant choral.  
Ce projet open-source vise à rendre accessible un répertoire vivant, des témoignages, des méditations et des ressources multimédia pour les communautés en quête de beauté et de sens.

---

## 📁 Structure du projet

L’organisation du dépôt suit une architecture claire et modulaire :
D:.
|   .gitignore
|   archive-unused.ps1
|   cast tout.docx
|   index.html
|   package-lock.json
|   package.json
|   README.md
|   structure.txt
|   vercel.json
|   vite.config.js
|
+---api
|   |   api.txt
|   |   server.js
|   |
|   +---members
|   |       index.js
|   |       [id].js
|   |
|   +---middlewares
|   |       logger.js
|   |       verifyToken.js
|   |
|   +---routes
|   |       members.js
|   |
|   \---utils
|           firebase.js
|           logger.js
|           verifyToken.js
+---dist
|   |   favicon.ico
|   |   index.html
|   |   vite.svg
|   |
|   \---assets
|       |   avatar.jpg
|       |   avatar.png
|       |   favicon-cantoria.png
|       |   favicon.ico
|       |   google-icon.svg
|       |   index-CF_5c-46.js
|       |   index-CgVsxBzd.css
|       |
|       +---audio
|       |       cantique-1.mp3
|       |       intro-cast.mp3
|       |
|       +---images
|       |   ... (galerie complète, photos, logos, partitions, etc.)
|       |
|       \---video
|               message-spirituel.mp4
|               presentation-cast.mp4
+---public
|   |   favicon.ico
|   |   robots.txt
|   |
|   +---audio
|   |   +---chants
|   |   |       cantique-1.mp3
|   |   |
|   |   \---intros
|   |           intro-cast.mp3
|   |
|   +---images
|   |   +---concerts
|   |   |       concert1.jpg
|   |   |
|   |   +---gallery
|   |   |       galerie1.jpg ... galerie8.jpg
|   |   |       photo1.jpg ... photo6.jpg
|   |   |
|   |   +---hero
|   |   |       inspiration1.jpg
|   |   |       inspiration3.jpg
|   |   |       photo-choeur.jpeg
|   |   |
|   |   +---inspiration
|   |   |       inspiration.JPG
|   |   |       inspiration1.jpg
|   |   |       inspiration2.jpg
|   |   |       inspiration3.jpg
|   |   |
|   |   +---logos
|   |   |       favicon-cantoria.png
|   |   |       google-icon.svg
|   |   |       vite.svg
|   |   |
|   |   +---membres
|   |   |       avatar.jpg
|   |   |       avatar.png
|   |   |       lucien-emmanuel.png
|   |   |       pcast15.jpg ... pcast20.jpg
|   |   |
|   |   \---spiritualite
|   |
|   \---video
|       +---messages
|       |       mot-du-president.mp4
|       |
|       \---presentations
|               cantoria-intro.mp4
+---lib
|   |   lib.txt
|   |
|   +---controllers
|   |   |   index.js
|   |   \---members
|   |           create.js
|   |           delete.js
|   |           getAll.js
|   |           update.js
|   |
|   +---format
|   +---parsing
|   \---validation
|
+---scripts
|       add-images-to-paragraphs.ps1
|       add-text-with-image.ps1
|       archive-unused.cjs
|       create-galerie-and-players.ps1
|       create-views-and-router.ps1
|       fix-encoding.ps1
|       fix-image-paths.ps1
|       fix-pages-structure.ps1
|       fix-site-structure.ps1
|       fix-vue-root.ps1
|       inject-cast-doc.js
|       update-header-footer.ps1
|       update-project.ps1
|
\---src
    |   App.vue
    |   firebase.js
    |   main.js
    |   style.css
    |
    +---assets
    |       logo.svg
    |       styles/global.css
    |
    +---components
    |   +---admin
    |   +---auth
    |   +---header
    |   +---public
    |   \---shared
    |
    +---composables
    |   +---admin
    |   +---auth
    |   +---firebase
    |   +---gallery
    |   +---profile
    |   \---ui
    |
    +---plugins
    +---router
    +---stores
    \---views
        +---admin
        +---auth
        +---layouts
        \---utils