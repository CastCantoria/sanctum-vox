<script setup>
import { ref, onMounted } from "vue"
import { getStorage, ref as storageRef, listAll, getDownloadURL, deleteObject } from "firebase/storage"
import { useAuth } from "../composables/useAuth"

const { user } = useAuth()
const storage = getStorage()

const fichiersImages = ref([])
const fichiersVideos = ref([])
const fichiersAudios = ref([])

const chargerFichiers = async (type, targetRef, targetList) => {
  const dossier = storageRef(storage, type)
  const result = await listAll(dossier)

  targetList.value = await Promise.all(
    result.items.map(async (item) => {
      const url = await getDownloadURL(item)
      return { name: item.name, url, ref: item }
    })
  )
}

const supprimerFichier = async (file, targetList) => {
  try {
    await deleteObject(file.ref)
    targetList.value = targetList.value.filter(f => f.name !== file.name)
    alert("Fichier supprimé.")
  } catch (error) {
    alert("Erreur : " + error.message)
  }
}

onMounted(() => {
  if (user.value?.email === "ton@email.admin") {
    chargerFichiers("images", storageRef(storage, "images"), fichiersImages)
    chargerFichiers("videos", storageRef(storage, "videos"), fichiersVideos)
    chargerFichiers("audios", storageRef(storage, "audios"), fichiersAudios)
  } else {
    alert("Accès réservé à l’administrateur.")
  }
})
</script>

<template>
  <div class="admin-dashboard">
    <h1>Tableau de bord Admin</h1>

    <!-- Images -->
    <section>
      <h2>Images</h2>
      <div v-if="fichiersImages.length === 0">Aucune image trouvée.</div>
      <div class="fichier-grid">
        <div v-for="file in fichiersImages" :key="file.name" class="fichier-card">
          <img :src="file.url" alt="Image" />
          <p>{{ file.name }}</p>
          <button @click="supprimerFichier(file, fichiersImages)">🗑️ Supprimer</button>
        </div>
      </div>
    </section>

    <!-- Vidéos -->
    <section>
      <h2>Vidéos</h2>
      <div v-if="fichiersVideos.length === 0">Aucune vidéo trouvée.</div>
      <div class="fichier-grid">
        <div v-for="file in fichiersVideos" :key="file.name" class="fichier-card">
          <video controls :src="file.url"></video>
          <p>{{ file.name }}</p>
          <button @click="supprimerFichier(file, fichiersVideos)">🗑️ Supprimer</button>
        </div>
      </div>
    </section>

    <!-- Audios -->
    <section>
      <h2>Audios</h2>
      <div v-if="fichiersAudios.length === 0">Aucun audio trouvé.</div>
      <div class="fichier-grid">
        <div v-for="file in fichiersAudios" :key="file.name" class="fichier-card">
          <audio controls :src="file.url"></audio>
          <p>{{ file.name }}</p>
          <button @click="supprimerFichier(file, fichiersAudios)">🗑️ Supprimer</button>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.admin-dashboard {
  padding: 2rem;
  background-color: #000;
  color: #FFD700;
}
.fichier-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}
.fichier-card {
  background: #111;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
}
.fichier-card img,
.fichier-card video {
  max-width: 100%;
  border-radius: 6px;
}
.fichier-card audio {
  width: 100%;
}
button {
  margin-top: 0.5rem;
  background: none;
  border: 1px solid #FFD700;
  color: #FFD700;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background: #FFD700;
  color: #000;
}
</style>