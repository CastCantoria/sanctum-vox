// 📁 src/composables/useAuthPopup.js
import { ref, watch } from 'vue'
import { useAuth } from '@/composables/useAuth'

const isAuthPopupVisible = ref(false)
const authMode = ref('login')

export function useAuthPopup() {
  const { user } = useAuth()

  const openAuth = (mode = 'login') => {
    authMode.value = mode
    isAuthPopupVisible.value = true
  }

  const closeAuth = () => {
    isAuthPopupVisible.value = false
  }

  const autoCloseOnLogin = () => {
    watch(user, (u) => {
      if (u) closeAuth()
    })
  }

  return {
    isAuthPopupVisible,
    authMode,
    openAuth,
    closeAuth,
    autoCloseOnLogin
  }
}