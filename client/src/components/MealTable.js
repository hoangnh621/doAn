import '../scss/MealTable.scss'
import {Table} from 'reactstrap'
import {foodData} from './Data.js'
import ActionMealDropdown from './ActionMealDropdown'
import {useState, useEffect, useRef} from 'react'



function MealTable({
    //Bữa sáng
    setMealCaloBreFa
    , setMealProteinBreFa
    , setMealCarbsBreFa
    , setMealFatBreFa
    //Bữa trưa
    ,setMealCaloLunch
    ,setMealProteinLunch
    ,setMealCarbsLunch
    ,setMealFatLunch
    //Bữa tối
    ,setMealCaloDinner
    ,setMealProteinDinner
    ,setMealCarbsDinner
    ,setMealFatDinner
    //Bữa phụ
    ,setMealCaloSnacks
    ,setMealProteinSnacks
    ,setMealCarbsSnacks
    ,setMealFatSnacks
}) {
    //State giúp xóa một row, không quan trọng giá trị, mục đích để re-render MealTable
    const [isRemoveRow, setIsRemoveRow] = useState(false)
    
    //Bữa sáng
    const CaloBreFa = useRef()
    const ProteinBreFa = useRef()
    const CarbsBreFa = useRef()
    const FatBreFa = useRef()
    CaloBreFa.current = 0
    ProteinBreFa.current = 0
    CarbsBreFa.current = 0
    FatBreFa.current = 0
    useEffect(() => {
        const arrBreakfastMeal = document.getElementsByClassName('breakfast-meal')

        const arrMealCalo = arrBreakfastMeal[0].getElementsByClassName('meal-calo')
        for(let i = 0; i < arrMealCalo.length; i++) {
            let caloFood = parseFloat(arrMealCalo[i].innerHTML)
           CaloBreFa.current += caloFood
        }

        const arrMealProtein = arrBreakfastMeal[0].getElementsByClassName('meal-protein')
        for(let i = 0; i < arrMealProtein.length; i++) {
            let proteinFood = parseFloat(arrMealProtein[i].innerHTML)
            ProteinBreFa.current += proteinFood
        }

        const arrMealCarbs = arrBreakfastMeal[0].getElementsByClassName('meal-carbs')
        for(let i = 0; i < arrMealCarbs.length; i++) {
            let carbsFood = parseFloat(arrMealCarbs[i].innerHTML)
            CarbsBreFa.current += carbsFood
        }

        const arrMealFat = arrBreakfastMeal[0].getElementsByClassName('meal-fat')
        for(let i = 0; i < arrMealFat.length; i++) {
            let fatFood = parseFloat(arrMealFat[i].innerHTML)
            FatBreFa.current += fatFood
        }

        setMealCaloBreFa(CaloBreFa.current)
        setMealProteinBreFa(ProteinBreFa.current)
        setMealCarbsBreFa(CarbsBreFa.current)
        setMealFatBreFa(FatBreFa.current)
    })

    //Bữa trưa
    const CaloLunch = useRef()
    const ProteinLunch = useRef()
    const CarbsLunch = useRef()
    const FatLunch = useRef()
    CaloLunch.current = 0
    ProteinLunch.current = 0
    CarbsLunch.current = 0
    FatLunch.current = 0
    useEffect(() => {
        const arrLunchMeal = document.getElementsByClassName('lunch-meal')

        const arrMealCalo = arrLunchMeal[0].getElementsByClassName('meal-calo')
        for(let i = 0; i < arrMealCalo.length; i++) {
            let caloFood = parseFloat(arrMealCalo[i].innerHTML)
           CaloLunch.current += caloFood
        }

        const arrMealProtein = arrLunchMeal[0].getElementsByClassName('meal-protein')
        for(let i = 0; i < arrMealProtein.length; i++) {
            let proteinFood = parseFloat(arrMealProtein[i].innerHTML)
            ProteinLunch.current += proteinFood
        }

        const arrMealCarbs = arrLunchMeal[0].getElementsByClassName('meal-carbs')
        for(let i = 0; i < arrMealCarbs.length; i++) {
            let carbsFood = parseFloat(arrMealCarbs[i].innerHTML)
            CarbsLunch.current += carbsFood
        }

        const arrMealFat = arrLunchMeal[0].getElementsByClassName('meal-fat')
        for(let i = 0; i < arrMealFat.length; i++) {
            let fatFood = parseFloat(arrMealFat[i].innerHTML)
            FatLunch.current += fatFood
        }

        setMealCaloLunch(CaloLunch.current)
        setMealProteinLunch(ProteinLunch.current)
        setMealCarbsLunch(CarbsLunch.current)
        setMealFatLunch(FatLunch.current)
    })

    //Bữa tối
    const CaloDinner = useRef()
    const ProteinDinner = useRef()
    const CarbsDinner = useRef()
    const FatDinner = useRef()
    CaloDinner.current = 0
    ProteinDinner.current = 0
    CarbsDinner.current = 0
    FatDinner.current = 0
    useEffect(() => {
        const arrDinnerMeal = document.getElementsByClassName('dinner-meal')

        const arrMealCalo = arrDinnerMeal[0].getElementsByClassName('meal-calo')
        for(let i = 0; i < arrMealCalo.length; i++) {
            let caloFood = parseFloat(arrMealCalo[i].innerHTML)
           CaloDinner.current += caloFood
        }

        const arrMealProtein = arrDinnerMeal[0].getElementsByClassName('meal-protein')
        for(let i = 0; i < arrMealProtein.length; i++) {
            let proteinFood = parseFloat(arrMealProtein[i].innerHTML)
            ProteinDinner.current += proteinFood
        }

        const arrMealCarbs = arrDinnerMeal[0].getElementsByClassName('meal-carbs')
        for(let i = 0; i < arrMealCarbs.length; i++) {
            let carbsFood = parseFloat(arrMealCarbs[i].innerHTML)
            CarbsDinner.current += carbsFood
        }

        const arrMealFat = arrDinnerMeal[0].getElementsByClassName('meal-fat')
        for(let i = 0; i < arrMealFat.length; i++) {
            let fatFood = parseFloat(arrMealFat[i].innerHTML)
            FatDinner.current += fatFood
        }

        setMealCaloDinner(CaloDinner.current)
        setMealProteinDinner(ProteinDinner.current)
        setMealCarbsDinner(CarbsDinner.current)
        setMealFatDinner(FatDinner.current)
    })

    //Bữa phụ
    const CaloSnacks = useRef()
    const ProteinSnacks = useRef()
    const CarbsSnacks = useRef()
    const FatSnacks = useRef()
    CaloSnacks.current = 0
    ProteinSnacks.current = 0
    CarbsSnacks.current = 0
    FatSnacks.current = 0
    useEffect(() => {
        const arrSnacksMeal = document.getElementsByClassName('snacks-meal')

        const arrMealCalo = arrSnacksMeal[0].getElementsByClassName('meal-calo')
        for(let i = 0; i < arrMealCalo.length; i++) {
            let caloFood = parseFloat(arrMealCalo[i].innerHTML)
           CaloSnacks.current += caloFood
        }

        const arrMealProtein = arrSnacksMeal[0].getElementsByClassName('meal-protein')
        for(let i = 0; i < arrMealProtein.length; i++) {
            let proteinFood = parseFloat(arrMealProtein[i].innerHTML)
            ProteinSnacks.current += proteinFood
        }

        const arrMealCarbs = arrSnacksMeal[0].getElementsByClassName('meal-carbs')
        for(let i = 0; i < arrMealCarbs.length; i++) {
            let carbsFood = parseFloat(arrMealCarbs[i].innerHTML)
            CarbsSnacks.current += carbsFood
        }

        const arrMealFat = arrSnacksMeal[0].getElementsByClassName('meal-fat')
        for(let i = 0; i < arrMealFat.length; i++) {
            let fatFood = parseFloat(arrMealFat[i].innerHTML)
            FatSnacks.current += fatFood
        }

        setMealCaloSnacks(CaloSnacks.current)
        setMealProteinSnacks(ProteinSnacks.current)
        setMealCarbsSnacks(CarbsSnacks.current)
        setMealFatSnacks(FatSnacks.current)
    })

    return (
        <Table borderless hover className = "m-0 mealTable">
            <thead>
                <tr>
                    <th>Thức ăn</th>
                    <th>Số lượng</th>
                    <th>Calories (calo)</th>
                    <th>Protein (g)</th>
                    <th>Carbs (g)</th>
                    <th>Fat (g)</th>
                    <th>Tùy chọn</th>
                </tr>
            </thead>
            <tbody>
                {foodData.map(({id,name,unit,protein,carbs,fat}) => {
                    return (
                    <tr key = {id} >
                        <td>{name}</td>
                        <td>{}({unit})</td>
                        <td className = "meal-calo">{protein*4 + carbs*4 + fat*9}</td>
                        <td className = "meal-protein">{protein}</td>
                        <td className = "meal-carbs">{carbs}</td>                    
                        <td className = "meal-fat">{fat}</td>
                        <td>
                            <ActionMealDropdown 
                            isRemoveRow = {isRemoveRow} 
                            setIsRemoveRow = {setIsRemoveRow}
                            />
                        </td>
                    </tr>
                    )
                })}
            </tbody>
        </Table>
    )
}

export default MealTable