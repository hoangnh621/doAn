import mongoose from 'mongoose';

const users = mongoose.Schema({
    name: { 
        type: String, 
        require: true,
    },
    email: { 
        type: String, 
        require: true,
    },
    password: { 
        type: String, 
        require: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    img: String,
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
})

var Users = mongoose.model('Users', users);

export default Users;