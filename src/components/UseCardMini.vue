<template>
  <div class="user-mini">
    <img v-if="avatarURL" :src="avatarURL" alt="Avatar" class="avatar" />
    <div class="info">
      <span class="name">{{ firstName }}</span>
      <span class="role">{{ role }}</span>
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
.user-mini {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  background-color: #fdfaf6;
  padding: 0.6rem 1rem;
  border-radius: 8px;
  border: 1px solid #c8a951;
  font-size: 0.9rem;
}

.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid #c8a951;
  object-fit: cover;
}

.info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.name {
  font-weight: 600;
  color: #b08c3f;
}

.role {
  font-style: italic;
  color: #3a3a3a;
}
</style>