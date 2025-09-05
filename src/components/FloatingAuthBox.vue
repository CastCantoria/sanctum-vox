<script setup>
import { ref } from 'vue'
import { auth, db } from '../firebase'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile
} from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { useAuthPopup } from '../composables/useAuthPopup'

const { closeAuth, authMode } = useAuthPopup()

const email = ref('')
const password = ref('')
const firstName = ref('')
const lastName = ref('')
const phone = ref('')
const error = ref('')
const loading = ref(false)

const handleLogin = async () => {
  loading.value = true
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value)
    closeAuth()
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

const handleSignup = async () => {
  loading.value = true
  try {
    const userCred = await createUserWithEmailAndPassword(auth, email.value, password.value)
    await updateProfile(userCred.user, {
      displayName: `${firstName.value} ${lastName.value}`,
      phoneNumber: phone.value
    })
    await setDoc(doc(db, 'users', userCred.user.uid), {
      role: 'Membre',
      phone: phone.value
    }, { merge: true })
    closeAuth()
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}
</script>
<template>
  <div class="overlay" @click.self="closeAuth">
    <div class="auth-box">
      <h2>{{ authMode === 'signup' ? 'Inscription' : 'Connexion' }}</h2>

      <form @submit.prevent="authMode === 'signup' ? handleSignup() : handleLogin()">
        <div v-if="authMode === 'signup'" class="field-group">
          <input v-model="firstName" type="text" placeholder="Prénom" required />
          <input v-model="lastName" type="text" placeholder="Nom" required />
          <input v-model="phone" type="tel" placeholder="Téléphone" />
        </div>

        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Mot de passe" required />

        <button type="submit" :disabled="loading">
          {{ loading ? 'Chargement...' : (authMode === 'signup' ? 'Créer un compte' : 'Se connecter') }}
        </button>

        <p v-if="error" class="error">⚠️ {{ error }}</p>
      </form>

      <div class="switch-mode">
        <span v-if="authMode === 'signup'">
          Déjà membre ?
          <button @click="authMode = 'login'">Se connecter</button>
        </span>
        <span v-else>
          Pas encore inscrit ?
          <button @click="authMode = 'signup'">Créer un compte</button>
        </span>
      </div>

      <button class="close-btn" @click="closeAuth">✖</button>
    </div>
  </div>
</template>
<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(250, 245, 235, 0.85); /* voile crème doux */
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.auth-box {
  background: #fdfaf6; /* fond clair */
  border: 1px solid #e0d8c0;
  border-radius: 12px;
  padding: 2rem;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 8px 24px rgba(200, 169, 81, 0.2);
  position: relative;
  font-family: var(--font-body, 'Segoe UI', sans-serif);
}

.auth-box h2 {
  text-align: center;
  color: #c8a951;
  margin-bottom: 1.5rem;
  font-size: 1.6rem;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

input {
  padding: 0.6rem 0.8rem;
  border: 1px solid #dcd2b8;
  border-radius: 6px;
  background: #fff;
  font-size: 1rem;
  color: #3a3a3a;
}

button[type="submit"] {
  background-color: #c8a951;
  color: #fff;
  border: none;
  padding: 0.6rem 1rem;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease;
}

button[type="submit"]:hover {
  background-color: #b08c3e;
}

.error {
  color: #c0392b;
  font-size: 0.9rem;
  text-align: center;
}

.switch-mode {
  margin-top: 1rem;
  text-align: center;
  font-size: 0.9rem;
  color: #555;
}

.switch-mode button {
  background: none;
  border: none;
  color: #c8a951;
  font-weight: bold;
  cursor: pointer;
  margin-left: 0.3rem;
}

.close-btn {
  position: absolute;
  top: 0.8rem;
  right: 0.8rem;
  background: none;
  border: none;
  font-size: 1.2rem;
  color: #888;
  cursor: pointer;
}
</style>