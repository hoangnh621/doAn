// import Axios from "axios";
import { SET_NUTRI, SET_NUTRITODAY, SET_NUTRITYPEMEAL } from '../constants/userConstants'

export const setNutri = (calo, protein, carbs, fat) => async (dispatch) =>{
    dispatch({ type:SET_NUTRI, payload: {calo, protein, carbs, fat}})
    localStorage.setItem('indexGoal', JSON.stringify({calo, protein, carbs, fat}))
    
}

export const setNutriToday = (calo, protein, carbs, fat) => async (dispatch) =>{
    dispatch({ type:SET_NUTRITODAY, payload: {calo, protein, carbs, fat}})
    localStorage.setItem('nutriToday', JSON.stringify({calo, protein, carbs, fat}))
    
}

export const setNutriTypeMeal = (caloBreak, caloLunch, caloDinner, caloSnacks) => async (dispatch) =>{
    dispatch({ type:SET_NUTRITYPEMEAL, payload: {caloBreak, caloLunch, caloDinner, caloSnacks}})
    localStorage.setItem('nutriTypeMeal', JSON.stringify({caloBreak, caloLunch, caloDinner, caloSnacks}))
    
}