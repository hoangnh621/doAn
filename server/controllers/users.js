import express from 'express';
import { getToken } from '../utils.js'
import Users from '../models/users.js';
import BodyIndex from '../models/bodyIndex.js';
import nodemailer from 'nodemailer'

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
        const isUserEmail = await Users.findOne({
            email: req.body.email,
        })
        const isUserName = await Users.findOne({
            email: req.body.name,
        })
        if(isUserName || isUserEmail) {
            res.status(401).send({ message: 'Email hoặc tên người dùng đã tồn tại'})
        }
        else {

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
                res.status(401).send({ message: 'Giá trị nhập vào không hợp lệ' });
            }  
        }
    } catch (error) {
        res.status(404).json({ message: error.message }); 
    }
}

export const forgotpassword = async (req, res) => { 
    try {
        const isUserEmail = await Users.findOne({
            email: req.body.email,
        })
        if(!isUserEmail) {
            res.status(401).send({ message: 'Email không tồn tại'})
        }
        else {
            let testAccount = await nodemailer.createTestAccount();

            let transporter = nodemailer.createTransport({
              host: "smtp.gmail.com",
              port: 587,
              secure: false, 
              auth: {
                user: '10fitwebsite@gmail.com', 
                pass: 'Anhchaoem102',
              },
            });
          
            let info = await transporter.sendMail({
              from: '10fitwebsite@gmail.com', 
              to: req.body.email, 
              subject: "Thay đổi mật khẩu", 
              html: `
                <p>Cảm ơn bạn đã sử dụng 10FIT</p>
                <h5>Click vào <a href = 'http://localhost:3000/resetpassword/${isUserEmail.name}'>đây</a> để thay đổi mật khẩu của bạn</h5>
              `, 
            });

            res.send({
                _id: isUserEmail.id,
                name: isUserEmail.name,
                email: isUserEmail.email,
                token: getToken(isUserEmail),
            });

        }
    } catch (error) {
        res.status(404).json({ message: error.message }); 
    }
}

export const resetpassword = async (req, res) => { 
    try {
        const isUserName = await Users.findOne({
            name: req.body.name,
        })
        if(!isUserName) {
            res.status(401).send({ message: 'Tài khoản không tồn tại'})
        }
        else {
          
            const updateUser = await Users.updateOne(
                {_id: isUserName._id},
                {$set :{
                    password: req.body.password
                }}
            )
            
            if(updateUser) {
            res.status(200)
            }
            else {
                res.status(401)
            }

        }
    } catch (error) {
        res.status(404).json({ message: error.message }); 
    }
}

export const addBodyIndex = async (req, res) => { 
    try {
        if(req.body.type_update === 'bodyIndex') {
            const isBodyIndex = await BodyIndex.findOne({
                author: req.body.id,
            })
            if(!isBodyIndex) {
    
                const bodyIndex = new BodyIndex({
                    author: req.body.id,
                    height: req.body.height,
                    weight: req.body.weight,
                    age: req.body.age,
                    sex: req.body.sex,
                    bodyfat: req.body.bodyfat,
                })
               const newBodyIndex = await bodyIndex.save()
               res.send({ 
                    _id: newBodyIndex.id,
                    author: newBodyIndex.author,
                    height: newBodyIndex.height,
                    weight: newBodyIndex.weight,
                    age: newBodyIndex.age,
                    sex: newBodyIndex.sex,
                    bodyfat: newBodyIndex.bodyfat,
               })
            }
            else {
                const updateBodyIndex = await BodyIndex.updateOne(
                    {author: isBodyIndex.author},
                    {$set :{
                        height: req.body.height,
                        weight: req.body.weight,
                        age: req.body.age,
                        sex: req.body.sex,
                        bodyfat: req.body.bodyfat,
                    }}
                )
                if(updateBodyIndex) {
                    res.status(200)
                }
                else res.status(401)
            }
        }
        else if(req.body.type_update === 'goalFrequency') {
            const isBodyIndex = await BodyIndex.findOne({
                author: req.body.id,
            })
            if(!isBodyIndex) {
    
                const bodyIndex = new BodyIndex({
                    author: req.body.id,
                    calo_deviant: req.body.calo_deviant,
                    goal_id: req.body.goal_id,
                    frequency_id: req.body.frequency_id,
                    goal_weight: req.body.goal_weight,
                })
               const newBodyIndex = await bodyIndex.save()
               res.send({ 
                    _id: newBodyIndex.id,
                    author: newBodyIndex.author,
                    calo_deviant: req.body.calo_deviant,
                    goal_id: req.body.goal_id,
                    frequency_id: req.body.frequency_id,
                    goal_weight: req.body.goal_weight,
               })
            }
            else {
                const updateBodyIndex = await BodyIndex.updateOne(
                    {author: isBodyIndex.author},
                    {$set :{
                        calo_deviant: req.body.calo_deviant,
                        goal_id: req.body.goal_id,
                        frequency_id: req.body.frequency_id,
                        goal_weight: req.body.goal_weight,
                    }}
                )
                if(updateBodyIndex) {
                    res.status(200)
                }
                else res.status(401)
            }
        }
        else if(req.body.type_update === 'percentFood') {
            const isBodyIndex = await BodyIndex.findOne({
                author: req.body.id,
            })
            if(!isBodyIndex) {
    
                const bodyIndex = new BodyIndex({
                    author: req.body.id,
                    protein_per: req.body.protein_per,
                    carbs_per: req.body.carbs_per,
                })
               const newBodyIndex = await bodyIndex.save()
               res.send({ 
                    _id: newBodyIndex.id,
                    author: newBodyIndex.author,
                    protein_per: req.body.protein_per,
                    carbs_per: req.body.carbs_per,
               })
            }
            else {
                const updateBodyIndex = await BodyIndex.updateOne(
                    {author: isBodyIndex.author},
                    {$set :{
                        protein_per: req.body.protein_per,
                        carbs_per: req.body.carbs_per,
                    }}
                )
                if(updateBodyIndex) {
                    res.status(200)
                }
                else res.status(401)
            }
        }
        
    } catch (error) {
        res.status(404).json({ message: error.message }); 
    }
}

export const getBodyIndex = async (req, res) => {
    try {
        const isBodyIndex = await BodyIndex.findOne({
            author: req.body.id,
        })
        if(!isBodyIndex) {

            const bodyIndex = new BodyIndex({
                author: req.body.id,
            })
           const newBodyIndex = await bodyIndex.save()
           res.status(200).json(bodyIndex)
        }
        else {
           res.status(200).json(isBodyIndex)
        }
    }
    catch(error) {
        res.status(404).json({ message: error.message }); 
    }
}



export default router
