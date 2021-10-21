import '../scss/SignIn.scss'
import {Row, Col, Button} from 'reactstrap'
import Logo from './Logo'
import InputPassword from './InputPassword'
import InputInformation from './InputInformation'

function SignIn() {
    return(
        <Row className="signIn m-0">
            <Logo/>
            <Col  className = "d-none signIn-image d-lg-flex col-lg-8 " >
                <div className="w-100 d-lg-flex">
                    <img 
                    src="https://pixinvent.com/demo/vuexy-react-admin-dashboard-template/demo-4/static/media/register-v2-dark.0e4dbf53.svg"
                    alt="" 
                    />
                </div>
            </Col>
            <Col  className = "signIn-welcome-form d-lg-flex p-lg-5 col-lg-4 col-sm-12" >
                <div className= "signIn-welcome h-100 d-sm-flex col-md-6 col-lg-12">
                    <h2>Hãy đăng ký tại đây &#128640;</h2>
                    <p>Và cùng bắt đầu một cuộc phiêu lưu nào!!!</p>
                    <form className ="signIn-form" action="">
                        <InputInformation 
                        id = "signIn-username" 
                        content="Tên tài khoản"
                        placeholder="huyhoang2412"
                        />
                        <InputInformation 
                        id = "signIn-email" 
                        content="Email"
                        placeholder="example@gmail.com.vn"
                        />
                         <InputPassword
                        id = "signIn-password" 
                        content="Mật khẩu"
                        placeholder="Mật khẩu"
                        isForgotPassword = {false}
                        />
                        {/* ô checkbox chưa được custom để nhớ tài khoản */}
                        {/* <div>
                            <input type="checkbox" name="rememberMe" id="rememberMe" /> 
                            <label htmlFor="rememberMe">Nhớ tài khoản</label>
                        </div> */}
                        <Button className="btn-signIn w-100">Đăng ký</Button>
                    </form>
                    <p>Bạn đã có tài khoản? Hãy <a href="https://www.facebook.com/">đăng nhập</a></p>
                </div>
            </Col>
        </Row> 

       
    )
}

export default SignIn;