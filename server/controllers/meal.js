import express from 'express';
import Foods from '../models/foods.js';
import Meals from '../models/meal.js';
import MealFood from '../models/meal_food.js';


const router = express.Router();

export const setMeal = async (req, res) => { 
    try {
        if(req.body.type_update === 'createMeal') {
            const isMeal = await Meals.find({
                author: req.body.id,
                created_at: req.body.createdAt
            })
            if(isMeal.length === 0 ) {
                if(req.body.breakfast.length !== 0) {
                    const newMeal = new Meals({
                        type: 'breakfast',
                        author: req.body.id,
                        created_at: req.body.createdAt
                    })
                    
                    const isSaveBreak = await newMeal.save()
                    const arrMealFood = req.body.breakfast
                    const newArr = arrMealFood.map(food => ({
                        meal_id: newMeal._id,
                        food_id: food._id,
                        qty: food.quantityFood,
                        created_at: req.body.createdAt
                    }))
                    const isNewMealFood = await MealFood.insertMany(newArr)
                }
                if(req.body.lunch.length !== 0) {
                    const newMeal = new Meals({
                        type: 'lunch',
                        author: req.body.id,
                        created_at: req.body.createdAt
                    })
                    
                    const isSaveBreak = await newMeal.save()
                    const arrMealFood = req.body.lunch
                    const newArr = arrMealFood.map(food => ({
                        meal_id: newMeal._id,
                        food_id: food._id,
                        qty: food.quantityFood,
                        created_at: req.body.createdAt
                    }))
                    const isNewMealFood = await MealFood.insertMany(newArr)
                }
                if(req.body.dinner.length !== 0) {
                    const newMeal = new Meals({
                        type: 'dinner',
                        author: req.body.id,
                        created_at: req.body.createdAt
                    })
                    
                    const isSaveBreak = await newMeal.save()
                    const arrMealFood = req.body.dinner
                    const newArr = arrMealFood.map(food => ({
                        meal_id: newMeal._id,
                        food_id: food._id,
                        qty: food.quantityFood,
                        created_at: req.body.createdAt
                    }))
                    const isNewMealFood = await MealFood.insertMany(newArr)
                }
                if(req.body.snacks.length !== 0) {
                    const newMeal = new Meals({
                        type: 'snacks',
                        author: req.body.id,
                        created_at: req.body.createdAt
                    })
                    
                    const isSaveBreak = await newMeal.save()
                    const arrMealFood = req.body.snacks
                    const newArr = arrMealFood.map(food => ({
                        meal_id: newMeal._id,
                        food_id: food._id,
                        qty: food.quantityFood,
                        created_at: req.body.createdAt
                    }))
                    const isNewMealFood = await MealFood.insertMany(newArr)
                }
                const isMeal = await Meals.find({
                    author: req.body.id,
                })
    
                const isMealFood = await MealFood.find({
                })
                const isFood = await Foods.find({
                })
                if(isMeal && isMealFood && isFood) {
                    res.status(200).json({ 
                        allMeal: isMeal,
                        allMealFood: isMealFood,
                        allFood: isFood,
                    })
                }
                else res.status(401)
                
            }
            else {
                const isDeleteMeal = await Meals.deleteMany({
                    author: req.body.id,
                    created_at: req.body.createdAt
                })

                const isDeleteMealFood = await MealFood.deleteMany({
                    created_at: req.body.createdAt
                })
                if(req.body.breakfast.length !== 0) {
                    const newMeal = new Meals({
                        type: 'breakfast',
                        author: req.body.id,
                        created_at: req.body.createdAt
                    })
                    
                    const isSaveBreak = await newMeal.save()
                    const arrMealFood = req.body.breakfast
                    const newArr = arrMealFood.map(food => ({
                        meal_id: newMeal._id,
                        food_id: food._id,
                        qty: food.quantityFood,
                        created_at: req.body.createdAt
                    }))
                    const isNewMealFood = await MealFood.insertMany(newArr)
                }
                if(req.body.lunch.length !== 0) {
                    const newMeal = new Meals({
                        type: 'lunch',
                        author: req.body.id,
                        created_at: req.body.createdAt
                    })
                    
                    const isSaveBreak = await newMeal.save()
                    const arrMealFood = req.body.lunch
                    const newArr = arrMealFood.map(food => ({
                        meal_id: newMeal._id,
                        food_id: food._id,
                        qty: food.quantityFood,
                        created_at: req.body.createdAt
                    }))
                    const isNewMealFood = await MealFood.insertMany(newArr)
                }
                if(req.body.dinner.length !== 0) {
                    const newMeal = new Meals({
                        type: 'dinner',
                        author: req.body.id,
                        created_at: req.body.createdAt
                    })
                    
                    const isSaveBreak = await newMeal.save()
                    const arrMealFood = req.body.dinner
                    const newArr = arrMealFood.map(food => ({
                        meal_id: newMeal._id,
                        food_id: food._id,
                        qty: food.quantityFood,
                        created_at: req.body.createdAt
                    }))
                    const isNewMealFood = await MealFood.insertMany(newArr)
                }
                if(req.body.snacks.length !== 0) {
                    const newMeal = new Meals({
                        type: 'snacks',
                        author: req.body.id,
                        created_at: req.body.createdAt
                    })
                    
                    const isSaveBreak = await newMeal.save()
                    const arrMealFood = req.body.snacks
                    const newArr = arrMealFood.map(food => ({
                        meal_id: newMeal._id,
                        food_id: food._id,
                        qty: food.quantityFood,
                        created_at: req.body.createdAt
                    }))
                    const isNewMealFood = await MealFood.insertMany(newArr)
                }
                const isMeal = await Meals.find({
                    author: req.body.id,
                })
    
                const isMealFood = await MealFood.find({
                })
                const isFood = await Foods.find({
                })
                if(isMeal && isMealFood && isFood) {
                    res.status(200).json({ 
                        allMeal: isMeal,
                        allMealFood: isMealFood,
                        allFood: isFood,
                    })
                }
                else res.status(401)

            }
        }
        else if(req.body.type_update === 'deleteMeal') {
            const isDeleteMeal = await Meals.deleteMany({
                author: req.body.id,
                created_at: req.body.createdAt
            })

            const isDeleteMealFood = await MealFood.deleteMany({
                created_at: req.body.createdAt
            })
            const isMeal = await Meals.find({
                author: req.body.id,
            })

            const isMealFood = await MealFood.find({
            })
            const isFood = await Foods.find({
            })
            if(isMeal && isMealFood && isFood) {
                res.status(200).json({ 
                    allMeal: isMeal,
                    allMealFood: isMealFood,
                    allFood: isFood,
                })
            }
            else res.status(401)
        }
        else if(req.body.type_update === 'getMeal') {
            const isMeal = await Meals.find({
                author: req.body.id,
            })

            const isMealFood = await MealFood.find({
            })
            const isFood = await Foods.find({
            })
            if(isMeal && isMealFood && isFood) {
                res.status(200).json({ 
                    allMeal: isMeal,
                    allMealFood: isMealFood,
                    allFood: isFood,
                })
            }
            else res.status(401)
        }
        
    } catch (error) {
        res.status(404).json({ message: error.message }); 
    }
}


export default router

