<template>
  <div class="page">
    <Header />
    <HeroSection />

    <!-- Slider Swiper -->
    <section class="swiper-section">
      <Swiper :autoplay="{ delay: 4000 }" loop>
        <SwiperSlide v-for="(slide, index) in slides" :key="index">
          <div class="slide-wrapper">
            <img :src="slide.image" :alt="slide.alt" class="home-image" />
            <div class="slide-caption">
              <p>{{ slide.caption }}</p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>

    <section class="p-8 bg-black text-silver">
      <QuoteBlock
        text="Quand l’art devient prière, la musique touche l’âme"
        author="C.A.S.T."
      />

      <div class="max-w-5xl mx-auto mt-8 space-y-12">
        <div
          v-for="(item, index) in sections"
          :key="index"
          class="flex flex-col md:flex-row items-center gap-6"
          :class="{ 'md:flex-row-reverse': item.reverse }"
        >
          <div class="md:w-1/2 flex justify-center">
            <img
              :src="item.image"
              :alt="item.title || 'Illustration'"
              class="image-elegante image-reduite"
            />
          </div>
          <div class="md:w-1/2 leading-relaxed">
            <h2
              v-if="item.title"
              class="text-gold text-xl font-bold mb-2"
            >
              {{ item.title }}
            </h2>
            <p
              v-for="(para, pIndex) in item.text.split('\n').filter(Boolean)"
              :key="pIndex"
              class="mb-3"
            >
              {{ para }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <Footer />

    <!-- Avatar en bas -->
    <div class="avatar-container bottom">
      <img src="/assets/avatar.png" alt="Connexion" class="avatar" @click="goToAuth" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'

import Header from "../components/Header.vue"
import HeroSection from "../components/HeroSection.vue"
import QuoteBlock from "../components/QuoteBlock.vue"
import Footer from "../components/Footer.vue"

const router = useRouter()

const goToAuth = () => {
  router.push("/login")
}

const slides = [
  {
    image: '/assets/images/slide1.jpg',
    alt: 'Chœur en prière',
    caption: 'Chœur en prière – l’union des voix sacrées'
  },
  {
    image: '/assets/images/slide2.jpg',
    alt: 'Lumière sur l’autel',
    caption: 'Lumière sur l’autel – la foi en lumière'
  },
  {
    image: '/assets/images/slide3.jpg',
    alt: 'Silence sacré',
    caption: 'Silence sacré – le souffle avant le chant'
  }
]

const sections = ref([
  {
    title: "",
    text: `Fondé en 2003 à Antananarivo, le C.A.S.T. est un ensemble vocal dont
    l’essence repose sur le souffle sacré de la musique. Fruit d’une
    convergence de vocations artistiques et spirituelles, il rassemble des
    choristes issus de toutes les Églises chrétiennes du FFKM — Fiombonan’ny
    Fiangonana Kristiana eto Madagasikara — illustrant ainsi une véritable
    unité œcuménique.`,
    image: "/assets/images/cast-chorale.jpg"
  },
  {
    title: "",
    text: `Sous la houlette de Son Excellence Liva ANDRIAMANALINARIVO, président
    fondateur, le chœur poursuit un objectif de faire vibrer l’âme et de
    porter au-delà des mots la puissance de la foi par la voix humaine. Le
    directeur artistique, Maître Éric RASAMIMANANA, insuffle chaque
    interprétation d’une rigueur musicale profonde et d’un amour sincère du
    sacré.`,
    image: "/assets/images/fondateur-cast.jpg"
  },
  {
    title: "🎗️ In Memoriam – Le murmure d’un homme devenu souffle éternel",
    text: `Avant même d’évoquer les fondations visibles du chœur, il est juste de
    saluer une présence discrète mais essentielle : Monsieur Lucien Emmanuel
    RANDRIANARIVELO (†).

    À l’image d’un orfèvre du sacré, il a patiemment transcrit les partitions
    complexes en grilles solfa accessibles, offrant à chaque choriste le don
    de compréhension. Mais sa mission allait plus loin : il a offert une âme
    malgache aux chefs-d’œuvre classiques, traduisant leurs paroles avec
    délicatesse, fidélité et spiritualité.

    "Misaotra anao, Raiamandreny. Ianao no nandika sy nandray ny feon’ny
    lanitra ho tenin’ny tanindrazana."

    Son héritage est immatériel, mais palpable à chaque instant, dans chaque
    vibration du chœur. Il ne chantait pas… mais c’est grâce à lui que chacun
    peut chanter avec clarté et profondeur.`,
    image: "/assets/images/lucien-emmanuel.png"
  }
])

onMounted(() => {
  sections.value = sections.value.map((s, i) => ({
    ...s,
    reverse: i % 2 === 1
  }))
})
</script>

<style scoped>
.page {
  background-color: #000;
  color: #C0C0C0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.text-silver {
  color: #C0C0C0;
}
.text-gold {
  color: #FFD700;
}
.image-elegante {
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(255, 215, 0, 0.3);
}
.image-reduite {
  max-width: 80%;
}
.home-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(255, 215, 0, 0.2);
}
.swiper-section {
  margin-top: 2rem;
  margin-bottom: 2rem;
  max-width: 100%;
  overflow: hidden;
}
.slide-wrapper {
  position: relative;
  width: 100%;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.slide-caption {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.6);
  padding: 0.6rem 1rem;
  border-radius: 6px;
  color: #FFD700;
  font-size: 1rem;
  font-weight: 500;
  animation: fadeInUp 1s ease;
  text-align: center;
  max-width: 90%;
}
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate(-50%, 20px);
  }
  to {
    opacity: 1;
    transform: translate(-50%, 0);
  }
}
@media (max-width: 768px) {
  .slide-wrapper {
    height: 240px;
  }
  .slide-caption {
    font-size: 0.9rem;
    padding: 0.4rem 0.8rem;
  }
  .image-reduite {
    max-width: 100%;
  }
}
.avatar-container {
  display: flex;
  justify-content: flex-end;
  padding: 1rem;
}
.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.2s;
  border: 2px solid #FFD700;
}
.avatar:hover {
  transform: scale(1.1);
}
</style>