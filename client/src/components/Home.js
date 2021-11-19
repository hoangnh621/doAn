import Logo from './Logo'
import '../scss/Home.scss'
import {useState} from 'react'
import Taskbar from './Taskbar'
import ItemBar from './ItemBar'
import {arrItems} from './Data'
import MealPill from './MealPill'
import SearchFoodTable from './SearchFoodTable'
import { Row, Col, ListGroup } from 'reactstrap'


function Home() {

    const [checked, setChecked] = useState('');

    return (
            <Row className = "wrapper m-0">
                {/* ItemBar: Thanh công cụ bên trái màn hình */}
                <Col className = "main-menu p-0 col-lg-2 d-flex">
                    <Logo/>
                    <ListGroup>
                        {arrItems.map((item, i) => {
                            return (
                                <ItemBar
                                active = {item.id ===checked}
                                toggle = {() => setChecked(item.id)}
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
                    <Row className = "content-meal-items">
                        {/* bảng bữa ăn trong ngày */}
                        <Col className="col-md-6 p-0 ">
                            <div className = "meal-table">
                                <MealPill/>
                            </div>
                        </Col>
                        <Col className="col-md-6">
                            <Row className = "search-chart-item">
                                <Col className="col-sm-12">
                                    <SearchFoodTable/>
                                </Col>
                                <Col className="col-sm-12">
                                <div></div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                </Col>
            </Row>
    )
}

export default Home;
