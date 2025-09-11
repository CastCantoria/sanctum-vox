// 📁 src/composables/useRouteAccess.js
import { computed } from 'vue'
import { useAuth } from './useAuth'

const ROUTES = {
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_MEMBERS: '/admin/membres',
  ADMIN_MEDIA: '/admin/media',
  PROFILE: '/profile',
  MESSAGES: '/messages'
}

const ROLES = {
  ADMIN: 'admin',
  MEMBER: 'membre',
  STAFF: 'Staff',
  CONTRIBUTOR: 'Contributeur'
}

export function useRouteAccess() {
  const { role } = useAuth()

  const canAccess = (routePath) => {
    switch (routePath) {
      case ROUTES.ADMIN_DASHBOARD:
      case ROUTES.ADMIN_MEMBERS:
      case ROUTES.ADMIN_MEDIA:
        return role.value === ROLES.ADMIN
      case ROUTES.PROFILE:
      case ROUTES.MESSAGES:
        return [ROLES.ADMIN, ROLES.MEMBER, ROLES.STAFF, ROLES.CONTRIBUTOR].includes(role.value)
      default:
        return true
    }
  }

  const isAdmin = computed(() => role.value === ROLES.ADMIN)
  const isMember = computed(() => role.value === ROLES.MEMBER)

  return {
    ROUTES,
    ROLES,
    canAccess,
    isAdmin,
    isMember
  }
}