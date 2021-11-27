import Logo from './Logo'
import '../scss/Home.scss'
// import {useState} from 'react'
import Taskbar from './Taskbar'
import {arrItems} from './Data'
import MealItems from './MealItems'
import GoalItems from './GoalItems' 
import TaskItems from './TaskItems'
import CalendarItems from './CalendarItems'
import UserItems from './UserItems'
import ScreenItems from './ScreenItems'
import { Routes, Route, NavLink } from 'react-router-dom'
import { Row, Col, ListGroup } from 'reactstrap'


function Home() {

    // const [checkedMenu, setCheckedMenu] = useState('');

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
                        <Route path = '/'element = {<MealItems/>}/>
                        <Route path = '/meal'element = {<MealItems/>}/>
                        <Route path = '/goal'element = {<GoalItems/>}/>
                        <Route path = '/task'element = {<TaskItems/>}/>
                        <Route path = '/calendar'element = {<CalendarItems/>}/>
                        <Route path = '/user'element = {<UserItems/>}/>
                        <Route path = '/screen'element = {<ScreenItems/>}/>
                    </Routes>
                </Col>
            </Row>
        </>
    )
}

export default Home;
