<template>
  <section class="admin-dashboard fade-in">
    <h1 class="dashboard-title">🎼 Tableau de bord Admin</h1>

    <div v-if="loading" class="loading-text">Chargement des membres...</div>

    <div v-else>
      <div class="table-wrapper">
        <table class="member-table">
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
              <td class="actions">
                <button @click="editMember(member)" aria-label="Modifier le membre" class="btn-edit">✏️</button>
                <button @click="deleteMember(member.id)" aria-label="Supprimer le membre" class="btn-delete">🗑️</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <button @click="exportMembers" class="btn-export">📤 Exporter en CSV</button>
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

<style scoped>
.admin-dashboard {
  background-color: #fdfaf6;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(200, 169, 81, 0.1);
}

.fade-in {
  animation: fadeIn 0.6s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.dashboard-title {
  font-size: 2rem;
  font-weight: bold;
  color: #c8a951;
  margin-bottom: 1.5rem;
}

.loading-text {
  color: #6b7280;
  font-style: italic;
}

.table-wrapper {
  overflow-x: auto;
  border-radius: 8px;
}

.member-table {
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  border: 1px solid #e5e7eb;
}

.member-table th,
.member-table td {
  padding: 0.75rem 1rem;
  text-align: left;
}

.member-table thead {
  background-color: #f3f4f6;
  color: #374151;
}

.member-table tbody tr:nth-child(even) {
  background-color: #fafafa;
}

.actions {
  display: flex;
  gap: 0.5rem;
}

.btn-edit,
.btn-delete {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  transition: transform 0.2s ease;
}

.btn-edit:hover {
  color: #2563eb;
  transform: scale(1.1);
}

.btn-delete:hover {
  color: #dc2626;
  transform: scale(1.1);
}

.btn-export {
  margin-top: 1.5rem;
  padding: 0.6rem 1.2rem;
  background-color: #4f46e5;
  color: white;
  border-radius: 6px;
  font-weight: 500;
  transition: background-color 0.3s ease;
}

.btn-export:hover {
  background-color: #4338ca;
}
</style>