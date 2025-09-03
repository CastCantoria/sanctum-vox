<script setup>
import Header from "../components/Header.vue"
import Footer from "../components/Footer.vue"
import RepertoireList from "../components/RepertoireList.vue"

const european = [
  { title: "Messiah (Hallelujah, Zadok the Priest)", composer: "Händel" },
  { title: "La Création", composer: "Haydn" },
  { title: "Requiem", composer: "Mozart" },
  { title: "Ode à la joie", composer: "Beethoven" }
]

const malagasy = [
  { title: "Tompo ô, indrisy", composer: "Rémi Andriantsoavina" },
  { title: "Ny feonay", composer: "Joelison Randrianindrina" }
]
</script>

<template>
  <Header />
  <section class="p-8 bg-black">
    <RepertoireList :european="european" :malagasy="malagasy" />
  </section>
  <Footer />
</template>
