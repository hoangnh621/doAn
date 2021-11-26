import { useState, useContext } from 'react'
import CustomFood from './CustomFood'
import { MealPillContext } from './MealPill'
import { Context as MealItemContext } from './MealItems'
import '../scss/ActionMealDropdown.scss'
import {RiDeleteBinLine} from 'react-icons/ri'
import {BsThreeDotsVertical, BsPen} from 'react-icons/bs'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

const ActionMealDropdown = ({dataObj,dataArr}) => {
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const toggle = () => setDropdownOpen(prevState => !prevState)

    const [showCustomFood, setShowCustomFood] = useState(false)
    const handleShowCustomFood = () => {
        setShowCustomFood(!showCustomFood)
    }

    //Lấy dữ liệu từ MealPill
    const [dataShare, setDataShare] = useContext(MealPillContext)
    const [dataChecked, setDataChecked] = useContext(MealItemContext)


    //Xóa một dòng dữ liệu
    const handleRemove = () => {
        const filterData = dataChecked.filter(item => !(item.id === dataObj.id && item.meal === dataObj.meal))
        setDataChecked(filterData)
        // switch(dataObj.meal) {
        //     case 'breakfast': { 
        //         const filterData = dataShare.breakfast.filter(item => item.id !== dataObj.id)
        //         setDataShare(prevData => ({
        //             ...prevData,
        //             breakfast: filterData
        //         }))
        //         break
        //     }
        //     case 'lunch': { 
        //         const filterData = dataShare.lunch.filter(item => item.id !== dataObj.id)
        //         setDataShare(prevData => ({
        //             ...prevData,
        //             lunch: filterData
        //         }))
        //         break
        //     }
        //     case 'dinner': { 
        //         const filterData = dataShare.dinner.filter(item => item.id !== dataObj.id)
        //         setDataShare(prevData => ({
        //             ...prevData,
        //             dinner: filterData
        //         }))
        //         break
        //     }
        //     case 'snacks': { 
        //         const filterData = dataShare.snacks.filter(item => item.id !== dataObj.id)
        //         setDataShare(prevData => ({
        //             ...prevData,
        //             snacks: filterData
        //         }))
        //         break
        //     }
        //     default:
        //         return new Error('Invalid value')
        // }
    }
    console.log(dataChecked)
    console.log(dataShare)


    //Cập nhật dữ liệu
    const handleQuantityFood = (valueQuantityFood, valueMeal, dataObj) => {
        if(valueMeal === dataObj.meal) {
            const newData = dataArr.map(item => {
                if(item.id === dataObj.id) {
                    return {
                        ...item,
                        quantityFood: valueQuantityFood
                    }
                }
                return item
            })
            setDataShare(prevData => ({
                ...prevData,
                [dataObj.meal]: newData
            }))
        }
        else {
            let dataValueMeal = []
            switch(valueMeal) {
                case 'breakfast': dataValueMeal =  dataShare.breakfast 
                break
                case 'lunch': dataValueMeal =  dataShare.lunch 
                break
                case 'dinner': dataValueMeal =  dataShare.dinner 
                break
                default: dataValueMeal = dataShare.snacks
            }
            console.log('dataValueMeal', dataValueMeal)
            const isInto = dataValueMeal.filter(item => item.id === dataObj.id).length
            console.log(isInto)
            if(!isInto) {
                dataValueMeal = [...dataValueMeal, dataObj]
                setDataShare(prevData => ({
                    ...prevData,
                    [valueMeal]: dataValueMeal
                }))
                handleRemove()
            }
            else {
                const updateData = dataValueMeal.map(item => {
                    if(item.id === dataObj.id) {
                        console.log(item.quantityFood + dataObj.quantityFood)
                        return {
                            ...item,
                            quantityFood: item.quantityFood + dataObj.quantityFood
                        }
                    }
                    else return item
                })
                setDataShare(prevData => ({
                    ...prevData,
                    [valueMeal]: updateData
                }))
            }
            handleRemove()
        }
    }


    return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle} >
        <DropdownToggle caret >
            <BsThreeDotsVertical/>
        </DropdownToggle>
        {showCustomFood 
        ? <CustomFood 
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
