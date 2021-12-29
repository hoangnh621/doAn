import mongoose from 'mongoose';

const detail_history = mongoose.Schema({
    history_weight_id: { 
        type: String, 
        require: true,
    },
    weight: Number,
    created_at: {
        type: String,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
},
{ collection: 'detail_history'}
)

var DetailHistory = mongoose.model('detail_history', detail_history);

export default DetailHistory;