<template>
  <transition name="fade-slide">
    <div v-if="visible" class="welcome-wrapper">
      <div class="welcome-box">
        <span class="icon">🌟</span>
        <h1 class="title">Bienvenue {{ firstName }} !</h1>
        <p class="subtitle">Tu es inscrit en tant que {{ role }}. Tu peux modifier ton profil à tout moment.</p>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getFirestore, doc, getDoc } from 'firebase/firestore'

const auth = getAuth()
const db = getFirestore()

const visible = ref(false)
const firstName = ref('')
const role = ref('')

const showMessage = (name, userRole) => {
  firstName.value = name
  role.value = userRole
  visible.value = true
  setTimeout(() => {
    visible.value = false
  }, 6000)
}

onMounted(() => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const userDoc = await getDoc(doc(db, 'users', user.uid))
      const data = userDoc.data()
      const name = data?.firstName || user.displayName?.split(' ')[0] || 'ami'
      const userRole = data?.role || 'Membre'
      showMessage(name, userRole)
    }
  })
})
</script>

<style scoped>
.welcome-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(255, 248, 225, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.welcome-box {
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(200, 169, 81, 0.2);
  text-align: center;
  max-width: 480px;
  width: 90%;
  animation: fadeOut 6s ease forwards;
}

.icon {
  font-size: 1.8rem;
  color: #c8a951;
  display: block;
  margin-bottom: 0.5rem;
}

.title {
  font-size: 1.6rem;
  font-weight: 600;
  color: #b08c3f;
  margin-bottom: 0.4rem;
}

.subtitle {
  font-size: 1rem;
  color: #3a3a3a;
  font-style: italic;
}

/* Animation douce */
@keyframes fadeOut {
  0% { opacity: 1; }
  80% { opacity: 1; }
  100% { opacity: 0; display: none; }
}

.fade-slide-enter-active, .fade-slide-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}
.fade-slide-enter-from, .fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>