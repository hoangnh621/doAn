import { SET_NUTRI, SET_NUTRITODAY, SET_NUTRITYPEMEAL } from '../constants/userConstants'


function setNutriReducer(state = {}, action) {
    switch (action.type) {
        case SET_NUTRI: return { ...state,indexGoal: action.payload}
        case SET_NUTRITODAY: return { ...state, nutriToday: action.payload}
        case SET_NUTRITYPEMEAL: return { ...state, nutriTypeMeal: action.payload}
        default: return state;
    }
} 

export { setNutriReducer }
