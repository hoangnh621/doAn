import { USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL, USER_LOGOUT, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, 
    USER_REGISTER_FAIL,USER_FORGOTPASSWORD_REQUEST,
    USER_FORGOTPASSWORD_SUCCESS,
    USER_FORGOTPASSWORD_FAIL,
    USER_RESETPASSWORD_REQUEST,
    USER_RESETPASSWORD_SUCCESS,
    USER_RESETPASSWORD_FAIL,
    USER_ADD_BODYINDEX,
    ADD_BODYINDEX_FAIL,
    USER_ADD_BODYINDEX_REQUEST,
    USER_ADD_GOALFREQUENCY_REQUEST,
    USER_ADD_GOALFREQUENCY,
    ADD_GOALFREQUENCY_FAIL,
    UPDATEPERCENT_FAIL,
    USER_UPDATEPERCENT_REQUEST,
    USER_UPDATEPERCENT,
    USER_GETBODYINDEX_REQUEST,
    USER_GETBODYINDEX,
    GETBODYINDEX_FAIL,
    USER_CREATEMENU_REQUEST,
    USER_CREATEMENU,
    CREATEMENU_FAIL,
    USER_UPDATEMENU_REQUEST,
    USER_UPDATEMENU,
    UPDATEMENU_FAIL,
    USER_DELETEMENU_REQUEST,
    USER_DELETEMENU,
    DELETEMENU_FAIL,
    USER_GETMENU_REQUEST,
    USER_GETMENU,
    GETMENU_FAIL,

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


function userAddBodyIndexReducer(state = {}, action) {
    switch (action.type) {
        case USER_ADD_BODYINDEX_REQUEST:
            return { ...state,loading: true };
        case USER_ADD_BODYINDEX:
            return {
                ...state,
                loading: false ,
                bodyIndex: action.payload
             };
        case ADD_BODYINDEX_FAIL: 
            return { ...state,loading: false, error: action.payload };
        case USER_ADD_GOALFREQUENCY_REQUEST:
            return { ...state,loading: true };
        case USER_ADD_GOALFREQUENCY:
            return { 
                ...state,
                loading: false ,
                goalFrequency: action.payload 
            };
        case ADD_GOALFREQUENCY_FAIL: 
            return { ...state, loading: false, error: action.payload };
        case USER_UPDATEPERCENT_REQUEST:
            return { ...state,loading: true };
        case USER_UPDATEPERCENT:
            return { ...state,loading: false ,percent: action.payload };
        case UPDATEPERCENT_FAIL: 
            return { ...state,loading: false, error: action.payload };
        default: return state;
    }
} 


function userGetBodyIndexReducer(state = {}, action) {
    switch (action.type) {
        case USER_GETBODYINDEX_REQUEST:
            return { loading: true };
        case USER_GETBODYINDEX:
            return { loading: false ,bodyIndexSv: action.payload };
        case GETBODYINDEX_FAIL: 
            return { loading: false, error: action.payload };
        default: return state;
    }
} 

function userAddMenuReducer(state = {}, action) {
    switch (action.type) {
        case USER_CREATEMENU_REQUEST:
            return { ...state,loading: true };
        case USER_CREATEMENU:
            return {
                ...state,
                loading: false ,
                createMenu: action.payload
             };
        case CREATEMENU_FAIL: 
            return { ...state,loading: false, error: action.payload };
        case USER_UPDATEMENU_REQUEST:
            return { ...state,loading: true };
        case USER_UPDATEMENU:
            return { 
                ...state,
                loading: false ,
                updateMenu: action.payload 
            };
        case UPDATEMENU_FAIL: 
            return { ...state, loading: false, error: action.payload };
        case USER_DELETEMENU_REQUEST:
            return { ...state,loading: true };
        case USER_DELETEMENU:
            return { ...state,loading: false , deleteMenu: action.payload };
        case DELETEMENU_FAIL: 
            return { ...state,loading: false, error: action.payload };
        default: return state;
    }
} 

function userGetMenuReducer(state = {}, action) {
    switch (action.type) {
        case USER_GETMENU_REQUEST:
            return { loading: true };
        case USER_GETMENU:
            return { loading: false ,getMenu: action.payload };
        case GETMENU_FAIL: 
            return { loading: false, error: action.payload };
        default: return state;
    }
} 

export { userSigninReducer, userRegisterReducer, userForgotPasswordReducer, userResetPasswordReducer,
    userAddBodyIndexReducer,
    userGetBodyIndexReducer,
    userAddMenuReducer,
    userGetMenuReducer,
}