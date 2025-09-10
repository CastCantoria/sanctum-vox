import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import firebasePlugin from './plugins/firebase.plugin.js'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import { useAuthStore } from '@/stores/authStore.js' // ou useStore.js selon ton nom

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(firebasePlugin)
app.use(Toast, {
  position: 'top-right',
  timeout: 3000,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true
})

const store = useAuthStore()
store.fetchUser()

app.mount('#app')