<template>
  <Header />
  <main class="admin-main">
    <slot />
  </main>
</template>

<script setup>
import Header from '@/components/header/Header.vue'
</script>

<style scoped>
.admin-main {
  padding: 2rem;
  background-color: #f9f9f9;
  min-height: 100vh;
}
</style>