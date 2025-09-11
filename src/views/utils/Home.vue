<script setup>
import Footer from "@/components/Footer.vue"
</script>
<template>
  <section class="home">
    <h1 class="title">Bienvenue sur C.A.S.T. – Cantoria</h1>
    <p class="subtitle">Explorez notre sanctuaire musical et spirituel.</p>

    <div class="cta-buttons">
      <router-link to="/about" class="btn">À propos</router-link>
      <router-link to="/concerts" class="btn">Nos concerts</router-link>
    </div>
  </section>
</template>

<script setup>
// Pas besoin d'importer Header ici si tu utilises un layout
</script>

<style scoped>
.home {
  padding: 3rem 2rem;
  text-align: center;
  background: linear-gradient(to bottom, #fdfaf6, #f5f0e6);
}

.title {
  font-size: 2.2rem;
  color: #c8a951;
  margin-bottom: 1rem;
}

.subtitle {
  font-size: 1.2rem;
  color: #555;
  margin-bottom: 2rem;
}

.cta-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.btn {
  background-color: #c8a951;
  color: white;
  padding: 0.8rem 1.4rem;
  border-radius: 6px;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #b89a45;
}
</style>