import { useState, useContext } from 'react'
import CustomMenuFood from './CustomMenuFood'
import { ContextMenu as MenuItemContext } from './MenuItems'
import '../scss/ActionMealDropdown.scss'
import {RiDeleteBinLine} from 'react-icons/ri'
import {BsThreeDotsVertical, BsPen} from 'react-icons/bs'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

const ActionMealDropdown = ({dataObj}) => {
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const toggle = () => setDropdownOpen(prevState => !prevState)

    const [showCustomFood, setShowCustomFood] = useState(false)
    const handleShowCustomFood = () => {
        setShowCustomFood(!showCustomFood)
    }

    //Lấy dữ liệu từ MealItem
    const [dataChecked, setDataChecked] = useContext(MenuItemContext)


    //Không cho phép tồn tại nhiều thức ăn có id và meal trùng nhau
    function filterDataChecked(data) {
        const computedFoodData = data
        for(let i = 0; i < computedFoodData.length; i++) {
            for(let j = i+ 1; j < computedFoodData.length; j++) {
                const isMatch = (computedFoodData[i]._id === computedFoodData[j]._id && computedFoodData[i].meal === computedFoodData[j].meal )
                if(isMatch) {
                    computedFoodData[i].quantityFood += computedFoodData[j].quantityFood
                    computedFoodData.splice(j, 1)
                    j--
                }
            }
        }
        return computedFoodData
    }


    //Xóa một dòng dữ liệu
    const handleRemove = () => {
        const computedFoodData = filterDataChecked(dataChecked)
        const newData = computedFoodData.filter(item => !(item._id === dataObj._id && item.meal === dataObj.meal))
        setDataChecked(newData)
    }


    //Cập nhật dữ liệu
    const handleQuantityFood = (valueQuantityFood, dataObj) => {
        const computedFoodData = filterDataChecked(dataChecked)
            const newDataChecked = computedFoodData.map(item => {
                if(item._id === dataObj._id ) {
                    return {
                        ...item,
                        quantityFood: +valueQuantityFood
                    }
                }
                return item
            })
            setDataChecked(newDataChecked)
        // else {
        //     let newDataChecked = computedFoodData.map(item => {
        //         if(item._id === dataObj._id && item.meal === dataObj.meal) {
        //             return {
        //                 ...item,
        //                 quantityFood: valueQuantityFood,
        //                 meal: valueMeal
        //             }
        //         }
        //         return item
        //     })
        //     newDataChecked = filterDataChecked(newDataChecked)
        //     setDataChecked(newDataChecked)
        // }
    }



    return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle} className = 'actionMealDropdown' >
        <DropdownToggle caret >
            <BsThreeDotsVertical className = 'BsThreeDotsVertical'/>
        </DropdownToggle>
        {showCustomFood 
        ? <CustomMenuFood 
                data = {dataObj}
                handleShowCustomFood = {handleShowCustomFood}
                handleQuantityFood = {handleQuantityFood}
                />
        : <DropdownMenu>
            <DropdownItem 
            onClick = {handleShowCustomFood}
            >
                <BsPen className = "mr-2"/>
                Chỉnh sửa
            </DropdownItem >
            <DropdownItem 
            className = "removeRowTable"
            onClick = {handleRemove}
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
