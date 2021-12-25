import '../scss/MenuItems.scss'
import { Row, Col } from 'reactstrap'
import { createContext, useState, useEffect } from 'react'
import MenuTable from './MenuTable'
import SearchMenuTable from './SearchMenuTable'
import { useDispatch, useSelector } from 'react-redux'
import { getMenuUser } from '../actions/userAction'
import AllMenu from './AllMenu'

const ContextMenu = createContext()

const MenuItems = () => {
    const [checkedData, setCheckedData] = useState([])
    const [nameMenu, setNameMenu] = useState('')

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getMenuUser())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    const userMenu = useSelector( state => 
        {
            console.log(state)
            return state.userMenu
        }
    )
    console.log('json',JSON.parse(localStorage.getItem('getMenu')))
    console.log('re-render')
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
                <Row className = 'calendar-menu'>
                    <Col>
                        <div className = 'all-menu-item'>
                            <AllMenu
                             setNameMenu = {setNameMenu}
                            />
                        </div>
                    </Col>
                    <Col>
                        <div className = 'custom-food-menu'>
                            
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
                    <div>
                    
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
