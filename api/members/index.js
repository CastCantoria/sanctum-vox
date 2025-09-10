// api/members/index.js
import { getAllMembers } from '../../lib/controllers/memberController.js'

export default function handler(req, res) {
  if (req.method === 'GET') {
    const members = getAllMembers()
    res.status(200).json({ members })
  } else {
    res.status(405).json({ error: 'Méthode non autorisée' })
  }
}