import {GiHotMeal} from 'react-icons/gi'
import { CgScreen} from 'react-icons/cg'
import { MdChecklist} from 'react-icons/md'
import { FiCalendar, FiCheckSquare} from 'react-icons/fi'
import { RiUserLine, RiLineChartLine} from 'react-icons/ri'


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
        id: 'calendar',
        children:  <FiCalendar/>,
        text: 'Lịch sử',
        to: '/calendar',
    },
    {
        id: 'task',
        children:  <FiCheckSquare/>,
        text: 'Ghi chú',
        to: '/task',
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