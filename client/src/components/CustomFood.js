/* eslint-disable jsx-a11y/anchor-is-valid */
import '../scss/CustomFood.scss'
import { useState, useEffect} from 'react'
import {BsChevronDown} from 'react-icons/bs'
import {Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap'

const CustomFood = ({handleShowCustomFood, data}) => {
    //Số lượng thức ăn
    const [quantityFood, setQuantityFood] = useState(1)
    const handleCustomFood = (data) => {
        data.quantity *= quantityFood
        data.protein *= quantityFood
        data.carbs *= quantityFood
        data.fat *= quantityFood
    }
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
                <input 
                type="number"
                min = '0'
                value = {quantityFood}
                onChange = {(e) => setQuantityFood(e.target.value)} 
                />
            </label>
            <div className = "dropdowns-item-selected">
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
            <Button 
            outline 
            size = "sm"
            onClick = {() => handleCustomFood(data)}
            >
                Cập nhật
            </Button>
            </div>
        </form>
    );
}

export default CustomFood
