// src/composables/useAdminPanel.js
import { ref } from "vue"
import { useFirebase } from "@/composables/useFirebase"
import { useToaster } from "@/composables/useToaster"

export function useAdminPanel() {
  const { db } = useFirebase()
  const { toastSuccess, toastError } = useToaster()

  const members = ref([])
  const media = ref([])
  const loading = ref(false)

  const fetchMembers = async () => {
    loading.value = true
    try {
      const snapshot = await db.collection("members").get()
      members.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      toastSuccess("Membres chargés")
    } catch (err) {
      toastError("Erreur lors du chargement des membres")
    } finally {
      loading.value = false
    }
  }

  const deleteMember = async (id) => {
    try {
      await db.collection("members").doc(id).delete()
      members.value = members.value.filter(m => m.id !== id)
      toastSuccess("Membre supprimé")
    } catch (err) {
      toastError("Échec de la suppression")
    }
  }

  const fetchMedia = async () => {
    try {
      const snapshot = await db.collection("media").get()
      media.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    } catch (err) {
      toastError("Erreur lors du chargement des médias")
    }
  }

  return {
    members,
    media,
    loading,
    fetchMembers,
    deleteMember,
    fetchMedia
  }
}