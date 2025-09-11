<script setup>
import { ref, onMounted } from "vue"
import Header from "@/components/header/Header.vue"
import Footer from "@/components/Footer.vue"
import { useAuth } from "@/composables/useAuth"
import { fetchGalleryImages } from "@/composables/useGallery"
import { uploadFileAndGetURL } from "@/composables/useStorage"

const { user, role } = useAuth()

const images = ref([])
const loadingImages = ref(true)

onMounted(async () => {
  const urls = await fetchGalleryImages()
  images.value = urls.map(url => ({
    src: url,
    caption: "Image de la galerie"
  }))
  loadingImages.value = false
})

const videos = [
  { src: "/assets/video/message-spirituel.mp4", caption: "La parole de Dieu est vivante et efficace." },
  { src: "/assets/video/presentation-cast.mp4", caption: "Allez, faites de toutes les nations des disciples." }
]

const audios = [
  { src: "/assets/audio/cantique-1.mp3", caption: "Chantez à Dieu, chantez à notre Roi." },
  { src: "/assets/audio/intro-cast.mp3", caption: "Entrez dans ses portes avec des chants de louange." },
  { src: "/assets/audio/hallelujah.mp3", caption: "Saint, saint, saint est l'Éternel des armées." }
]

const showAllImages = ref(false)
const showAllVideos = ref(false)
const showAllAudios = ref(false)

const limitImages = 6
const limitVideos = 1
const limitAudios = 1

const envoyerCommentaire = () => {
  alert("Commentaire envoyé (fonction à compléter)")
}

const uploadGalleryImage = async (event) => {
  const file = event.target.files[0]
  if (!file || !user.value) return

  const path = `galerie/${Date.now()}-${file.name}`
  try {
    const url = await uploadFileAndGetURL(file, path)
    images.value.unshift({
      src: url,
      caption: "Ajouté par " + (user.value.email || "un membre")
    })
    alert("Image envoyée avec succès.")
  } catch (error) {
    alert("Erreur lors de l’envoi : " + error.message)
  }
}
</script>

<template>
  <div class="page">
    <Header />

    <section class="gallery-section">
      <h1 class="text-gold text-3xl mb-6">Galerie multimédia</h1>

      <div v-if="loadingImages">Chargement des images...</div>
      <div v-else class="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        <div v-for="(img, index) in showAllImages ? images : images.slice(0, limitImages)" :key="index">
          <img :src="img.src" :alt="img.caption" class="rounded shadow" />
          <p class="caption">{{ img.caption }}</p>
        </div>
      </div>
      <button v-if="images.length > limitImages" @click="showAllImages = !showAllImages" class="btn">
        {{ showAllImages ? 'Réduire' : 'Voir toutes les images' }}
      </button>

      <div class="upload mt-6" v-if="user?.value">
        <label class="text-sm text-silver">Ajouter une image :</label>
        <input type="file" @change="uploadGalleryImage" accept="image/*" class="file-input" />
      </div>

      <h2 class="text-gold text-2xl mt-10 mb-4">Vidéos</h2>
      <div class="video-list mb-8">
        <div v-for="(vid, index) in showAllVideos ? videos : videos.slice(0, limitVideos)" :key="index">
          <video controls :src="vid.src" class="w-full rounded shadow" />
          <p class="caption">{{ vid.caption }}</p>
        </div>
        <button v-if="videos.length > limitVideos" @click="showAllVideos = !showAllVideos" class="btn">
          {{ showAllVideos ? 'Réduire' : 'Voir toutes les vidéos' }}
        </button>
      </div>

      <h2 class="text-gold text-2xl mt-10 mb-4">Audios</h2>
      <div class="audio-list mb-8">
        <div v-for="(aud, index) in showAllAudios ? audios : audios.slice(0, limitAudios)" :key="index">
          <audio controls :src="aud.src" class="w-full" />
          <p class="caption">{{ aud.caption }}</p>
        </div>
        <button v-if="audios.length > limitAudios" @click="showAllAudios = !showAllAudios" class="btn">
          {{ showAllAudios ? 'Réduire' : 'Voir tous les audios' }}
        </button>
      </div>

      <div class="commentaire mt-10">
        <h3 class="text-gold text-xl mb-2">Laisser un commentaire</h3>
        <textarea class="input w-full h-24 mb-2" placeholder="Votre message..." />
        <button class="btn" @click="envoyerCommentaire">Envoyer</button>
      </div>
    </section>

    <Footer />
  </div>
</template>

<style scoped>
.page {
  background-color: #000;
  color: #C0C0C0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.gallery-section {
  padding: 2rem;
}

.text-gold {
  color: #FFD700;
}

.text-silver {
  color: #C0C0C0;
}

.caption {
  font-size: 0.9rem;
  margin-top: 0.3rem;
  color: #aaa;
}

.btn {
  background-color: #FFD700;
  color: #000;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  border: none;
  margin-top: 1rem;
}

.btn:hover {
  opacity: 0.9;
}

.file-input {
  margin-top: 0.5rem;
  color: #FFD700;
}

.input {
  background-color: #222;
  border: 1px solid #FFD700;
  border-radius: 6px;
  padding: 0.5rem;
  color: #FFD700;
}
</style>