<template>
  <!-- Bannière de bienvenue -->
  <WelcomeBanner />

  <!-- Écran de chargement -->
  <LoadingScreen v-if="auth.loading" />

  <!-- Vue principale avec transition -->
  <router-view v-else v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>

  <!-- Authentification flottante -->
  <FloatingAuthBox
    v-if="isAuthPopupVisible"
    :mode="authMode"
    @close="closeAuth"
  />
</template>

<script setup>
import FloatingAuthBox from './components/FloatingAuthBox.vue'
import WelcomeBanner from './components/WelcomeBanner.vue'
import LoadingScreen from './components/LoadingScreen.vue'
import { useAuthPopup } from './composables/useAuthPopup'
import { useAuthStore } from '@/stores/authStore.js'

const { isAuthPopupVisible, authMode, closeAuth } = useAuthPopup()
const auth = useAuthStore()
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>