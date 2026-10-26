
import express from 'express'
import { createContact } from '../controller/contactController.js'
import contactLimiter from '../middleware/contactLimiter.js'

const router = express.Router()

router.post('/', contactLimiter, createContact)

export default router
