// api/members/[id].js
import { getMemberById } from '../../lib/controllers/memberController.js'

export default function handler(req, res) {
  const { id } = req.query

  if (req.method === 'GET') {
    const member = getMemberById(id)
    if (member) {
      res.status(200).json({ member })
    } else {
      res.status(404).json({ error: 'Membre introuvable' })
    }
  } else {
    res.status(405).json({ error: 'Méthode non autorisée' })
  }
}