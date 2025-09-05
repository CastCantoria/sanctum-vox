<template>
  <!-- Bannière de bienvenue -->
  <WelcomeBanner />

  <!-- Vue principale avec transition -->
  <router-view v-slot="{ Component }">
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
import { useAuthPopup } from './composables/useAuthPopup'

const { isAuthPopupVisible, authMode, closeAuth } = useAuthPopup()
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>