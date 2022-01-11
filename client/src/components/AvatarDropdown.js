/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from 'react';
import '../scss/AvatarDropdown.scss'
import img from '../images/user.png'
import {CgLogOff} from 'react-icons/cg'
import {FiCheckSquare} from 'react-icons/fi'
import {RiSettings2Line} from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import { logout } from '../actions/userAction'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const AvatarDropdown = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false)

    const toggle = () => setDropdownOpen(prevState => !prevState)
    const [userI4, setUserI4] = useState({
        name: '', 
        isadmin: ''
    })

    const userSignin = useSelector(state => state.userSignin)
    const { userInfo } = userSignin
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        if(userInfo) {
            const isadmin = userInfo.isAdmin ? 'admin' : 'user'
            setUserI4({
                name: userInfo.name, 
                isadmin
            })
        }
    },[userInfo])
    //Add sự kiện logout cho button logout
    useEffect(() => {
        const handleLogout = () => {
            dispatch(logout())
            navigate('/login')
        }
        const btnLogout = document.querySelector('.logout')
        
        btnLogout.addEventListener('click', handleLogout)

        return () => btnLogout.removeEventListener('click', handleLogout)
    })

    //Chuyển đến mục cài đặt người dùng
    const navigateUser = () => {
        navigate('/user')
    }

    return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle} >
        <DropdownToggle caret >
            <a href = {null} className = "avatar d-flex">
                <div className = "d-flex">
                    <span>{userI4.name}</span>
                    <span>{userI4.isadmin}</span>
                </div>
                <div >
                    <img src={img} alt="" />    
                </div>
            </a>
        </DropdownToggle>
        <DropdownMenu>
                <DropdownItem onClick = {navigateUser}><RiSettings2Line className = "mr-2"/>Cài đặt</DropdownItem>
                <DropdownItem><FiCheckSquare className = "mr-2"/>Lời nhắc</DropdownItem>
                <DropdownItem className = 'logout'><CgLogOff className = "mr-2"/>Đăng xuất</DropdownItem>
        </DropdownMenu>
    </Dropdown>
  );
}

export default AvatarDropdown
