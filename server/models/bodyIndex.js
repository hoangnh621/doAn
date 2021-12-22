import mongoose from 'mongoose';

const bodyIndex = mongoose.Schema({
    author: String,
    height: {
        type: Number,
         default: 0,
    },
    weight: {
        type: Number,
         default: 0,
    },
    goal_weight: Number,
    age: {
        type: Number,
        default: 0,
    },
    sex: {
        type: String, 
        default: 'male'
    },
    bodyfat: {
        type: Number, 
        default: 0,
    },
    calo_deviant: {
        type: Number,
        default: 0,
    },
    protein_per: {
        type: Number,
        default: 40,
    },
    carbs_per: {
        type: Number,
        default: 40,
    },
    goal_id: {
        type: String, 
        default: '61bdca5246e2ce99d3deb693'
    }, 
    frequency_id: String,
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
}, 
{ collection: 'body_index'}
)

var BodyIndex = mongoose.model('body_index', bodyIndex);

export default BodyIndex;