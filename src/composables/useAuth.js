import { ref } from 'vue'
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile as firebaseUpdateProfile,
  updatePassword,
  signOut
} from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { auth, db } from '../firebase'

// États réactifs globaux
const user = ref(null)
const role = ref(null)

// Écoute des changements d'état d'authentification
onAuthStateChanged(auth, async (u) => {
  user.value = u
  if (u) {
    const docSnap = await getDoc(doc(db, 'users', u.uid))
    role.value = docSnap.exists() ? docSnap.data().role : null
  } else {
    role.value = null
  }
})

// Connexion avec email/mot de passe
const login = async (email, password) => {
  const result = await signInWithEmailAndPassword(auth, email, password)
  user.value = result.user
}

// Inscription avec email/mot de passe
const signup = async (email, password) => {
  const result = await createUserWithEmailAndPassword(auth, email, password)
  user.value = result.user
  await setDoc(doc(db, 'users', result.user.uid), {
    role: 'membre',
    email: result.user.email
  })
  return result
}

// Connexion avec Google
const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider()
  const result = await signInWithPopup(auth, provider)
  user.value = result.user

  const userDoc = doc(db, 'users', result.user.uid)
  const docSnap = await getDoc(userDoc)
  if (!docSnap.exists()) {
    await setDoc(userDoc, {
      role: 'membre',
      email: result.user.email
    })
  }
}

// Mise à jour du profil utilisateur
const updateProfile = async (u, data) => {
  await firebaseUpdateProfile(u, {
    displayName: data.displayName || '',
    photoURL: data.photoURL || null
  })
  await setDoc(
    doc(db, 'users', u.uid),
    {
      role: role.value || 'membre',
      email: u.email,
      phone: data.phoneNumber || '',
      displayName: data.displayName || '',
      photoURL: data.photoURL || null
    },
    { merge: true }
  )
}

// Changement de mot de passe
const changePassword = async (newPassword) => {
  if (!auth.currentUser) throw new Error('Utilisateur non connecté.')
  await updatePassword(auth.currentUser, newPassword)
}

// Déconnexion
const logout = async () => {
  await signOut(auth)
  user.value = null
  role.value = null
  console.log('Déconnexion réussie')
}

// Export du composable
export function useAuth() {
  return {
    user,
    role,
    login,
    signup,
    loginWithGoogle,
    updateProfile,
    changePassword,
    logout
  }
}