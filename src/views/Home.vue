<script setup>
import Header from "../components/Header.vue"
import HeroSection from "../components/HeroSection.vue"
import QuoteBlock from "../components/QuoteBlock.vue"
import Footer from "../components/Footer.vue"
</script>

<template>
  <div class="page">
    <Header />
    <HeroSection />
    <section class="p-8 bg-black text-silver">
      <QuoteBlock
        text="Quand l’art devient prière, la musique touche l’âme"
        author="C.A.S.T."
      />
      <p class="max-w-3xl mx-auto leading-relaxed mt-6">
        Fondé en 2003 à Antananarivo, le C.A.S.T. est un ensemble vocal dont
        l’essence repose sur le souffle sacré de la musique. Fruit d’une
        convergence de vocations artistiques et spirituelles, il rassemble des
        choristes issus de toutes les Églises chrétiennes du FFKM, illustrant
        ainsi une véritable unité œcuménique.
      </p>
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
.text-silver { color: #C0C0C0; }
</style>