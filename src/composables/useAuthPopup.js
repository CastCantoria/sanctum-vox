// src/composables/useAuthPopup.js
import { ref } from 'vue'

const isAuthPopupVisible = ref(false)
const authMode = ref('login') // 'login' ou 'signup'

export function useAuthPopup() {
  const openAuth = (mode = 'login') => {
    authMode.value = mode
    isAuthPopupVisible.value = true
  }

  const closeAuth = () => {
    isAuthPopupVisible.value = false
  }

  return {
    isAuthPopupVisible,
    authMode,
    openAuth,
    closeAuth
  }
}