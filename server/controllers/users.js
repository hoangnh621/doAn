import express from 'express';
import { getToken } from '../utils.js'
import Users from '../models/users.js';
import BodyIndex from '../models/bodyIndex.js';
import Menu from '../models/menu.js';
import Foods from '../models/foods.js';
import Tasks from '../models/tasks.js';
import UserTasks from '../models/user_tasks.js';
import TypeFoods from '../models/typeFood.js';
import MenuFood from '../models/menu_food.js';
import DetailHistory from '../models/detailHistory.js';
import HistoryWeight from '../models/historyWeight.js';
import nodemailer from 'nodemailer'
import mongoose from 'mongoose'

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
                password: loginUser.password,
                isAdmin: loginUser.isAdmin,
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
            if(isBodyIndex.weight === 0) {
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
    
                const newHistoryWeight = new HistoryWeight({
                    user_id: req.body.id
                })
                const isSaveHW = await newHistoryWeight.save()
                if(isSaveHW) {

                    const newDetailHistory = new DetailHistory({
                        history_weight_id: newHistoryWeight._id,
                        weight: req.body.weight,
                        created_at: req.body.createdAt,
                    })
                    const isNewDH = await newDetailHistory.save()
                }
                if(updateBodyIndex) {
                    res.status(200)
                }
                else res.status(401)
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
                const historyWeightOld = await HistoryWeight.find({
                    user_id: req.body.id
                })
                const newDetailHistory = new DetailHistory({
                    history_weight_id: historyWeightOld._id,
                    weight: req.body.weight,
                    createdAt: req.body.createdAt,
                })
                const isNewDH = await newDetailHistory.save()
                if(updateBodyIndex && isNewDH) {
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
           res.status(200).json(newBodyIndex)
        }
        else {
           res.status(200).json(isBodyIndex)
        }
    }
    catch(error) {
        res.status(404).json({ message: error.message }); 
    }
}

