import { ref } from 'vue'

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

  return {
    isAuthPopupVisible,
    authMode,
    openAuth,
    closeAuth
  }
}