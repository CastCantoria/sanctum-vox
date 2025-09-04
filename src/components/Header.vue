<template>
  <header class="header" ref="headerRef">
    <div class="logo-container">
      <img src="/assets/images/logo-cantoria.png" alt="Logo Cantoria" class="logo-img" />
      <span class="logo-text">Sanctum Vox</span>
    </div>

    <!-- Icône trombone rouge pour menu mobile -->
    <button class="burger-btn" @click="isMenuOpen = !isMenuOpen" aria-label="Menu">
      <svg class="trombone-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path fill="#B22222" d="M3 12c0-1.1.9-2 2-2h10v-2H5c-2.2 0-4 1.8-4 4s1.8 4 4 4h10v-2H5c-1.1 0-2-.9-2-2z"/>
      </svg>
    </button>

    <nav class="nav-desktop" :class="{ open: isMenuOpen }">
      <div class="menu-wrapper">
        <router-link to="/" class="nav-link">Accueil</router-link>

        <div class="nav-group" @mouseenter="activeGroup = 'sanctuaire'" @mouseleave="activeGroup = null">
          <span class="nav-link group-title">Sanctuaire ▾</span>
          <div class="dropdown" v-if="activeGroup === 'sanctuaire'">
            <router-link to="/about" class="nav-link">À propos</router-link>
            <router-link to="/spiritualite" class="nav-link">Spiritualité</router-link>
            <router-link to="/contact" class="nav-link">Contact</router-link>
          </div>
        </div>

        <div class="nav-group" @mouseenter="activeGroup = 'expression'" @mouseleave="activeGroup = null">
          <span class="nav-link group-title">Expression ▾</span>
          <div class="dropdown" v-if="activeGroup === 'expression'">
            <router-link to="/concerts" class="nav-link">Concerts</router-link>
            <router-link to="/galerie" class="nav-link">Galerie</router-link>
            <router-link to="/pedagogie" class="nav-link">Pédagogie</router-link>
          </div>
        </div>
      </div>

      <div class="avatar-wrapper" @click="toggleFloatingBox">
        <img v-if="user && user.photoURL" :src="user.photoURL" alt="Avatar" class="avatar" />
        <div v-else class="avatar-placeholder">👤</div>
      </div>
    </nav>

    <!-- Boîte flottante -->
    <div v-if="showFloatingBox" class="floating-overlay">
      <div class="floating-box">
        <button class="close-btn" @click="closeFloatingBox">✕</button>

        <template v-if="user">
          <h3 class="box-title">{{ user.displayName || user.email }}</h3>
          <p class="box-role">Rôle : {{ role || 'membre' }}</p>
          <button class="box-button" @click="goToProfile">Modifier mon profil</button>
          <button class="box-button" @click="logout">Se déconnecter</button>
        </template>

        <template v-else>
          <h3 class="box-title">{{ isLoginMode ? 'Connexion' : 'Inscription' }}</h3>
          <form @submit.prevent="handleSubmit">
            <template v-if="isLoginMode">
              <input type="email" v-model="email" placeholder="Email" class="box-input" required />
              <input type="password" v-model="password" placeholder="Mot de passe" class="box-input" required />
              <button type="submit" class="box-button">Se connecter</button>
              <button type="button" class="google-button" @click="handleGoogleLogin" :disabled="isGoogleLoading">
                <svg class="google-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.2l6.8-6.8C35.4 2.3 30.1 0 24 0 14.6 0 6.4 5.7 2.5 14l8 6.2C12.2 13.1 17.6 9.5 24 9.5z"/>
                  <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.2-.4-4.7H24v9h12.7c-.6 3.2-2.5 5.9-5.3 7.7l8.1 6.3c4.7-4.3 7.4-10.6 7.4-18.3z"/>
                  <path fill="#FBBC05" d="M10.5 28.5c-.6-1.8-.9-3.7-.9-5.5s.3-3.7.9-5.5l-8-6.2C.9 15.3 0 19.5 0 24s.9 8.7 2.5 12.7l8-6.2z"/>
                  <path fill="#34A853" d="M24 48c6.1 0 11.4-2 15.2-5.5l-8.1-6.3c-2.3 1.5-5.2 2.3-8.1 2.3-6.4 0-11.8-3.6-14.5-8.8l-8 6.2C6.4 42.3 14.6 48 24 48z"/>
                </svg>
                Se connecter avec Google
              </button>
            </template>

            <template v-else>
              <input type="text" v-model="firstName" placeholder="Prénom" class="box-input" required />
              <input type="text" v-model="lastName" placeholder="Nom" class="box-input" required />
              <input type="tel" v-model="phone" placeholder="Téléphone" class="box-input" />
              <input type="email" v-model="email" placeholder="Adresse email" class="box-input" required />
              <input type="email" v-model="confirmEmail" placeholder="Confirmer l'email" class="box-input" required />
              <input type="password" v-model="password" placeholder="Mot de passe" class="box-input" required />
              <input type="password" v-model="confirmPassword" placeholder="Confirmer le mot de passe" class="box-input" required />
              <input type="file" @change="e => avatar.value = e.target.files[0]" accept="image/*" class="box-input" />
              <button type="submit" class="box-button">S’inscrire</button>
            </template>
          </form>

          <p class="box-text" @click="switchMode">
            {{ isLoginMode ? 'Pas encore membre ? S’inscrire' : 'Déjà membre ? Se connecter' }}
          </p>

          <p class="box-greeting">{{ greeting }}</p>
          <p v-if="errorMessage" class="box-error">{{ errorMessage }}</p>
        </template>
      </div>
    </div>
  </header>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from "vue"
