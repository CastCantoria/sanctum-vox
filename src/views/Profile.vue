<template>
  <section class="profile">
    <h1>Mon profil</h1>
    <div v-if="user">
      <p><strong>Nom :</strong> {{ user.displayName || '—' }}</p>
      <p><strong>Email :</strong> {{ user.email }}</p>
      <p><strong>Rôle :</strong> {{ role || '—' }}</p>
      <img v-if="user.photoURL" :src="user.photoURL" alt="Avatar" class="avatar" />
    </div>
    <div v-else>
      <p>Vous n'êtes pas connecté.</p>
    </div>
  </section>
</template>

<script setup>
import { useAuth } from '../composables/useAuth'
const { user, role } = useAuth()
</script>

<style scoped>
.profile {
  padding: 2rem;
  background-color: #111;
  color: #FFD700;
}
h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}
p {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: #ccc;
}
.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 2px solid #FFD700;
  margin-top: 1rem;
}
</style>