<template>
  <header class="bg-black text-yellow-400 px-6 py-4 flex justify-between items-center shadow-md">
    <h1 class="text-xl font-bold tracking-wide">🎼 C.A.S.T. Cantoria – Admin</h1>
    <nav class="space-x-4">
      <router-link to="/" class="hover:underline">Accueil</router-link>
      <router-link to="/profile" class="hover:underline">Profil</router-link>
      <button @click="handleLogout" class="hover:underline text-yellow-400">Déconnexion</button>
    </nav>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()
const { logout } = useAuth()

const handleLogout = async () => {
  await logout(router)
}
</script>


<script setup></script>


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