import express from 'express';

import Menu from '../models/menu.js';
import Users from '../models/users.js';
import TypeFoods from '../models/typeFood.js';
import Foods from '../models/foods.js';

const router = express.Router();

export const adminSetData = async (req, res) => { 
    try {
        if(req.body.type_update === 'adminGetData') {

            const foods = await Foods.find();
            const menu = await Menu.find();
            const users = await Users.find({
                isAdmin: { $ne: true}
            });
            const typefood = await TypeFoods.find();
                    
            res.status(200).json({
                foods,
                menu,
                users,
                typefood,
            });
        }
        else res.status(401).json({ message: 'Lỗi'})
    } catch (error) {
        res.status(404).json({ message: error.message }); 
    }
}

export default router