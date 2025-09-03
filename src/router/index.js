import { createRouter, createWebHistory } from "vue-router"
import Home from "../views/Home.vue"
import About from "../views/About.vue"
import Repertoire from "../views/Repertoire.vue"
import Concerts from "../views/Concerts.vue"
import Spiritualite from "../views/Spiritualite.vue"
import Galerie from "../views/Galerie.vue" // import direct

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/about", name: "About", component: About },
  { path: "/repertoire", name: "Repertoire", component: Repertoire },
  { path: "/concerts", name: "Concerts", component: Concerts },
  { path: "/spiritualite", name: "Spiritualite", component: Spiritualite },
  { path: "/galerie", name: "Galerie", component: Galerie }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router