<script setup>
import { ref, onMounted } from 'vue'
import MemberEditor from '@/components/admin/MemberEditor.vue'
import { useAdminPanel } from '@/composables/admin/useAdminPanel'

const {
  members,
  loading,
  fetchMembers,
  deleteMember,
  exportMembers
} = useAdminPanel()

const selectedMember = ref(null)
const editorVisible = ref(false)

onMounted(fetchMembers)

function editMember(member) {
  selectedMember.value = member
  editorVisible.value = true
}
</script>