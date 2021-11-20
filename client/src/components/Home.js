import Logo from './Logo'
import '../scss/Home.scss'
import {useState} from 'react'
import Taskbar from './Taskbar'
import ItemBar from './ItemBar'
import {arrItems} from './Data'
import MealItems from './MealItems'
import { Row, Col, ListGroup } from 'reactstrap'


function Home() {

    const [checkedMenu, setCheckedMenu] = useState('');

    return (
            <Row className = "wrapper m-0">
                {/* ItemBar: Thanh công cụ bên trái màn hình */}
                <Col className = "main-menu p-0 col-lg-2 d-flex">
                    <Logo/>
                    <ListGroup>
                        {arrItems.map((item, i) => {
                            return (
                                <ItemBar
                                active = {item.id ===checkedMenu}
                                toggle = {() => setCheckedMenu(item.id)}
                                id = {item.id}
                                children = {item.children}
                                text = {item.text}
                                key = {i}
                                />
                            )
                        })}
                    </ListGroup>
                </Col>
                {/* Taskbar: Thanh công cụ bên trên màn hình */}
                <Taskbar/>
                {/* Phần nội dung từng phân của ItemBar */}
                <Col className = "content col-lg-10 ">
                    {/* Toàn bộ nội dung của phần thực đơn */}
                   <MealItems/>
                </Col>
            </Row>
    )
}

export default Home;
