import { ref } from 'vue'
import { storage } from '@/firebase.js'
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'

export function useAvatar() {
  const uploading = ref(false)
  const avatarURL = ref(null)
  const error = ref(null)

  const uploadAvatar = async (file, uid) => {
    uploading.value = true
    error.value = null

    try {
      const fileRef = storageRef(storage, `avatars/${uid}`)
      await uploadBytes(fileRef, file)
      avatarURL.value = await getDownloadURL(fileRef)
    } catch (err) {
      error.value = err.message
    } finally {
      uploading.value = false
    }
  }

  return { uploadAvatar, avatarURL, uploading, error }
}