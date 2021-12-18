import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';
import { userSigninReducer, userRegisterReducer, userForgotPasswordReducer, userResetPasswordReducer,
userAddBodyIndexReducer
} from './reducers/userReducers';

const userInfo = Cookie.getJSON('userInfo') || null
const bodyIndex = Cookie.getJSON('bodyIndex') || []
const initialState = {
    userSignin: { userInfo },
    bodyIndexState: { bodyIndex },
};

const reducer = combineReducers({
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    userForgotPassword: userForgotPasswordReducer,
    userResetPassword: userResetPasswordReducer,
    userAddBodyIndex: userAddBodyIndexReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);
export default store;