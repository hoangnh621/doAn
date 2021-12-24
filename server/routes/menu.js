import express from 'express'
import { addMenu, getMenu } from '../controllers/users.js'
import { isAuth } from '../utils.js'

const router = express.Router()

router.put('/', isAuth,  getMenu)
router.post('/', isAuth,  addMenu)

export default router