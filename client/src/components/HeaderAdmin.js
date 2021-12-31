import '../scss/HeaderAdmin.scss'
import { Row, Col} from 'reactstrap'
import { FiUserCheck } from 'react-icons/fi'
import { MdOutlineFastfood } from 'react-icons/md'
import { BiFoodMenu } from 'react-icons/bi'
import { GiHotMeal } from 'react-icons/gi'
import { useSelector } from 'react-redux'
import { useState, useMemo} from 'react'

const HeaderAdmin = () => {
    const adminSetData = useSelector( state => state.adminSetData)
    const { adminGetData } = adminSetData
    const [headerState, setHeaderState] = useState({
        totalUser: 0,
        totalFood: 0,
        totalTypeFood: 0,
        totalMenu: 0,
    })
    const { totalUser, totalFood, totalTypeFood, totalMenu } =headerState

    useMemo(() => {
        if(adminGetData) {
            setHeaderState({ 
                totalUser: adminGetData.users.length,
                totalFood: adminGetData.foods.length,
                totalTypeFood: adminGetData.typefood.length,
                totalMenu: adminGetData.menu.length,
            })
        }
    },[adminGetData])
    return (
        <Row className = 'header-admin'>
            <Col>
                <div className="item-header-admin">
                    <div className="total-item">
                        <h3>{ totalUser  }</h3>
                        <p>Người dùng</p>
                    </div>
                    <div className="icon-admin">
                        <FiUserCheck/>
                    </div>
                </div>
            </Col>
            <Col>
                <div className="item-header-admin">
                    <div className="total-item">
                        <h3>{totalFood }</h3>
                        <p>Thức ăn</p>
                    </div>
                    <div className="icon-admin">
                        <MdOutlineFastfood/>    
                    </div>
                </div>
            </Col>
            <Col>
                <div className="item-header-admin">
                    <div className="total-item">
                        <h3>{ totalTypeFood }</h3>
                        <p>Loại thức ăn</p>
                    </div>
                    <div className="icon-admin">
                        <BiFoodMenu/>
                    </div>
                </div>
            </Col>
            <Col>
                <div className="item-header-admin">
                    <div className="total-item">
                        <h3>{ totalMenu }</h3>
                        <p>Thực đơn</p>
                    </div>
                    <div className="icon-admin">
                        <GiHotMeal/>
                    </div>
                </div>
            </Col>
        </Row>
    )


}

export default HeaderAdmin
