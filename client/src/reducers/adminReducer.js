import {ADMIN_GETDATA_REQUEST, ADMIN_GETDATA,
    GETDATA_FAIL 
 } from '../constants/adminConstants'

const adminGetDataReducer = (state = {}, action) => {
    switch (action.type) {
        case ADMIN_GETDATA_REQUEST: return { ...state, loading: true}
        case ADMIN_GETDATA: return { ...state, loading: false, adminGetData: action.payload}
        case GETDATA_FAIL: return { ...state, loading: false, error: action.payload}
        default: return state;
    }
} 

export { adminGetDataReducer }