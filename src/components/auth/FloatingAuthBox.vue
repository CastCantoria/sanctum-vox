<template>
  <div v-if="isAuthPopupVisible" class="floating-overlay" @click.self="closeAuth">
    <transition name="fade-slide">
      <div class="auth-box" role="dialog" aria-modal="true">
        <button class="close-btn" @click="closeAuth" aria-label="Fermer la fenêtre">✕</button>

        <!-- Composant actif selon le mode -->
        <component :is="activeComponent" @close="closeAuth" />

        <!-- Lien d'inscription -->
        <div class="signup-prompt">
          Pas encore inscrit ?
          <button class="signup-link" @click="mode = 'email'">Créer un compte</button>
        </div>

        <!-- Boutons de mode -->
        <div class="mode-switch">
          <button :class="{ active: mode === 'email' }" @click="mode = 'email'">📧 Email</button>
          <button :class="{ active: mode === 'phone' }" @click="mode = 'phone'">📱 Téléphone</button>
          <button :class="{ active: mode === 'admin' }" @click="mode = 'admin'">👤 Ajout manuel</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useAuthPopup } from '@/composables/auth/useAuthPopup'
import { useAuthStore } from '@/stores/authStore.js'
import EmailAuthForm from './EmailAuthForm.vue'
import PhoneSignup from './PhoneSignup.vue'
import AddMemberModal from './admin/AddMemberModal.vue'

const { isAuthPopupVisible, closeAuth } = useAuthPopup()
const authStore = useAuthStore()
const mode = ref('email')

// 👁️ Fermeture automatique si l'utilisateur est connecté
watch(() => authStore.user, (u) => {
  if (u) closeAuth()
})

const activeComponent = computed(() => {
  switch (mode.value) {
    case 'phone':
      return PhoneSignup
    case 'admin':
      return AddMemberModal
    default:
      return EmailAuthForm
  }
})
</script>

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
  max-width: 500px;
  box-shadow: 0 8px 24px rgba(200, 169, 81, 0.3);
  position: relative;
  animation: breathe 0.6s ease;
  color: #3a3a3a;
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

.signup-prompt {
  text-align: center;
  margin-top: 1rem;
  font-size: 0.95rem;
  color: #555;
}

.signup-link {
  background: none;
  border: none;
  color: #c8a951;
  font-weight: bold;
  cursor: pointer;
  margin-left: 0.3rem;
  text-decoration: underline;
}

.signup-link:hover {
  color: #a88b3f;
}

.mode-switch {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
}

.mode-switch button {
  padding: 0.4rem 0.8rem;
  border: none;
  background: #eee;
  cursor: pointer;
  border-radius: 6px;
  font-size: 0.9rem;
}

.mode-switch button.active {
  background: #c8a951;
  color: #fff;
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

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>