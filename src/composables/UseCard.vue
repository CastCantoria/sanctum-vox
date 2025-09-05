<template>
  <div class="user-card">
    <img v-if="avatarURL" :src="avatarURL" alt="Avatar" class="avatar" />
    <div class="info">
      <h2 class="name">{{ firstName }}</h2>
      <p class="role">{{ role }}</p>
    </div>
  </div>
</template>

<script setup>
import { useUser } from '@/composables/useUser.js'
import { useAvatar } from '@/composables/useAvatar.js'

const { user, profile } = useUser()
const { avatarURL } = useAvatar()

const firstName = computed(() => profile.value?.firstName || user.value?.displayName?.split(' ')[0] || 'Ami')
const role = computed(() => profile.value?.role || 'Membre')
</script>

<style scoped>
.user-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  background-color: #fff8e1;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(200, 169, 81, 0.2);
  max-width: 480px;
  margin: 2rem auto;
}

.avatar {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  border: 2px solid #c8a951;
  object-fit: cover;
  transition: transform 0.3s ease;
}
.avatar:hover {
  transform: scale(1.05);
}

.info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.name {
  font-size: 1.4rem;
  font-weight: 600;
  color: #b08c3f;
  margin-bottom: 0.2rem;
}

.role {
  font-size: 1rem;
  color: #3a3a3a;
  font-style: italic;
}
</style>