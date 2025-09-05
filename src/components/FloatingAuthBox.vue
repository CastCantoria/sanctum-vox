<template>
  <transition name="fade-slide">
    <div v-if="visible" class="floating-overlay" @click.self="closeBox">
      <div class="floating-box" ref="boxRef">
        <button class="close-btn" @click="closeBox">✕</button>

        <!-- Mode connecté -->
        <template v-if="user">
          <h3 class="box-title">{{ user.displayName || user.email }}</h3>
          <p class="box-role">Rôle : {{ role || 'membre' }}</p>
          <button class="box-button" @click="$emit('go-profile')">Modifier mon profil</button>
          <button class="box-button" @click="logoutUser">Se déconnecter</button>
        </template>

        <!-- Mode invité -->
        <template v-else>
          <h3 class="box-title">{{ isLoginMode ? 'Connexion' : 'Inscription' }}</h3>

          <form @submit.prevent="handleSubmit" class="form-wrapper">
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

              <select v-model="selectedRole" class="box-input" required>
                <option disabled value="">Choisir un rôle</option>
                <option v-for="role in availableRoles" :key="role" :value="role">
                  {{ role }}
                </option>
              </select>

              <input type="tel" v-model="phone" placeholder="Téléphone" class="box-input" />
              <input type="email" v-model="email" placeholder="Adresse email" class="box-input" required />
              <input type="email" v-model="confirmEmail" placeholder="Confirmer l'email" class="box-input" required />
              <input type="password" v-model="password" placeholder="Mot de passe" class="box-input" required />
              <input type="password" v-model="confirmPassword" placeholder="Confirmer le mot de passe" class="box-input" required />
              <input type="file" @change="e => avatar = e.target.files[0]" accept="image/*" class="box-input" />
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
  </transition>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useAuth } from '../composables/useAuth'
import { setDoc, doc } from 'firebase/firestore'
import { db } from '../firebase'

// Props reçues du Header
const props = defineProps({
  visible: Boolean,
  user: Object,
  role: String
})

// Événements émis vers le Header
const emit = defineEmits(['close', 'go-profile'])

// Méthodes d'authentification depuis useAuth
const { login, signup, loginWithGoogle, updateProfile, logout } = useAuth()

// États internes du formulaire
const isLoginMode = ref(true)
const email = ref('')
const confirmEmail = ref('')
const password = ref('')
const confirmPassword = ref('')
const firstName = ref('')
const lastName = ref('')
const phone = ref('')
let avatar = null
const errorMessage = ref('')
const greeting = ref('')
const isGoogleLoading = ref(false)

// Rôle prédéfini
const selectedRole = ref('')
const availableRoles = [
  'Staff',
  'Contributeur',
  'Musicien',
  'Simple Membre',
  'Membre Alto',
  'Membre Soprano',
  'Membre Tenor',
  'Membre Basse',
  'Mezzosoprano',
  'Contralto',
  'Baryton'
]

const boxRef = ref(null)

// Message d'accueil selon l'heure
const updateGreeting = () => {
  const hour = new Date().getHours()
  greeting.value =
    hour < 12
      ? "Bienvenue dans la lumière du matin"
      : hour < 18
      ? "Bienvenue dans la chaleur du jour"
      : "Reposez-vous dans la paix du soir"
}

// Réinitialisation du formulaire
const resetForm = () => {
  email.value = ''
  confirmEmail.value = ''
  password.value = ''
  confirmPassword.value = ''
  firstName.value = ''
  lastName.value = ''
  phone.value = ''
  selectedRole.value = ''
  avatar = null
  errorMessage.value = ''
  isLoginMode.value = true
}

// Fermeture de la boîte
const closeBox = () => {
  resetForm()
  emit('close')
}

// Changement de mode connexion/inscription
const switchMode = () => {
  isLoginMode.value = !isLoginMode.value
  errorMessage.value = ''
}

// Soumission du formulaire
const handleSubmit = async () => {
  errorMessage.value = ''
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
      if (!selectedRole.value) {
        errorMessage.value = "Veuillez choisir un rôle"
        return
      }

      const userCredential = await signup(email.value, password.value)

      await updateProfile(userCredential.user, {
        displayName: `${firstName.value} ${lastName.value}`,
        phoneNumber: phone.value,
        photoURL: avatar ? URL.createObjectURL(avatar) : null
      })

      await setDoc(doc(db, 'users', userCredential.user.uid), {
        role: selectedRole.value,
        email: userCredential.user.email
      })
    }
    closeBox()
  } catch (err) {
    errorMessage.value = err.message || "Une erreur est survenue"
  }
}

// Connexion Google
const handleGoogleLogin = async () => {
  isGoogleLoading.value = true
  try {
    await loginWithGoogle()
    closeBox()
  } catch (err) {
    errorMessage.value = err.message || "Échec de la connexion Google"
  } finally {
    isGoogleLoading.value = false
  }
}

// Déconnexion
const logoutUser = async () => {
  await logout()
  closeBox()
}

// Fermeture sur clic extérieur (sauf sur l'avatar)
const handleClickOutside = (event) => {
  if (
    props.visible &&
    boxRef.value &&
    !boxRef.value.contains(event.target) &&
    !event.target.closest('.avatar-wrapper')
  ) {
    closeBox()
  }
}

// Montage / démontage
onMounted(() => {
  updateGreeting()
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('touchstart', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('touchstart', handleClickOutside)
})
</script>
<style scoped>
.floating-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.floating-box {
  position: relative;
  width: 340px;
  max-width: 92vw;
  background-color: #111;
  border: 1px solid #FFD700;
  border-radius: 10px;
  padding: 2rem 1.5rem;
  box-shadow: 0 8px 20px rgba(255, 215, 0, 0.3);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  margin-top: 0.5rem;
  width: 100%;
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

.box-input {
  width: 100%;
  max-width: 280px;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  border: 1px solid #FFD700;
  background-color: #222;
  color: #FFD700;
  font-size: 0.95rem;
  outline: none;
  transition: box-shadow 0.2s ease, border-color 0.2s ease;
}

.box-input::placeholder {
  color: #888;
}

.box-input:focus {
  border-color: #FFA500;
  box-shadow: 0 0 0 3px rgba(255, 165, 0, 0.15);
}

.box-button {
  display: block;
  width: 100%;
  max-width: 280px;
  margin: 0.4rem auto;
  padding: 0.6rem 1.2rem;
  background-color: #FFD700;
  color: #000;
  border-radius: 6px;
  font-weight: bold;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.06s ease;
}

.box-button:hover {
  background-color: #FFA500;
}

.box-button:active {
  transform: translateY(1px);
}

.google-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  max-width: 280px;
  margin-top: 0.6rem;
  padding: 0.6rem 1rem;
  background-color: #fff;
  color: #000;
  border-radius: 6px;
  font-weight: bold;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.06s ease;
}

.google-button:hover {
  background-color: #eee;
}

.google-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.google-icon {
  width: 20px;
  height: 20px;
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
  padding: 0.25rem;
  line-height: 1;
  transition: transform 0.1s ease, color 0.2s ease;
}

.close-btn:hover {
  color: #FFA500;
}

.close-btn:active {
  transform: scale(0.96);
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.28s ease, transform 0.28s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

@media (max-width: 480px) {
  .floating-box {
    padding: 1.1rem;
  }
  .box-title {
    font-size: 1.25rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .fade-slide-enter-active,
  .fade-slide-leave-active {
    transition: none;
  }
}
</style>