import { useRouter, useRoute } from "vue-router"
import { useAuth } from "../composables/useAuth"
import { signOut } from "firebase/auth"
import { auth } from "../firebase"

const router = useRouter()
const route = useRoute()
const headerRef = ref(null)
const activeGroup = ref(null)
const isMenuOpen = ref(false)

const {
  user,
  role,
  login,
  signup,
  loginWithGoogle,
  updateProfile
} = useAuth()

const showFloatingBox = ref(false)
const isLoginMode = ref(true)
const email = ref("")
const confirmEmail = ref("")
const password = ref("")
const confirmPassword = ref("")
const firstName = ref("")
const lastName = ref("")
const phone = ref("")
const avatar = ref(null)
const errorMessage = ref("")
const greeting = ref("")
const isGoogleLoading = ref(false)

const toggleFloatingBox = () => {
  showFloatingBox.value = !showFloatingBox.value
  isLoginMode.value = true
  errorMessage.value = ""
}
const closeFloatingBox = () => {
  showFloatingBox.value = false
  email.value = ""
  confirmEmail.value = ""
  password.value = ""
  confirmPassword.value = ""
  firstName.value = ""
  lastName.value = ""
  phone.value = ""
  avatar.value = null
  errorMessage.value = ""
}
const switchMode = () => {
  isLoginMode.value = !isLoginMode.value
  errorMessage.value = ""
}
const logout = async () => {
  await signOut(auth)
  closeFloatingBox()
}
const goToProfile = () => {
  router.push("/profile")
}
const updateGreeting = () => {
  const hour = new Date().getHours()
  greeting.value =
    hour < 12
      ? "Bienvenue dans la lumière du matin"
      : hour < 18
      ? "Bienvenue dans la chaleur du jour"
      : "Reposez-vous dans la paix du soir"
}
const handleSubmit = async () => {
  errorMessage.value = ""
  try {
    if (isLoginMode.value) {
      await login(email.value, password.value)
    } else {
      if (email.value !== confirmEmail.value) {
        errorMessage.value = "Les adresses email ne correspondent pas"
        return
      }
      if (password.value !== confirmPassword.value) {
        errorMessage.value = "Les mots de passe ne correspondent pas"
        return
      }
      const userCredential = await signup(email.value, password.value)
      await updateProfile(userCredential.user, {
        displayName: `${firstName.value} ${lastName.value}`,
        phoneNumber: phone.value,
        photoURL: avatar.value ? URL.createObjectURL(avatar.value) : null
      })
    }
    closeFloatingBox()
  } catch (err) {
    errorMessage.value = err.message || "Une erreur est survenue"
  }
}
const handleGoogleLogin = async () => {
  isGoogleLoading.value = true
  try {
    await loginWithGoogle()
    closeFloatingBox()
  } catch (err) {
    errorMessage.value = err.message || "Échec de la connexion Google"
  } finally {
    isGoogleLoading.value = false
  }
}
const handleClickOutside = (event) => {
  if (
    showFloatingBox.value &&
    headerRef.value &&
    !headerRef.value.contains(event.target)
  ) {
    showFloatingBox.value = false
  }
}
onMounted(() => {
  updateGreeting()
  document.addEventListener("click", handleClickOutside)
  document.addEventListener("touchstart", handleClickOutside)
})
onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside)
  document.removeEventListener("touchstart", handleClickOutside)
})
watch(user, (newUser) => {
  if (newUser) closeFloatingBox()
})
watch(() => route.path, () => {
  closeFloatingBox()
})
</script>
<style scoped>
.header {
  background: #000;
  padding: 0.8rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #B22222;
  flex-wrap: wrap;
  position: relative;
}
.logo-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.logo-img {
  height: 38px;
}
.logo-text {
  color: #FFD700;
  font-size: 1.4rem;
  font-weight: bold;
}

