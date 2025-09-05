import { ref, onMounted } from 'vue'
import { auth, db } from '@/firebase.js'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'

const user = ref(null)
const profile = ref(null)
const loading = ref(true)

export function useUser() {
  onMounted(() => {
    onAuthStateChanged(auth, async (firebaseUser) => {
      user.value = firebaseUser
      if (firebaseUser) {
        const docRef = doc(db, 'users', firebaseUser.uid)
        const docSnap = await getDoc(docRef)
        profile.value = docSnap.exists() ? docSnap.data() : null
      } else {
        profile.value = null
      }
      loading.value = false
    })
  })

  return { user, profile, loading }
}