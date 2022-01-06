import '../scss/ManagerFood.scss'
import { Button, Row, Col, Table, Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap'
import InputInformation from './InputInformation'
import { useState, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { BsChevronDown } from 'react-icons/bs'


const ManagerBodyIndex = () => {
    const [foodProtein, setFoodProtein] = useState('')
    const [foodCarbs, setFoodCarbs] = useState('')
    const [foodFat, setFoodFat] = useState('')
    const [userSearch, setUserSearch] = useState('')
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const toggle = () => setDropdownOpen(!dropdownOpen)
    const adminSetData = useSelector( state => state.adminSetData)
    const { adminGetData } = adminSetData
    const [allFoodData, setAllFoodData] = useState([])
    const [allTypeFoodData, setAllTypeFoodData] = useState([])
    useMemo(() => {
        if(adminGetData) {
            const dataFood = adminGetData.foods.map(food => {
                const typeF = adminGetData.typefood.filter(typefood => typefood._id === food.type)
                return {
                    ...food,
                    nameTypeFood: typeF[0].name
                }
            })
            setAllFoodData(dataFood)
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
                    id = 'admin-input-protein'
                    content = 'Protein'
                    placeholder = 'Nhập lượng protein'
                    data = {foodProtein}
                    setData = {setFoodProtein}
                    />
                </Col>
                <Col>
                    <InputInformation
                    id = 'admin-input-carbs'
                    content = 'Carbs'
                    placeholder = 'Nhập lượng carbs'
                    data = {foodCarbs}
                    setData = {setFoodCarbs}
                    />
                </Col>
                <Col>
                    <InputInformation
                    id = 'admin-input-fat'
                    content = 'Fat'
                    placeholder = 'Nhập lượng fat'
                    data = {foodFat}
                    setData = {setFoodFat}
                    />
                </Col>
                <Col>
                    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                        <DropdownToggle outline >
                            Loại thức ăn
                            <BsChevronDown/>
                        </DropdownToggle>
                        <DropdownMenu >
                            {
                                allTypeFoodData.map((typefood) => {
                                    return  (
                                    <DropdownItem 
                                    key = {typefood.name}
                                    // onClick = {() => handleTypeFood(typefood._id, typefood.name)}
                                    >
                                        {typefood.name}
                                    </DropdownItem>
                                    )
                                })
                            }
                        </DropdownMenu>
                    </Dropdown>
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
                        <th>Tên thức ăn</th>
                        <th>Protein</th>
                        <th>Carbs</th>
                        <th>Fat</th>
                        <th>Loại thức ăn</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allFoodData.map((item, i) => {
                            return (
                                <tr key = {i} >
                                    <td>#{i}</td>
                                    <td>{item.name}</td>
                                    <td>{item.protein}</td>
                                    <td>{item.carbs}</td>
                                    <td>{item.fat}</td>
                                    <td>{item.nameTypeFood}</td>
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
