import '../scss/Login.scss'
import {Row, Col, Button} from 'reactstrap'
import Logo from './Logo'
import InputPassword from './InputPassword'
import InputInformation from './InputInformation'
import { NavLink, useNavigate } from 'react-router-dom'
import { useState, useEffect, } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { signin, logout } from '../actions/userAction'

function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const userSignin = useSelector(state => {
        console.log(state)
        return state.userSignin
    })
    const { userInfo, error } = userSignin
    const dispatch = useDispatch()

     //Xóa hành vi mặc đinh của form
     const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(signin(email, password))
    }

    const navigate = useNavigate()
    useEffect(() => {
        if(userInfo) {
            navigate('/')
        }
    })

    useEffect(() => {
        dispatch(logout())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
   

    return(
        <Row className="login m-0" >
            <Logo/>
            <Col  className = "d-none login-image d-lg-flex col-lg-8 " >
                <div className="w-100 d-lg-flex">
                    <img 
                    src="https://pixinvent.com/demo/vuexy-react-admin-dashboard-template/demo-4/static/media/error-dark.9fb69437.svg"
                    alt="" 
                    />
                </div>
            </Col>
            <Col  className = "login-welcome-form d-lg-flex p-lg-5 col-lg-4 col-sm-12" >
                <div className= "login-welcome h-100 d-sm-flex col-md-6 col-lg-12">
                    <h2>Chào mừng đến với 10FIT! &#128075;</h2>
                    <p>Vui lòng đăng nhập và bắt đầu thon gọn hơn nào!!!</p>
                    {error &&  <p>Email hoặc mật khẩu không đúng!</p>}
                    <form className ="login-form" onSubmit = {handleSubmit}>
                        <InputInformation 
                        id = "login-email" 
                        content="Email"
                        placeholder="example@gmail.com.vn"
                        data = {email}
                        setData = {setEmail}
                        />
                         <InputPassword
                        id = "login-password" 
                        content="Mật khẩu"
                        placeholder="Mật khẩu"
                        isForgotPassword = {true}
                        data = {password}
                        setData = {setPassword}
                        />
                        {/* ô checkbox chưa được custom để nhớ tài khoản */}
                        <Button 
                        className="btn-login w-100"
                        >
                            Đăng nhập
                        </Button>
                    </form>
                    <p className = 'toRegister'>Bạn chưa có tài khoản? Hãy <NavLink to = '/register' >đăng ký</NavLink></p>
                </div>
            </Col>
        </Row> 

       
    )
}

export default Login;