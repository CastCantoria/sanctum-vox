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
  body('nom').trim().notEmpty().withMessage('Le nom est requis'),
  body('prenom').trim().notEmpty().withMessage('Le prénom est requis'),
  body('email').trim().isEmail().withMessage('Email invalide'),
  body('affiliation').trim().notEmpty().withMessage('Affiliation requise')
]

// 📖 Routes publiques
router.get('/', getAllMembers)
router.get('/:id', getMemberById)

// 🔐 Routes protégées
router.post('/', verifyToken, memberValidation, createMember)
router.put('/:id', verifyToken, memberValidation, updateMember)
router.delete('/:id', verifyToken, deleteMember)

export default router