<script setup>
import Header from "../components/Header.vue"
import Footer from "../components/Footer.vue"
import EventCalendar from "../components/EventCalendar.vue"

const events = [
  { date: "2025-12-20", title: "Veillée de Noël", location: "Cathédrale d’Andohalo" },
  { date: "2026-03-15", title: "Concert anniversaire", location: "Faravohitra" }
]
</script>

<template>
  <Header />
  <section class="p-8 bg-black">
    <EventCalendar :events="events" />
  </section>
  <Footer />
</template>
