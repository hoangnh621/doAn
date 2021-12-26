import '../scss/MenuItems.scss'
import { Row, Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button, Table } from 'reactstrap'
import { createContext, useState, useEffect, useMemo, useRef } from 'react'
import MenuTable from './MenuTable'
import SearchMenuTable from './SearchMenuTable'
import { useDispatch, useSelector, } from 'react-redux'
import { getMenuUser, getTypeFood, createFood, updateFood, deleteFood } from '../actions/userAction'
import AllMenu from './AllMenu'
import { BsChevronDown } from 'react-icons/bs'
import InputInformation from './InputInformation'
import PaginationData from './PaginationData'

const ContextMenu = createContext()

const MenuItems = () => {
    const [checkedData, setCheckedData] = useState([])
    const [nameMenu, setNameMenu] = useState('')
    const [dropdownOpen, setDropdownOpen] = useState(false)

    const toggle = () => setDropdownOpen(prevState => !prevState)

    const dispatch = useDispatch()
    //Lấy ra thực đơn của người dùng
    useEffect(() => {
        dispatch(getMenuUser())
        dispatch(getTypeFood())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    //Lấy ra loại thức ăn
    const userF = useSelector( state => {
        // console.log(state)
        return state.userFood
    })
    const { userGetTypeFood, userSetFood } = userF
    //Tên thức ăn, các chỉ số và loại thức ăn
    const [nameFood, setNameFood] = useState('')
    const [proFood, setProFood] = useState('')
    const [carbsFood, setCarbsFood] = useState('')
    const [fatFood, setFatFood] = useState('')
    const [typeFood, setTypeFood] = useState({
        _id: '',
        name: ''
    })
    const handleTypeFood = (id, name) => {
        setTypeFood({
            _id: id,
            name: name
        })
    }
    //Thêm thức ăn
    const handleCreateFood = () => {
        dispatch(createFood(nameFood, typeFood._id, proFood, carbsFood, fatFood))
    }
    //Cập nhật thức ăn
    const handleUpdateFood = () => {
        dispatch(updateFood(nameFood, typeFood._id, proFood, carbsFood, fatFood))
    }
    //Xóa thức ăn
    const handleDeleteFood = () => {
        dispatch(deleteFood(nameFood))
        setNameFood('')
        setProFood('')
        setCarbsFood('')
        setFatFood('')
        setTypeFood({
            _id: '',
            name: ''
        })
    }

    //Phân trang bảng thức ăn của người dùng
    const [totalItems, setTotalItems] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const ITEMS_PER_PAGE = 3

     //Tìm kiếm và phân trang
     let computedFoodData = useMemo(() => {
         if(userSetFood) {

             let computedFoodData = userSetFood
             setTotalItems(computedFoodData.length)
             
             return computedFoodData.slice(
                 (currentPage - 1) * ITEMS_PER_PAGE,
                 (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
             )
         }
    }, [currentPage, userSetFood])

    const totalPages = useRef(0)
    useMemo(() => {
         totalPages.current = Math.ceil(userSetFood.length / ITEMS_PER_PAGE)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[userSetFood.current])

    //Ràng buộc dữ liệu thức ăn vào các input tương ứng
    const handleBindFood = (food) => {
        setNameFood(food.name)
        setProFood(food.protein)
        setCarbsFood(food.carbs)
        setFatFood(food.fat)
        if(userGetTypeFood) {
            const handleDataTypeFood = userGetTypeFood.filter(type => type._id === food.type)
            setTypeFood({ 
                _id: food.type, 
                name: handleDataTypeFood[0].name
            })
        }
    }

    return (
        <ContextMenu.Provider value = {[ checkedData, setCheckedData]}>
            <Row className = "content-menu-items">
            {/* bảng bữa ăn trong ngày */}
            <Col className="menu-table-items col-md-6 p-0 ">
                <div className = "menu-table">
                    <MenuTable
                    nameMenu = {nameMenu}
                    setNameMenu = {setNameMenu}
                    />
                </div>
                <Row className = 'all-menu'>
                    <Col>
                        <div className = 'all-menu-item'>
                            <AllMenu
                             setNameMenu = {setNameMenu}
                            />
                        </div>
                    </Col>
                    <Col>
                        <div className = 'custom-food-menu'>
                            <div className="header-custom-food">
                                <h3>Tùy chỉnh thức ăn</h3>
                                
                            </div>
                            <Row>
                                <Col>
                                    <div className="body-custom-food">
                                        <InputInformation
                                        id = 'body-custom-name'
                                        content = 'Tên thức ăn'
                                        type = 'text'
                                        placeholder = 'Nhập tên thức ăn'
                                        data = {nameFood}
                                        setData = {setNameFood}
                                        />
                                         <InputInformation
                                        id = 'body-custom-protein'
                                        content = 'Protein'
                                        type = 'number'
                                        placeholder = 'Nhập số protein'
                                        data = {proFood}
                                        setData = {setProFood}
                                        />
                                         <InputInformation
                                        id = 'body-custom-carbs'
                                        content = 'Carbs'
                                        type = 'number'
                                        placeholder = 'Nhập số carbs'
                                        data = {carbsFood}
                                        setData = {setCarbsFood}
                                        />
                                    </div>
                                </Col>
                                <Col>
                                <div className="body-custom-food">
                                    <InputInformation
                                            id = 'body-custom-fat'
                                            content = 'Fat'
                                            type = 'number'
                                            placeholder = 'Nhập số fat'
                                            data = {fatFood}
                                            setData = {setFatFood}
                                            />
                                    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                                        <DropdownToggle outline >
                                            {typeFood.name ? typeFood.name : 'Loại thức ăn'}
                                            <BsChevronDown/>
                                        </DropdownToggle>
                                        <DropdownMenu >
                                            {
                                                userGetTypeFood ?
                                                userGetTypeFood.map((typefood) => {
                                                    return  (
                                                    <DropdownItem 
                                                    key = {typefood.name}
                                                    onClick = {() => handleTypeFood(typefood._id, typefood.name)}
                                                    >
                                                        {typefood.name}
                                                    </DropdownItem>
                                                    )

                                                })
                                                : true
                                            }
                                                
                                        </DropdownMenu>
                                    </Dropdown>
                                    <p>Đơn vị: 100g</p>   
                                       
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Col>
            <Col className="search-menus-item col-md-6">
                <Row className = "search-chart-item">
                    <Col className="col-sm-12">
                        <SearchMenuTable/>
                    </Col>
                    <Col className="col-sm-12">
                        <div className = 'userfood-table'>
                            <div className="header-userfood-table">
                                <h3>Thức ăn của bạn</h3>
                                <div className="update-userfood">
                                    <Button onClick = {handleCreateFood}>Thêm mới</Button>
                                    <Button onClick = {handleUpdateFood}>Cập nhật</Button>
                                    <Button onClick = {handleDeleteFood}>Xóa</Button>
                                </div>
                            </div>
                            <div className="body-userfood-table">
                            <Table borderless hover className = "m-0 mealTable">
                                    <thead>
                                        <tr>
                                            <th>Thức ăn</th>
                                            <th>Số lượng</th>
                                            <th>Calories (calo)</th>
                                            <th>Protein (g)</th>
                                            <th>Carbs (g)</th>
                                            <th>Fat (g)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {   
                                            computedFoodData ?
                                            computedFoodData.map((dataObj) => {
                                                return (
                                                <tr key = {dataObj._id} onClick = {() => handleBindFood(dataObj)}>
                                                    <td>{dataObj.name}</td>
                                                    <td>{dataObj.quantity} ({dataObj.unit})</td>
                                                    <td>{(dataObj.protein*4 + dataObj.carbs*4 + dataObj.fat*9)}</td>
                                                    <td>{dataObj.protein }</td>
                                                    <td>{dataObj.carbs }</td>                    
                                                    <td>{dataObj.fat }</td>
                                                </tr>
                                                )
                                            })
                                            : true
                                         }
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                        <div className = 'pagination-data d-flex '>
                {
                    totalPages.current > 1 
                    ?
                    <PaginationData
                    total = {totalItems}
                    itemsPerPage = {ITEMS_PER_PAGE}
                    currentPage = {currentPage}
                    onPageChange = {page => setCurrentPage(page)}
                    />
                    : true
                }
            </div>
                    </Col>
                </Row>
            </Col>
        </Row>
        </ContextMenu.Provider>
    )
}

export { ContextMenu }
export default MenuItems
