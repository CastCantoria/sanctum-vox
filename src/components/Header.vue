<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { useAuthPopup } from '@/composables/useAuthPopup'

const router = useRouter()
const auth = getAuth()
const { openAuth } = useAuthPopup()

const user = ref(null)
const isMenuOpen = ref(false)
const activeGroup = ref(null)

const avatarURL = computed(() =>
  user.value?.photoURL || '/assets/images/avatar-default.png'
)

const waitForAuth = () =>
  new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      unsubscribe()
      resolve(u)
    })
  })

onMounted(async () => {
  const u = await waitForAuth()
  user.value = u
  if (u) {
    console.log("Utilisateur connecté :", u.email)
  } else {
    console.log("Aucun utilisateur connecté.")
  }
})

const handleLogout = async () => {
  await signOut(auth)
  user.value = null
}

const confirmLogout = () => {
  if (confirm("Voulez-vous vraiment vous déconnecter ?")) {
    handleLogout()
  }
}

const goToProfile = () => {
  router.push('/profile')
}
</script>

<template>
  <header class="header">
    <div class="logo-container">
      <img src="/assets/images/logo-cantoria.png" alt="Logo Cantoria" class="logo-img" />
      <span class="logo-text">C.A.S.T. – Cantoria</span>
    </div>

    <button class="burger-btn" @click="isMenuOpen = !isMenuOpen" aria-label="Menu">
      <svg class="trombone-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path fill="#B22222" d="M3 12c0-1.1.9-2 2-2h10v-2H5c-2.2 0-4 1.8-4 4s1.8 4 4 4h10v-2H5c-1.1 0-2-.9-2-2z"/>
      </svg>
    </button>

    <nav class="nav-desktop" :class="{ open: isMenuOpen }">
      <div class="menu-wrapper">
        <router-link to="/" class="nav-link">Accueil</router-link>

        <div class="nav-group" @mouseenter="activeGroup = 'sanctuaire'" @mouseleave="activeGroup = null">
          <span class="nav-link group-title">Sanctuaire ▾</span>
          <div class="dropdown" v-if="activeGroup === 'sanctuaire'">
            <router-link to="/about" class="nav-link">À propos</router-link>
            <router-link to="/spiritualite" class="nav-link">Spiritualité</router-link>
            <router-link to="/contact" class="nav-link">Contact</router-link>
          </div>
        </div>

        <div class="nav-group" @mouseenter="activeGroup = 'expression'" @mouseleave="activeGroup = null">
          <span class="nav-link group-title">Expression ▾</span>
          <div class="dropdown" v-if="activeGroup === 'expression'">
            <router-link to="/concerts" class="nav-link">Concerts</router-link>
            <router-link to="/galerie" class="nav-link">Galerie</router-link>
            <router-link to="/pedagogie" class="nav-link">Pédagogie</router-link>
          </div>
        </div>

        <router-link v-if="user" to="/profile" class="nav-link">Profil</router-link>
      </div>

      <div class="auth-actions">
        <template v-if="user">
          <button class="avatar-btn" @click="goToProfile" title="Profil">
            <img :src="avatarURL" alt="Avatar" class="avatar-img" />
          </button>
          <button class="icon-btn" @click="confirmLogout" title="Déconnexion">⛔</button>
        </template>
        <template v-else>
          <button class="icon-btn" @click="openAuth('login')" title="Connexion">👤</button>
        </template>
      </div>
    </nav>
  </header>
</template>
<style scoped>
.header {
  background-color: #fdfaf6;
  padding: 0.8rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e0dcd4;
  flex-wrap: wrap;
  position: relative;
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.logo-img {
  height: 38px;
}

.logo-text {
  color: #c8a951;
  font-size: 1.4rem;
  font-weight: bold;
}

.burger-btn {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  z-index: 101;
}

.trombone-icon {
  width: 28px;
  height: 28px;
  fill: #B22222;
}

.nav-desktop {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  flex: 1;
}

.menu-wrapper {
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
}

.nav-link {
  color: #3a3a3a;
  text-decoration: none;
  font-weight: 500;
}

.nav-link:hover {
  color: #c8a951;
}

.nav-group {
  position: relative;
  min-width: 120px;
}

.group-title {
  cursor: pointer;
  color: #c8a951;
  font-weight: bold;
}

.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #fff;
  border: 1px solid #c8a951;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  z-index: 50;
  min-width: 160px;
  box-shadow: 0 4px 12px rgba(200, 169, 81, 0.2);
}

.dropdown .nav-link {
  color: #3a3a3a;
  text-decoration: none;
  font-weight: 500;
  padding: 0.2rem 0;
}

.dropdown .nav-link:hover {
  color: #c8a951;
}

.auth-actions {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-left: 1rem;
}

.icon-btn {
  background: none;
  border: none;
  font-size: 1.4rem;
  cursor: pointer;
  color: #c8a951;
  transition: transform 0.2s ease;
}

.icon-btn:hover {
  transform: scale(1.1);
}

.avatar-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.avatar-img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #c8a951;
  transition: transform 0.2s ease;
}

.avatar-img:hover {
  transform: scale(1.1);
}

@media (max-width: 768px) {
  .burger-btn {
    display: block;
    position: absolute;
    top: 1rem;
    right: 1.5rem;
  }

  .nav-desktop {
    display: none;
    flex-direction: column;
    align-items: flex-end;
    background: #fdfaf6;
    padding: 1rem;
    position: absolute;
    top: 60px;
    right: 0;
    width: 100%;
    z-index: 100;
  }

  .nav-desktop.open {
    display: flex;
  }

  .menu-wrapper {
    flex-direction: column;
    align-items: flex-end;
    width: 100%;
  }

  .dropdown {
    position: static;
    box-shadow: none;
    border: none;
    padding: 0;
    background: none;
  }

  .dropdown .nav-link {
    padding-left: 1rem;
  }
}
</style>