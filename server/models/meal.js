import mongoose from 'mongoose';

const meal = mongoose.Schema({
    type: { 
        type: String, 
        require: true,
    },
    author: { 
        type: String, 
        require: true,
    },
    created_at: {
        type: String,
        // default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
},
{ collection: 'meals'}
)

var Meals = mongoose.model('meals', meal);

export default Meals;