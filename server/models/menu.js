import mongoose from 'mongoose';

const menu = mongoose.Schema({
    name: { 
        type: String, 
        require: true,
    },
    author: { 
        type: String, 
        require: true,
    },
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