import '../scss/InputPassword.scss'
import {RiEyeLine, RiEyeCloseLine} from 'react-icons/ri'
import {useState} from 'react'
import {InputGroup, Input, Button, InputGroupAddon} from 'reactstrap'

function InputInformation({id, content, placeholder, isForgotPassword}) {
    const [isHide, setIsHide] = useState(true);
    const [type, setType] = useState('password')
    //Ấn vào button dòng 27 sẽ thay đổi icon và kiểu type là password hay text tại dòng 25
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
                {isForgotPassword && <a href="facebook.com">Quên mật khẩu?</a>}
            </div>
            <InputGroup>
                <Input id = {id} placeholder = {placeholder} type={type}/>
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

export default InputInformation
