import express from 'express'
import { addBodyIndex } from '../controllers/users.js'
import { isAuth } from '../utils.js'

const router = express.Router()

router.post('/', isAuth,  addBodyIndex)

export default router