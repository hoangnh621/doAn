import mongoose from 'mongoose';

const menu = mongoose.Schema({
    name: String,
    author: String,
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
},
{ collection: 'menu'}
)

var Menu = mongoose.model('menu', menu);

export default Menu;