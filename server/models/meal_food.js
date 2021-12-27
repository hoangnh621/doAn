import mongoose from 'mongoose';

const meal_food = mongoose.Schema({
    meal_id: { 
        type: String, 
        require: true,
    },
    food_id: { 
        type: String, 
        require: true,
    },
    qty: Number,
    created_at: {
        type: String,
        // default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
},
{ collection: 'meal_food'}
)

var MealFood = mongoose.model('meal_food', meal_food);

export default MealFood;