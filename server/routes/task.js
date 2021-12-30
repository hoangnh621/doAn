import express from 'express'
import { setTask } from '../controllers/users.js'
import { isAuth } from '../utils.js'

const router = express.Router()

router.post('/', isAuth,  setTask)

export default router