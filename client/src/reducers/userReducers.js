import { USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL, USER_LOGOUT, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, 
    USER_REGISTER_FAIL,USER_FORGOTPASSWORD_REQUEST,
    USER_FORGOTPASSWORD_SUCCESS,
    USER_FORGOTPASSWORD_FAIL,
    USER_RESETPASSWORD_REQUEST,
    USER_RESETPASSWORD_SUCCESS,
    USER_RESETPASSWORD_FAIL,
} from "../constants/userConstants";

function userSigninReducer(state = {}, action) {
    switch (action.type) {
        case USER_SIGNIN_REQUEST:
            return { loading: true };
        case USER_SIGNIN_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case USER_SIGNIN_FAIL:
            return { loading: false, error: action.payload };
        case USER_LOGOUT:
            return {};
        default: return state;
    }
}

function userRegisterReducer(state = {}, action) {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return { loading: true };
        case USER_REGISTER_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case USER_REGISTER_FAIL:
            return { loading: false, error: action.payload };
        case USER_LOGOUT:
            return {};
        default: return state;
    }
}

function userForgotPasswordReducer(state = {}, action) {
    switch (action.type) {
        case USER_FORGOTPASSWORD_REQUEST:
            return { loading: true };
        case USER_FORGOTPASSWORD_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case USER_FORGOTPASSWORD_FAIL:
            return { loading: false, error: action.payload };
        case USER_LOGOUT:
                return {};
        default: return state;
    }
}   

function userResetPasswordReducer(state = {}, action) {
    switch (action.type) {
        case USER_RESETPASSWORD_REQUEST:
            return { loading: true };
        case USER_RESETPASSWORD_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case USER_RESETPASSWORD_FAIL:
            return { loading: false, error: action.payload };
        case USER_LOGOUT:
                return {};
        default: return state;
    }
} 

export { userSigninReducer, userRegisterReducer, userForgotPasswordReducer, userResetPasswordReducer }