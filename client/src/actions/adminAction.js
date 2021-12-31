import Axios from "axios";
import {ADMIN_GETDATA_REQUEST, ADMIN_GETDATA,
    GETDATA_FAIL 
 } from '../constants/adminConstants'

//Lấy toàn bộ dữ liệu
const adminGetData = () => async (dispatch, getState) => {
    dispatch({ type:ADMIN_GETDATA_REQUEST})
    try {
      const {userSignin: { userInfo }} = getState();
      const type_update = 'adminGetData'
      const { data } = await Axios.post("http://localhost:5000/",{type_update},
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
      )
      dispatch({
       type: ADMIN_GETDATA, payload: data
      });
      localStorage.setItem('adminGetData', JSON.stringify(data))
    } catch (error) {
      dispatch({ type: GETDATA_FAIL, payload: error.message });
    }
}

export {adminGetData}