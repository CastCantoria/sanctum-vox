<script setup>
import Header from "../components/Header.vue"
import Footer from "../components/Footer.vue"
import MediaGallery from "../components/MediaGallery.vue"

const medias = [
  { type: "image", src: "/images/cast-chorale.jpg", caption: "Chorale C.A.S.T." },
  { type: "image", src: "/images/cathedrale-majestueuse.png", caption: "Cathédrale majestueuse" },
  { type: "audio", src: "/audio/hallelujah.mp3", caption: "Hallelujah - Händel" },
  { type: "video", src: "/video/concert-noel.mp4", caption: "Concert de Noël 2024" }
]
</script>

<template>
  <Header />
  <MediaGallery :items="medias" />
  <Footer />
</template>
