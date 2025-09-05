<template>
  <div class="section-title">
    <span class="icon">{{ icon }}</span>
    <h1 class="text">{{ title }}</h1>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default: '🌿'
  }
})
</script>

<style scoped>
.section-title {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--doré, #c8a951);
}

.icon {
  font-size: 1.4rem;
  color: var(--doré, #c8a951);
}

.text {
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--accent, #b08c3f);
  font-family: 'Inter', sans-serif;
}
</style>