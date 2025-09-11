<template>
  <div class="auth-actions">
    <template v-if="isLoggedIn">
      <div class="user-menu" @click="toggleUserMenu">
        <img :src="avatarURL" alt="Avatar" class="avatar-img" />
        <svg class="chevron" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path fill="currentColor" d="M7 10l5 5 5-5z"/>
        </svg>

        <div v-if="userMenuOpen" class="dropdown-user">
          <button class="dropdown-item" @click="goToProfile">👤 Modifier le profil</button>
          <button class="dropdown-item" @click="confirmLogout">🚪 Déconnexion</button>
        </div>
      </div>
    </template>

    <template v-else>
      <button class="icon-btn" @click="openAuth" title="Connexion">👤</button>
    </template>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore.js'
import { useAuthPopup } from '@/composables/useAuthPopup'

const router = useRouter()
const authStore = useAuthStore()
const { openAuth } = useAuthPopup()

const userMenuOpen = ref(false)
const isLoggedIn = computed(() => authStore.isLoggedIn)
const avatarURL = computed(() => authStore.user?.photoURL || '/assets/images/avatar-default.png')

const toggleUserMenu = () => {
  userMenuOpen.value = !userMenuOpen.value
}

const goToProfile = () => {
  router.push('/profile')
}

const confirmLogout = async () => {
  if (confirm("Voulez-vous vraiment vous déconnecter ?")) {
    await authStore.logout(router)
    userMenuOpen.value = false
  }
}
</script>