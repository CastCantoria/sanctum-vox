import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import { useToaster } from '@/composables/useToaster'

export function useUserProfile() {
  const { success, error } = useToaster()

  // 📥 Récupérer le profil utilisateur
  const fetchUserProfile = async (uid) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid))
      return userDoc.exists() ? userDoc.data() : null
    } catch (err) {
      error('⛔ Impossible de récupérer le profil')
      console.error(err)
      return null
    }
  }

  // 📝 Créer un profil par défaut
  const createDefaultProfile = async (uid, email) => {
    try {
      await setDoc(doc(db, 'users', uid), {
        role: 'member',
        email
      })
      success('Profil initial créé ✅')
    } catch (err) {
      error('⛔ Échec de création du profil')
      console.error(err)
    }
  }

  // 🔄 Mettre à jour le profil
  const updateUserProfile = async (uid, data) => {
    try {
      await setDoc(doc(db, 'users', uid), {
        ...data
      }, { merge: true })
      success('Profil mis à jour ✨')
    } catch (err) {
      error('⛔ Échec de mise à jour du profil')
      console.error(err)
    }
  }

  return {
    fetchUserProfile,
    createDefaultProfile,
    updateUserProfile
  }
}