import { ref } from 'vue'
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, updateProfile as firebaseUpdateProfile } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { auth, db } from '../firebase'

const user = ref(null)
const role = ref(null)

onAuthStateChanged(auth, async (u) => {
  user.value = u
  if (u) {
    const docSnap = await getDoc(doc(db, "users", u.uid))
    role.value = docSnap.exists() ? docSnap.data().role : null
  } else {
    role.value = null
  }
})

const login = async (email, password) => {
  const result = await signInWithEmailAndPassword(auth, email, password)
  user.value = result.user
}

const signup = async (email, password) => {
  const result = await createUserWithEmailAndPassword(auth, email, password)
  user.value = result.user
  await setDoc(doc(db, "users", result.user.uid), {
    role: "membre",
    email: result.user.email
  })
  return result
}

const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider()
  const result = await signInWithPopup(auth, provider)
  user.value = result.user

  const userDoc = doc(db, "users", result.user.uid)
  const docSnap = await getDoc(userDoc)
  if (!docSnap.exists()) {
    await setDoc(userDoc, {
      role: "membre",
      email: result.user.email
    })
  }
}

const updateProfile = async (u, data) => {
  await firebaseUpdateProfile(u, {
    displayName: data.displayName || "",
    photoURL: data.photoURL || null
  })
  await setDoc(doc(db, "users", u.uid), {
    role: role.value || "membre",
    email: u.email,
    phone: data.phoneNumber || "",
    displayName: data.displayName || "",
    photoURL: data.photoURL || null
  }, { merge: true })
}

export function useAuth() {
  return {
    user,
    role,
    login,
    signup,
    loginWithGoogle,
    updateProfile
  }
}