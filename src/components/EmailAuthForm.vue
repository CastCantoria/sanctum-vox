<template>
  <div>
    <h2 class="greeting">{{ greeting }}</h2>
    <h3 class="title">{{ authMode === 'login' ? 'Connexion' : 'S’inscrire' }}</h3>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <template v-if="authMode === 'signup'">
        <input v-model="firstName" type="text" placeholder="Prénom" required />
        <input v-model="lastName" type="text" placeholder="Nom" required />
        <select v-model="selectedRole" required>
          <option disabled value="">Choisir un rôle</option>
          <option v-for="role in availableRoles" :key="role" :value="role">{{ role }}</option>
        </select>
        <input v-model="phone" type="tel" placeholder="Téléphone" />
        <input v-model="email" type="email" placeholder="Adresse email" required />
        <input v-model="confirmEmail" type="email" placeholder="Confirmer l'email" required />

        <!-- Mot de passe avec œil -->
        <div class="relative">
          <input :type="showPassword ? 'text' : 'password'" v-model="password" placeholder="Mot de passe" required />
          <button type="button" @click="showPassword = !showPassword" class="absolute right-3 top-2 text-gray-500">
            <span v-if="showPassword">🙈</span>
            <span v-else>👁️</span>
          </button>
        </div>

        <input :type="showPassword ? 'text' : 'password'" v-model="confirmPassword" placeholder="Confirmer le mot de passe" required />
        <input type="file" @change="handleFileChange" />
      </template>

      <template v-else>
        <input v-model="email" type="email" placeholder="Email" required />

        <!-- Mot de passe avec œil -->
        <div class="relative">
          <input :type="showPassword ? 'text' : 'password'" v-model="password" placeholder="Mot de passe" required />
          <button type="button" @click="showPassword = !showPassword" class="absolute right-3 top-2 text-gray-500">
            <span v-if="showPassword">🙈</span>
            <span v-else>👁️</span>
          </button>
        </div>

        <!-- Lien mot de passe oublié -->
        <div class="text-right">
          <a href="/mot-de-passe-oublie" class="text-sm text-indigo-600 hover:underline">
            Mot de passe oublié ?
          </a>
        </div>
      </template>

      <button class="submit-btn" :disabled="isLoading">
        {{ isLoading ? '...' : authMode === 'login' ? 'Se connecter' : 'S’inscrire' }}
      </button>

      <GoogleLoginButton />

      <p v-if="errorMessage" class="error-message text-red-600">{{ errorMessage }}</p>
    </form>

    <p class="switch-mode mt-4 text-center">
      <span>{{ authMode === 'login' ? 'Pas encore inscrit ?' : 'Déjà membre ?' }}</span>
      <a @click="authMode = authMode === 'login' ? 'signup' : 'login'" class="text-indigo-600 hover:underline ml-1">
        {{ authMode === 'login' ? 'Créer un compte' : 'Se connecter' }}
      </a>
    </p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuthPopup } from '@/composables/useAuthPopup'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { getFirestore, doc, setDoc } from 'firebase/firestore'
import { uploadFileAndGetURL } from '@/composables/useStorage'
import GoogleLoginButton from '@/components/GoogleLoginButton.vue'

const { authMode, closeAuth } = useAuthPopup()
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
const showPassword = ref(false)

const availableRoles = [
  'Staff', 'Contributeur', 'Musicien', 'Simple Membre',
  'Membre Alto', 'Membre Soprano', 'Membre Tenor',
  'Membre Basse', 'Mezzosoprano', 'Contralto', 'Baryton'
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

<style scoped>
/* Tu peux réutiliser les styles de FloatingAuthBox.vue ici */
</style>