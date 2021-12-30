import mongoose from 'mongoose';

const task = mongoose.Schema({
    name: { 
        type: String, 
        require: true,
    },
    type: { 
        type: String, 
        require: true,
    },
    desc: { 
        type: String, 
    },
    user_tasks_id: { 
        type: String, 
        require: true,
    },
    due: {
        type: String,
        // default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
},
{ collection: 'tasks'}
)

var tasks = mongoose.model('tasks', task);

export default tasks;