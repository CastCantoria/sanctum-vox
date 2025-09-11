import { useAuthStore } from '@/stores/authStore.js'
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile as firebaseUpdateProfile,
  updatePassword
} from 'firebase/auth'
import { auth } from '@/firebase'
import { useToaster } from '@/composables/useToaster'
import { useUserProfile } from '@/composables/useUserProfile'

export function useAuth() {
  const authStore = useAuthStore()
  const { success, error } = useToaster()
  const {
    fetchUserProfile,
    createDefaultProfile,
    updateUserProfile
  } = useUserProfile()

  const login = async (email, password, router) => {
    try {
      await authStore.login(email, password)
      const isAdmin = authStore.role?.value === 'admin'
      router.push(isAdmin ? '/admin/dashboard' : '/profile')
    } catch (err) {
      error('⛔ Erreur de connexion : ' + err.message)
      throw err
    }
  }

  const signup = async (email, password, router) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password)
      const user = result.user

      await createDefaultProfile(user.uid, user.email)

      authStore.setUser({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        isAdmin: false
      })

      const token = await user.getIdToken()
      authStore.setToken(token)

      success('Inscription réussie 🎉')
      router.push('/profile')
    } catch (err) {
      error('⛔ Erreur d’inscription : ' + err.message)
      throw err
    }
  }

  const loginWithGoogle = async (router) => {
    try {
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      const user = result.user

      let profile = await fetchUserProfile(user.uid)
      if (!profile) {
        await createDefaultProfile(user.uid, user.email)
        profile = { role: 'member' }
      }

      const isAdminFlag = profile.role === 'admin'

      authStore.setUser({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        isAdmin: isAdminFlag
      })

      const token = await user.getIdToken()
      authStore.setToken(token)

      router.push(isAdminFlag ? '/admin/dashboard' : '/profile')
    } catch (err) {
      error('⛔ Erreur Google : ' + err.message)
      throw err
    }
  }

  const updateProfile = async (user, data) => {
    try {
      await firebaseUpdateProfile(user, {
        displayName: data.displayName || '',
        photoURL: data.photoURL || null
      })

      await updateUserProfile(user.uid, {
        role: authStore.role?.value || 'member',
        email: user.email,
        phone: data.phoneNumber || '',
        displayName: data.displayName || '',
        photoURL: data.photoURL || null
      })
    } catch (err) {
      error('⛔ Échec de mise à jour du profil')
      throw err
    }
  }

  const changePassword = async (newPassword) => {
    if (!auth.currentUser) throw new Error('Utilisateur non connecté.')
    await updatePassword(auth.currentUser, newPassword)
    success('Mot de passe mis à jour 🔐')
  }

  return {
    user: authStore.user,
    role: authStore.role,
    login,
    signup,
    loginWithGoogle,
    updateProfile,
    changePassword
  }
}