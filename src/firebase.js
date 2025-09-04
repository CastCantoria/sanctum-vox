// src/firebase.js

import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCT_8j9KBKgcYr3naOFRp-Kk-s-gr_A1gs",
  authDomain: "cast-84d3f.firebaseapp.com",
  projectId: "cast-84d3f",
  storageBucket: "cast-84d3f.firebasestorage.app",
  messagingSenderId: "160422742820",
  appId: "1:160422742820:web:f60e6c94ba743d1afd41b1",
  measurementId: "G-9BNSYK4TH4"
}

const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
const auth = getAuth(app)
const db = getFirestore(app)

export { app, analytics, auth, db }