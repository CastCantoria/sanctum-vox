<script setup>
import { ref, computed } from 'vue'
import { useAuthPopup } from '@/composables/useAuthPopup'
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from 'firebase/auth'
import { getFirestore, doc, setDoc } from 'firebase/firestore'
import { uploadFileAndGetURL } from '@/composables/useStorage'
import GoogleLoginButton from '@/components/GoogleLoginButton.vue'

const { isAuthPopupVisible, authMode, closeAuth } = useAuthPopup()
const auth = getAuth()
const db = getFirestore()

const firstName = ref('')
const lastName = ref('')
const selectedRole = ref('')
const phone = ref('')
const email = ref('')
const confirmEmail = ref('')
const password = ref('')
const confirmPassword = ref('')
const avatarFile = ref(null)

const errorMessage = ref('')
const isLoading = ref(false)

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

const greeting = computed(() => {
  const hour = new Date().getHours()
  if (hour < 12) return 'Bienvenue dans la lumière du matin'
  if (hour < 18) return 'Bienvenue dans la clarté du jour'
  return 'Bienvenue dans la paix du soir'
})

const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

const handleFileChange = (e) => {
  avatarFile.value = e.target.files[0]
}

const handleSubmit = async () => {
  errorMessage.value = ''
  isLoading.value = true

  if (!isValidEmail(email.value)) {
    errorMessage.value = "Adresse email invalide."
    isLoading.value = false
    return
  }

  if (authMode.value === 'signup') {
    if (email.value !== confirmEmail.value) {
      errorMessage.value = "Les emails ne correspondent pas."
      isLoading.value = false
      return
    }

    if (password.value !== confirmPassword.value) {
      errorMessage.value = "Les mots de passe ne correspondent pas."
      isLoading.value = false
      return
    }
  }

  try {
    if (authMode.value === 'login') {
      await signInWithEmailAndPassword(auth, email.value, password.value)
    } else {
      const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value)
      const user = userCredential.user

      let avatarURL = ''
      if (avatarFile.value) {
        avatarURL = await uploadFileAndGetURL(avatarFile.value, `avatars/${user.uid}`)
      }

      await setDoc(doc(db, 'users', user.uid), {
        firstName: firstName.value,
        lastName: lastName.value,
        role: selectedRole.value,
        phone: phone.value,
        email: email.value,
        avatar: avatarURL,
        createdAt: new Date()
      }, { merge: true })
    }
    closeAuth()
  } catch (error) {
    errorMessage.value = error.message
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div v-if="isAuthPopupVisible" class="floating-overlay" @click.self="closeAuth">
    <transition name="fade-slide">
      <div class="auth-box">
        <button class="close-btn" @click="closeAuth">✕</button>

        <h2 class="greeting">{{ greeting }}</h2>
        <h3 class="title">
          {{ authMode === 'login' ? 'Connexion' : 'S’inscrire' }}
        </h3>

        <form @submit.prevent="handleSubmit">
          <template v-if="authMode === 'signup'">
            <input v-model="firstName" type="text" placeholder="Prénom" />
            <input v-model="lastName" type="text" placeholder="Nom" />
            <select v-model="selectedRole" required>
              <option disabled value="">Choisir un rôle</option>
              <option v-for="role in availableRoles" :key="role" :value="role">
                {{ role }}
              </option>
            </select>
            <input v-model="phone" type="tel" placeholder="Téléphone" />
            <input v-model="email" type="email" placeholder="Adresse email" />
            <input v-model="confirmEmail" type="email" placeholder="Confirmer l'email" />
            <input v-model="password" type="password" placeholder="Mot de passe" />
            <input v-model="confirmPassword" type="password" placeholder="Confirmer le mot de passe" />
            <input type="file" @change="handleFileChange" />
          </template>

          <template v-else>
            <input v-model="email" type="email" placeholder="Email" />
            <input v-model="password" type="password" placeholder="Mot de passe" />
          </template>

          <button class="submit-btn" :disabled="isLoading">
            {{ isLoading ? '...' : authMode === 'login' ? 'Se connecter' : 'S’inscrire' }}
          </button>

          <GoogleLoginButton />

          <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        </form>

        <p class="switch-mode">
          <span>{{ authMode === 'login' ? 'Pas encore inscrit ?' : 'Déjà membre ?' }}</span>
          <a @click="authMode = authMode === 'login' ? 'signup' : 'login'">
            {{ authMode === 'login' ? 'Créer un compte' : 'Se connecter' }}
          </a>
        </p>
      </div>
    </transition>
  </div>
</template>
<style scoped>
.floating-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(6px);
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.auth-box {
  background: #fdfaf6;
  padding: 2rem;
  border-radius: 12px;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 8px 24px rgba(200, 169, 81, 0.3);
  position: relative;
  animation: breathe 0.6s ease;
  color: #3a3a3a;
}

@keyframes breathe {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.close-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: #c8a951;
}

.greeting {
  text-align: center;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  color: #c8a951;
}

.title {
  text-align: center;
  font-size: 1.4rem;
  margin-bottom: 1rem;
  color: #3a3a3a;
}

form {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

input, select {
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
  background-color: #fff;
  color: #3a3a3a;
}

input[type="file"] {
  background-color: transparent;
  border: none;
  color: #c8a951;
}

.submit-btn {
  background-color: #c8a951;
  color: #fff;
  border: none;
  padding: 0.6rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s ease;
}

.submit-btn:hover {
  background-color: #b08c3f;
}

.error-message {
  color: #ff6b6b;
  font-size: 0.9rem;
  text-align: center;
}

.switch-mode {
  margin-top: 1rem;
  text-align: center;
  font-size: 0.9rem;
  color: #3a3a3a;
}

.switch-mode a {
  margin-left: 0.4rem;
  color: #c8a951;
  cursor: pointer;
  font-weight: bold;
  text-decoration: underline;
}

.fade-slide-enter-active, .fade-slide-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}
.fade-slide-enter-from, .fade-slide-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>