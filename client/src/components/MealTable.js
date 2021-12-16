import '../scss/MealTable.scss'
import {Table} from 'reactstrap'
import PaginationData from './PaginationData'
import ActionMealDropdown from './ActionMealDropdown'
import { useState, useMemo, useRef } from 'react'



function MealTable({dataArr}) {
    const [totalItems, setTotalItems] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const ITEMS_PER_PAGE = 8

     //Tìm kiếm và phân trang
     let computedFoodData = useMemo(() => {
        let computedFoodData = dataArr
        setTotalItems(computedFoodData.length)
        
        return computedFoodData.slice(
            (currentPage - 1) * ITEMS_PER_PAGE,
            (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
        )
    }, [currentPage, dataArr])

    const totalPages = useRef(0)
    useMemo(() => {
         totalPages.current = Math.ceil(dataArr.length / ITEMS_PER_PAGE)
    },[dataArr])
    return (
        <>
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
                    {computedFoodData.map((dataObj) => {
                        return (
                        <tr key = {dataObj._id} >
                            <td>{dataObj.name}</td>
                            <td>{dataObj.quantity*dataObj.quantityFood} ({dataObj.unit})</td>
                            <td>{(dataObj.protein*4 + dataObj.carbs*4 + dataObj.fat*9)* dataObj.quantityFood}</td>
                            <td>{dataObj.protein}</td>
                            <td>{dataObj.carbs}</td>                    
                            <td>{dataObj.fat}</td>
                            <td>
                                <ActionMealDropdown
                                dataObj = {dataObj}
                                />
                            </td>
                        </tr>
                        )
                    })}
                </tbody>
            </Table>
            <div className = 'pagination-data d-flex '>
                {
                    totalPages.current > 1 
                    ?
                    <PaginationData
                    total = {totalItems}
                    itemsPerPage = {ITEMS_PER_PAGE}
                    currentPage = {currentPage}
                    onPageChange = {page => setCurrentPage(page)}
                    />
                    : true
                }
            </div>
        </>
    )
}

export default MealTable