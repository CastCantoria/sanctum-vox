import { ref } from 'vue'
import { useAutoCloseOnLogin } from '@/composables/auth/useAutoCloseOnLogin' // ✅ chemin corrigé

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

  useAutoCloseOnLogin(closeAuth)

  return {
    isAuthPopupVisible,
    authMode,
    openAuth,
    closeAuth
  }
}