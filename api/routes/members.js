import { Router } from 'express'
import {
  getAllMembers,
  createMember,
  updateMember,
  deleteMember
} from '../controllers/membersController.js'
import { body } from 'express-validator'

const router = Router()

const memberValidation = [
  body('nom').notEmpty().withMessage('Le nom est requis'),
  body('prenom').notEmpty().withMessage('Le prénom est requis'),
  body('email').isEmail().withMessage('Email invalide'),
  body('affiliation').notEmpty().withMessage('Affiliation requise')
]

router.get('/', getAllMembers)
router.post('/', memberValidation, createMember)
router.put('/:id', memberValidation, updateMember)
router.delete('/:id', deleteMember)

export default router