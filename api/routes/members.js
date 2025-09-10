import { Router } from 'express'
import {
  getAllMembers,
  createMember,
  getMemberById,
  updateMember,
  deleteMember
} from '../../lib/controllers/index.js'
import { body } from 'express-validator'
import { verifyToken } from '../middlewares/verifyToken.js'

const router = Router()

// ✅ Validation des données membres
const memberValidation = [
  body('nom').notEmpty().withMessage('Le nom est requis'),
  body('prenom').notEmpty().withMessage('Le prénom est requis'),
  body('email').isEmail().withMessage('Email invalide'),
  body('affiliation').notEmpty().withMessage('Affiliation requise')
]

// 📖 Routes publiques
router.get('/', getAllMembers)
router.get('/:id', getMemberById)

// 🔐 Routes protégées
router.post('/', verifyToken, memberValidation, createMember)
router.put('/:id', verifyToken, memberValidation, updateMember)
router.delete('/:id', verifyToken, deleteMember)

export default router