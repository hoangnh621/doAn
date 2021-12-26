import mongoose from 'mongoose';

const menu_food = mongoose.Schema({
    menu_id: { 
        type: String, 
        require: true,
    },
    food_id: { 
        type: String, 
        require: true,
    },
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