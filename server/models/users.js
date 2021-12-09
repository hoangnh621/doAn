import mongoose from 'mongoose';

const users = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role_id: {
        type: String,
        default: '61ad5547298209b78d60dae2',
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