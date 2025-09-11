<script setup>
import Header from "@/components/header/Header.vue"
import Footer from "@/components/Footer.vue"
import EventCalendar from "@/components/EventCalendar.vue"

const events = [
  { date: "2025-12-20", title: "Veillée de Noël", location: "Cathédrale d’Andohalo" },
  { date: "2026-03-15", title: "Concert anniversaire", location: "Faravohitra" }
]
</script>

<template>
  <div class="page">
    <Header />

    <section class="p-8 bg-black">
      <h1 class="text-gold text-3xl mb-6">Nos concerts à venir</h1>
      <EventCalendar :events="events" />
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

.text-gold {
  color: #FFD700;
}
</style>