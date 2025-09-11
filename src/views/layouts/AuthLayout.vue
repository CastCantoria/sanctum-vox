<template>
  <Header />
  <main class="auth-main">
    <slot />
  </main>
</template>

<script setup>
import Header from '@/components/header/Header.vue'
</script>

<style scoped>
.auth-main {
  padding: 2rem;
  max-width: 600px;
  margin: auto;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
}
</style>