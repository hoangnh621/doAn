import Logo from './Logo'
import '../scss/Home.scss'
import Taskbar from './Taskbar'
import {arrItems} from './Data'
import MealItems from './MealItems'
import GoalItems from './GoalItems' 
import TaskItems from './TaskItems'
import CalendarItems from './CalendarItems'
import UserItems from './UserItems'
import ScreenItems from './ScreenItems'
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom'
import { Row, Col, ListGroup } from 'reactstrap'
import { useSelector, useDispatch} from 'react-redux'
import { useEffect } from 'react'
import MenuItems from './MenuItems'
import { getBodyIndex, getMenuUser, getFood } from '../actions/userAction'




function Home() {

    const userSignin = useSelector( state => state.userSignin)
    const { userInfo } = userSignin
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if(!userInfo) {
            navigate('/login')
        }
        else {
            dispatch(getBodyIndex())
            dispatch(getMenuUser())
            dispatch(getFood())
        }
    })
    return (
        <>
            <Row className = "wrapper m-0">
                {/* Thanh công cụ bên trái màn hình */}
                <Col className = "main-menu p-0 col-lg-2 d-flex">
                    <Logo/>
                    <ListGroup>
                        {arrItems.map((item, i) => {
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
                        })}
                    </ListGroup>
                </Col>
                {/* Taskbar: Thanh công cụ bên trên màn hình */}
                <Taskbar/>
                {/* Phần nội dung từng phân của ItemBar */}
                <Col className = "content col-lg-10 ">
                    {/* Toàn bộ nội dung của phần thực đơn */}
                    <Routes>
                        <Route index element = {<MealItems/>}/>
                        <Route path = '/meal'element = {<MealItems/>}/>
                        <Route path = '/menu'element = {<MenuItems/>}/>
                        <Route path = '/goal/*'element = {<GoalItems/>}/>
                        <Route path = '/calendar'element = {<CalendarItems/>}/>
                        <Route path = '/task'element = {<TaskItems/>}/>
                        <Route path = '/user'element = {<UserItems/>}/>
                        <Route path = '/screen'element = {<ScreenItems/>}/>
                    </Routes>
                </Col>
            </Row>
        </>
    )
}

export default Home;
