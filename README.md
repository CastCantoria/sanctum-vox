🎶 CastCantoria – Chœur Artistique & Spirituel de Tanà
Bienvenue dans le dépôt officiel du site web CastCantoria, une chorale artistique et spirituelle basée à Antananarivo. Ce projet regroupe les ressources multimédia, les scripts, les composants web et les API nécessaires à la mise en ligne et à la gestion du site.

📁 Structure du projet
Voici l’organisation complète des fichiers et dossiers du volume DATA-IN :
D:.
├── .gitignore
├── archive-unused.ps1
├── cast tout.docx
├── index.html
├── package-lock.json
├── package.json
├── README.md
├── structure.txt
├── vercel.json
├── vite.config.js
├── api
│   ├── api.txt
│   ├── server.js
│   ├── members
│   │   ├── index.js
│   │   └── [id].js
│   ├── middlewares
│   │   ├── logger.js
│   │   └── verifyToken.js
│   └── routes
│       └── members.js
├── utils
│   ├── firebase.js
│   ├── logger.js
│   └── verifyToken.js
├── dist
│   ├── favicon.ico
│   ├── index.html
│   ├── vite.svg
│   └── assets
│       ├── avatar.jpg
│       ├── favicon-cantoria.png
│       └── concert1.jpg
├── audio
│   ├── cantique-1.mp3
│   └── intro-cast.mp3
├── images
│   ├── cast-chorale.jpg
│   ├── chorale-1.jpg
│   └── ...
├── video
│   ├── message-spirituel.mp4
│   └── presentation-cast.mp4
├── lib
│   └── lib.txt
├── controllers
│   └── members
│       ├── create.js
│       ├── delete.js
│       ├── getAll.js
│       └── update.js
├── format
├── parsing
├── validation
├── public
│   ├── favicon.ico
│   └── robots.txt
├── scripts
│   ├── add-images-to-paragraphs.ps1
│   ├── create-galerie-and-players.ps1
│   └── ...
└── src
    ├── App.vue
    ├── firebase.js
    ├── main.js
    ├── style.css
    └── assets
        ├── logo.svg
        └── styles
            └── global.css



⚙️ Installation
Pour installer et exécuter le projet localement :
# Cloner le dépôt
git clone https://github.com/CastCantoria/cast-cantoria.git

# Accéder au dossier
cd cast-cantoria

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev


💡 Assurez-vous d’avoir Node.js et npm installés sur votre machine.


🚀 Utilisation
Une fois lancé, le site est accessible à l’adresse :
http://localhost:5173
Fonctionnalités disponibles :
- 🎵 Lecture de fichiers audio dans /audio
- 🎥 Visualisation de vidéos dans /video
- 🖼️ Galerie d’images dans /images
- 🧩 Composants Vue modifiables dans /src
- 🛠️ Scripts PowerShell pour automatiser la création de galeries et l’ajout d’éléments visuels
- 🔐 API sécurisée avec gestion des membres et middlewares

🤝 Contribuer
Les contributions sont les bienvenues ! Pour proposer une amélioration :
- Forkez le projet
- Créez une branche :
git checkout -b feature/amélioration
- Commitez vos modifications :
git commit -m 'Ajout d’une amélioration'
- Poussez la branche :
git push origin feature/amélioration
- Ouvrez une Pull Request

📜 Licence
Ce projet est sous licence MIT.
Consultez le fichier LICENSE pour plus d’informations.

📣 À propos
CastCantoria est bien plus qu’une chorale :
C’est une communauté artistique et spirituelle qui célèbre la foi, la culture et la beauté du chant.
Ce site vise à partager cette passion avec le monde entier.

