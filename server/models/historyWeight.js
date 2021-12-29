import mongoose from 'mongoose';

const history_weight = mongoose.Schema({
    user_id: { 
        type: String, 
        require: true,
    },
},
{ collection: 'history_weight'}
)

var HistoryWeight = mongoose.model('history_weight', history_weight);

export default HistoryWeight;