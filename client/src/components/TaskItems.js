import '../scss/TaskItem.scss'
import { Row, Col, Nav, NavItem, NavLink , 
    TabContent, TabPane, ListGroup, ListGroupItem, Button,
} from 'reactstrap'
import { useState } from 'react'
import { HiOutlineMail } from 'react-icons/hi'
import { MdOutlineDone, MdOutlineDelete } from 'react-icons/md'
import { BiSearch } from 'react-icons/bi'
import CustomCheckbox from './CustomCheckbox'
import { useCallback, useMemo, useEffect } from 'react'
import CustomBadge from './CustomBadge'
import moment from 'moment'
import InputInformation from './InputInformation'
import CustomRadio from './CustomRadio'
import CalendarMeal from './CalendarMeal'
import { useDispatch, useSelector} from 'react-redux'
import { createTask } from '../actions/userAction'

const dataTask = [
    { 
        _id: '1',
        title: "Mua cá, mua gà",
        type: "low",
        isDone: true,
        isImportant: true,
        due: '01012022',
        description: 'Mua cá về nấu canh chua, mua gà về kho'
    },
    { 
        _id: '2',
        title: "Mua cá, mua gà",
        type: "mid",
        isDone: true,
        isImportant: true,
        due: '01012022',
        description: 'Mua cá về nấu canh chua, mua gà về kho'
    },
    { 
        _id: '3',
        title: "Mua cá, mua gà",
        type: "hight",
        isDone: true,
        isImportant: true,
        due: '01012022',
        description: 'Mua cá về nấu canh chua, mua gà về kho'
    }
]



