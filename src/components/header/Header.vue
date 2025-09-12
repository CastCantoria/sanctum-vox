<script setup>
import { ref } from 'vue'
import LogoSection from '@/components/header/LogoSection.vue'
import MainNavigation from '@/components/header/MainNavigation.vue'
import AuthActions from '@/components/header/AuthActions.vue'

const menuOpen = ref(false)
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}
</script>

<template>
  <header class="header">
    <div class="container">
      <LogoSection />

      <button class="burger-btn" @click="toggleMenu" aria-label="Menu">
        ☰
      </button>

      <nav :class="['nav', { open: menuOpen }]">
        <ul class="nav-list">
          <li><MainNavigation /></li>
          <li class="user-actions"><AuthActions /></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header {
  background: linear-gradient(to right, #0a0a0a, #1a1a1a);
  border-bottom: 1px solid #FFD700;
  box-shadow: 0 2px 8px rgba(255, 215, 0, 0.1);
  padding: 0.5rem 0;
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
  align-items: center;
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

.user-actions {
  display: flex;
  align-items: center;
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
    background: #0a0a0a;
    padding: 1rem;
    flex-direction: column;
  }
  .nav-list {
    flex-direction: column;
    gap: 0.5rem;
  }
  .user-actions {
    justify-content: flex-start;
  }
}
</style>