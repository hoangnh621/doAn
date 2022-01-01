import '../scss/ManagerUser.scss'
import { Button, Row, Col, Table} from 'reactstrap'
import InputInformation from './InputInformation'
import { useState, useMemo } from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment'

const ManagerUser = () => {
    const [userName, setUserName] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const [userSearch, setUserSearch] = useState('')
    const adminSetData = useSelector( state => state.adminSetData)
    const { adminGetData } = adminSetData
    const [allUserData, setAllUserData] = useState([])
    useMemo(() => {
        if(adminGetData) {
            setAllUserData(adminGetData.users)
        }
    },[adminGetData])
    const showDetailUser = (name, email, password) => {
        setUserName(name)
        setUserEmail(email)
        setUserPassword(password)
    } 
    
    return (
        <div className = 'managerUser'>
            <div className="header-manager-user">
                <div className="admin-button-header">
                    <h4>Tùy chỉnh</h4>
                    <div className="admin-button-update">
                        <Button>Thêm mới</Button>
                        <Button>Cập nhật</Button>
                        <Button>Xóa</Button>
                    </div>
                </div>
                <Row className="admin-button-body">
                    <Col>
                        <InputInformation
                        id = 'admin-input-username'
                        content = 'Tên người dùng'
                        placeholder = 'Nhập tên người dùng'
                        data = {userName}
                        setData = {setUserName}
                        />
                    </Col>
                    <Col>
                        <InputInformation
                        id = 'admin-input-email'
                        content = 'Email'
                        placeholder = 'Nhập email'
                        data = {userEmail}
                        setData = {setUserEmail}
                        />
                    </Col>
                    <Col>
                        <InputInformation
                        id = 'admin-input-password'
                        content = 'Mật khẩu'
                        placeholder = 'Nhập mật khẩu'
                        data = {userPassword}
                        setData = {setUserPassword}
                        />
                    </Col>
                </Row>
            </div>
            <div className="body-manager-user">
                <Row className="header-table-manager">
                    <Col></Col>
                    <Col></Col>
                    <Col>
                        <InputInformation
                        id = 'admin-input-search'
                        content = 'Tìm kiếm'
                        placeholder = 'Nhập từ khóa'
                        data = {userSearch}
                        setData = {setUserSearch}
                        />
                    </Col>
                </Row>
                <Table borderless hover className = "m-0 userTable">
                    <thead>
                        <tr>
                            <th>Số thứ tự</th>
                            <th>Tên người dùng</th>
                            <th>Email</th>
                            <th>Mật khẩu</th>
                            <th>Ngày tạo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allUserData.map((item, i) => {
                                return (
                                    <tr key = {i} onClick = {()=> showDetailUser(item.name, item.email, item.password)}>
                                        <td>#{i}</td>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.password}</td>
                                        <td>{moment(item.created_at).format('DD-MM-YYYY')}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </div>
        </div>
    )
}



export default ManagerUser
