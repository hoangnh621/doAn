/* eslint-disable jsx-a11y/anchor-is-valid */
import {foodData} from './Data'
import {Table} from 'reactstrap'
import {BsPen} from 'react-icons/bs'
import '../scss/SearchFoodTable.scss'
import {useState} from 'react'
import CustomFood from './CustomFood'
import CustomCheckbox from './CustomCheckbox'

function SearchFoodTable() {
    const [currentCustomFood, setCurrenCustomFood] = useState()
    const handleShowCustomFood = (e) => {
        setCurrenCustomFood(e.currentTarget.id)
        console.log(e.currentTarget)
        console.log(currentCustomFood)
    }


    return (
        <Table borderless hover className = "m-0 searchFoodTable">
            <thead>
                <tr>
                    <th>Chọn</th>
                    <th>Thức ăn</th>
                    <th>Số lượng</th>
                    <th>Protein (g)</th>
                    <th>Carbs (g)</th>
                    <th>Fat (g)</th>
                    <th>Chỉnh sửa</th>
                </tr>
            </thead>
            <tbody>
                {foodData.map(({id,name,protein,carbs,fat}) => {
                    return (
                    <tr key = {id}>
                        <td><CustomCheckbox label = ''/></td>
                        <td>{name}</td>
                        <td>100g</td>
                        <td className = "search-protein">{protein}</td>
                        <td className = "search-carbs">{carbs}</td>                    
                        <td className = "search-fat">{fat}</td>
                        <td>
                            <a 
                            id = {id}
                            href = {null}
                            onClick = {handleShowCustomFood}
                            >
                                <BsPen/>
                            </a>
                            {
                            currentCustomFood === id 
                            ? <CustomFood 
                            handleShowCustomFood ={() => setCurrenCustomFood()}
                            />
                            : true
                            }
                        </td>
                    </tr>
                    )
                })}
            </tbody>
        </Table>
    )
}

export default SearchFoodTable