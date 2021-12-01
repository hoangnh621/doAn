import mongoose from 'mongoose';

const foodSchema = mongoose.Schema({
    name: String,
    unit: String,
    quantity: Number,
    // protein: Number,
    // carbs: Number,
    // fat: Number,
    // author: String,
    protein: {
        type: Number,
        default: 0,
    },
    carbs: {
        type: Number,
        default: 0,
    },
    fat: {
        type: Number,
        default: 0,
    },
    author: {
        type: String, 
        default: 'system'
    },
})

var Foods = mongoose.model('Foods', foodSchema);

export default Foods;