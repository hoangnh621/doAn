import mongoose from 'mongoose';

const bodyIndex = mongoose.Schema({
    author: String,
    height: Number,
    weight: Number,
    age: Number,
    sex: String,
    bodyfat: Number,
    calo_deviant: {
        type: Number,
        default: 0,
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
})

var BodyIndex = mongoose.model('body_index', bodyIndex);

export default BodyIndex;