// 📁 src/composables/useAutoCloseOnLogin.js
import { watch } from 'vue'
import { useAuthStore } from '@/stores/authStore'

export function useAutoCloseOnLogin(closeFn) {
  const authStore = useAuthStore()

  if (!authStore || !authStore.user) return

  watch(() => authStore.user.value, (u) => {
    if (u) closeFn()
  })
}