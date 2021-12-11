import Logo from './Logo'
import '../scss/ForgotPassword.scss'
import {FiChevronLeft} from 'react-icons/fi'
import {Row, Col, Button} from 'reactstrap'
import InputInformation from './InputInformation'
import { NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { forgotpassword, logout } from '../actions/userAction'

function ForgotPassword() {
    const [email, setEmail] = useState('')
    const dispatch = useDispatch()
    const user = useSelector( state => state.userForgotPassword)
    const { userInfo, error} = user

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(forgotpassword(email))
    }

    useEffect(() => {
        dispatch(logout())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return(
        <Row className="forgotPassword m-0">
            <Logo/>
            <Col  className = "d-none forgotPassword-image d-lg-flex col-lg-8 " >
                <div className="w-100 d-lg-flex">
                    <img 
                    src="https://pixinvent.com/demo/vuexy-react-admin-dashboard-template/demo-4/static/media/forgot-password-v2-dark.5349f5b0.svg"
                    alt="" 
                    />
                </div>
            </Col>
            <Col  className = "forgotPassword-welcome-form d-lg-flex p-lg-5 col-lg-4 col-sm-12" >
                <div className= "forgotPassword-welcome h-100 d-sm-flex col-md-6 col-lg-12">
                    <h2>Bạn đã quên mật khẩu &#128274;</h2>
                    <p>Hãy nhập email và chúng tôi sẽ gửi liên kết để đặt lại mật khẩu</p>
                    {error && <p className = 'forgotPasswordFalse'>Email không tồn tại hoặc chưa đăng ký!</p>}
                    {userInfo && <p className = 'forgotPasswordSuccess'>Thành công! Hãy kiểm tra email của bạn!</p>}
                    <form className ="forgotPassword-form" onSubmit = {handleSubmit}>
                        <InputInformation 
                        id = "forgotPassword-email" 
                        content="Email"
                        placeholder="example@gmail.com.vn"
                        data = {email}
                        setData = {setEmail}
                        />
                        <Button className="btn-forgotPassword w-100">Gửi</Button>
                        <div>
                            <NavLink className = 'btn-outline-primary' to = '/login'><FiChevronLeft/> Quay lại đăng nhập</NavLink>
                        </div>
                    </form>
                </div>
            </Col>
        </Row> 

       
    )
}

export default ForgotPassword;