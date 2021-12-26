import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';
import { userSigninReducer, userRegisterReducer, userForgotPasswordReducer, userResetPasswordReducer,
userGetBodyIndexReducer,
userAddMenuReducer,
userSetFoodReducer,
} from './reducers/userReducers';

const userInfo = Cookie.getJSON('userInfo') || null
const initialState = {
    userSignin: { userInfo },
    bodyIndexServer: { 
      bodyIndexSv: localStorage.getItem('bodyIndexSv')
      ? JSON.parse(localStorage.getItem('bodyIndexSv'))
      : {},
    }, 

    userMenu: { 
      userGetMenu: localStorage.getItem('getMenu')
      ? JSON.parse(localStorage.getItem('getMenu'))
      : {},
    },
    
    userFood: {
        userSetFood: localStorage.getItem('setFood')
        ? JSON.parse(localStorage.getItem('setFood'))
        : {},
        userGetTypeFood: localStorage.getItem('getTypeFood')
        ? JSON.parse(localStorage.getItem('getTypeFood'))
        : {},
    }
    
};

const reducer = combineReducers({
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    userForgotPassword: userForgotPasswordReducer,
    userResetPassword: userResetPasswordReducer,
    bodyIndexServer: userGetBodyIndexReducer,
    userMenu: userAddMenuReducer, 
    userFood: userSetFoodReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);
export default store;