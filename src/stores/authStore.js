import { ref } from 'vue'
import { defineStore } from 'pinia'
import { 
  getAuth, 
  onAuthStateChanged, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut 
} from 'firebase/auth'
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore'
import { useToaster } from '@/composables/ui/useToaster.js' // ✅ chemin corrigé

export const useAuthStore = defineStore('auth', () => {
  const auth = getAuth()
  const db = getFirestore()
  const { success, error } = useToaster()

  const user = ref(null)
  const token = ref(null)
  const loading = ref(true)

  const setUser = (userData) => { user.value = userData }
  const setToken = (tokenValue) => { token.value = tokenValue }

  // ✅ Nouvelle méthode pour restaurer la session
  const fetchSession = async () => {
    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
        if (currentUser) {
          const tokenValue = await currentUser.getIdToken()
          setUser({
            uid: currentUser.uid,
            email: currentUser.email,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL
          })
          setToken(tokenValue)
        } else {
          setUser(null)
          setToken(null)
        }
        loading.value = false
        unsubscribe()
        resolve(currentUser)
      })
    })
  }

  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      const credential = GoogleAuthProvider.credentialFromResult(result)
      const tokenValue = credential.accessToken
      const userData = result.user

      const userRef = doc(db, 'users', userData.uid)
      const userSnap = await getDoc(userRef)
      if (!userSnap.exists()) {
        await setDoc(userRef, {
          uid: userData.uid,
          email: userData.email,
          displayName: userData.displayName,
          photoURL: userData.photoURL,
          role: 'member'
        })
      }

      setUser({
        uid: userData.uid,
        email: userData.email,
        displayName: userData.displayName,
        photoURL: userData.photoURL
      })
      setToken(tokenValue)
      success('Connexion réussie')
    } catch (err) {
      console.error('Erreur de connexion Google :', err)
      error('Échec de la connexion')
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
      setUser(null)
      setToken(null)
      success('Déconnexion réussie')
    } catch (err) {
      console.error('Erreur de déconnexion :', err)
      error('Échec de la déconnexion')
    }
  }

  return {
    user,
    token,
    loading,
    setUser,
    setToken,
    fetchSession, // ✅ ajoutée ici
    loginWithGoogle,
    logout
  }
}, {
  persist: true
})