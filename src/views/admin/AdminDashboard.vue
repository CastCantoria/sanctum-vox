<template>
  <section class="p-6">
    <h1 class="text-2xl font-bold mb-4">Tableau de bord Admin</h1>

    <div v-if="loading" class="text-gray-600">Chargement des membres...</div>

    <div v-else>
      <div class="overflow-x-auto">
        <table class="min-w-full border border-gray-300 rounded-md">
          <thead class="bg-gray-100">
            <tr>
              <th class="px-4 py-2 text-left">Nom</th>
              <th class="px-4 py-2 text-left">Email</th>
              <th class="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="member in members" :key="member.id" class="border-t">
              <td class="px-4 py-2">{{ member.nom }} {{ member.prenom }}</td>
              <td class="px-4 py-2">{{ member.email }}</td>
              <td class="px-4 py-2 space-x-2">
                <button @click="editMember(member)" class="text-blue-600 hover:underline">✏️ Modifier</button>
                <button @click="deleteMember(member.id)" class="text-red-600 hover:underline">🗑️ Supprimer</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <button @click="exportMembers" class="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
        📤 Exporter en CSV
      </button>
    </div>

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
import MemberEditor from '@/components/admin/MemberEditor.vue'

const members = ref([])
const loading = ref(true)
const selectedMember = ref(null)
const editorVisible = ref(false)

onMounted(refreshMembers)

async function refreshMembers() {
  loading.value = true
  try {
    const res = await fetch('/api/members')
    const data = await res.json()
    members.value = Array.isArray(data) ? data : data.members || []
  } catch (err) {
    console.error('Erreur lors du chargement des membres :', err.message)
  } finally {
    loading.value = false
  }
}

function editMember(member) {
  selectedMember.value = member
  editorVisible.value = true
}

async function deleteMember(id) {
  if (!confirm('🗑️ Supprimer ce membre ?')) return
  try {
    await fetch(`/api/members/${id}`, { method: 'DELETE' })
    await refreshMembers()
  } catch (err) {
    alert('Erreur : ' + err.message)
  }
}

function exportMembers() {
  const headers = ['Nom', 'Prénom', 'Email', 'Affiliation']
  const rows = members.value.map(m =>
    [m.nom, m.prenom, m.email, m.affiliation || ''].join(',')
  )
  const csvContent = [headers.join(','), ...rows].join('\n')
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = 'membres.csv'
  link.click()
}
</script>