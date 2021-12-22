import express from 'express'
import { addBodyIndex, getBodyIndex } from '../controllers/users.js'
import { isAuth } from '../utils.js'

const router = express.Router()

router.put('/', isAuth,  getBodyIndex)
router.post('/', isAuth,  addBodyIndex)

export default router