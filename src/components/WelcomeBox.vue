<template>
  <transition name="fade-scale">
    <div v-if="visible" class="welcome-box">
      <div class="box-content">
        <h2 class="text-2xl font-bold mb-2">Bienvenue {{ firstName }} 👋</h2>
        <p class="text-sm mb-4">
          Tu es inscrit en tant que <strong>{{ role }}</strong>. Tu peux modifier ton profil à tout moment.
        </p>
        <button @click="visible = false" class="btn-close">Continuer</button>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref } from 'vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getFirestore, doc, getDoc } from 'firebase/firestore'

const auth = getAuth()
const db = getFirestore()

const visible = ref(false)
const firstName = ref('ami')
const role = ref('Membre')

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const userDoc = await getDoc(doc(db, 'users', user.uid))
    const data = userDoc.data()
    firstName.value = data?.firstName || user.displayName?.split(' ')[0] || 'ami'
    role.value = data?.role || 'Membre'
    visible.value = true
  }
})
</script>

<style scoped>
.welcome-box {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.box-content {
  background-color: #FFD700;
  color: #000;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  max-width: 90%;
  width: 360px;
  box-shadow: 0 0 20px rgba(255, 215, 0, 0.3);
}

.btn-close {
  margin-top: 1rem;
  background: #000;
  color: #FFD700;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s ease;
}
.btn-close:hover {
  background: #FFD700;
  color: #000;
}

.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}
.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>