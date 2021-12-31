import Logo from './Logo'
import '../scss/Home.scss'
import Taskbar from './Taskbar'
import {arrItems, adminItem} from './Data'
import MealItems from './MealItems'
import GoalItems from './GoalItems' 
import TaskItems from './TaskItems'
import HistoryItems from './HistoryItems'
import UserItems from './UserItems'
import ScreenItems from './ScreenItems'
import ManagerUser from './ManagerUser'
import HeaderAdmin from './HeaderAdmin'
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom'
import { Row, Col, ListGroup } from 'reactstrap'
import { useSelector, useDispatch} from 'react-redux'
import { useEffect, useState, useMemo } from 'react'
import MenuItems from './MenuItems'
import { getBodyIndex, getMenuUser, getFood, getHistoryWeightAction } from '../actions/userAction'
import { adminGetData} from '../actions/adminAction'




function Home() {

    const userSignin = useSelector( state => {
        console.log(state)
        return state.userSignin
    })
    const { userInfo } = userSignin
    const [isAdmin, setIsAdmin] = useState(false)
    // const { isAdmin } = userInfo
    console.log(userInfo)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [dataNavbar, setDataNavbar] = useState([])

    useMemo(() => {
        if(userInfo) {
            const nav = userInfo.isAdmin ? adminItem : arrItems
            setDataNavbar(nav)
            setIsAdmin(userInfo.isAdmin)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    useEffect(() => {
        if(!userInfo) {
            navigate('/login')
        }
        else {
            if(!userInfo.isAdmin) {
                dispatch(getBodyIndex())
                dispatch(getMenuUser())
                dispatch(getFood())
                dispatch(getHistoryWeightAction())
            }
            else {
                dispatch(adminGetData())
            }
        }
    })
    return (
        <>
            <Row className = "wrapper m-0">
                {/* Thanh công cụ bên trái màn hình */}
                <Col className = "main-menu p-0 col-lg-2 d-flex">
                    <Logo/>
                    <ListGroup>
                        {dataNavbar.length !== 0 ? 
                        dataNavbar.map((item, i) => {
                            return (
                                <NavLink 
                                className = {({isActive}) => isActive ? 'list-group-item active' : 'list-group-item'}
                                id = {item.id}
                                to = {item.to}
                                key = {i}
                                >
                                    {item.children}
                                    {item.text}
                                </NavLink>
                            )
                        })
                        : true
                    }
                    </ListGroup>
                </Col>
                {/* Taskbar: Thanh công cụ bên trên màn hình */}
                <Taskbar/>
                {/* Phần nội dung từng phân của ItemBar */}
                <Col className = "content col-lg-10 ">
                    {
                        isAdmin
                        ?
                        <HeaderAdmin/>
                        : true
                    }
                    {/* Toàn bộ nội dung của phần thực đơn */}
                    {
                        isAdmin 
                        ? 
                        <Routes>
                        <Route index element = {<ManagerUser/>}/>
                        </Routes>
                        : 
                        <Routes>
                            <Route index element = {<MealItems/>}/>
                            <Route path = '/meal'element = {<MealItems/>}/>
                            <Route path = '/menu'element = {<MenuItems/>}/>
                            <Route path = '/goal/*'element = {<GoalItems/>}/>
                            <Route path = '/history'element = {<HistoryItems/>}/>
                            <Route path = '/task'element = {<TaskItems/>}/>
                            <Route path = '/user'element = {<UserItems/>}/>
                            <Route path = '/screen'element = {<ScreenItems/>}/>
                        </Routes>
                    }
                </Col>
            </Row>
        </>
    )
}

export default Home;
