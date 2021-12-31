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
import { createTask, userGetTask, userDeleteTask, checkedTask } from '../actions/userAction'


const TaskItems = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(userGetTask())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    const userTask = useSelector( state => state.userTask)
    const { getTask } = userTask
    console.log(getTask)
    const [dataTask, setDataTask] = useState([])
    useMemo(() => {
        if(getTask) {
            setDataTask(getTask)
        }
    },[getTask])
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
    },[dataTask])

    useEffect(() => {
        // dispatch(userGetTask())
        if(idChecked.length !== 0)
        dispatch(checkedTask(idChecked))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[idChecked])

    // Thêm nhiệm vụ
    // eslint-disable-next-line no-unused-vars
    const [isAddTask, setIsAddTask] = useState(false)
   

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
        } 
     }, [idChecked])
     console.log(idChecked)

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

     //Xóa task
     const handleDeleteTask = (taskId) => { 
         dispatch(userDeleteTask(taskId))
         dispatch(userGetTask())
     }
     //Thoát khỏi chi tiết task
     const handleExitDetailTask = () => {
         setIsAddTask(false)
         dispatch(userGetTask())
     }
     //Task hoàn thành
     const doneTask = useMemo(() => {
         if(dataTask) {
             const doneTask = dataTask.filter(item => item.isDone === true)
             return doneTask
         }
     },[dataTask])

     //task low
     const lowTask = useMemo(() => {
        if(dataTask) {
            const lowTask = dataTask.filter(item => item.type === 'low')
            return lowTask
        }
    },[dataTask])
     //task mid
     const midTask = useMemo(() => {
        if(dataTask) {
            const midTask = dataTask.filter(item => item.type === 'mid')
            return midTask
        }
    },[dataTask])

    //task hight
    const hightTask = useMemo(() => {
        if(dataTask) {
            const hightTask = dataTask.filter(item => item.type === 'hight')
            return hightTask
        }
    },[dataTask])

     //Hiển thị chi tiết nhiệm vụ
     const handleDetailTask = (name, type, datatextarea, due) => {
        let typeTask = ''
        switch (type) {
            case 'low': typeTask = 'task-radio-1'
            break
            case 'mid': typeTask = 'task-radio-2'
            break
            default: typeTask = 'task-radio-3'
        }
         setNameTask(name)
         setIsTypeTask(typeTask)
         setDueDate(due)
         setDataTextarea(datatextarea)
         setIsAddTask(true)
     }
     

    return (
        <div className = 'task-container'>
            <div className="task-item">
                <Row>
                    <Col className = 'col-2'>
                        <div className = 'header-task'>
                            <Button onClick = {() => setIsAddTask(true)}>Thêm nhiệm vụ</Button>
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
                                    <Button onClick = {() => handleExitDetailTask()}>Thoát</Button>
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
                                                    <ListGroupItem key={i} >
                                                        <Row>
                                                            <Col className='col-1'>
                                                                <CustomCheckbox
                                                                    label=''
                                                                    handleChecked={handleChecked}
                                                                    data={item}
                                                                    idChecked={idChecked} />
                                                            </Col>
                                                            <Col className='col-7' onClick = {() => handleDetailTask(item.name, item.type, item.desc, item.due)}>
                                                                {item.name}
                                                            </Col>
                                                            <Col className='col-1'>
                                                                <CustomBadge
                                                                    type={item.type} />
                                                            </Col>
                                                            <Col className='col-2 '>
                                                                {moment(item.due, 'DDMMYYYY').format('DD-MM-YYYY')}
                                                            </Col>
                                                            <Col className='col-1'>
                                                                <Button onClick = {() => handleDeleteTask(item._id)}>
                                                                    <MdOutlineDelete />
                                                                </Button>
                                                            </Col>
                                                        </Row>
                                                    </ListGroupItem>
                                                )
                                            })}
                                        </ListGroup>
                                    </TabPane>
                                    <TabPane tabId='2'>
                                    <ListGroup>
                                            {doneTask.map((item, i) => {
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
                                                                {item.name}
                                                            </Col>
                                                            <Col className='col-1'>
                                                                <CustomBadge
                                                                    type={item.type} />
                                                            </Col>
                                                            <Col className='col-2 '>
                                                                {moment(item.due, 'DDMMYYYY').format('DD-MM-YYYY')}
                                                            </Col>
                                                            <Col className='col-1'>
                                                                <Button onClick = {() => handleDeleteTask(item._id)}>
                                                                    <MdOutlineDelete />
                                                                </Button>
                                                            </Col>
                                                        </Row>
                                                    </ListGroupItem>
                                                )
                                            })}
                                        </ListGroup>
                                    </TabPane>
                                    <TabPane tabId='3'>
                                    <ListGroup>
                                            {lowTask.map((item, i) => {
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
                                                                {item.name}
                                                            </Col>
                                                            <Col className='col-1'>
                                                                <CustomBadge
                                                                    type={item.type} />
                                                            </Col>
                                                            <Col className='col-2 '>
                                                                {moment(item.due, 'DDMMYYYY').format('DD-MM-YYYY')}
                                                            </Col>
                                                            <Col className='col-1'>
                                                                <Button onClick = {() => handleDeleteTask(item._id)}>
                                                                    <MdOutlineDelete />
                                                                </Button>
                                                            </Col>
                                                        </Row>
                                                    </ListGroupItem>
                                                )
                                            })}
                                        </ListGroup>
                                    </TabPane>
                                    <TabPane tabId='4'>
                                    <ListGroup>
                                            {midTask.map((item, i) => {
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
                                                                {item.name}
                                                            </Col>
                                                            <Col className='col-1'>
                                                                <CustomBadge
                                                                    type={item.type} />
                                                            </Col>
                                                            <Col className='col-2 '>
                                                                {moment(item.due, 'DDMMYYYY').format('DD-MM-YYYY')}
                                                            </Col>
                                                            <Col className='col-1'>
                                                                <Button onClick = {() => handleDeleteTask(item._id)}>
                                                                    <MdOutlineDelete />
                                                                </Button>
                                                            </Col>
                                                        </Row>
                                                    </ListGroupItem>
                                                )
                                            })}
                                        </ListGroup>
                                    </TabPane>
                                    <TabPane tabId='5'>
                                    <ListGroup>
                                            {hightTask.map((item, i) => {
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
                                                                {item.name}
                                                            </Col>
                                                            <Col className='col-1'>
                                                                <CustomBadge
                                                                    type={item.type} />
                                                            </Col>
                                                            <Col className='col-2 '>
                                                                {moment(item.due, 'DDMMYYYY').format('DD-MM-YYYY')}
                                                            </Col>
                                                            <Col className='col-1'>
                                                                <Button onClick = {() => handleDeleteTask(item._id)}>
                                                                    <MdOutlineDelete />
                                                                </Button>
                                                            </Col>
                                                        </Row>
                                                    </ListGroupItem>
                                                )
                                            })}
                                        </ListGroup>
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
