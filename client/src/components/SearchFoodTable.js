/* eslint-disable jsx-a11y/anchor-is-valid */
import {foodData} from './Data'
import {Table} from 'reactstrap'
import {BsPen} from 'react-icons/bs'
import '../scss/SearchFoodTable.scss'
import {useState} from 'react'
import CustomFood from './CustomFood'
import CustomCheckbox from './CustomCheckbox'

function SearchFoodTable() {
    const [isCustomFoodSearch, setIsCustomFoodSearch] = useState()
    const toggle = (e) => {
        setIsCustomFoodSearch( e.target.id)
    }

    return (
        <Table borderless hover className = "m-0">
            <thead>
                <tr>
                    <th>Chọn</th>
                    <th>Thức ăn</th>
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
                        <td className = "search-protein">{protein}</td>
                        <td className = "search-carbs">{carbs}</td>                    
                        <td className = "search-fat">{fat}</td>
                        <td>
                            <a 
                            id = {id}
                            href = {null}
                            onClick = {toggle}
                            >
                                <BsPen/>
                            </a>
                            {
                            isCustomFoodSearch === 
                            <CustomFood 
                            handleShowCustomFood ={setIsCustomFoodSearch}
                            />
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