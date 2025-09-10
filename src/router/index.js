import { createRouter, createWebHistory } from 'vue-router'
import { getAuth } from 'firebase/auth'
import { getFirestore, doc, getDoc } from 'firebase/firestore'
import { useAuthStore } from '@/stores/authStore.js'

import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import Pedagogie from '@/views/Pedagogie.vue'
import Concerts from '@/views/Concerts.vue'
import Spiritualite from '@/views/Spiritualite.vue'
import Galerie from '@/views/Galerie.vue'
import Contact from '@/views/Contact.vue'
import Profile from '@/views/Profile.vue'
import Messages from '@/views/Messages.vue'
import AdminDashboard from '@/views/AdminDashboard.vue'
import NotFound from '@/views/NotFound.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/pedagogie', component: Pedagogie },
  { path: '/concerts', component: Concerts },
  { path: '/spiritualite', component: Spiritualite },
  { path: '/galerie', component: Galerie },
  { path: '/contact', component: Contact },
  { path: '/profile', component: Profile },
  { path: '/messages', component: Messages },
  {
    path: '/admin/dashboard',
    component: AdminDashboard,
    meta: { requiresAdmin: true }
  },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  const auth = getAuth()
  const db = getFirestore()
  const store = useAuthStore()

  const currentUser = auth.currentUser

  if (to.meta.requiresAdmin) {
    if (!currentUser) return next('/')

    try {
      const userDoc = await getDoc(doc(db, 'membres', currentUser.uid))
      const userData = userDoc.exists() ? userDoc.data() : null

      store.setUser(userData)
      store.setToken(await currentUser.getIdToken())

      return store.isAdmin ? next() : next('/')
    } catch (error) {
      console.error('🔐 Erreur de vérification admin :', error)
      return next('/')
    }
  }

  next()
})

export default router