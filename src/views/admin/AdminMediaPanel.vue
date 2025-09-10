<template>
  <div class="space-y-8">
    <MediaSection title="Images" :items="images" icon="🖼️" />
    <MediaSection title="Vidéos" :items="videos" icon="🎥" />
    <MediaSection title="Audios" :items="audios" icon="🎵" />
  </div>
</template>

<script setup>
import MediaSection from './MediaSection.vue'

const images = [] // à remplir dynamiquement
const videos = [] // idem
const audios = [] // idem
</script>