<template>
  <div class="logout">
    <h1>Déconnexion réussie 👋</h1>
    <p>À bientôt dans le sanctuaire ✨</p>
    <router-link to="/">← Retour à l’accueil</router-link>
  </div>
</template>

<style scoped>
.logout {
  text-align: center;
  margin-top: 4rem;
  font-family: 'Segoe UI', sans-serif;
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
</style>