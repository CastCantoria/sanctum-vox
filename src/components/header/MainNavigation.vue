<template>
  <div class="menu-wrapper">
    <router-link to="/" class="nav-link">Accueil</router-link>

    <div class="nav-group" @mouseenter="activeGroup = 'sanctuaire'" @mouseleave="activeGroup = null">
      <span class="nav-link group-title">Sanctuaire ▾</span>
      <div class="dropdown" v-if="activeGroup === 'sanctuaire'">
        <router-link to="/about" class="nav-link">À propos</router-link>
        <router-link to="/spiritualite" class="nav-link">Spiritualité</router-link>
        <router-link to="/contact" class="nav-link">Contact</router-link>
      </div>
    </div>

    <div class="nav-group" @mouseenter="activeGroup = 'expression'" @mouseleave="activeGroup = null">
      <span class="nav-link group-title">Expression ▾</span>
      <div class="dropdown" v-if="activeGroup === 'expression'">
        <router-link to="/concerts" class="nav-link">Concerts</router-link>
        <router-link to="/galerie" class="nav-link">Galerie</router-link>
        <router-link to="/pedagogie" class="nav-link">Pédagogie</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const activeGroup = ref(null)
</script>