import '../scss/ManagerBodyIndex.scss'
import { Button, Row, Col, Table} from 'reactstrap'
import InputInformation from './InputInformation'
import { useState, useMemo } from 'react'
import { useSelector } from 'react-redux'
import CustomRadio from './CustomRadio'

const ManagerBodyIndex = () => {
    const [userHeight, setUserHeight] = useState('')
    const [userWeight, setUserWeight] = useState('')
    const [userAge, setUserAge] = useState('')
    const [userBodyFat, setUserBodyFat] = useState('')
    const [userSearch, setUserSearch] = useState('')
    const [sex, setSex] = useState('')
    const adminSetData = useSelector( state => state.adminSetData)
    const { adminGetData } = adminSetData
    const [allBodyIndexData, setAllBodyIndexData] = useState([])
    useMemo(() => {
        if(adminGetData) {
            const dataUser = adminGetData.users
            const dataBodyIndex = dataUser.map(user => {
                const bodyIndexUser = adminGetData.bodyIndex.filter(bodyIndex => bodyIndex.author === user._id)
                return {
                    userName: user.name,
                    height: bodyIndexUser[0].height,
                    weight: bodyIndexUser[0].weight,
                    age: bodyIndexUser[0].age,
                    bodyfat: bodyIndexUser[0].bodyfat,
                    sex: bodyIndexUser[0].sex,
                }
            })

            setAllBodyIndexData(dataBodyIndex)
        }
    },[adminGetData])
    // const showDetailUser = (name, email, password) => {
    //     setUserName(name)
    //     setUserEmail(email)
    //     setUserPassword(password)
    // } 
    
    return (
        <div className = 'managerBodyIndex'>
        <div className="header-manager-bodyIndex">
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
                    id = 'admin-input-height'
                    content = 'Chiều cao'
                    placeholder = 'Nhập chiều cao'
                    data = {userHeight}
                    setData = {setUserHeight}
                    />
                </Col>
                <Col>
                    <InputInformation
                    id = 'admin-input-weight'
                    content = 'Cân nặng'
                    placeholder = 'Nhập cân nặng'
                    data = {userWeight}
                    setData = {setUserWeight}
                    />
                </Col>
                <Col>
                    <InputInformation
                    id = 'admin-input-age'
                    content = 'Tuổi'
                    placeholder = 'Nhập tuổi'
                    data = {userAge}
                    setData = {setUserAge}
                    />
                </Col>
                <Col>
                    <InputInformation
                    id = 'admin-input-bodyfat'
                    content = 'BodyFat'
                    placeholder = 'Nhập bodyfat'
                    data = {userBodyFat}
                    setData = {setUserBodyFat}
                    />
                </Col>
                <Col>
                    <p>Giới tính</p>
                    <div className="admin-sex">
                        <CustomRadio 
                        label = 'Nam'
                        name = 'sex'
                        id = 'male-admin'
                        isChecked = {sex}
                        onChange = {()=> setSex('male')}
                        />
                        <CustomRadio 
                        label = 'Nữ'
                        name = 'sex'
                        id = 'female-admin'
                        isChecked = {sex}
                        onChange = {()=> setSex('female')}
                        />
                    </div>
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
                        <th>Chiều cao</th>
                        <th>Cân nặng</th>
                        <th>Tuổi</th>
                        <th>Giới tính</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allBodyIndexData.map((item, i) => {
                            return (
                                <tr key = {i} >
                                    <td>#{i}</td>
                                    <td>{item.userName}</td>
                                    <td>{item.height}</td>
                                    <td>{item.weight}</td>
                                    <td>{item.age}</td>
                                    <td>{item.sex}</td>
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
