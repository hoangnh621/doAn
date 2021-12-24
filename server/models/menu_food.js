import mongoose from 'mongoose';

const menu_food = mongoose.Schema({
    menu_id: String,
    food_id: String,
    qty: Number,
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
},
{ collection: 'menu_food'}
)

var MenuFood = mongoose.model('menu_food', menu_food);

export default MenuFood;