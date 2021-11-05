/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState} from 'react'
import CustomFood from './CustomFood'
import '../scss/ActionMealDropdown.scss'
import {RiDeleteBinLine} from 'react-icons/ri'
import {BsThreeDotsVertical, BsPen} from 'react-icons/bs'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

const ActionMealDropdown = ({isRemoveRow,setIsRemoveRow}) => {
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const toggle = () => setDropdownOpen(prevState => !prevState)

    const [showCustomFood, setShowCustomFood] = useState(false)
    const handleShowCustomFood = () => {
        setShowCustomFood(!showCustomFood)
    }

    return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle} >
        <DropdownToggle caret >
            <a href = {null} className = "d-flex">
            <BsThreeDotsVertical/>
            </a>
        </DropdownToggle>
        {showCustomFood 
        ? <CustomFood handleShowCustomFood = {handleShowCustomFood}/>
        : <DropdownMenu>
            <DropdownItem 
            onClick = {handleShowCustomFood}
            >
                <BsPen className = "mr-2"/>
                Chỉnh sửa
            </DropdownItem >
            <DropdownItem 
            className = "removeRowTable"
            onClick = {e =>  {
                e.target.parentElement.parentElement.parentElement.parentElement.remove()
                setIsRemoveRow(!isRemoveRow)
            }}
            >
                <RiDeleteBinLine className = "mr-2"/>
                Xóa
            </DropdownItem>
        </DropdownMenu>
        }
    </Dropdown>
    )
}

export default ActionMealDropdown
