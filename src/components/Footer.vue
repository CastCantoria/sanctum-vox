<template>
  <footer class="footer">
    <div class="separator"></div>
    <p>© 2003-2025 C.A.S.T. – Tous droits réservés</p>
    <div class="links">
      <router-link to="/galerie" class="link">Galerie</router-link>
      <a href="https://facebook.com" target="_blank" class="link">Facebook</a>
      <a href="https://youtube.com" target="_blank" class="link">YouTube</a>
      <a href="mailto:contact@cast.org" class="link">Email</a>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: #000000;
  color: #C0C0C0;
  text-align: center;
  padding: 2rem 1rem;
  border-top: 2px solid #B22222;
}
.separator {
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, #FFD700, #B22222);
  margin: 0 auto 1rem auto;
  border-radius: 2px;
}
.links {
  margin-top: 0.5rem;
  display: flex;
  justify-content: center;
  gap: 1.5rem;
}
.link {
  color: #FFD700;
  text-decoration: none;
  font-weight: 500;
}
.link:hover {
  color: #B22222;
}
</style>