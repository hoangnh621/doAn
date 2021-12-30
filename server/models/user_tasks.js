import mongoose from 'mongoose';

const user_task = mongoose.Schema({
    user_id: { 
        type: String, 
        require: true,
    },
   
},
{ collection: 'user_tasks'}
)

var user_tasks = mongoose.model('user_tasks', user_task);

export default user_tasks;