export const addMenuFood = async (req, res) => { 
    try {
        if(req.body.type_update === 'createMenu') {
            const isBodyIndex = await Menu.findOne({
                author: req.body.id,
                name: req.body.nameMenu
            })
            if(!isBodyIndex) {
                const newMenu = new Menu({
                    author: req.body.id,
                    name: req.body.nameMenu,
                })
               const isNewMenu = await newMenu.save()
                const dataFood = req.body.dataFood
                const newArr = dataFood.map((food) => {
                    return {
                        menu_id: newMenu._id,
                        food_id: food._id,
                        qty: food.quantityFood,
                    }
                })
                const isNewMenuFood = await MenuFood.insertMany(newArr)
                const isMenu = await Menu.find({
                    author: req.body.id,
                })
                const allMenuFood = await MenuFood.find({
                })
                const allFood = await Foods.find({
                })
               if(isNewMenu && isNewMenuFood) {
                   res.status(200).json({ 
                    allMenu: isMenu,
                    allMenuFood: allMenuFood,
                    allFood: allFood,
                })
               }
               else res.status(401)
            }
            else {
               res.send({error: 'Đã tồn tại tên thực đơn'})
            }
        }
        else if(req.body.type_update === 'updateMenu') {
            const isBodyIndex = await Menu.findOne({
                author: req.body.id,
                name: req.body.nameMenu
            }) 
            if(isBodyIndex) {
               const isDeleteMany = await MenuFood.deleteMany({
                   menu_id: isBodyIndex._id
               })
                const dataFood = req.body.dataFood
                const newArr = dataFood.map((food) => {
                    return {
                        menu_id: isBodyIndex._id,
                        food_id: food._id,
                        qty: food.quantityFood,
                    }
                })
                const isNewMenuFood = await MenuFood.insertMany(newArr)
                const isMenu = await Menu.find({
                    author: req.body.id,
                })
                const allMenuFood = await MenuFood.find({
                })
                const allFood = await Foods.find({
                })
                
               if(isDeleteMany && isNewMenuFood) {
                   res.status(200).json({ 
                    allMenu: isMenu,
                    allMenuFood: allMenuFood,
                    allFood: allFood,
                })
               }
               else res.status(401)
            }
            else {
               res.send({error: 'Thực đơn không tồn tại'})
            }
        }
        else if(req.body.type_update === 'deleteMenu') {
            const isBodyIndex = await Menu.findOne({
                author: req.body.id,
                name: req.body.nameMenu
            }) 
            if(isBodyIndex) {
               const isDeleteMenuFood = await MenuFood.deleteMany({
                   menu_id: isBodyIndex._id
               })
                const isDeleteMenu = await Menu.deleteOne({
                    _id: isBodyIndex._id,
                })
                const isMenu = await Menu.find({
                    author: req.body.id,
                })
                const allMenuFood = await MenuFood.find({
                })
                const allFood = await Foods.find({
                })
                
               if(isDeleteMenuFood && isDeleteMenu) {
                   res.status(200).json({ 
                    allMenu: isMenu,
                    allMenuFood: allMenuFood,
                    allFood: allFood,
                })
               }
               else res.status(401)
            }
            else {
               res.send({error: 'Thực đơn không tồn tại'})
            }
        }

        else if(req.body.type_update === 'createFood') {
            const isFood = await Foods.findOne({
                author: req.body.id,
                name: req.body.name
            }) 
            if(!isFood) {
                const newSlug = req.body.name.replace(/ +/g, "")
               const newFood = new Foods({
                   name: req.body.name,
                   author: req.body.id,
                   protein: req.body.protein,
                   carbs: req.body.carbs,
                   fat: req.body.fat,
                   type: req.body.type,
                   slug: newSlug
               })
                const isSaveFood = await newFood.save()
                const foodOfUser = await Foods.find({
                    author: req.body.id,
                })
               if(isSaveFood && foodOfUser) {
                   res.status(200).json(foodOfUser)
               }
               else if(isSaveFood && !foodOfUser) {
                    res.status(200).json(newFood)
               }
               else res.status(401)
            }
            else {
               res.send({error: 'Thức ăn đã tồn tại'})
            }
        }

        else if(req.body.type_update === 'updateFood') {
            const isFood = await Foods.findOne({
                author: req.body.id,
                name: req.body.name
            }) 
            if(isFood) {
                const updateFood = await Foods.updateOne(
                    {author: isFood.author, name: isFood.name},
                    {$set :{
                        protein: req.body.protein,
                        carbs: req.body.carbs,
                        fat: req.body.fat,
                        type: req.body.type,
                    }}
                )
                const foodOfUser = await Foods.find({
                    author: req.body.id,
                })
               if(updateFood && foodOfUser) {
                   res.status(200).json(foodOfUser)
               }
               else res.status(401)
            }
            else {
               res.send({error: 'Thức ăn không tồn tại'})
            }
        }

        else if(req.body.type_update === 'deleteFood') {
            const isFood = await Foods.findOne({
                author: req.body.id,
                name: req.body.name
            }) 
            if(isFood) {
                const updateFood = await Foods.deleteOne(
                    {author: isFood.author, name: isFood.name},
                )
                const foodOfUser = await Foods.find({
                    author: req.body.id,
                })
               if(updateFood && foodOfUser) {
                   res.status(200).json(foodOfUser)
               }
               else res.status(401)
            }
            else {
               res.send({error: 'Thức ăn không tồn tại'})
            }
        }

        else if(req.body.type_update === 'getFood') {
            const isFood = await Foods.find({
                author: req.body.id,
            }) 
            if(isFood) {
                   res.status(200).json(isFood)
            }
            else {
               res.send({error: 'Người dùng chưa tạo thức ăn'})
            }
        }
        
    } catch (error) {
        res.status(404).json({ message: error.message }); 
    }
}

//Lấy thực đơn
export const getMenu = async (req, res) => {
    try {
        const isMenu = await Menu.find({
            author: req.body.id,
        })
        const allMenuFood = await MenuFood.find({
        })
        const allFood = await Foods.find({
        })
        if(isMenu) {
            res.status(200).json({ 
                allMenu: isMenu,
                allMenuFood: allMenuFood,
                allFood: allFood,
            })
        }
        else res.status(401)
    }
    catch(error) {
        res.status(404).json({ message: error.message }); 
    }
}

//Lấy loại thức ăn
export const getTypeFood = async (req, res) => {
    try {
        const isTypeFood = await TypeFoods.find()
       
        if(isTypeFood) {
            res.status(200).json(isTypeFood)
        }
        else res.status(401)
    }
    catch(error) {
        res.status(404).json({ message: error.message }); 
    }
}

//Lấy lịch sử cân nặng
export const getHistoryWeight = async (req, res) => {
    try {
        const historyWeight = await HistoryWeight.findOne({
            user_id: req.body.id
        })
        if(historyWeight) {
            const detailHistory = await DetailHistory.find({
                history_weight_id: historyWeight._id
            })
            res.status(200).json(detailHistory)
        }
        else res.status(401).send({message: 'Người dùng chưa tạo cân nặng nào'})
    }
    catch(error) {
        res.status(404).json({ message: error.message }); 
    }
}

