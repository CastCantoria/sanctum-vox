# 🎶 C.A.S.T. Cantoria — Plateforme communautaire

Bienvenue dans la clarté du jour ✨  
Ce projet est une application web dédiée à la communauté artistique et spirituelle du C.A.S.T. Cantoria. Il permet aux membres de se connecter, partager, consulter les événements, et gérer les contenus avec fluidité et élégance.

---

## 🚀 Fonctionnalités principales

- 🔐 Authentification sécurisée (email, Google, mot de passe oublié)
- 🧑‍💼 Gestion des rôles (`admin`, `member`) avec redirection automatique
- 📁 Galerie responsive et accessible
- 📅 Pages publiques : concerts, pédagogie, spiritualité, contact…
- 🛠️ Dashboard admin avec accès protégé
- 🔄 Session persistante avec Firebase et Pinia
- 🔔 Toasts interactifs pour feedback utilisateur

---

## 🧰 Stack technique

| Technologie     | Usage                          |
|----------------|---------------------------------|
| Vue 3 + Vite    | Frontend moderne et rapide      |
| Pinia           | Store global (auth, session)    |
| Firebase Auth   | Connexion, session, sécurité    |
| Firestore       | Stockage des profils et médias  |
| Vue Router      | Navigation et protection des routes |
| Toastification  | Notifications élégantes         |
| Tailwind CSS    | Design responsive et accessible |

---

## 📦 Installation

```bash
git clone https://github.com/ton-repo/cast-cantoria.git
cd cast-cantoria
npm install
npm run dev
🔐 Accès admin
Pour accéder au dashboard admin (/admin/dashboard), le compte doit avoir le champ role: "admin" dans Firestore :
{
  "email": "admin@example.com",
  "role": "admin"
}



🧪 Sécurité Firestore
Les règles Firestore sont configurées pour :
- 🔒 Protéger les documents sensibles (config, users)
- ✅ Autoriser les admins à lire/écrire
- 👤 Permettre aux membres de lire leur propre profil

🤝 Contribuer
Les contributions sont les bienvenues !
Merci de respecter la structure modulaire, les conventions de nommage, et l’esprit poétique du projet ✨

📄 Licence
Ce projet est sous licence MIT.

🙌 Remerciements
Un grand merci à tous les membres du C.A.S.T. Cantoria pour leur inspiration, leur voix, et leur lumière.
Et à toi, développeur·se, qui rends cette plateforme vivante.
