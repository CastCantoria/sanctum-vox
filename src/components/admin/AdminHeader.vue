<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/auth/useAuth'

const router = useRouter()
const { logout } = useAuth()

const menuOpen = ref(false)
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

const handleLogout = async () => {
  await logout(router)
}
</script>

<template>
  <header class="admin-header">
    <div class="container">
      <h1 class="logo">🎼 C.A.S.T. Cantoria – Admin</h1>

      <button class="burger-btn" @click="toggleMenu" aria-label="Menu">
        ☰
      </button>

      <nav :class="['nav', { open: menuOpen }]">
        <ul class="nav-list">
          <li><router-link to="/" class="nav-link">Accueil</router-link></li>
          <li class="user-actions">
            <router-link to="/profile" class="nav-link">Profil</router-link>
            <button @click="handleLogout" class="nav-link">Déconnexion</button>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.admin-header {
  background: #000;
  color: #FFD700;
  padding: 0.8rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.2rem;
  font-weight: bold;
}

.burger-btn {
  display: none;
  background: none;
  border: none;
  font-size: 1.8rem;
  color: #FFD700;
  cursor: pointer;
}

.nav {
  display: flex;
  transition: max-height 0.3s ease;
  overflow: hidden;
  max-height: 0;
}

.nav.open {
  max-height: 300px;
}

.nav-list {
  list-style: none;
  display: flex;
  gap: 1rem;
  margin: 0;
  padding: 0;
}

.nav-link {
  color: #FFD700;
  text-decoration: none;
}

.nav-link:hover {
  text-decoration: underline;
}

.user-actions {
  display: flex;
  gap: 1rem;
}

@media (max-width: 768px) {
  .burger-btn {
    display: block;
  }
  .nav {
    position: absolute;
    top: 60px;
    right: 0;
    width: 100%;
    background: #000;
    padding: 1rem;
    flex-direction: column;
  }
  .nav-list {
    flex-direction: column;
    gap: 0.5rem;
  }
  .user-actions {
    flex-direction: column;
  }
}
</style>