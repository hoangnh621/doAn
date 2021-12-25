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
  USER_ADD_BODYINDEX_REQUEST,
  USER_ADD_BODYINDEX,
  ADD_BODYINDEX_FAIL,
  USER_ADD_GOALFREQUENCY_REQUEST,
  USER_ADD_GOALFREQUENCY,
  ADD_GOALFREQUENCY_FAIL,
  USER_UPDATEPERCENT,
  USER_UPDATEPERCENT_REQUEST,
  UPDATEPERCENT_FAIL,
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
  GETMENU_FAIL


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
    localStorage.removeItem('bodyIndex')
    localStorage.removeItem('goalFrequency')
    localStorage.removeItem('percentFood')
    localStorage.removeItem('bodyIndexSv')
    localStorage.removeItem('createMenu')
    localStorage.removeItem('updateMenu')
    localStorage.removeItem('deleteMenu')
    localStorage.removeItem('getMenu')
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

//Cập nhật chỉ số cá nhân
const addBodyIndex = (height, weight, age, bodyfat, sex) => async (dispatch, getState) => {
  dispatch({ type:USER_ADD_BODYINDEX_REQUEST, payload : {height, weight, age, bodyfat, sex}})
  try {
    const {userSignin: { userInfo }} = getState();
    const id = userInfo._id
    const type_update = 'bodyIndex'
    const { data } = await Axios.post("http://localhost:5000/goal",{type_update, id,height, weight, age, bodyfat, sex},
    {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    )
    dispatch({
     type: USER_ADD_BODYINDEX, payload: data
    });
    // localStorage.setItem('bodyIndex', JSON.stringify(data))
  } catch (error) {
    dispatch({ type: ADD_BODYINDEX_FAIL, payload: error.message });
  }
}

//Cập nhật mục tiêu và tần suất hoạt động
const addGoalFrequency = (calo_deviant, goal_id, frequency_id, goal_weight) => async (dispatch, getState) => {
  dispatch({ type:USER_ADD_GOALFREQUENCY_REQUEST, payload: {calo_deviant, goal_id, frequency_id, goal_weight}})
  try {
    const {userSignin: { userInfo }} = getState();
    const id = userInfo._id
    const type_update = 'goalFrequency'
    const { data } = await Axios.post("http://localhost:5000/goal",{type_update, id, calo_deviant, goal_id, frequency_id, goal_weight},
    {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    )
    dispatch({
     type: USER_ADD_GOALFREQUENCY, payload: data
    });
    // localStorage.setItem('goalFrequency', JSON.stringify(data))
  } catch (error) {
    dispatch({ type: ADD_GOALFREQUENCY_FAIL, payload: error.message });
  }
}

//Cập nhật tỷ lệ thức ăn
const updatePercentFood = (protein_per, carbs_per) => async (dispatch, getState) => {
  dispatch({ type:USER_UPDATEPERCENT_REQUEST, payload: {protein_per, carbs_per}})
  try {
    const {userSignin: { userInfo }} = getState();
    const id = userInfo._id
    const type_update = 'percentFood'
    const { data } = await Axios.post("http://localhost:5000/goal",{type_update, id, protein_per, carbs_per},
    {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    )
    dispatch({
     type: USER_UPDATEPERCENT, payload: data
    });
    // localStorage.setItem('percentFood', JSON.stringify(data))
  } catch (error) {
    dispatch({ type: UPDATEPERCENT_FAIL, payload: error.message });
  }
}

//Lấy dữ liệu chỉ số cá nhân
const getBodyIndex = () => async (dispatch, getState) => {
  dispatch({ type:USER_GETBODYINDEX_REQUEST})
  try {
    const {userSignin: { userInfo }} = getState();
    const id = userInfo._id
    const { data } = await Axios.put("http://localhost:5000/goal",{id},
    {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    )
    dispatch({
     type: USER_GETBODYINDEX, payload: data
    });
    localStorage.setItem('bodyIndexSv', JSON.stringify(data))
  } catch (error) {
    dispatch({ type: GETBODYINDEX_FAIL, payload: error.message });
  }
}

//Tạo thực đơn mới
const createMenu = (nameMenu, dataFood ) => async (dispatch, getState) => {
  dispatch({ type:USER_CREATEMENU_REQUEST, payload: {nameMenu, dataFood }})
  try {
    const {userSignin: { userInfo }} = getState();
    const id = userInfo._id
    const type_update = 'createMenu'
    const { data } = await Axios.post("http://localhost:5000/menu",{type_update, id, nameMenu, dataFood},
    {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    )
    dispatch({
     type: USER_CREATEMENU, payload: data
    });
    // localStorage.setItem('createMenu', JSON.stringify(data))
  } catch (error) {
    dispatch({ type: CREATEMENU_FAIL, payload: error.message });
  }
}

//Cập nhật thực đơn
const updateMenu = (nameMenu, dataFood ) => async (dispatch, getState) => {
  dispatch({ type:USER_UPDATEMENU_REQUEST, payload: {nameMenu, dataFood }})
  try {
    const {userSignin: { userInfo }} = getState();
    const id = userInfo._id
    const type_update = 'updateMenu'
    const { data } = await Axios.post("http://localhost:5000/menu",{type_update, id, nameMenu, dataFood},
    {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    )
    dispatch({
     type: USER_UPDATEMENU, payload: data
    });
    // localStorage.setItem('updateMenu', JSON.stringify(data))
  } catch (error) {
    dispatch({ type: UPDATEMENU_FAIL, payload: error.message });
  }
}

//Xóa thực đơn
const deleteMenu = (nameMenu ) => async (dispatch, getState) => {
  dispatch({ type:USER_DELETEMENU_REQUEST, payload: {nameMenu }})
  try {
    const {userSignin: { userInfo }} = getState();
    const id = userInfo._id
    const type_update = 'deleteMenu'
    const { data } = await Axios.post("http://localhost:5000/menu",{type_update, id, nameMenu},
    {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    )
    dispatch({
     type: USER_DELETEMENU, payload: data
    });
    console.log('data', data)
    localStorage.removeItem('getMenu')
    localStorage.setItem('getMenu', JSON.stringify(data))

    // localStorage.setItem('deleteMenu', JSON.stringify(data))
  } catch (error) {
    dispatch({ type: DELETEMENU_FAIL, payload: error.message });
  }
}

//Lấy thực đơn của user
const getMenuUser = () => async (dispatch, getState) => {
  dispatch({ type:USER_GETMENU_REQUEST})
  try {
    const {userSignin: { userInfo }} = getState();
    const id = userInfo._id
    const { data } = await Axios.put("http://localhost:5000/menu",{id},
    {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    )
    dispatch({
     type: USER_GETMENU, payload: data
    });
    localStorage.setItem('getMenu', JSON.stringify(data))
  } catch (error) {
    dispatch({ type: GETMENU_FAIL, payload: error.message });
  }
}

export { signin, logout, register, forgotpassword, resetpassword, addBodyIndex, addGoalFrequency,
  updatePercentFood,
  getBodyIndex,
  createMenu,
  updateMenu,
  deleteMenu,
  getMenuUser,
}