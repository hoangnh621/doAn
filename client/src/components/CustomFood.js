/* eslint-disable jsx-a11y/anchor-is-valid */
import '../scss/CustomFood.scss'
import { useState, useEffect} from 'react'
import {BsChevronDown} from 'react-icons/bs'
import {Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap'

const CustomFood = ({handleShowCustomFood}) => {
    //Bỏ hành vi submit mặc định của form
    function handleSubmit(e) {
        e.preventDefault();
    }

    //xử lý nhấn esc
    useEffect(() => {
        const handleKeyUp = (e) => {
            if(e.keyCode === 27) handleShowCustomFood();
        }
        window.addEventListener('keyup', handleKeyUp)

        return () => {
            window.removeEventListener('keyup', handleShowCustomFood)
        } 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    //xử lý ấn ra khỏi form
    useEffect(() => { 
        function handleMouseUp(event) {
          const target = document.querySelector('.customFood')
          const withinBoundaries = event.composedPath().includes(target)
          if (!withinBoundaries) {
              handleShowCustomFood()
          } 
        }
        window.addEventListener('mouseup', handleMouseUp)
        return () => {
            window.removeEventListener('mouseup', handleMouseUp)
        } 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    //Đơn vị
    const [dropdownOpenDV, setDropdownOpenDV] = useState(false)
    const toggleDropdownDV = () => {
        setDropdownOpenDV(!dropdownOpenDV)
    }
    const [checkedDV, setCheckedDV] = useState('g')
    const handleCheckedDV = (e) => {
        setCheckedDV(e.target.attributes.value.nodeValue)
    }

    //Bữa ăn
    const [dropdownOpenMeal, setDropdownOpenMeal] = useState(false)
    const toggleDropdownMeal = () => {
        setDropdownOpenMeal(!dropdownOpenMeal)
    }
    const [checkedMeal, setCheckedMeal] = useState('Bữa sáng')
    const handleCheckedMeal = (e) => {
        setCheckedMeal(e.target.attributes.value.nodeValue)
    }

    return (
        <form action="" onSubmit = {handleSubmit} className = "customFood">
            {/* Số lượng */}
            <label>
                Số lượng: 
                <input type="number" name="quantity" id="quantity" />
            </label>
            <div className = "dropdowns-item-selected">
                {/* Đơn vị */}
                <Dropdown 
                isOpen={dropdownOpenDV} 
                toggle={toggleDropdownDV}
                direction='right'
                >
                <DropdownToggle caret  >
                    Đơn vị: {checkedDV}
                    <BsChevronDown className = "ml-2"/>
                </DropdownToggle>
                <DropdownMenu >
                    <DropdownItem onClick = {handleCheckedDV} value = 'g'  href={null} tag='a'>g</DropdownItem>
                    <DropdownItem  onClick = {handleCheckedDV} value = 'ml'  href={null} tag='a' >ml</DropdownItem>
                    <DropdownItem  onClick = {handleCheckedDV} value = 'ounce'  href={null} tag='a'>ounce</DropdownItem>
                </DropdownMenu>
                </Dropdown>
                {/* Bữa ăn */}
                <Dropdown 
                isOpen={dropdownOpenMeal} 
                toggle={toggleDropdownMeal}
                direction='right'
                >
                <DropdownToggle caret>
                    Bữa ăn: {checkedMeal}
                    <BsChevronDown className = "ml-2"/>
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem onClick = {handleCheckedMeal} value = 'Bữa sáng' href={null} tag='a'>Bữa sáng</DropdownItem>
                    <DropdownItem onClick = {handleCheckedMeal} value = 'Bữa trưa' href={null} tag='a' >Bữa trưa</DropdownItem>
                    <DropdownItem onClick = {handleCheckedMeal} value = 'Bữa tối' href={null} tag='a'>Bữa tối</DropdownItem>
                    <DropdownItem onClick = {handleCheckedMeal} value = 'Bữa phụ' href={null} tag='a'>Bữa phụ</DropdownItem>
                </DropdownMenu>
                </Dropdown>
            </div>
            <div className = "d-flex button-groups-update ">
            <Button onClick = {handleShowCustomFood} outline size = "sm">Thoát</Button>
            <Button outline size = "sm">Cập nhật</Button>
            </div>
        </form>
    );
}

export default CustomFood
