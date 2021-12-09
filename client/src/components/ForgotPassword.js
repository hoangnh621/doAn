import Logo from './Logo'
import '../scss/ForgotPassword.scss'
import {FiChevronLeft} from 'react-icons/fi'
import {Row, Col, Button} from 'reactstrap'
import InputInformation from './InputInformation'
import { NavLink } from 'react-router-dom'

function ForgotPassword() {
    return(
        <Row className="forgotPassword m-0">
            <Logo/>
            <Col  className = "d-none forgotPassword-image d-lg-flex col-lg-8 " >
                <div className="w-100 d-lg-flex">
                    <img 
                    src="https://pixinvent.com/demo/vuexy-react-admin-dashboard-template/demo-4/static/media/forgot-password-v2-dark.02a33442.svg"
                    alt="" 
                    />
                </div>
            </Col>
            <Col  className = "forgotPassword-welcome-form d-lg-flex p-lg-5 col-lg-4 col-sm-12" >
                <div className= "forgotPassword-welcome h-100 d-sm-flex col-md-6 col-lg-12">
                    <h2>Bạn đã quên mật khẩu &#128274;</h2>
                    <p>Hãy nhập email và chúng tôi sẽ gửi liên kết để đặt lại mật khẩu</p>
                    <form className ="forgotPassword-form" action="">
                        <InputInformation 
                        id = "forgotPassword-email" 
                        content="Email"
                        placeholder="example@gmail.com.vn"
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