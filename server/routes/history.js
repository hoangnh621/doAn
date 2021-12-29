import express from 'express';

import { getHistoryWeight } from '../controllers/users.js';


const router = express.Router();

router.post('/', getHistoryWeight);


export default router;