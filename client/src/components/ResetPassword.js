import Logo from './Logo'
import '../scss/ResetPassword.scss'
import {FiChevronLeft} from 'react-icons/fi'
import {Row, Col, Button} from 'reactstrap'
import InputPassword from './InputPassword'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetpassword } from '../actions/userAction'
import { useParams, NavLink } from 'react-router-dom'

function ResetPassword() {
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const dispatch = useDispatch()
    const { name } = useParams()
    const user = useSelector( state => state.userResetPassword)
    const { userInfo, error } = user
    const [isCheckPass, setIsCheckPass] = useState(false)

   

    const handleSubmit = (e) => {
        e.preventDefault()
        if(newPassword !== confirmPassword) {
            setIsCheckPass(true)
        }
        else {
            setIsCheckPass(false)
            dispatch(resetpassword(newPassword, name ))
        }
    }

    return(
        <Row className="resetPassword m-0">
            <Logo/>
            <Col  className = "d-none resetPassword-image d-lg-flex col-lg-8 " >
                <div className="w-100 d-lg-flex">
                    <img 
                    src="https://pixinvent.com/demo/vuexy-react-admin-dashboard-template/demo-4/static/media/login-v2-dark.e7fe27f6.svg"
                    alt="" 
                    />
                </div>
            </Col>
            <Col  className = "resetPassword-welcome-form d-lg-flex p-lg-5 col-lg-4 col-sm-12" >
                <div className= "resetPassword-welcome h-100 d-sm-flex col-md-6 col-lg-12">
                    <h2>Thay đổi mật khẩu &#128273;</h2>
                    <p>Đặt lại mật khẩu của bạn tại đây!</p>
                    {isCheckPass && <p className = 'resetPasswordFalse'>Mật khẩu mới và mật khẩu xác nhận không khớp!</p>}
                    {error && <p className = 'resetPasswordFalse'>Thay đổi mật khẩu thất bại!</p>}
                    {userInfo && <p className = 'resetPasswordTrue'>Thay đổi mật khẩu thành công!</p>}
                    <form className ="resetPassword-form" onSubmit = {handleSubmit}>
                        <InputPassword 
                        id = "resetPassword-new" 
                        content="Mật khẩu mới"
                        placeholder="Nhập mật khẩu mới"
                        isForgotPassword = {false}
                        data = {newPassword}
                        setData = {setNewPassword}
                        />
                         <InputPassword 
                        id = "resetPassword-new-confirm" 
                        content="Xác nhận mật khẩu mới"
                        placeholder="Xác nhận mật khẩu"
                        isForgotPassword = {false}
                        data = {confirmPassword}
                        setData = {setConfirmPassword}
                        />
                        <Button className="btn-resetPassword w-100">Thay đổi</Button>
                        <div className = 'resetBackLogin'>
                            <NavLink to = '/login' className = 'btn-outline-primary'><FiChevronLeft/> Quay lại đăng nhập</NavLink>
                        </div>
                    </form>
                </div>
            </Col>
        </Row> 

       
    )
}

export default ResetPassword;