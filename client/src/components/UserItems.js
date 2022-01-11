import '../scss/UserItems.scss'
import { Row, Col, Card, CardBody, CardTitle, Button } from 'reactstrap'
import img from '../images/user.png'
import InputInformation from './InputInformation'
import { useState } from 'react'


const UserItems = () => {
    const [userEmail, setUserEmail] = useState('')
    const [selectedImage, setSelectedImage] = useState(null);

    return (
        <Row className = 'user-items'>
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
                            setData = { setUserEmail }
                            />
                             <InputInformation
                            id = 'user-input-userName'
                            content = 'Tên người dùng'
                            type = 'text'
                            placeholder = 'Tên người dùng'
                            data = { userEmail }
                            setData = { setUserEmail }
                            /> <InputInformation
                            id = 'user-input-password'
                            content = 'Mật khẩu'
                            type = 'text'
                            placeholder = 'Mật khẩu của bạn'
                            data = { userEmail }
                            setData = { setUserEmail }
                            />
                        </Col>
                    </Row>
                </div>
            </Col>
            <Col>
                <div className="user-items-screen">
                    <div className="items-info-heading">
                        <h3>Cài đặt giao diện</h3>
                    </div>
                </div>
            </Col>
        </Row>
    )
}

export default UserItems
