<template>
  <div class="auth-form">
    <h2>Inscription</h2>
    <input v-model="email" type="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Mot de passe" />
    <button @click="signup">S’inscrire</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../firebase'
import { setDoc, doc } from 'firebase/firestore'

const email = ref('')
const password = ref('')
const router = useRouter()

const signup = async () => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value)
    const user = userCredential.user

    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email: user.email,
      role: "member"
    })

    router.push('/home')
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
</style>