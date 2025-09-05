<template>
  <div class="divider">
    <span v-if="icon" class="icon" :class="{ pulse: animate }">{{ icon }}</span>
  </div>
</template>

<script setup>
defineProps({
  icon: {
    type: String,
    default: '✦'
  },
  animate: {
    type: Boolean,
    default: true
  }
})
</script>

<style scoped>
.divider {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2rem 0;
  position: relative;
  opacity: 0;
  animation: fadeIn 1s ease forwards;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background-color: var(--doré, #c8a951);
  margin: 0 0.8rem;
}

.icon {
  font-size: 1.2rem;
  color: var(--accent, #b08c3f);
}

.pulse {
  animation: pulse 2s infinite ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.2); opacity: 0.7; }
}
</style>