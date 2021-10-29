import Logo from './Logo'
import '../scss/Home.scss'
import {useState} from 'react'
import Taskbar from './Taskbar'
import ItemBar from './ItemBar'
import {GiHotMeal} from 'react-icons/gi'
import { CgScreen} from 'react-icons/cg'
import {Row, Col, ListGroup, Table} from 'reactstrap'
import { FiCalendar, FiCheckSquare} from 'react-icons/fi'
import { RiUserLine, RiLineChartLine} from 'react-icons/ri'
import ActionDropdown from './ActionDropdown'


function Home() {

    const [checked, setChecked] = useState('');
  

    const arrItems = [
        {
            id: 'meal',
            children: <GiHotMeal/>,
            text: 'Thực đơn',
        },
        {
            id: 'goal',
            children:  <RiLineChartLine/>,
            text: 'Mục tiêu',
        },
        {
            id: 'task',
            children:  <FiCheckSquare/>,
            text: 'Nhiệm vụ',
        },
        {
            id: 'calendar',
            children:  <FiCalendar/>,
            text: 'Lịch',
        },
        {
            id: 'user',
            children: <RiUserLine/>,
            text: 'Người dùng',
        },
        {
            id: 'screen',
            children:   <CgScreen/>,
            text: 'Giao diện',
        },
    ]

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
                                <Table borderless hover className = "m-0">
                                    <thead>
                                        <tr>
                                            <th>Thức ăn</th>
                                            <th>Calories (calo)</th>
                                            <th>Protein (g)</th>
                                            <th>Carbs (g)</th>
                                            <th>Fat (g)</th>
                                            <th>Tùy chọn</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Ức gà</td>
                                            <td>100</td>
                                            <td>25</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td><ActionDropdown/></td>
                                        </tr>
                                        <tr>
                                            <td>Ức gà</td>
                                            <td>100</td>
                                            <td>25</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td><ActionDropdown/></td>
                                        </tr>
                                        <tr>
                                            <td>Ức gà</td>
                                            <td>100</td>
                                            <td>25</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td><ActionDropdown/></td>
                                        </tr>
                                        <tr>
                                            <td>Ức gà</td>
                                            <td>100</td>
                                            <td>25</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td><ActionDropdown/></td>
                                        </tr>
                                        <tr>
                                            <td>Ức gà</td>
                                            <td>100</td>
                                            <td>25</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td><ActionDropdown/></td>
                                        </tr>
                                        <tr>
                                            <td>Ức gà</td>
                                            <td>100</td>
                                            <td>25</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td><ActionDropdown/></td>
                                        </tr>
                                        <tr>
                                            <td>Ức gà</td>
                                            <td>100</td>
                                            <td>25</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td><ActionDropdown/></td>
                                        </tr>
                                        {/* <tr>
                                            <td>Ức gà</td>
                                            <td>100</td>
                                            <td>25</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td><ActionDropdown/></td>
                                        </tr>
                                        <tr>
                                            <td>Ức gà</td>
                                            <td>100</td>
                                            <td>25</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td><ActionDropdown/></td>
                                        </tr>
                                        <tr>
                                            <td>Ức gà</td>
                                            <td>100</td>
                                            <td>25</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td><ActionDropdown/></td>
                                        </tr>
                                        <tr>
                                            <td>Ức gà</td>
                                            <td>100</td>
                                            <td>25</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td><ActionDropdown/></td>
                                        </tr>
                                        <tr>
                                            <td>Ức gà</td>
                                            <td>100</td>
                                            <td>25</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td><ActionDropdown/></td>
                                        </tr>
                                        <tr>
                                            <td>Ức gà</td>
                                            <td>100</td>
                                            <td>25</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td><ActionDropdown/></td>
                                        </tr>
                                        <tr>
                                            <td>Ức gà</td>
                                            <td>100</td>
                                            <td>25</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td><ActionDropdown/></td>
                                        </tr>
                                        <tr>
                                            <td>Ức gà</td>
                                            <td>100</td>
                                            <td>25</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td><ActionDropdown/></td>
                                        </tr>
                                        <tr>
                                            <td>Ức gà</td>
                                            <td>100</td>
                                            <td>25</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td><ActionDropdown/></td>
                                        </tr>
                                        <tr>
                                            <td>Ức gà</td>
                                            <td>100</td>
                                            <td>25</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td><ActionDropdown/></td>
                                        </tr> */}
                                        {/* <tr>
                                            <td>Ức gà</td>
                                            <td>100</td>
                                            <td>25</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td><ActionDropdown/></td>
                                        </tr>
                                        <tr>
                                            <td>Ức gà</td>
                                            <td>100</td>
                                            <td>25</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td><ActionDropdown/></td>
                                        </tr> 
                                         <tr>
                                            <td>Ức gà</td>
                                            <td>100</td>
                                            <td>25</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td><ActionDropdown/></td>
                                        </tr>
                                        <tr>
                                            <td>Ức gà</td>
                                            <td>100</td>
                                            <td>25</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td><ActionDropdown/></td>
                                        </tr>
                                        <tr>
                                            <td>Ức gà</td>
                                            <td>100</td>
                                            <td>25</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td><ActionDropdown/></td>
                                        </tr>
                                        <tr>
                                            <td>Ức gà</td>
                                            <td>100</td>
                                            <td>25</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td><ActionDropdown/></td>
                                        </tr>
                                        <tr>
                                            <td>Ức gà</td>
                                            <td>100</td>
                                            <td>25</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td><ActionDropdown/></td>
                                        </tr> */}
                                    </tbody>
                                </Table>
                            </div>
                        </Col>
                        <Col className="col-md-6">
                            <Row className = "search-chart-item">
                                <Col className="col-sm-12">
                                    <div></div>
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
