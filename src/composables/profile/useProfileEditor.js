// 📁 src/composables/useProfileEditor.js
import { ref } from 'vue'
import { getAuth, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth'
import { updateProfile as firebaseUpdateProfile, updatePassword } from 'firebase/auth'
import { setDoc, doc } from 'firebase/firestore'
import { db } from '@/firebase'
import { useAuthStore } from '@/stores/authStore'
import { useToaster } from '@/composables/ui/useToaster'

export function useProfileEditor() {
  const store = useAuthStore()
  const { success, error } = useToaster()

  const saveProfile = async ({ firstName, lastName, phone, role, avatar }) => {
    try {
      const auth = getAuth()
      const currentUser = auth.currentUser
      if (!currentUser) throw new Error('Utilisateur non connecté')

      const displayName = `${firstName} ${lastName}`
      const photoURL = avatar ? URL.createObjectURL(avatar) : currentUser.photoURL

      await firebaseUpdateProfile(currentUser, { displayName, photoURL })
      await currentUser.reload()
      const refreshedUser = auth.currentUser

      await setDoc(doc(db, 'users', refreshedUser.uid), {
        role,
        phone,
        displayName,
        photoURL
      }, { merge: true })

      store.setUser({
        uid: refreshedUser.uid,
        email: refreshedUser.email,
        displayName: refreshedUser.displayName,
        photoURL: refreshedUser.photoURL,
        isAdmin: store.role?.value === 'admin'
      })

      store.setToken(await refreshedUser.getIdToken())
      success('✅ Profil mis à jour avec succès.')
    } catch (err) {
      error('⛔ Erreur de mise à jour du profil : ' + err.message)
      throw err
    }
  }

  const updateUserPassword = async ({ oldPassword, newPassword, confirmPassword }) => {
    try {
      const auth = getAuth()
      const currentUser = auth.currentUser
      if (!currentUser) throw new Error('Utilisateur non connecté')

      if (!oldPassword || !newPassword || !confirmPassword) {
        throw new Error('Tous les champs de mot de passe doivent être remplis.')
      }

      if (newPassword !== confirmPassword) {
        throw new Error('Le nouveau mot de passe et sa confirmation ne correspondent pas.')
      }

      const credential = EmailAuthProvider.credential(currentUser.email, oldPassword)
      await reauthenticateWithCredential(currentUser, credential)
      await updatePassword(currentUser, newPassword)

      success('🔐 Mot de passe mis à jour avec succès.')
    } catch (err) {
      error('⛔ Erreur de mot de passe : ' + err.message)
      throw err
    }
  }

  return {
    saveProfile,
    updateUserPassword
  }
}