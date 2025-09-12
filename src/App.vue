<template>
  <div id="app">
    <!-- Sélection dynamique du header -->
    <component :is="currentHeader" />

    <!-- Contenu avec transition -->
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>

    <!-- Footer global -->
    <Footer />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

// Import des deux headers
import Header from '@/components/header/Header.vue'
import AdminHeader from '@/components/admin/AdminHeader.vue'
import Footer from '@/components/shared/Footer.vue'

const route = useRoute()

// Sélection automatique du header selon la route
const currentHeader = computed(() => {
  return route.path.startsWith('/admin') ? AdminHeader : Header
})
</script>

<style>
/* Transition fade globale */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Mise en page globale */
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

router-view {
  flex: 1;
}
</style>