//
export const setTask = async (req, res) => {
    try {
        if(req.body.type_update === 'setTask') {
            const isUserTask = await UserTasks.findOne({
                user_id: req.body.id
            })
            if(!isUserTask ) {
                const newUserTask = new UserTasks({
                    user_id: req.body.id
                })
                const isSaveUserTask = newUserTask.save()
                if(isSaveUserTask) {
                    const newTask = new Tasks({
                        user_tasks_id: newUserTask._id,
                        name: req.body.name,
                        type: req.body.type,
                        desc: req.body.desc,
                        due: req.body.due,
                    })
                    const isSaveTask = newTask.save()
                    res.status(200).json(newTask)
                }
                else res.status(401).json({ message: 'error'})
            }
            else {
                //kiểm tra task đã tồn tại chưa
                const isOldTask = await Tasks.findOne({
                    name: req.body.name,
                })
                //đã tồn tại rồi
                if(isOldTask) {
                    const isUpdateTask = await Tasks.updateOne(
                        {name: req.body.name},
                        { $set: {
                            type: req.body.type,
                            desc: req.body.desc,
                            due: req.body.due,
                        }}
                    )
                    const isTask = await Tasks.find({
                        user_tasks_id: isUserTask._id
                    })
                    res.status(200).json(isTask)
                }
                else {

                    const newTask = new Tasks({
                        user_tasks_id: isUserTask._id,
                        name: req.body.name,
                        type: req.body.type,
                        desc: req.body.desc,
                        due: req.body.due,
                    })
                    const isSaveTask = newTask.save()
                    const isTask = await Tasks.find({
                        user_tasks_id: isUserTask._id
                    })
                    res.status(200).json(isTask)
                }
            }
        }
        else if(req.body.type_update === 'getTask') {
            const isUserTask = await UserTasks.findOne({
                user_id: req.body.id
            })
            if(isUserTask) {
                const isTask = await Tasks.find({
                    user_tasks_id: isUserTask._id
                })
                if(isTask) {
                    res.status(200).json(isTask)
                }
                else res.status(401).json({ message: 'người dùng chưa có task'})
            }
            else res.status(401).json({ message: 'người dùng chưa có task'})
        }
        else if(req.body.type_update === 'deleteTask') {
            const isUserTask = await UserTasks.findOne({
                user_id: req.body.id
            })
            if(isUserTask) {
                const isTask = await Tasks.deleteOne({
                    user_tasks_id: isUserTask._id,
                    _id: req.body.taskId
                })
                const isGetTask = await Tasks.find({
                    user_tasks_id: isUserTask._id
                })
                if(isTask && isGetTask) {
                    res.status(200).json(isGetTask)
                }
                else res.status(401).json({ message: 'Xóa thất bại'})
            }
            else res.status(401).json({ message: 'người dùng chưa có task'})
        }
        else if(req.body.type_update === 'checkedTask') {
            const isUserTask = await UserTasks.findOne({
                user_id: req.body.id
            })
            if(isUserTask) {
                if(req.body.dataChecked.length !== 0) {

                    const newDataChecked = req.body.dataChecked.map(item => {
                        return mongoose.Types.ObjectId(item);
                    })
                    const isDoneTask = await Tasks.updateMany(
                        {
                                _id: {
                                $in: newDataChecked
                            },
                            // user_tasks_id: isUserTask._id
                        },
                        {
                            $set: {isDone: true}
                        }
                    )
                    const isNotDoneTask = await Tasks.updateMany(
                        {
                                _id: {
                                $nin: newDataChecked
                            },
                            // user_tasks_id: isUserTask._id
                        },
                        {
                            $set: {isDone: false}
                        }
                    )

                    const isGetTask = await Tasks.find({
                        user_tasks_id: isUserTask._id
                    })
                    if( isGetTask) {
                        res.status(200).json(isGetTask)
                    }
                    else res.status(401).json({ message: 'Xóa thất bại'})
                }
                else {
                    const isNotDoneTask = await Tasks.updateMany(
                        {
                            user_tasks_id: isUserTask._id
                        },
                        {
                            $set: {isDone: false}
                        }
                    )
                    const isGetTask = await Tasks.find({
                        user_tasks_id: isUserTask._id
                    })
                    if( isGetTask) {
                        res.status(200).json(isGetTask)
                    }
                    else res.status(401).json({ message: 'Xóa thất bại'})
                }
                const isGetTask = await Tasks.find({
                    user_tasks_id: isUserTask._id
                })
            }
            else res.status(401).json({ message: 'người dùng chưa có task'})
        }
        
    }
    catch(error) {
        res.status(404).json({ message: error.message }); 
    }
}

//Thay đổi mật khẩu và tên tài khoản
export const setInfo = async (req, res) => {
    try {
        if(req.body.type_update === 'setInfo') {
            const isUser = await Users.find({
                
            })
            if(isUser) {
                const isUpdateUser = await Users.updateOne(
                    {_id: isUser._id},
                    {$set :{
                        password: req.body.password,
                        name: req.body.name,
                    }}
                )
                res.status(200).json({
                    password: req.body.password,
                    name: req.body.name,
                })
            }
            else res.status(401)
        }
    }
    catch(error) {
        res.status(404).json({ message: error.message }); 
    } 
}

export default router
