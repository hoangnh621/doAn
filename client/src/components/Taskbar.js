import '../scss/Taskbar.scss'
import {useState} from 'react'
import IconNav from './IconNav'
import AvatarDropdown from './AvatarDropdown'
import {RiSearchLine, RiCloseLine} from 'react-icons/ri'
import {FiCheckSquare, FiCalendar, FiBell} from 'react-icons/fi'

function Taskbar() {
    const [openSearch, setOpenSearch] = useState(false);

    const arrNav = [
        {
            id: 'nav-Search-fake',
            href: null,
            children: <RiSearchLine/>,
            text: "Tìm kiếm",
            handler: () => {
                setOpenSearch(!openSearch);
            }
        },
        {
            id: 'nav-CheckSquare',
            href: null,
            children: <FiCheckSquare/>,
            text: "Lời nhắc",
            handler: null,
        },
        {
            id: 'nav-Calendar',
            href: null,
            children: <FiCalendar/>,
            text: "Lịch",
            handler: null,
        },
        {
            id: 'nav-Bell',
            href: null,
            children: <FiBell/>,
            text: "Thông báo",
            handler: null,
        },
    ]
    if(!openSearch)
    return (
        <nav className = "header-navbar ">
            <div className = "navbar-container d-flex">
                <div className="left-navbar d-flex">
                   {arrNav.map((item, i) => {
                       return (
                           <IconNav 
                            onClick = {item.handler}
                           href = {item.href} 
                           children = {item.children} 
                           id = {item.id}
                           text = {item.text}
                           istoolTip = {true}
                           key = {i}
                           />
                       )
                   })}
                </div>
                <div className="right-navbar">
                    <AvatarDropdown />
                </div>
            </div>
        </nav>
    )
    else
    return (
        <nav className = "header-navbar ">
        <div className = "navbar-container d-flex">
            <div className="left-navbar d-flex">
                <IconNav 
                onClick = {arrNav[0].handler}
                href = {null}
                children = {<RiSearchLine/>} 
                id = "nav-Search-real"
                text = "Tìm kiếm"
                istoolTip = {true}
                />
                <input  type="text" placeholder = "Khám phá 10Fit" />
            </div>
            <div className="right-navbar">
            <IconNav 
                onClick = {arrNav[0].handler}
                href = {null}
                children = {<RiCloseLine/>} 
                id = "nav-Close"
                text = "Hủy"
                istoolTip = {true}
                />
            </div>
        </div>
    </nav>
    )
}

export default Taskbar;