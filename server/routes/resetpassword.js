import express from 'express';

import { resetpassword } from '../controllers/users.js';

const router = express.Router();


router.post('/:name', resetpassword);


export default router;