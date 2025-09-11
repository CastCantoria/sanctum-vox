<template>
  <Header />
  <main class="base-main">
    <slot />
  </main>
</template>

<script setup>
import Header from '@/components/header/Header.vue'
</script>

<style scoped>
.base-main {
  padding: 2rem;
  max-width: 1200px;
  margin: auto;
}
</style>