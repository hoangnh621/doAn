import {GiHotMeal} from 'react-icons/gi'
import { CgScreen} from 'react-icons/cg'
import { FiCalendar, FiCheckSquare} from 'react-icons/fi'
import { RiUserLine, RiLineChartLine} from 'react-icons/ri'

//demo dữ liệu thức ăn
const foodData = [
    {
        id: '1',
        name: 'Ức gà', 
        unit: 'g',
        protein: 25,
        carbs: 0, 
        fat: 0,
    },
    {
        id: '2',
        name: 'Cơm trắng', 
        unit: 'g',
        protein: 5,
        carbs: 15, 
        fat: 1,
    },
    {
        id: '3',
        name: 'Yến mạch', 
        unit: 'g',
        protein: 11,
        carbs: 12, 
        fat: 0,
    },
    {
        id: '4',
        name: 'Hạt điều', 
        unit: 'g',
        protein: 13,
        carbs: 10, 
        fat: 15,
    },
    {
        id: '5',
        name: 'Rau muống', 
        unit: 'g',
        protein: 9,
        carbs: 1, 
        fat: 0,
    },
    {
        id: '6',
        name: 'Trứng gà', 
        unit: 'g',
        protein: 9,
        carbs: 0, 
        fat: 10,
    },
    {
        id: '7',
        name: 'Cá rô phi', 
        unit: 'g',
        protein: 25,
        carbs: 0, 
        fat: 4,
    },
    {
        id: '8',
        name: 'Chả cốm', 
        unit: 'g',
        protein: 15,
        carbs: 0, 
        fat: 4,
    },
]

//Item của trang chủ
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


export  {foodData, arrItems}