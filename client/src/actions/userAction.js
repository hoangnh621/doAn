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
  GETMENU_FAIL,
  USER_CREATEFOOD_REQUEST,
  USER_CREATEFOOD,
  CREATEFOOD_FAIL,
  USER_GETTYPEFOOD_REQUEST,
  USER_GETTYPEFOOD,
  GETTYPEFOOD_FAIL,
  USER_UPDATEFOOD_REQUEST,
  USER_UPDATEFOOD,
  UPDATEFOOD_FAIL,
  USER_DELETEFOOD_REQUEST,
  USER_DELETEFOOD,
  DELETEFOOD_FAIL,
  USER_GETFOOD_REQUEST,
  USER_GETFOOD,
  GETFOOD_FAIL,
  USER_GETHISTORYWEIGHT, 
  USER_GETHISTORYWEIGHT_REQUEST,
  GETHISTORYWEIGHT_FAIL,
  USER_CREATETASK_REQUEST,
  USER_CREATETASK,
  CREATETASK_FAIL,
  USER_GETTASK_REQUEST,
  USER_GETTASK,
  GETTASK_FAIL,
  USER_DELETETASK_REQUEST,
  USER_DELETETASK,
  DELETETASK_FAIL,
  USER_CHECKEDTASK_REQUEST,
  USER_CHECKEDTASK,
  CHECKEDTASK_FAIL,
  THEME_DARK,
  THEME_LIGHT,
  USER_SETINFO_REQUEST,
  USER_SETINFO,
  SETINFO_FAIL,
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
    localStorage.removeItem('bodyIndexSv')
    localStorage.removeItem('getMenu')
    localStorage.removeItem('getTypeFood')
    localStorage.removeItem('setFood')
    localStorage.removeItem('setMeal')
    localStorage.removeItem('indexGoal')
    localStorage.removeItem('nutriToday')
    localStorage.removeItem('nutriTypeMeal')
    localStorage.removeItem('getHistoryWeight')
    localStorage.removeItem('setTask')
    localStorage.removeItem('adminGetData')
    localStorage.removeItem('userSetInfo')
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
const addBodyIndex = (height, weight, age, bodyfat, sex, createdAt) => async (dispatch, getState) => {
  dispatch({ type:USER_ADD_BODYINDEX_REQUEST, payload : {height, weight, age, bodyfat, sex, createdAt}})
  try {
    const {userSignin: { userInfo }} = getState();
    const id = userInfo._id
    const type_update = 'bodyIndex'
    const { data } = await Axios.post("http://localhost:5000/goal",{type_update, id,height, weight, age, bodyfat, sex,createdAt},
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
   
    localStorage.setItem('getMenu', JSON.stringify(data))
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
   
    localStorage.setItem('getMenu', JSON.stringify(data))
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

//Lấy các loại thức ăn
const getTypeFood = ( ) => async (dispatch, getState) => {
  dispatch({ type:USER_GETTYPEFOOD_REQUEST, payload: { }})
  try {
    const {userSignin: { userInfo }} = getState();
    
    const { data } = await Axios.get("http://localhost:5000/menu",
    {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    )
    dispatch({
     type: USER_GETTYPEFOOD, payload: data
    });
    localStorage.setItem('getTypeFood', JSON.stringify(data))
  } catch (error) {
    dispatch({ type: GETTYPEFOOD_FAIL, payload: error.message });
  }
}

//Tạo thức ăn mới
const createFood = (name, type, protein, carbs, fat ) => async (dispatch, getState) => {
  dispatch({ type:USER_CREATEFOOD_REQUEST, payload: {name, type, protein, carbs, fat }})
  try {
    const {userSignin: { userInfo }} = getState();
    const id = userInfo._id
    const type_update = 'createFood'
    const { data } = await Axios.post("http://localhost:5000/menu",{type_update, id, name, type, protein, carbs, fat},
    {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    )
    dispatch({
     type: USER_CREATEFOOD, payload: data
    });
    localStorage.setItem('setFood', JSON.stringify(data))
  } catch (error) {
    dispatch({ type: CREATEFOOD_FAIL, payload: error.message });
  }
}
//Cập nhật thức ăn
const updateFood = (name, type, protein, carbs, fat ) => async (dispatch, getState) => {
  dispatch({ type:USER_UPDATEFOOD_REQUEST, payload: {name, type, protein, carbs, fat }})
  try {
    const {userSignin: { userInfo }} = getState();
    const id = userInfo._id
    const type_update = 'updateFood'
    const { data } = await Axios.post("http://localhost:5000/menu",{type_update, id, name, type, protein, carbs, fat},
    {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    )
    dispatch({
     type: USER_UPDATEFOOD, payload: data
    });
    localStorage.setItem('setFood', JSON.stringify(data))
  } catch (error) {
    dispatch({ type: UPDATEFOOD_FAIL, payload: error.message });
  }
}

//Xóa thức ăn
const deleteFood = (name ) => async (dispatch, getState) => {
  dispatch({ type:USER_DELETEFOOD_REQUEST, payload: {name }})
  try {
    const {userSignin: { userInfo }} = getState();
    const id = userInfo._id
    const type_update = 'deleteFood'
    const { data } = await Axios.post("http://localhost:5000/menu",{type_update, id, name},
    {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    )
    dispatch({
     type: USER_DELETEFOOD, payload: data
    });
   console.log('data',data)
    localStorage.setItem('setFood', JSON.stringify(data))
  } catch (error) {
    dispatch({ type: DELETEFOOD_FAIL, payload: error.message });
  }
}

//Lấy thức ăn
const getFood = ( ) => async (dispatch, getState) => {
  dispatch({ type:USER_GETFOOD_REQUEST, payload: { }})
  try {
    const {userSignin: { userInfo }} = getState();
    const id = userInfo._id
    const type_update = 'getFood'
    const { data } = await Axios.post("http://localhost:5000/menu",{type_update, id },
    {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    )
    dispatch({
     type: USER_GETFOOD, payload: data
    });
    localStorage.setItem('setFood', JSON.stringify(data))
  } catch (error) {
    dispatch({ type: GETFOOD_FAIL, payload: error.message });
  }
}

//Lấy dữ liệu cân nặng
const getHistoryWeightAction = ( ) => async (dispatch, getState) => {
  dispatch({ type:USER_GETHISTORYWEIGHT_REQUEST, payload: { }})
  try {
    const {userSignin: { userInfo }} = getState();
    const id = userInfo._id
    const { data } = await Axios.post("http://localhost:5000/history",{ id },
    {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    )
    dispatch({
     type: USER_GETHISTORYWEIGHT, payload: data
    });
    localStorage.setItem('getHistoryWeight', JSON.stringify(data))
  } catch (error) {
    dispatch({ type: GETHISTORYWEIGHT_FAIL, payload: error.message });
  }
}

//Cập nhật/thêm task
const createTask = (name, type, desc, due ) => async (dispatch, getState) => {
  dispatch({ type:USER_CREATETASK_REQUEST, payload: {name, type, desc, due }})
  try {
    const {userSignin: { userInfo }} = getState();
    const id = userInfo._id
    const type_update = 'setTask'
    const { data } = await Axios.post("http://localhost:5000/task",{ type_update, id, name, type, desc, due},
    {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    )
    dispatch({
     type: USER_CREATETASK, payload: data
    });
    
    localStorage.setItem('setTask', JSON.stringify(data))
  } catch (error) {
    dispatch({ type: CREATETASK_FAIL, payload: error.message });
  }
}

//Cập nhật công việc đã checked
const checkedTask = (dataChecked ) => async (dispatch, getState) => {
  dispatch({ type:USER_CHECKEDTASK_REQUEST, payload: {dataChecked }})
  try {
    const {userSignin: { userInfo }} = getState();
    const id = userInfo._id
    const type_update = 'checkedTask'
    const { data } = await Axios.post("http://localhost:5000/task",{ type_update, id, dataChecked},
    {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    )
    dispatch({
     type: USER_CHECKEDTASK, payload: data
    });
    console.log('data', data)
    localStorage.setItem('setTask', JSON.stringify(data))
  } catch (error) {
    dispatch({ type: CHECKEDTASK_FAIL, payload: error.message });
  }
}


//Xóa task
const userDeleteTask = (taskId ) => async (dispatch, getState) => {
  dispatch({ type:USER_DELETETASK_REQUEST, payload: {taskId }})
  try {
    const {userSignin: { userInfo }} = getState();
    const id = userInfo._id
    const type_update = 'deleteTask'
    const { data } = await Axios.post("http://localhost:5000/task",{ type_update, id, taskId},
    {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    )
    dispatch({
     type: USER_DELETETASK, payload: data
    });
    
    localStorage.setItem('getTask', JSON.stringify(data))
  } catch (error) {
    dispatch({ type: DELETETASK_FAIL, payload: error.message });
  }
}

//Lấy ra task 
const userGetTask = ( ) => async (dispatch, getState) => {
  dispatch({ type:USER_GETTASK_REQUEST, payload: { }})
  try {
    const {userSignin: { userInfo }} = getState();
    const id = userInfo._id
    const type_update = 'getTask'
    const { data } = await Axios.post("http://localhost:5000/task",{ type_update, id, },
    {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    )
    dispatch({
     type: USER_GETTASK, payload: data
    });
    
    localStorage.setItem('getTask', JSON.stringify(data))
  } catch (error) {
    dispatch({ type: GETTASK_FAIL, payload: error.message });
  }
}

//Thay đổi tên người dùng và mật khẩu
const userSetInfo = ( name, password) => async (dispatch, getState) => {
  dispatch({ type:USER_SETINFO_REQUEST, payload: { name, password }})
  try {
    const {userSignin: { userInfo }} = getState();
    const id = userInfo._id
    const type_update = 'setInfo'
    const { data } = await Axios.post("http://localhost:5000/user",{ type_update, id, name, password },
    {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    )
    dispatch({
     type: USER_SETINFO, payload: data
    });
    console.log('data', data)
    localStorage.setItem('userSetInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({ type: SETINFO_FAIL, payload: error.message });
  }
}

//Thay đổi theme
const setThemeAction = (theme) => async (dispatch) =>{
    if(theme === 'light') 
    dispatch({type: THEME_LIGHT, payload: theme})
    else 
    dispatch({type: THEME_DARK, payload: theme})
}

export { signin, logout, register, forgotpassword, resetpassword, addBodyIndex, addGoalFrequency,
  updatePercentFood,
  getBodyIndex,
  createMenu,
  updateMenu,
  deleteMenu,
  getMenuUser,
  createFood,
  getTypeFood,
  updateFood,
  deleteFood,
  getFood,
  getHistoryWeightAction,
  createTask,
  userGetTask,
  userDeleteTask,
  checkedTask,
  setThemeAction,
  userSetInfo
}