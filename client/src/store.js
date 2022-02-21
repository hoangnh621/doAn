import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';
import { userSigninReducer, userRegisterReducer, userForgotPasswordReducer, userResetPasswordReducer,
userGetBodyIndexReducer,
userAddMenuReducer,
userSetFoodReducer,
getHistoryWeightReducer,
setTaskReducer,
userSetThemeReducer,
userSetInfoReducer
} from './reducers/userReducers';
import { adminGetDataReducer } from './reducers/adminReducer'
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
    },
    userTask: {
      setTask: localStorage.getItem('setTask')
      ? JSON.parse(localStorage.getItem('setTask'))
      : {},
      getTask: localStorage.getItem('getTask')
      ? JSON.parse(localStorage.getItem('getTask'))
      : {},
    },

    adminSetData: {
      adminGetData: localStorage.getItem('adminGetData')
      ? JSON.parse(localStorage.getItem('adminGetData'))
      : null,
    },
    setTheme: {
      userSetTheme: localStorage.getItem('userSetTheme')
      ? JSON.parse(localStorage.getItem('userSetTheme'))
      : 'dark',
    },
    setUserInfo: {
      setNamePassword: localStorage.getItem('userSetInfo')
      ? JSON.parse(localStorage.getItem('userSetInfo'))
      : 'dark',
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
    userTask: setTaskReducer, 
    adminSetData: adminGetDataReducer,
    setTheme: userSetThemeReducer, 
    setUserInfo: userSetInfoReducer
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);
export default store;