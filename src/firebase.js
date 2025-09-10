import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage" // ← ajout pour le stockage

const firebaseConfig = {
  apiKey: "AIzaSyCT_8j9KBKgcYr3naOFRp-Kk-s-gr_A1gs",
  authDomain: "cast-84d3f.firebaseapp.com",
  projectId: "cast-84d3f",
  storageBucket: "cast-84d3f.appspot.com", // ← corrigé ici
  messagingSenderId: "160422742820",
  appId: "1:160422742820:web:f60e6c94ba743d1afd41b1",
  measurementId: "G-9BNSYK4TH4"
}

const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app) // ← initialisation du stockage

export { app, analytics, auth, db, storage }