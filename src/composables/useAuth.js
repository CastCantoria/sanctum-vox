import { ref, computed } from 'vue'
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

const user = ref(null)
const role = ref(null)
const isAdmin = computed(() => role.value === 'admin')

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
  const { useRouter } = await import('vue-router')
  const router = useRouter()

  const result = await signInWithEmailAndPassword(auth, email, password)
  user.value = result.user

  const docSnap = await getDoc(doc(db, 'users', result.user.uid))
  role.value = docSnap.exists() ? docSnap.data().role : null

  router.push(role.value === 'admin' ? '/admin/dashboard' : '/')
}

// Inscription avec email/mot de passe
const signup = async (email, password) => {
  const { useRouter } = await import('vue-router')
  const router = useRouter()

  const result = await createUserWithEmailAndPassword(auth, email, password)
  user.value = result.user
  role.value = 'membre'

  await setDoc(doc(db, 'users', result.user.uid), {
    role: 'membre',
    email: result.user.email
  })

  router.push('/')
  return result
}

// Connexion avec Google
const loginWithGoogle = async () => {
  const { useRouter } = await import('vue-router')
  const router = useRouter()

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
    role.value = 'membre'
  } else {
    role.value = docSnap.data().role
  }

  router.push(role.value === 'admin' ? '/admin/dashboard' : '/')
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
  const { useRouter } = await import('vue-router')
  const router = useRouter()

  await signOut(auth)
  user.value = null
  role.value = null
  router.push('/')
  console.log('Déconnexion réussie')
}

// Export du composable
export function useAuth() {
  return {
    user,
    role,
    isAdmin,
    login,
    signup,
    loginWithGoogle,
    updateProfile,
    changePassword,
    logout
  }
}