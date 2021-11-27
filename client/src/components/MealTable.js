import '../scss/MealTable.scss'
import {Table} from 'reactstrap'
import ActionMealDropdown from './ActionMealDropdown'



function MealTable({dataArr}) {


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
                {dataArr.map((dataObj) => {
                    return (
                    <tr key = {dataObj.id} >
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
    )
}

export default MealTable