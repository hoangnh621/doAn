import express from 'express'
import { addMenuFood, getMenu, getTypeFood } from '../controllers/users.js'
import { isAuth } from '../utils.js'

const router = express.Router()

router.get('/', isAuth,  getTypeFood)
router.put('/', isAuth,  getMenu)
router.post('/', isAuth,  addMenuFood)

export default router