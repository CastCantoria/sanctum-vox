<template>
  <section class="p-6">
    <h1 class="text-2xl font-bold mb-4">Tableau de bord Admin</h1>

    <div v-if="loading">Chargement des membres...</div>
    <div v-else>
      <table class="w-full border">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="member in members" :key="member.id">
            <td>{{ member.nom }} {{ member.prenom }}</td>
            <td>{{ member.email }}</td>
            <td>
              <button @click="editMember(member)">✏️</button>
              <button @click="deleteMember(member.id)">🗑️</button>
            </td>
          </tr>
        </tbody>
      </table>
      <button @click="exportMembers" class="mt-4">📤 Exporter en CSV</button>
    </div>

    <!-- Modale d'édition -->
    <MemberEditor
      :member="selectedMember"
      :visible="editorVisible"
      @close="editorVisible = false"
      @updated="refreshMembers"
    />
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import MemberEditor from '@/components/MemberEditor.vue'

const members = ref([])
const loading = ref(true)
const selectedMember = ref(null)
const editorVisible = ref(false)

onMounted(refreshMembers)

async function refreshMembers() {
  loading.value = true
  const res = await fetch('/api/members')
  members.value = await res.json()
  loading.value = false
}

function editMember(member) {
  selectedMember.value = member
  editorVisible.value = true
}

async function deleteMember(id) {
  if (!confirm("🗑️ Supprimer ce membre ?")) return
  try {
    await fetch(`/api/members/${id}`, { method: 'DELETE' })
    await refreshMembers()
  } catch (err) {
    alert("Erreur : " + err.message)
  }
}

function exportMembers() {
  const headers = ['Nom', 'Prénom', 'Email', 'Affiliation']
  const rows = members.value.map(m =>
    [m.nom, m.prenom, m.email, m.affiliation].join(',')
  )
  const csvContent = [headers.join(','), ...rows].join('\n')
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = 'membres.csv'
  link.click()
}
</script>