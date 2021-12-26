import mongoose from 'mongoose';

const typeFood = mongoose.Schema({
    name: { 
        type: String, 
        require: true,
    },
   slug: String,
},
{ collection: 'types_food'}
)

var TypeFood = mongoose.model('types_food', typeFood);

export default TypeFood;