import express from 'express';

import { getFoods } from '../controllers/foods.js';

const router = express.Router();

router.get('/', getFoods);
router.get('/meal', getFoods);


export default router;