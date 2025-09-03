<template>
  <header class="header">
    <h1 class="logo">Sanctum Vox</h1>
    <nav class="nav">
      <router-link to="/" class="nav-link">Accueil</router-link>
      <router-link to="/about" class="nav-link">À propos</router-link>
      <router-link to="/repertoire" class="nav-link">Répertoire</router-link>
      <router-link to="/concerts" class="nav-link">Concerts</router-link>
      <router-link to="/spiritualite" class="nav-link">Spiritualité</router-link>
      <router-link to="/galerie" class="nav-link">Galerie</router-link>
    </nav>
  </header>
</template>

<style scoped>
.header {
  background: linear-gradient(90deg, #000000, #111111);
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #B22222;
}
.logo {
  color: #FFD700;
  font-size: 1.5rem;
  font-weight: bold;
}
.nav {
  display: flex;
  gap: 1.5rem;
}
.nav-link {
  color: #C0C0C0;
  text-decoration: none;
  font-weight: 500;
  position: relative;
}
.nav-link::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -4px;
  width: 0%;
  height: 2px;
  background-color: #FFD700;
  transition: width 0.3s ease;
}
.nav-link:hover {
  color: #FFD700;
}
.nav-link:hover::after {
  width: 100%;
}
.router-link-active {
  color: #FFD700;
}
</style>