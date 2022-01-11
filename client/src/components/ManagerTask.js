import '../scss/ManagerFood.scss'
import { Button, Row, Col, Table, } from 'reactstrap'
import InputInformation from './InputInformation'
import { useState, useMemo } from 'react'
import { useSelector } from 'react-redux'


const ManagerBodyIndex = () => {
    const [typeFood, setTypeFood] = useState('')
    const [userSearch, setUserSearch] = useState('')
    const adminSetData = useSelector( state => {
        console.log(state)
        return state.adminSetData
    }
        )
    const { adminGetData } = adminSetData
    const [allTypeFoodData, setAllTypeFoodData] = useState([])
    useMemo(() => {
        if(adminGetData) {
            setAllTypeFoodData(adminGetData.typefood)
        }
    },[adminGetData])
    // const showDetailUser = (name, email, password) => {
    //     setUserName(name)
    //     setUserEmail(email)
    //     setUserPassword(password)
    // } 
    
    return (
        <div className = 'managerFood'>
        <div className="header-manager-food">
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
                    id = 'admin-input-typeFood'
                    content = 'Loại thức ăn'
                    placeholder = 'Nhập tên loại thức ăn'
                    data = {typeFood}
                    setData = {setTypeFood}
                    />
                </Col>
                <Col>
                </Col>
                <Col>
                </Col>
                <Col>
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
                        <th>Tên loại thức ăn</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {
                        allTypeFoodData.map((item, i) => {
                            return (
                                <tr key = {i} >
                                    <td>#{i}</td>
                                    <td>{item.name}</td>
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



export default ManagerBodyIndex
