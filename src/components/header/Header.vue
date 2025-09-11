<template>
  <header class="header">
    <LogoSection />

    <button class="burger-btn" @click="isMenuOpen = !isMenuOpen" aria-label="Menu">
      <svg class="trombone-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path fill="#B22222" d="M3 12c0-1.1.9-2 2-2h10v-2H5c-2.2 0-4 1.8-4 4s1.8 4 4 4h10v-2H5c-1.1 0-2-.9-2-2z"/>
      </svg>
    </button>

    <nav class="nav-desktop" :class="{ open: isMenuOpen }">
      <MainNavigation />
      <AuthActions />
    </nav>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import LogoSection from '@/components/header/LogoSection.vue'
import MainNavigation from '@/components/header/MainNavigation.vue'
import AuthActions from '@/components/header/AuthActions.vue'

const isMenuOpen = ref(false)
</script>

<style scoped>
/* Tu peux garder ici uniquement les styles globaux du header */
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

.nav-desktop.open {
  display: flex;
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
}
</style>