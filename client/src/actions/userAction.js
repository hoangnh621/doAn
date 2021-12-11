import Axios from "axios";
import Cookie from 'js-cookie';
import {
  USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL, USER_LOGOUT,USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_FORGOTPASSWORD_REQUEST,
  USER_FORGOTPASSWORD_SUCCESS,
  USER_FORGOTPASSWORD_FAIL,
  USER_RESETPASSWORD_REQUEST,
  USER_RESETPASSWORD_SUCCESS,
  USER_RESETPASSWORD_FAIL,
} from "../constants/userConstants";

//Đăng nhập
const signin = (email, password) => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
    try {
      const { data } = await Axios.post("http://localhost:5000/login", { email, password });
      dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
      Cookie.set('userInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({ type: USER_SIGNIN_FAIL, payload: error.message });
    }
}

//Đăng xuất
const logout = () => (dispatch) => {
    Cookie.remove("userInfo");
    dispatch({ type: USER_LOGOUT })
}

//Đăng ký
const register = (name, email, password) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST, payload: { name, email, password } });
  try {
    const { data } = await Axios.post("http://localhost:5000/register", { name, email, password });
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    Cookie.set('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_REGISTER_FAIL, payload: error.message });
  }
}

//Quên mật khẩu
const forgotpassword = (email) => async (dispatch) => {
  dispatch({ type: USER_FORGOTPASSWORD_REQUEST, payload: { email} });
  try {
    const { data } = await Axios.post("http://localhost:5000/forgotpassword", {  email });
    dispatch({ type: USER_FORGOTPASSWORD_SUCCESS, payload: data });
    Cookie.set('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_FORGOTPASSWORD_FAIL, payload: error.message });
  }
}

//Thay đổi mật khẩu
const resetpassword = (password, name) => async (dispatch) => {
  dispatch({ type: USER_RESETPASSWORD_REQUEST, payload: { password, name} });
  try {
    const { data } = await Axios.post("http://localhost:5000/resetpassword/:name", {  password, name});
    dispatch({ type: USER_RESETPASSWORD_SUCCESS, payload: data });
    Cookie.set('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_RESETPASSWORD_FAIL, payload: error.message });
  }
}

export { signin, logout, register, forgotpassword, resetpassword }