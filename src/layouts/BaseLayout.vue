<template>
  <div class="layout">
    <Header />
    <WelcomeBanner />
    <main class="content">
      <slot />
    </main>
  </div>
</template>

<script setup>
import Header from '@/components/Header.vue'
import WelcomeBanner from '@/components/WelcomeBanner.vue'
</script>

<style scoped>
.layout {
  background-color: #fdfaf6;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.content {
  flex: 1;
  padding: 2rem 1.5rem;
  max-width: 960px;
  margin: 0 auto;
  color: #3a3a3a;
  font-family: 'Inter', sans-serif;
}
</style>