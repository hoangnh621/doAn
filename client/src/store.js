import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';
import { userSigninReducer, userRegisterReducer, userForgotPasswordReducer, userResetPasswordReducer,
userGetBodyIndexReducer,
userAddMenuReducer,
userSetFoodReducer,
getHistoryWeightReducer
} from './reducers/userReducers';

import { setNutriReducer } from './reducers/nutriReducer'
import { userSetMealReducer } from './reducers/mealReducer'

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
    userMeal: { 
      userSetMeal: localStorage.getItem('setMeal')
      ? JSON.parse(localStorage.getItem('setMeal'))
      : {},
    },
    
    userFood: {
        userSetFood: localStorage.getItem('setFood')
        ? JSON.parse(localStorage.getItem('setFood'))
        : [],
        userGetTypeFood: localStorage.getItem('getTypeFood')
        ? JSON.parse(localStorage.getItem('getTypeFood'))
        : [],
    },

    userIndexGoal: {
      indexGoal: localStorage.getItem('indexGoal')
      ? JSON.parse(localStorage.getItem('indexGoal'))
      : {},
      nutriToday: localStorage.getItem('nutriToday')
      ? JSON.parse(localStorage.getItem('nutriToday'))
      : {},
      nutriTypeMeal: localStorage.getItem('nutriTypeMeal')
      ? JSON.parse(localStorage.getItem('nutriTypeMeal'))
      : {},
    },
    userWeight: {
      getHistoryWeight: localStorage.getItem('getHistoryWeight')
      ? JSON.parse(localStorage.getItem('getHistoryWeight'))
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
    userIndexGoal: setNutriReducer,
    userMeal: userSetMealReducer,
    userWeight: getHistoryWeightReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);
export default store;