import '../scss/CustomFood.scss'
import { useState, useEffect } from 'react'
import {Button } from 'reactstrap'

const CustomFood = ({handleShowCustomFood, data, handleQuantityFood}) => {
    

    //Số lượng thức ăn 
    
    const [quantityFood, setQuantityFood] = useState(1)


    //Cập nhật lượng thức ăn và bữa ăn 
    const handleCustomFood = () => {
        handleQuantityFood(quantityFood , data)
        handleShowCustomFood()
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
    },[handleShowCustomFood])


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
    },[handleShowCustomFood])


   
    
    return (
        <form action="" onSubmit = {handleSubmit} className = "customFood">
            {/* Số lượng */}
            <label>
                Số lượng: 
                <input 
                type="number"
                min = '0'
                value = {quantityFood}
                onChange = {(e) => {
                    if(e.target.value < 0) setQuantityFood(1)
                    else setQuantityFood(e.target.value)
                }} 
                />
            </label>
            {/* Đơn vị */}
            <p>Đơn vị: {`${data.quantity} (${data.unit})`}</p>
            <div className = "d-flex button-groups-update ">
            <Button onClick = {handleShowCustomFood} outline size = "sm">Thoát</Button>
            <Button 
            outline 
            size = "sm"
            onClick = {handleCustomFood}
            >
                Cập nhật
            </Button>
            </div>
        </form>
    )
}

export default CustomFood
