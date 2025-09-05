<template>
  <header class="header" ref="headerRef">
    <div class="logo-container">
      <img src="/assets/images/logo-cantoria.png" alt="Logo Cantoria" class="logo-img" />
      <span class="logo-text">C.A.S.T. - Cantoria</span>
    </div>

    <!-- Menu burger -->
    <button class="burger-btn" @click="isMenuOpen = !isMenuOpen" aria-label="Menu">
      <svg class="trombone-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path fill="#B22222" d="M3 12c0-1.1.9-2 2-2h10v-2H5c-2.2 0-4 1.8-4 4s1.8 4 4 4h10v-2H5c-1.1 0-2-.9-2-2z"/>
      </svg>
    </button>

    <!-- Navigation -->
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
      </div>

      <!-- Avatar -->
      <div class="avatar-wrapper" @click="toggleFloatingBox">
        <img v-if="user && user.photoURL" :src="user.photoURL" alt="Avatar" class="avatar" />
        <div v-else class="avatar-placeholder">👤</div>
      </div>
    </nav>

    <!-- Boîte flottante -->
    <FloatingAuthBox
      :visible="showFloatingBox"
      :user="user"
      :role="role"
      @close="showFloatingBox = false"
      @go-profile="goToProfile"
    />
  </header>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import FloatingAuthBox from '../components/FloatingAuthBox.vue'

// Récupération de l'utilisateur et du rôle depuis useAuth
const { user, role } = useAuth()

// Router pour naviguer vers /profile
const router = useRouter()

// État du menu burger
const isMenuOpen = ref(false)

// État du groupe actif pour les dropdowns
const activeGroup = ref(null)

// État de la boîte flottante
const showFloatingBox = ref(false)

// Ouvre/ferme la boîte flottante
const toggleFloatingBox = () => {
  showFloatingBox.value = !showFloatingBox.value
}

// Navigation vers la page profil
const goToProfile = () => {
  showFloatingBox.value = false
  router.push('/profile')
}
</script>
<style scoped>
.header {
  background: #000;
  padding: 0.8rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #B22222;
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
  color: #FFD700;
  font-size: 1.4rem;
  font-weight: bold;
}

/* Icône burger trombone */
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

/* Menu principal */
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
  color: #C0C0C0;
  text-decoration: none;
  font-weight: 500;
}

.nav-link:hover {
  color: #FFD700;
}

.nav-group {
  position: relative;
  min-width: 120px;
}

.group-title {
  cursor: pointer;
  color: #FFD700;
  font-weight: bold;
}

.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #111;
  border: 1px solid #FFD700;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  z-index: 50;
  min-width: 160px;
  box-shadow: 0 4px 12px rgba(255, 215, 0, 0.2);
}

.dropdown .nav-link {
  color: #C0C0C0;
  text-decoration: none;
  font-weight: 500;
  padding: 0.2rem 0;
}

.dropdown .nav-link:hover {
  color: #FFD700;
}

/* Avatar */
.avatar-wrapper {
  margin-left: 1rem;
  cursor: pointer;
  flex-shrink: 0;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid #FFD700;
}

.avatar-placeholder {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #FFD700;
  color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

/* Responsive */
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
    background: #000;
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