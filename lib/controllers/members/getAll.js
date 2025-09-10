import { db } from '../../../api/utils/firebase.js'

export default async function getAllMembers(req, res) {
  try {
    const snapshot = await db.collection('membres').get()
    const members = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    res.status(200).json(members)
  } catch (error) {
    console.error('❌ Erreur dans getAllMembers :', error)
    res.status(500).json({ error: 'Erreur serveur' })
  }
}