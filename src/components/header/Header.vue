<script setup>
import LogoSection from "@/components/Header/LogoSection.vue"
import MainNavigation from "@/components/header/MainNavigation.vue"
import AuthActions from "@/components/Header/AuthActions.vue"
</script>

<template>
  <header class="header">
    <div class="container">
      <LogoSection />
      <MainNavigation />
      <AuthActions />
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
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}
</style>