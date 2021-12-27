// import Axios from "axios";
import { SET_NUTRI } from '../constants/userConstants'

export const setNutri = (calo, protein, carbs, fat) => async (dispatch) =>{
    dispatch({ type:SET_NUTRI, payload: {calo, protein, carbs, fat}})
    localStorage.setItem('indexGoal', JSON.stringify({calo, protein, carbs, fat}))
    
}