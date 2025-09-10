import { db } from '../../../api/utils/firebase.js'
import { validationResult } from 'express-validator'

export default async function updateMember(req, res) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  if (!req.user?.isAdmin) {
    return res.status(403).json({ error: 'Accès interdit' })
  }

  const { nom, prenom, affiliation, adresse, email } = req.body
  try {
    const docRef = db.collection('membres').doc(req.params.id)
    const docSnap = await docRef.get()
    if (!docSnap.exists) {
      return res.status(404).json({ error: 'Membre introuvable' })
    }

    const updates = {
      nom,
      prenom,
      affiliation,
      adresse,
      email,
      updatedAt: new Date().toISOString()
    }

    await docRef.update(updates)
    res.status(200).json({ message: '✅ Membre mis à jour' })
  } catch (error) {
    console.error('❌ Erreur dans updateMember :', error)
    res.status(500).json({ error: 'Erreur serveur' })
  }
}