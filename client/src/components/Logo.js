import logo from '../images/10fit-logo.png'
import '../scss/Logo.scss'

function Logo() {
    return (
        <a href="facebook.com" id='logo-login'>
        <img src={logo} alt=""/>
        <h2>10FIT</h2>
    </a>
    )
}

export default Logo
