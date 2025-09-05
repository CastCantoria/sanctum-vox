import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import Pedagogie from '@/views/Pedagogie.vue'
import Concerts from '@/views/Concerts.vue'
import Spiritualite from '@/views/Spiritualite.vue'
import Galerie from '@/views/Galerie.vue'
import Contact from '@/views/Contact.vue'
import Profile from '@/views/Profile.vue'
import Messages from '@/views/Messages.vue'
import Login from '@/views/Login.vue'       // ← ajout
import Signup from '@/views/Signup.vue'     // ← ajout

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
  { path: '/login', component: Login },     // ← ajout
  { path: '/signup', component: Signup }    // ← ajout
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router