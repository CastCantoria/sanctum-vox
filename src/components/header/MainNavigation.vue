<script setup>
defineProps({
  menuOpen: Boolean
})
</script>

<template>
  <nav :class="['nav', { open: menuOpen }]">
    <ul class="nav-list">
      <li><RouterLink to="/" class="link" exact>Accueil</RouterLink></li>
      <li><RouterLink to="/about" class="link">À propos</RouterLink></li>
      <li><RouterLink to="/pedagogie" class="link">Pédagogie</RouterLink></li>
      <li><RouterLink to="/concerts" class="link">Concerts</RouterLink></li>
      <li><RouterLink to="/galerie" class="link">Galerie</RouterLink></li>
      <li><RouterLink to="/spiritualite" class="link">Spiritualité</RouterLink></li>
      <li><RouterLink to="/contact" class="link">Contact</RouterLink></li>
    </ul>
  </nav>
</template>

<style scoped>
.nav {
  display: flex;
  align-items: center;
  transition: max-height 0.3s ease;
  overflow: hidden;
  max-height: 0;
}

.nav.open {
  max-height: 300px;
}

.nav-list {
  display: flex;
  gap: 1.5rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.link {
  position: relative;
  color: #FFD700;
  font-weight: 500;
  text-decoration: none;
  padding: 0.4rem 0;
  transition: color 0.3s ease;
}

.link::after {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0%;
  height: 2px;
  background-color: #FFD700;
  transition: width 0.3s ease;
}

.link:hover::after {
  width: 100%;
}

.link.router-link-exact-active {
  font-weight: 700;
  border-bottom: 2px solid #FFD700;
}

@media (max-width: 768px) {
  .nav-list {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>