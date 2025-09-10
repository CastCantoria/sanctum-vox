import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useFirebase } from '@/composables/useFirebase.js'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(null)
  const role = ref(null)
  const loading = ref(false)

  const isAdmin = computed(() => role.value === 'admin' || user.value?.isAdmin === true)
  const isLoggedIn = computed(() => !!user.value)

  function setUser(u) {
    user.value = u
    role.value = u?.isAdmin ? 'admin' : 'member'
  }

  function setToken(t) {
    token.value = t
  }

  async function login(email, password) {
    const { login, getToken } = useFirebase()
    loading.value = true
    try {
      const userData = await login(email, password)
      const authToken = await getToken()
      setUser(userData)
      setToken(authToken)
    } catch (err) {
      throw new Error('Erreur de connexion : ' + err.message)
    } finally {
      loading.value = false
    }
  }

  async function logout() {
    const { logout } = useFirebase()
    await logout()
    user.value = null
    token.value = null
    role.value = null
  }

  async function fetchSession() {
    const { getUserData, getToken } = useFirebase()
    loading.value = true
    try {
      const userData = await getUserData()
      const authToken = await getToken()
      setUser(userData)
      setToken(authToken)
    } catch (err) {
      console.warn('Session non récupérée')
    } finally {
      loading.value = false
    }
  }

  return {
    user,
    token,
    role,
    loading,
    isAdmin,
    isLoggedIn,
    login,
    logout,
    fetchSession,
    setUser,
    setToken
  }
})