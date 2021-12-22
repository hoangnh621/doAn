import logo from '../images/10fit-logo.png'
import '../scss/Logo.scss'
import { NavLink } from 'react-router-dom'

function Logo() {
    return (
        <NavLink
        id='logo-login' 
        to = '/'
        >
        <img src={logo} alt=""/>
        <h2>10FIT</h2>
        </NavLink>
    )
}

export default Logo