/* Icône burger trombone */
.burger-btn {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  z-index: 101;
}
.trombone-icon {
  width: 28px;
  height: 28px;
  fill: #B22222;
}

/* Menu principal */
.nav-desktop {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  flex: 1;
}
.menu-wrapper {
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
}
.nav-link {
  color: #C0C0C0;
  text-decoration: none;
  font-weight: 500;
}
.nav-link:hover {
  color: #FFD700;
}
.nav-group {
  position: relative;
  min-width: 120px;
}
.group-title {
  cursor: pointer;
  color: #FFD700;
  font-weight: bold;
}
.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #111;
  border: 1px solid #FFD700;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  z-index: 50;
  min-width: 160px;
  box-shadow: 0 4px 12px rgba(255, 215, 0, 0.2);
}
.dropdown .nav-link {
  color: #C0C0C0;
  text-decoration: none;
  font-weight: 500;
  padding: 0.2rem 0;
}
.dropdown .nav-link:hover {
  color: #FFD700;
}

/* Avatar */
.avatar-wrapper {
  margin-left: 1rem;
  cursor: pointer;
  flex-shrink: 0;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid #FFD700;
}
.avatar-placeholder {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #FFD700;
  color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

/* Boîte flottante */
.floating-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}
.floating-box {
  background-color: #111;
  border: 1px solid #FFD700;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 8px 20px rgba(255, 215, 0, 0.3);
  width: 320px;
  text-align: center;
  animation: fadeIn 0.4s ease;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
.box-title {
  color: #FFD700;
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
}
.box-role {
  color: #C0C0C0;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}
.box-input {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 0.8rem;
  border-radius: 6px;
  border: 1px solid #FFD700;
  background-color: #222;
  color: #FFD700;
  font-size: 0.95rem;
}
.box-input::placeholder {
  color: #888;
}
.box-button {
  display: block;
  width: 100%;
  margin: 0.4rem auto;
  padding: 0.6rem 1.2rem;
  background-color: #FFD700;
  color: #000;
  border-radius: 6px;
  font-weight: bold;
  transition: background-color 0.2s ease;
  border: none;
  cursor: pointer;
}
.box-button:hover {
  background-color: #FFA500;
}
.google-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  margin-top: 0.6rem;
  padding: 0.6rem 1rem;
  background-color: #fff;
  color: #000;
  border-radius: 6px;
  font-weight: bold;
  border: none;
  cursor: pointer;
}
.google-button:hover {
  background-color: #eee;
}
.google-icon {
  width: 20px;
  height: 20px;
}
.box-text {
  color: #C0C0C0;
  font-size: 0.9rem;
  margin-top: 1rem;
  cursor: pointer;
  text-decoration: underline;
}
.box-greeting {
  color: #888;
  font-size: 0.85rem;
  margin-top: 1rem;
  font-style: italic;
}
.box-error {
  color: #FF4444;
  font-size: 0.85rem;
  margin-top: 0.5rem;
}
.close-btn {
  position: absolute;
  top: 8px;
  right: 10px;
  background: none;
  border: none;
  color: #FFD700;
  font-size: 1.2rem;
  cursor: pointer;
}

/* Responsive */
@media (max-width: 768px) {
  .burger-btn {
    display: block;
    position: absolute;
    top: 1rem;
    right: 1.5rem;
  }

  .nav-desktop {
    display: none;
    flex-direction: column;
    align-items: flex-end;
    background: #000;
    padding: 1rem;
    position: absolute;
    top: 60px;
    right: 0;
    width: 100%;
    z-index: 100;
  }

  .nav-desktop.open {
    display: flex;
  }

  .menu-wrapper {
    flex-direction: column;
    align-items: flex-end;
    width: 100%;
  }

  .dropdown {
    position: static;
    box-shadow: none;
    border: none;
    padding: 0;
    background: none;
  }

  .dropdown .nav-link {
    padding-left: 1rem;
  }

  .floating-box {
    width: 90%;
    max-width: 320px;
  }
}
</style>