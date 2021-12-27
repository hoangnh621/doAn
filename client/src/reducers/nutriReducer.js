import { SET_NUTRI } from '../constants/userConstants'


function setNutriReducer(state = {}, action) {
    switch (action.type) {
        case SET_NUTRI: return { indexGoal: action.payload}
        default: return state;
    }
} 

export { setNutriReducer }
