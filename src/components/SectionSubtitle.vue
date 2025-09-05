<template>
  <p class="subtitle">
    <span v-if="icon" class="icon">{{ icon }}</span>
    {{ text }}
  </p>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default: ''
  }
})
</script>

<style scoped>
.subtitle {
  font-size: 1.1rem;
  color: var(--gris, #3a3a3a);
  margin-bottom: 1rem;
  font-style: italic;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.icon {
  font-size: 1.2rem;
  color: var(--accent, #b08c3f);
}
</style>