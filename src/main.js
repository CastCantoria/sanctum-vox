import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// 🌿 Thème sacré
import './assets/styles/theme.css'

// 🔥 Firebase (auth, db, storage)
import { auth, db, storage } from './firebase.js'

// 🧘 Création de l'application
const app = createApp(App)

// 📦 Injection du router
app.use(router)

// 🕊 Montage dans le DOM
app.mount('#app')

// (Optionnel) Tu peux aussi injecter auth/db/storage globalement si tu veux les rendre accessibles via app.config.globalProperties