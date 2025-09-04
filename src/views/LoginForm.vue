<template>
  <div class="auth-form">
    <h2>Connexion</h2>
    <input v-model="email" type="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Mot de passe" />
    <button @click="login">Se connecter</button>
    <p class="forgot" @click="resetPassword">Mot de passe oublié ?</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../firebase'

const email = ref('')
const password = ref('')
const router = useRouter()

const login = async () => {
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value)
    router.push('/home')
  } catch (error) {
    alert("Erreur : " + error.message)
  }
}

const resetPassword = async () => {
  if (!email.value) return alert("Entrez votre email d'abord.")
  try {
    await sendPasswordResetEmail(auth, email.value)
    alert("Email de réinitialisation envoyé.")
  } catch (error) {
    alert("Erreur : " + error.message)
  }
}
</script>

<style scoped>
.auth-form {
  max-width: 400px;
  margin: auto;
  padding: 2rem;
  text-align: center;
}
input {
  display: block;
  width: 100%;
  margin: 1rem 0;
  padding: 0.8rem;
  border-radius: 6px;
  border: 1px solid #ccc;
}
button {
  padding: 0.8rem 1.2rem;
  border: none;
  background-color: #444;
  color: white;
  border-radius: 6px;
  cursor: pointer;
}
button:hover {
  background-color: #666;
}
.forgot {
  margin-top: 1rem;
  color: #555;
  cursor: pointer;
  font-size: 0.9rem;
}
</style>