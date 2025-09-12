<script setup>
import { computed } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

// État de connexion
const isLoggedIn = computed(() => !!authStore.user)

// Avatar dynamique : photo Firebase ou avatar généré
const userAvatar = computed(() => {
  if (authStore.user?.photoURL) {
    return authStore.user.photoURL
  }
  const name = authStore.user?.displayName || 'Invité'
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=FFD700&color=000&size=128`
})

// Actions
const handleLogin = () => {
  router.push('/login') // ou déclencher loginWithGoogle()
}

const goToProfile = () => {
  router.push('/profile')
}
</script>

<template>
  <div class="auth-actions">
    <!-- Icône de connexion si pas connecté -->
    <button
      v-if="!isLoggedIn"
      @click="handleLogin"
      class="icon-btn"
      title="Se connecter"
    >
      <!-- Chemin statique vers /public/images/logos/google-icon.svg -->
      <img src="/images/logos/google-icon.svg" alt="Connexion" class="icon-img" />
    </button>

    <!-- Avatar si connecté -->
    <button
      v-else
      @click="goToProfile"
      class="avatar-btn"
      title="Mon profil"
    >
      <img :src="userAvatar" alt="Avatar" class="avatar-img" />
    </button>
  </div>
</template>

<style scoped>
.auth-actions {
  display: flex;
  align-items: center;
}

.icon-btn,
.avatar-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.icon-img {
  width: 28px;
  height: 28px;
  transition: transform 0.2s ease;
}

.icon-img:hover {
  transform: scale(1.05);
}

.avatar-img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #FFD700;
  transition: transform 0.2s ease;
}

.avatar-img:hover {
  transform: scale(1.05);
}
</style>