const TaskItems = () => {
    const dispatch = useDispatch()
    const userState = useSelector( state => state)
    console.log(userState)
    //Hiển thị các tab bên trái của task item
    const [active, setActive] = useState('1')

    const toggle = tab => {
        setActive(tab)
    }

    //Xử lý dữ liệu đầu vào để checked checkbox
    const [idChecked, setIdChecked] = useState([])
    useMemo(() => {
        if(dataTask) {
            const taskChecked = dataTask.filter(item => item.isDone === true)
            const idTaskChecked = taskChecked.map(item => item._id)
            setIdChecked(idTaskChecked)
        }
    },[])

    // Thêm nhiệm vụ
    // eslint-disable-next-line no-unused-vars
    const [isAddTask, setIsAddTask] = useState(true)
   

    //Xử lý dữ liệu khi checked vào các checkbox
    const handleChecked = useCallback((data) => {
        const isChecked = idChecked.includes(data._id)
        if(isChecked) {
             setIdChecked(idChecked.filter(id => id !== data._id))
        }
        else {
             setIdChecked(prev_IdChecked => ([
                 ...prev_IdChecked,
                 data._id,
             ]))
            //  setDataSearchTable (prevData => ([
            //      ...prevData,
            //      data
            //  ]))
        } 
     }, [idChecked])

     //Add task
     const [nameTask, setNameTask] = useState('')
     const [dataTextarea, setDataTextarea] = useState('')
     const [isTypeTask, setIsTypeTask] = useState()
     const [dueDate, setDueDate] = useState('')
     const [dateCalendar, setDateCalendar] = useState(new Date())
     const [showCalendar, setShowCalendar] = useState(false)
     const handleShowCalendar = () => {
         setShowCalendar(!showCalendar)
     }
     useEffect(() => {
        const strDate =  moment(dateCalendar).format('DD-MM-YYYY')
         setDueDate(strDate)
     },[dateCalendar])
     const handleClickDate = () => {
         const strDate = moment(dateCalendar).format('DD-MM-YYYY')
         setDueDate(strDate)
     }

     //Reset dữ liệu
     const handleReset = () => { 
         setNameTask('')
         setIsTypeTask()
         setDateCalendar(new Date())
         setDataTextarea('')
     }

     //Cập nhật task
     const handleSetTask = () => {
         let typeTask = ''
         switch (isTypeTask) {
             case 'task-radio-1': typeTask = 'low'
             break
             case 'task-radio-2': typeTask = 'mid'
             break
             default: typeTask = 'hight'
         }
         dispatch(createTask(nameTask, typeTask, dataTextarea, dueDate))
     }
     
     

    return (
        <div className = 'task-container'>
            <div className="task-item">
                <Row>
                    <Col className = 'col-2'>
                        <div className = 'header-task'>
                            <Button >Thêm nhiệm vụ</Button>
                        </div>
                        <div className = 'body-task'>
                            <Nav pills vertical>
                                <NavItem>
                                    <NavLink
                                    active={active === '1'}
                                    onClick={() => {
                                        toggle('1')
                                    }}
                                    >
                                    <HiOutlineMail/>
                                    Nhiệm vụ
                                    </NavLink>
                                </NavItem>
                                {/* <NavItem>
                                    <NavLink
                                    active={active === '2'}
                                    onClick={() => {
                                        toggle('2')
                                    }}
                                    >
                                    <HiOutlineStar/>
                                    Quan trọng
                                    </NavLink>
                                </NavItem> */}
                                <NavItem>
                                    <NavLink
                                    active={active === '2'}
                                    onClick={() => {
                                        toggle('2')
                                    }}
                                    >
                                    <MdOutlineDone/>
                                    Đã hoàn thành
                                    </NavLink>
                                </NavItem>
                                <NavItem >
                                    <NavLink
                                    disabled
                                    >
                                    Mức độ
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                    active={active === '3'}
                                    onClick={() => {
                                        toggle('3')
                                    }}
                                    >
                                    <span/>
                                    Thấp
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                    active={active === '4'}
                                    onClick={() => {
                                        toggle('4')
                                    }}
                                    >
                                    <span/>
                                    Trung bình
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                    active={active === '5'}
                                    onClick={() => {
                                        toggle('5')
                                    }}
                                    >
                                    <span/>
                                    Cao
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </div>                         
                    </Col>
                    <Col className = 'col-10'>
                        {isAddTask 
                        ? <Row>
                            <Col className="">
                                <InputInformation
                                id = 'add-task'
                                content = 'Tên nhiệm vụ'
                                placeholder = 'Nhập tên nhiệm vụ'
                                data = {nameTask}
                                setData = { setNameTask}
                                />
                                <div className="type-task">
                                    <p>Mức độ nhiệm vụ</p>
                                    <div className="type-task-body d-flex">
                                        <CustomRadio
                                        label = 'Thấp'
                                        name = 'task-radio'
                                        id = 'task-radio-1'
                                        isChecked = {isTypeTask}
                                        onChange = {()=> setIsTypeTask('task-radio-1')}
                                        />
                                        <CustomRadio
                                        label = 'Trung bình'
                                        name = 'task-radio'
                                        id = 'task-radio-2'
                                        isChecked = {isTypeTask}
                                        onChange = {()=> setIsTypeTask('task-radio-2')}
                                        />
                                        <CustomRadio
                                        label = 'Cao'
                                        name = 'task-radio'
                                        id = 'task-radio-3'
                                        isChecked = {isTypeTask}
                                        onChange = {()=> setIsTypeTask('task-radio-3')}
                                        />
                                    </div>
                                    
                                </div>
                                <p>Mô tả:</p>
                                <textarea value = {dataTextarea} onChange = {(e) => setDataTextarea(e.target.value)}  rows="4" cols="50"></textarea>
                            </Col>
                            <Col className="">
                                <InputInformation
                                id = 'add-task-date'
                                content = 'Hạn nhiệm vụ'
                                placeholder = 'Chọn ngày hết hạn'
                                data = {dueDate}
                                setData = { setDueDate}
                                onClick = {handleShowCalendar}
                                isDisabled = 'readonly'
                                />
                                {
                                    showCalendar 
                                    ? <CalendarMeal
                                    date = {dateCalendar}
                                    setDate = { setDateCalendar }
                                    onChangeMeal = {handleClickDate}
                                    />
                                    : true
                                }
                                <div className="save-reset">
                                    <Button onClick = {() => handleSetTask()}>Lưu</Button>
                                    <Button outline onClick = {handleReset}>Reset</Button>
                                </div>
                            </Col>
                            <Col className=""></Col>
                        </Row>
                        :
                        (<>
                        <div className="search-task">
                                <BiSearch />
                                <input type="text"
                                    placeholder='Nhập nhiệm vụ' />
                            </div>
                            <TabContent activeTab={active}>
                                    <TabPane tabId='1'>
                                        <ListGroup>
                                            {dataTask.map((item, i) => {
                                                return (
                                                    <ListGroupItem key={i}>
                                                        <Row>
                                                            <Col className='col-1'>
                                                                <CustomCheckbox
                                                                    label=''
                                                                    handleChecked={handleChecked}
                                                                    data={item}
                                                                    idChecked={idChecked} />
                                                            </Col>
                                                            <Col className='col-7'>
                                                                {item.title}
                                                            </Col>
                                                            <Col className='col-1'>
                                                                <CustomBadge
                                                                    type={item.type} />
                                                            </Col>
                                                            <Col className='col-2 '>
                                                                {moment(item.due, 'DDMMYYYY').add(1, 'month').format('DD-MM-YYYY')}
                                                            </Col>
                                                            <Col className='col-1'>
                                                                <MdOutlineDelete />
                                                            </Col>
                                                        </Row>
                                                    </ListGroupItem>
                                                )
                                            })}
                                        </ListGroup>
                                    </TabPane>
                                    <TabPane tabId='2'>
                                        <p>
                                            Pudding candy canes sugar plum cookie chocolate cake powder croissant. Carrot cake tiramisu danish candy
                                            cake muffin croissant tart dessert. Tiramisu caramels candy canes chocolate cake sweet roll liquorice
                                            icing cupcake. Sesame snaps wafer marshmallow danish dragée candy muffin jelly beans tootsie roll. Jelly
                                            beans oat cake chocolate cake tiramisu sweet.
                                        </p>
                                    </TabPane>
                                    <TabPane tabId='3'>
                                        <p>
                                            Carrot cake dragée chocolate. Lemon drops ice cream wafer gummies dragée. Chocolate bar liquorice
                                            cheesecake cookie chupa chups marshmallow oat cake biscuit. Dessert toffee fruitcake ice cream powder
                                            tootsie roll cake. Macaroon brownie lemon drops croissant marzipan sweet roll macaroon lollipop. Danish
                                            fruitcake bonbon bear claw gummi bears apple pie.
                                        </p>
                                    </TabPane>
                                    <TabPane tabId='4'>
                                        <p>
                                            Carrot cake dragée chocolate. Lemon drops ice cream wafer gummies dragée. Chocolate bar liquorice
                                            cheesecake cookie chupa chups marshmallow oat cake biscuit. Dessert toffee fruitcake ice cream powder
                                            tootsie roll cake. Macaroon brownie lemon drops croissant marzipan sweet roll macaroon lollipop. Danish
                                            fruitcake bonbon bear claw gummi bears apple pie.
                                        </p>
                                    </TabPane>
                                    <TabPane tabId='5'>
                                        <p>
                                            Carrot cake dragée chocolate. Lemon drops ice cream wafer gummies dragée. Chocolate bar liquorice
                                            cheesecake cookie chupa chups marshmallow oat cake biscuit. Dessert toffee fruitcake ice cream powder
                                            tootsie roll cake. Macaroon brownie lemon drops croissant marzipan sweet roll macaroon lollipop. Danish
                                            fruitcake bonbon bear claw gummi bears apple pie.
                                        </p>
                                    </TabPane>
                                </TabContent>
                                </>)
                        }
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default TaskItems
