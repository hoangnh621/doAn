import { USER_CREATEMEAL_REQUEST, USER_CREATEMEAL, CREATEMEAL_FAIL, USER_DELETEMEAL_REQUEST, USER_DELETEMEAL, DELETEMEAL_FAIL,
    USER_GETMEAL_REQUEST,USER_GETMEAL, GETMEAL_FAIL
} from '../constants/userConstants'


function userSetMealReducer(state = {}, action) {
    switch (action.type) {
        case USER_CREATEMEAL_REQUEST:
            return { loading: true };
        case USER_CREATEMEAL:
            return {
                
                loading: false ,
                userSetMeal: action.payload
             };
        case CREATEMEAL_FAIL: 
            return { loading: false, error: action.payload };
        case USER_DELETEMEAL_REQUEST:
            return { loading: true };
        case USER_DELETEMEAL:
            return { loading: false , userSetMeal: action.payload };
        case DELETEMEAL_FAIL: 
            return { loading: false, error: action.payload };
            case USER_GETMEAL_REQUEST:
                return { loading: true };
            case USER_GETMEAL:
                return { loading: false ,userSetMeal: action.payload };
            case GETMEAL_FAIL: 
                return { loading: false, error: action.payload };
        default: return state;
    }
} 

export { userSetMealReducer }