// api/utils/firebase.js
import { initializeApp, getApps, getApp } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore'
import { applicationDefault } from 'firebase-admin/app'

const app = getApps().length === 0
  ? initializeApp({ credential: applicationDefault() })
  : getApp()

export const adminAuth = getAuth(app)
export const db = getFirestore(app)