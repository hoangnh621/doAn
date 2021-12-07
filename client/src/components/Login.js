import '../scss/Login.scss'
import {Row, Col, Button} from 'reactstrap'
import Logo from './Logo'
import InputPassword from './InputPassword'
import InputInformation from './InputInformation'

function Login() {
    return(
        <Row className="login m-0">
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
                    <form className ="login-form" action="">
                        <InputInformation 
                        id = "login-email" 
                        content="Email"
                        placeholder="example@gmail.com.vn"
                        />
                         <InputPassword
                        id = "login-password" 
                        content="Mật khẩu"
                        placeholder="Mật khẩu"
                        isForgotPassword = {true}
                        />
                        {/* ô checkbox chưa được custom để nhớ tài khoản */}
                        {/* <div>
                            <input type="checkbox" name="rememberMe" id="rememberMe" /> 
                            <label htmlFor="rememberMe">Nhớ tài khoản</label>
                        </div> */}
                        <Button className="btn-login w-100">Đăng nhập</Button>
                    </form>
                    <p>Bạn chưa có tài khoản? Hãy <a href="https://www.facebook.com/">đăng ký</a></p>
                </div>
            </Col>
        </Row> 

       
    )
}

export default Login;