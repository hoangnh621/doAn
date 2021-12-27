import express from 'express';

import { setMeal } from '../controllers/meal.js';
import { isAuth } from '../utils.js'


const router = express.Router();

router.post('/', isAuth, setMeal);


export default router;