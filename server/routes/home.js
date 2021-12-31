import express from 'express';
import { isAuth } from '../utils.js'
import { getFoods } from '../controllers/foods.js';
import { adminSetData } from '../controllers/admin.js'


const router = express.Router();

router.get('/', getFoods);
router.post('/',isAuth, adminSetData);


export default router;