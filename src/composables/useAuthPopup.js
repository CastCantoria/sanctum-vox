// 📁 src/composables/useAuthPopup.js
import { ref } from 'vue'
import { useAutoCloseOnLogin } from './useAutoCloseOnLogin'

const isAuthPopupVisible = ref(false)
const authMode = ref('login')

export function useAuthPopup() {
  const openAuth = (mode = 'login') => {
    authMode.value = mode
    isAuthPopupVisible.value = true
  }

  const closeAuth = () => {
    isAuthPopupVisible.value = false
  }

  // ⏳ Fermeture automatique après connexion
  useAutoCloseOnLogin(closeAuth)

  return {
    isAuthPopupVisible,
    authMode,
    openAuth,
    closeAuth
  }
}