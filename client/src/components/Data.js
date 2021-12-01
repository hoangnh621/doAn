import {GiHotMeal} from 'react-icons/gi'
import { CgScreen} from 'react-icons/cg'
import { FiCalendar, FiCheckSquare} from 'react-icons/fi'
import { RiUserLine, RiLineChartLine} from 'react-icons/ri'


//Item của trang chủ
const arrItems = [
    {
        id: 'meal',
        children: <GiHotMeal/>,
        text: 'Thực đơn',
        to: '/meal',
    },
    {
        id: 'goal',
        children:  <RiLineChartLine/>,
        text: 'Mục tiêu',
        to: '/goal',
    },
    {
        id: 'task',
        children:  <FiCheckSquare/>,
        text: 'Nhiệm vụ',
        to: '/task',
    },
    {
        id: 'calendar',
        children:  <FiCalendar/>,
        text: 'Lịch',
        to: '/calendar',
    },
    {
        id: 'user',
        children: <RiUserLine/>,
        text: 'Người dùng',
        to: '/user',
    },
    {
        id: 'screen',
        children:   <CgScreen/>,
        text: 'Giao diện',
        to: '/screen',
    },
]


export  { arrItems}