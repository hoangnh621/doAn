import Logo from './Logo'
import '../scss/ResetPassword.scss'
import {FiChevronLeft} from 'react-icons/fi'
import {Row, Col, Button} from 'reactstrap'
import InputPassword from './InputPassword'

function ResetPassword() {
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
                    <p>Mật khẩu mới của bạn phải khác với các mật khẩu đã thiết lập trước đây</p>
                    <form className ="resetPassword-form" action="">
                        <InputPassword 
                        id = "resetPassword-now" 
                        content="Mật khẩu hiện tại"
                        placeholder="Nhập mật khẩu hiện tại"
                        isForgotPassword = {false}
                        />
                        <InputPassword 
                        id = "resetPassword-new" 
                        content="Mật khẩu mới"
                        placeholder="Nhập mật khẩu mới"
                        isForgotPassword = {false}
                        />
                         <InputPassword 
                        id = "resetPassword-new-confirm" 
                        content="Xác nhận mật khẩu mới"
                        placeholder="Xác nhận mật khẩu"
                        isForgotPassword = {false}
                        />
                        <Button className="btn-resetPassword w-100">Thay đổi</Button>
                        <div>
                            <Button outline color="primary"><FiChevronLeft/> Quay lại đăng nhập</Button>
                        </div>
                    </form>
                </div>
            </Col>
        </Row> 

       
    )
}

export default ResetPassword;