import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';
import { userSigninReducer, userRegisterReducer, userForgotPasswordReducer, userResetPasswordReducer,
userAddBodyIndexReducer,
userGetBodyIndexReducer
// userAddGoalFrequencyReducer,
} from './reducers/userReducers';

const userInfo = Cookie.getJSON('userInfo') || null
const initialState = {
    userSignin: { userInfo },
    bodyIndexState: {
      bodyIndex: localStorage.getItem('bodyIndex')
      ? JSON.parse(localStorage.getItem('bodyIndex'))
      : {}, 
      goalFrequency: localStorage.getItem('goalFrequency')
      ? JSON.parse(localStorage.getItem('goalFrequency'))
      : {}, 
      percent: localStorage.getItem('percent')
      ? JSON.parse(localStorage.getItem('percent'))
      : {}
    }, 
    bodyIndexServer: { 
      bodyIndexSv: localStorage.getItem('bodyIndexSv')
      ? JSON.parse(localStorage.getItem('bodyIndexSv'))
      : {},
    }
    // goalFrequencyState: { 
    //   goalFrequency: localStorage.getItem('goalFrequency')
    //   ? JSON.parse(localStorage.getItem('goalFrequency'))
    //   : {}
    // }, 
    // goalPercentState: { 
    //   percent: localStorage.getItem('percent')
    //   ? JSON.parse(localStorage.getItem('percent'))
    //   : {}
    // }
    
};

const reducer = combineReducers({
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    userForgotPassword: userForgotPasswordReducer,
    userResetPassword: userResetPasswordReducer,
    bodyIndexState: userAddBodyIndexReducer,
    bodyIndexServer: userGetBodyIndexReducer
    // goalFrequencyState: userAddGoalFrequencyReducer,
    
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);
export default store;