import Axios from 'axios'
import { USER_CREATEMEAL_REQUEST, USER_CREATEMEAL, CREATEMEAL_FAIL, USER_DELETEMEAL_REQUEST, USER_DELETEMEAL, DELETEMEAL_FAIL, USER_GETMEAL_REQUEST,
  USER_GETMEAL, GETMEAL_FAIL,
} from '../constants/userConstants'

//Tạo và cập nhật bữa ăn
const createMeal = ( breakfast, lunch, dinner, snacks, createdAt ) => async (dispatch, getState) => {
    dispatch({ type:USER_CREATEMEAL_REQUEST})
    try {
      const {userSignin: { userInfo }} = getState();
      const id = userInfo._id
      const type_update = 'createMeal'
      const { data } = await Axios.post("http://localhost:5000/meal",{type_update, id, breakfast, lunch, dinner, snacks, createdAt },
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
      )
      dispatch({
       type: USER_CREATEMEAL, payload: data
      });
     console.log('data',data)
      localStorage.setItem('setMeal', JSON.stringify(data))
    } catch (error) {
      dispatch({ type: CREATEMEAL_FAIL, payload: error.message });
    }
}
//Xóa bữa ăn
const deleteMeal = ( createdAt ) => async (dispatch, getState) => {
  dispatch({ type:USER_DELETEMEAL_REQUEST})
  try {
    const {userSignin: { userInfo }} = getState();
    const id = userInfo._id
    const type_update = 'deleteMeal'
    const { data } = await Axios.post("http://localhost:5000/meal",{type_update, id, createdAt },
    {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    )
    dispatch({
     type: USER_DELETEMEAL, payload: data
    });
   console.log('data',data)
    localStorage.setItem('setMeal', JSON.stringify(data))
  } catch (error) {
    dispatch({ type: DELETEMEAL_FAIL, payload: error.message });
  }
}

//Lấy dữ liệu bữa ăn
const getMeal = (  ) => async (dispatch, getState) => {
  dispatch({ type:USER_GETMEAL_REQUEST})
  try {
    const {userSignin: { userInfo }} = getState();
    const id = userInfo._id
    const type_update = 'getMeal'
    const { data } = await Axios.post("http://localhost:5000/meal",{type_update, id,  },
    {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    )
    dispatch({
     type: USER_GETMEAL, payload: data
    });
   console.log('data',data)
    localStorage.setItem('setMeal', JSON.stringify(data))
  } catch (error) {
    dispatch({ type: GETMEAL_FAIL, payload: error.message });
  }
}

export { createMeal, deleteMeal, getMeal }
  