/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from 'react';
import '../scss/AvatarDropdown.scss'
import img from '../images/anhgai.jpg'
import {CgLogOff} from 'react-icons/cg'
import {FiCheckSquare} from 'react-icons/fi'
import {RiSettings2Line} from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'
import { useDispatch} from 'react-redux'
import { logout } from '../actions/userAction'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const AvatarDropdown = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false)

    const toggle = () => setDropdownOpen(prevState => !prevState)

    // const userSignin = useSelector(state => state.userSignin)
    // const { userInfo } = userSignin
    const dispatch = useDispatch()
    const navigate = useNavigate()

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

    return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle} >
        <DropdownToggle caret >
            <a href = {null} className = "avatar d-flex">
                <div className = "d-flex">
                    <span>huyhoang2412</span>
                    <span>admin</span>
                </div>
                <div >
                    <img src={img} alt="" />    
                </div>
            </a>
        </DropdownToggle>
        <DropdownMenu>
                <DropdownItem><RiSettings2Line className = "mr-2"/>Cài đặt</DropdownItem>
                <DropdownItem><FiCheckSquare className = "mr-2"/>Lời nhắc</DropdownItem>
                <DropdownItem className = 'logout'><CgLogOff className = "mr-2"/>Đăng xuất</DropdownItem>
        </DropdownMenu>
    </Dropdown>
  );
}

export default AvatarDropdown
