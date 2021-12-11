import '../scss/Register.scss'
import {Row, Col, Button} from 'reactstrap'
import Logo from './Logo'
import { useState,  } from 'react'
import InputPassword from './InputPassword'
import InputInformation from './InputInformation'
import { NavLink,} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { register,  } from '../actions/userAction'


function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const userRegister = useSelector( state => state.userRegister)
    const { userInfo, error } = userRegister


    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(register(name, email, password))
    } 

   
  
    return(
        <Row className="register m-0">
            <Logo/>
            <Col  className = "d-none register-image d-lg-flex col-lg-8 " >
                <div className="w-100 d-lg-flex">
                    <img 
                    src="https://pixinvent.com/demo/vuexy-react-admin-dashboard-template/demo-4/static/media/register-v2-dark.0e4dbf53.svg"
                    alt="" 
                    />
                </div>
            </Col>
            <Col  className = "register-welcome-form d-lg-flex p-lg-5 col-lg-4 col-sm-12" >
                <div className= "register-welcome h-100 d-sm-flex col-md-6 col-lg-12">
                    <h2>Hãy đăng ký tại đây &#128640;</h2>
                    <p>Và cùng bắt đầu một cuộc phiêu lưu nào!!!</p>
                    {error && <p className = 'registerFalse'>Tên tài khoản hoặc email đã tồn tại!</p>}
                    {userInfo && <p className = 'registerDone'>Đăng ký thành công!</p>}
                    <form className ="register-form" onSubmit = {handleSubmit}>
                        <InputInformation 
                        id = "register-username" 
                        content="Tên tài khoản"
                        placeholder="huyhoang2412"
                        data = {name}
                        setData = {setName}
                        />
                        <InputInformation 
                        id = "register-email" 
                        content="Email"
                        placeholder="example@gmail.com.vn"
                        data = {email}
                        setData = {setEmail}
                        />
                         <InputPassword
                        id = "register-password" 
                        content="Mật khẩu"
                        placeholder="Mật khẩu"
                        isForgotPassword = {false}
                        data = {password}
                        setData = {setPassword}
                        />
                        {/* ô checkbox chưa được custom để nhớ tài khoản */}
                        <Button className="btn-register w-100">Đăng ký</Button>
                    </form>
                    <p className = 'toLogin'>Bạn đã có tài khoản? Hãy <NavLink to = '/login'>đăng nhập</NavLink></p>
                </div>
            </Col>
        </Row> 

       
    )
}

export default Register;