import '../scss/UserItems.scss'
import { Row, Col, Card, CardBody, CardTitle, Button, CustomInput } from 'reactstrap'
import img from '../images/user.png'
import InputInformation from './InputInformation'
import InputPassword from './InputPassword'
import { useState, useMemo } from 'react'
import CustomRadio from './CustomRadio'
import { useSelector, useDispatch} from 'react-redux'
import { setThemeAction } from '../actions/userAction'
import { userSetInfo } from '../actions/userAction'
import CustomToast from './CustomToast'


const UserItems = () => {
    const [userEmail, setUserEmail] = useState('')
    const [userName, setUserName] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const [selectedImage, setSelectedImage] = useState(null);

    const [showToast, setShowToast] = useState(false)
    const toggleToast = () => {
        setShowToast(!showToast)
    }

    const allState = useSelector( state => state)
    const { setTheme, userSignin } = allState
    const { userSetTheme } = setTheme
    const dispatch = useDispatch()
    const handleTheme = (theme) => { 
        dispatch(setThemeAction(theme))

    }

    const { userInfo } = userSignin
    useMemo(() => {
        if(userInfo ) {
            const { email, name, password} = userInfo
            // const { password, name} = setUserInfo
            setUserEmail(email)
            setUserPassword(password)
            setUserName(name)
        }
    },[userInfo])

    const handleUserInfo = (userName, userPassword) => {
        dispatch(userSetInfo(userName, userPassword))
    }

    return (
        <Row className = {'user-items-'+ userSetTheme}>
            <Col>
                <div className="user-items-info">
                    <div className="items-info-heading">
                        <h3>Thông tin người dùng</h3>
                    </div>
                    <Row>
                        <Col>
                            <Card>
                                {
                                    selectedImage ?
                                    <img alt="Không hợp lệ"  src={URL.createObjectURL(selectedImage)} />
                                    :  <img alt="Không hợp lệ"  src={img} />
                                }
                                {/* <CardImg top  src= { img } alt="Ảnh đại diện" /> */}
                                <CardBody>
                                    <CardTitle tag="h6">Ảnh đại diện</CardTitle>
                                    <input
                                        type="file"
                                        id = 'inputImage'
                                        onChange={(event) => {
                                        console.log(event.target.files[0]);
                                        setSelectedImage(event.target.files[0]);
                                        }}
                                    />
                                    <div className = 'updateImage'>
                                        <label htmlFor="inputImage">Chọn ảnh</label>
                                        <Button onClick={()=>setSelectedImage(null)}>Xóa ảnh</Button>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col>
                            <InputInformation
                            id = 'user-input-email'
                            content = 'Email'
                            type = 'text'
                            placeholder = 'Email của bạn'
                            data = { userEmail }
                            isDisabled = {true}
                            />
                             <InputInformation
                            id = 'user-input-userName'
                            content = 'Tên người dùng'
                            type = 'text'
                            placeholder = 'Tên người dùng'
                            data = { userName }
                            setData = { setUserName }
                            /> <InputPassword
                            id = 'user-input-password'
                            content = 'Mật khẩu'
                            placeholder = 'Mật khẩu của bạn'
                            isForgotPassword = {false}
                            data = { userPassword }
                            setData = { setUserPassword }
                            />
                            <div className="user-save-info">
                                <Button onClick = {() => handleUserInfo(userName, userPassword)}>Lưu</Button>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Col>
            <Col>
                <div className="user-items-screen">
                    <div className="items-info-heading">
                        <h3>Cài đặt giao diện</h3>
                    </div>
                    <div className="items-info-body">
                        <h6>Theme</h6>
                        <div className="theme-setting">
                            <CustomRadio
                            label = 'Sáng'
                            name = 'theme'
                            id = 'light'
                            isChecked = {userSetTheme}
                            onChange = {() => handleTheme('light')}
                            />
                            <CustomRadio
                            label = 'Tối'
                            name = 'theme'
                            id = 'dark'
                            isChecked = {userSetTheme}
                            onChange = {() => handleTheme('dark')}
                            />
                        </div>
                        <hr />
                        <h6>Thanh công cụ
                        </h6>
                        <div className = 'navbar-setting'>
                        <CustomInput type="switch" id="exampleCustomSwitch" name="customSwitch" label="Tím" />
                        <CustomInput type="switch" id="exampleCustomSwitch2" name="customSwitch" label="Xanh" />
                        <CustomInput type="switch" id="exampleCustomSwitch3" name="customSwitch" label="Đỏ" />
                        <CustomInput type="switch" id="exampleCustomSwitch4" name="customSwitch" label="Vàng" />
                        <CustomInput type="switch" id="exampleCustomSwitch5" name="customSwitch" label="Xám" />
                        </div>
                        <hr />
                        <CustomToast
                            show = { showToast }
                            setShow = {setShowToast}
                            toggle = {toggleToast} 
                            title = 'Thành công'
                            content = 'Chúc mừng siêu béo'
                            status = 'toastSuccess'                      
                        />
                    </div>
                </div>
            </Col>
        </Row>
    )
}

export default UserItems
