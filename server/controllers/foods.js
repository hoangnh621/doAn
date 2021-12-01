import express from 'express';
// import mongoose from 'mongoose';

import Foods from '../models/foods.js';

const router = express.Router();

export const getFoods = async (req, res) => { 
    try {
        const foods = await Foods.find();
                
        res.status(200).json(foods);
    } catch (error) {
        res.status(404).json({ message: error.message }); 
    }
}

export default router
