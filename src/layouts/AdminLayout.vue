<template>
  <div class="min-h-screen flex flex-col bg-gray-100 text-gray-900">
    <AdminHeader />

    <div class="flex flex-1 overflow-hidden">
      <AdminSidebar :collapsed="sidebarCollapsed" @toggle="sidebarCollapsed = !sidebarCollapsed" />

      <main class="flex-1 p-6 overflow-y-auto animate-fade-slide">
        <slot />
      </main>
    </div>

    <AdminFooter />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AdminHeader from '@/components/admin/AdminHeader.vue'
import AdminSidebar from '@/components/admin/AdminSidebar.vue'
import AdminFooter from '@/components/admin/AdminFooter.vue'

const sidebarCollapsed = ref(false)
</script>

<style scoped>
@keyframes fade-slide {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-slide {
  animation: fade-slide 0.4s ease-out;
}
</style>