import mongoose from 'mongoose';

const foodSchema = mongoose.Schema({
    name: { 
        type: String, 
        require: true,
    },
    type: { 
        type: String, 
        require: true,
        default: '61ad74f1298209b78d60daf8'
    },
    unit: { 
        type: String, 
        default: 'g',
    },
    quantity: { 
        type: Number, 
        default: 100,
    },
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
        default: 'system',
        require: true,
    },
    slug: String,
})

var Foods = mongoose.model('Foods', foodSchema);

export default Foods;