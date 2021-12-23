import '../scss/MenuItems.scss'
import { Row, Col } from 'reactstrap'
import { createContext, useState } from 'react'
import MenuTable from './MenuTable'
import SearchMenuTable from './SearchMenuTable'

const ContextMenu = createContext()

const MenuItems = () => {
    const [checkedData, setCheckedData] = useState([])

    return (
        <ContextMenu.Provider value = {[ checkedData, setCheckedData]}>
            <Row className = "content-menu-items">
            {/* bảng bữa ăn trong ngày */}
            <Col className="menu-table-items col-md-6 p-0 ">
                <div className = "menu-table">
                    <MenuTable/>
                </div>
                <Row className = 'calendar-menu'>
                    <Col>
                        <div className = 'calendaritem'>
                        </div>
                    </Col>
                    <Col>
                        <div className = 'progress-menu'>
                            
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
