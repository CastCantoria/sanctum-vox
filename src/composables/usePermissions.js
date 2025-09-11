// 📁 src/composables/usePermissions.js
import { computed } from 'vue'
import { useAuth } from './useAuth'

const ROLES = {
  ADMIN: 'admin',
  MEMBER: 'membre',
  INVITE: 'invite'
}

export function usePermissions() {
  const { role } = useAuth()

  const hasRole = (allowedRoles) => allowedRoles.includes(role.value)

  const canEditGallery = computed(() => hasRole([ROLES.ADMIN]))
  const canDeleteUser = computed(() => hasRole([ROLES.ADMIN]))
  const canViewDashboard = computed(() => hasRole([ROLES.ADMIN, ROLES.MEMBER]))
  const canUploadMedia = computed(() => hasRole([ROLES.ADMIN, ROLES.MEMBER]))
  const canViewPublicGallery = computed(() =>
    hasRole([ROLES.ADMIN, ROLES.MEMBER, ROLES.INVITE])
  )

  return {
    role,
    hasRole,
    canEditGallery,
    canDeleteUser,
    canViewDashboard,
    canUploadMedia,
    canViewPublicGallery
  }
}