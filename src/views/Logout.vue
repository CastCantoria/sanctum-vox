<template>
  <div class="logout" role="status" aria-live="polite">
    <h1>Déconnexion réussie 👋</h1>
    <p>À bientôt dans le sanctuaire ✨</p>
    <router-link to="/">← Retour à l’accueil</router-link>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// ⏳ Redirection automatique après 4 secondes
onMounted(() => {
  setTimeout(() => {
    router.push('/')
  }, 4000)
})
</script>

<style scoped>
.logout {
  text-align: center;
  margin-top: 4rem;
  font-family: 'Segoe UI', sans-serif;
  animation: fade-in 0.6s ease-out;
}

.logout h1 {
  color: #c8a951;
  font-size: 2rem;
}

.logout p {
  margin: 1rem 0;
  font-size: 1.1rem;
}

.logout a {
  color: #c8a951;
  text-decoration: none;
  font-weight: bold;
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>