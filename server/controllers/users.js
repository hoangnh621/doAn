import express from 'express';
import { getToken } from '../utils.js'
import Users from '../models/users.js';

const router = express.Router();

export const login = async (req, res) => { 
    try {
        const loginUser = await Users.findOne({
            email: req.body.email,
            password: req.body.password,
        })
        if(loginUser) {
            res.send({
                _id: loginUser.id,
                name: loginUser.name,
                email: loginUser.email,
                token: getToken(loginUser),
            });
        }  
        else {
            res.status(401).send({ message: 'Sai tài khoản hoặc mật khẩu' });
        }  
    } catch (error) {
        res.status(404).json({ message: error.message }); 
    }
}

export const register = async (req, res) => { 
    try {
        const user = new Users({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        })
       const newUser = await user.save()
       console.log(newUser)
        if(newUser) {
            res.send({
                _id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                token: getToken(newUser),
            });
        }  
        else {
            res.status(401).send({ message: 'Sai tài khoản hoặc mật khẩu' });
        }  
    } catch (error) {
        res.status(404).json({ message: error.message }); 
    }
}

export default router
