<script setup>
import { ref } from "vue"
import Header from "../components/Header.vue"
import Footer from "../components/Footer.vue"
import { useAuth } from "../composables/useAuth"
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage"

const { user } = useAuth()
const storage = getStorage()

const images = ref([
  { src: "/assets/images/cast-chorale.jpg", caption: "Chantez à l'Éternel un cantique nouveau." },
  { src: "/assets/images/cathedrale majestueuse.png", caption: "Ma maison sera appelée une maison de prière." },
  { src: "/assets/images/chorale-1.jpg", caption: "Louez-le avec les cordes et les flûtes." },
  { src: "/assets/images/chorale-2.jpg", caption: "Que tout ce qui respire loue l'Éternel." },
  { src: "/assets/images/concert1.jpg", caption: "Faites retentir la trompette en Sion." },
  { src: "/assets/images/fondateur-cast.jpg", caption: "Heureux ceux qui procurent la paix." },
  { src: "/assets/images/instrument-flute.jpg", caption: "Louez-le avec le son de la flûte." },
  { src: "/assets/images/instrument-piano.jpg", caption: "Jouer pour Lui avec art et ferveur." },
  { src: "/assets/images/instrument-violon.jpg", caption: "Louez-le avec les instruments à cordes." },
  { src: "/assets/images/repertoire.png", caption: "La foi vient de ce qu’on entend." },
  { src: "/assets/images/sary1.jpg", caption: "L'Éternel est ma lumière et mon salut." },
  { src: "/assets/images/slide1.jpg", caption: "Chantez et réjouissez-vous, habitants de Sion." },
  { src: "/assets/images/slide4.jpg", caption: "Que la paix de Dieu règne dans vos cœurs." },
  { src: "/assets/images/slide5.jpg", caption: "Louez-le avec les cymbales retentissantes." },
  { src: "/assets/images/slide6.jpg", caption: "Que tout ce que vous faites soit fait avec amour." }
])

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

const uploadFile = async (event) => {
  const file = event.target.files[0]
  if (!file || !user.value) return

  const filePath = `images/${user.value.uid}/${Date.now()}-${file.name}`
  const fileRef = storageRef(storage, filePath)

  try {
    await uploadBytes(fileRef, file)
    const url = await getDownloadURL(fileRef)

    images.value.unshift({
      src: url,
      caption: "Image ajoutée par " + (user.value.email || "un membre")
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

    <main class="content">
      <h1 class="title">Galerie multimédia</h1>

      <!-- Images -->
      <section>
        <h2 class="section-title">Images</h2>
        <div class="gallery">
          <div
            v-for="(img, index) in (showAllImages ? images : images.slice(0, limitImages))"
            :key="'img-' + index"
            class="gallery-item"
          >
            <img :src="img.src" :alt="img.caption" />
            <p class="caption">« {{ img.caption }} »</p>
          </div>
        </div>
        <button v-if="images.length > limitImages" @click="showAllImages = !showAllImages" class="toggle-btn">
          {{ showAllImages ? "Voir moins" : "Afficher tout" }}
        </button>
      </section>

      <!-- Vidéos -->
      <section>
        <h2 class="section-title">Vidéos</h2>
        <div class="gallery">
          <div
            v-for="(vid, index) in (showAllVideos ? videos : videos.slice(0, limitVideos))"
            :key="'vid-' + index"
            class="gallery-item"
          >
            <video controls :src="vid.src"></video>
            <p class="caption">« {{ vid.caption }} »</p>
          </div>
        </div>
        <button v-if="videos.length > limitVideos" @click="showAllVideos = !showAllVideos" class="toggle-btn">
          {{ showAllVideos ? "Voir moins" : "Afficher tout" }}
        </button>
      </section>
            <!-- Audios -->
      <section>
        <h2 class="section-title">Audios</h2>
        <div class="gallery">
          <div
            v-for="(aud, index) in (showAllAudios ? audios : audios.slice(0, limitAudios))"
            :key="'aud-' + index"
            class="gallery-item"
          >
            <audio controls :src="aud.src"></audio>
            <p class="caption">« {{ aud.caption }} »</p>
          </div>
        </div>
        <button v-if="audios.length > limitAudios" @click="showAllAudios = !showAllAudios" class="toggle-btn">
          {{ showAllAudios ? "Voir moins" : "Afficher tout" }}
        </button>
      </section>

      <!-- Interactions protégées -->
      <section class="interaction">
        <h2 class="section-title">Participer</h2>
        <div v-if="user">
          <input type="file" @change="uploadFile" />
          <button @click="envoyerCommentaire">Commenter</button>
        </div>
        <div v-else>
          <p class="caption">
            ✨ Connectez-vous pour partager vos offrandes et bénir la galerie.
          </p>
          <router-link to="/login">Se connecter</router-link> |
          <router-link to="/signup">S’inscrire</router-link>
        </div>
      </section>
    </main>

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
.content {
  flex: 1;
  padding: 2rem;
}
.title {
  font-family: var(--font-title);
  color: #FFD700;
  text-align: center;
  margin-bottom: 2rem;
}
.section-title {
  font-family: var(--font-title);
  color: #FFD700;
  margin: 1.5rem 0 1rem;
  border-bottom: 2px solid #FFD700;
  padding-bottom: 0.3rem;
}
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}
.gallery-item {
  background: #111;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
}
.gallery-item img,
.gallery-item video {
  max-width: 100%;
  border-radius: 6px;
}
.gallery-item audio {
  width: 100%;
}
.caption {
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: #FFD700;
  font-style: italic;
}
.toggle-btn {
  margin-top: 1rem;
  background: none;
  border: 1px solid #FFD700;
  color: #FFD700;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
}
.toggle-btn:hover {
  background: #FFD700;
  color: #000;
}
</style>