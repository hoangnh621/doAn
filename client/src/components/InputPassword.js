import '../scss/InputPassword.scss'
import {RiEyeLine, RiEyeCloseLine} from 'react-icons/ri'
import {useState} from 'react'
import {InputGroup, Input, Button, InputGroupAddon} from 'reactstrap'
import { NavLink } from 'react-router-dom'

function InputPassword({id, content, placeholder, isForgotPassword, data, setData}) {
    const [isHide, setIsHide] = useState(true);
    const [type, setType] = useState('password')
    const handleDisplay = () => {
        setIsHide(!isHide);
        if(type === 'password')
        setType('text');
        else
        setType('password');
    }

    return (
        <div className = "InputPassword ">
            <div className = "InputPassword-label">
                <label htmlFor={id}>{content}</label>
                {isForgotPassword && <NavLink to = '/forgotpassword'>Quên mật khẩu?</NavLink>}
            </div>
            <InputGroup>
                <Input 
                id = {id} 
                placeholder = {placeholder} 
                type={type}
                value = {data}
                onChange = {(e) => setData(e.target.value)}
                />
                <InputGroupAddon addonType="append">
                <Button onClick = {handleDisplay}>
                    {
                        isHide
                        ? <RiEyeCloseLine/>
                        : <RiEyeLine/>
                    }
                </Button>
                </InputGroupAddon>
            </InputGroup>
        </div>
    )
}

export default InputPassword
