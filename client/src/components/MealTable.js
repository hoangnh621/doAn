import '../scss/MealTable.scss'
import {Table} from 'reactstrap'
import ActionMealDropdown from './ActionMealDropdown'
import { useState } from 'react'



function MealTable({data}) {
    //State giúp xóa một row, không quan trọng giá trị, mục đích để re-render MealTable
    const [isRemoveRow, setIsRemoveRow] = useState(false)

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
                {data.map(({id, name, quantity, unit, protein, carbs, fat, quantityFood}) => {
                    return (
                    <tr key = {id} >
                        <td>{name}</td>
                        <td>{quantity*quantityFood} ({unit})</td>
                        <td>{(protein*4 + carbs*4 + fat*9)* quantityFood}</td>
                        <td>{protein}</td>
                        <td>{carbs}</td>                    
                        <td>{fat}</td>
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