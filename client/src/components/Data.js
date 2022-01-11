import {GiHotMeal} from 'react-icons/gi'
import { MdChecklist} from 'react-icons/md'
import { FiCalendar, FiCheckSquare, FiUserPlus} from 'react-icons/fi'
import { RiUserLine, RiLineChartLine} from 'react-icons/ri'
import { MdOutlineFastfood } from 'react-icons/md'
import { BiFoodMenu } from 'react-icons/bi'


//Item của trang chủ
const arrItems = [
    {
        id: 'meal',
        children: <GiHotMeal/>,
        text: 'Bữa ăn',
        to: '/meal',
    },
    {
        id: 'menu',
        children: <MdChecklist/>,
        text: 'Thực đơn',
        to: '/menu',
    },
    {
        id: 'goal',
        children:  <RiLineChartLine/>,
        text: 'Mục tiêu',
        to: '/goal',
    },
    {
        id: 'history',
        children:  <FiCalendar/>,
        text: 'Lịch sử',
        to: '/history',
    },
    {
        id: 'task',
        children:  <FiCheckSquare/>,
        text: 'Nhiệm vụ',
        to: '/task',
    },
    {
        id: 'user',
        children: <RiUserLine/>,
        text: 'Người dùng',
        to: '/user',
    },
]

//Item admin
const adminItem = [
    {
        id: 'managerUser',
        children:   <RiUserLine/>,
        text: 'Quản lý người dùng',
        to: '/managerUser',
    },
    {
        id: 'bodyIndexUser',
        children:   <FiUserPlus/>,
        text: 'Chỉ số người dùng',
        to: '/managerBodyIdex',
    },
    {
        id: 'managerFood',
        children:   <MdOutlineFastfood/>,
        text: 'Quản lý thức ăn',
        to: '/managerFood',
    },
    {
        id: 'managerTypeFood',
        children:   <BiFoodMenu/>,
        text: 'Loại thức ăn',
        to: '/managerTypeFood',
    },
    {
        id: 'managerMenu',
        children:   <MdChecklist/>,
        text: 'Quản lý thực đơn',
        to: '/managerMenu',
    },
    {
        id: 'managerTask',
        children:   <FiCheckSquare/>,
        text: 'Quản lý nhiệm vụ',
        to: '/managerTask',
    },
]


export  { arrItems, adminItem}