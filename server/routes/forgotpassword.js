import express from 'express'
import { forgotpassword } from '../controllers/users.js'

const router = express.Router()

router.post('/', forgotpassword)

export default router