import express from 'express';

import { setInfo } from '../controllers/users.js';
import { isAuth } from '../utils.js'

const router = express.Router();


router.post('/', isAuth, setInfo);


export default router;