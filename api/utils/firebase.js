import { initializeApp, getApps, getApp, applicationDefault } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore'

// 🔄 Initialisation unique de l'application Firebase Admin
const app = getApps().length === 0
  ? initializeApp({ credential: applicationDefault() })
  : getApp()

// ✅ Exports unifiés
export const firebaseApp = app
export const adminAuth = getAuth(app)
export const db = getFirestore(app)