/* eslint-disable jsx-a11y/anchor-is-valid */
import { foodData } from './Data'
import { Table, Button } from 'reactstrap'
import { BsPen, BsPlus } from 'react-icons/bs'
import '../scss/SearchFoodTable.scss'
import { useState, useMemo } from 'react'
import CustomFood from './CustomFood'
import CustomCheckbox from './CustomCheckbox'
import SearchInputFood from './SearchInputFood'
import PaginationData from './PaginationData'

function SearchFoodTable() {
    //State hiện thị customFood mỗi khi click vào bsPen của từng row
    const [currentCustomFood, setCurrenCustomFood] = useState()
    const handleShowCustomFood = (e) => {
        setCurrenCustomFood(e.currentTarget.id)
    }
    //State tổng số row(item), page hiện tại, search
    const [totalItems, setTotalItems] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [searchFood, setSearchFood] = useState('')
    const handleSearch = (value) => {
        setSearchFood(value)
        setCurrentPage(1)
    }

    //Số row của một trang pagination
    const ITEMS_PER_PAGE = 3

    // eslint-disable-next-line no-unused-vars
    const food_data = useMemo(() => {
        let computedFoodData = foodData
        setTotalItems(computedFoodData.length)

        if(searchFood) {
            computedFoodData = computedFoodData.filter(
                foodData => 
                    foodData.name.toLowerCase().includes(searchFood.toLowerCase())
            )
        }

        return computedFoodData.slice(
            (currentPage - 1) * ITEMS_PER_PAGE,
            (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
        )
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage,  foodData, searchFood ])

    //Mảng chứa dữ liệu của các row đã checked
    const [dataChecked, setDataChecked] = useState([])
    const handleChecked = (data) => {
        setDataChecked(prev => {
            const isChecked = dataChecked.includes(data)
            if(isChecked) {
                return dataChecked.filter(item => item !== data)
            }
            else 
                return [...prev, data]
        })
    }


    return (
        <div className = "d-flex search-food-table">
            <div className = 'block-input-button'>
                <SearchInputFood 
                id = 'search-food' 
                content = 'Tìm kiếm'
                placeholder = 'Nhập tên thức ăn'
                onSearch = {handleSearch}
                />
                <Button>
                    Thêm
                    <BsPlus className = 'ml-2'/>
                </Button>
            </div>
            <div>
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
                        {food_data.map((data) => {
                            return (
                            <tr key = {data.id}>
                                <td><CustomCheckbox 
                                data = {data}
                                dataChecked = {dataChecked}
                                handleChecked = {handleChecked}
                                />
                                </td>
                                <td>{data.name}</td>
                                <td>{`${data.quantity} (${data.unit})`}</td>
                                <td className = "search-protein">{data.protein}</td>
                                <td className = "search-carbs">{data.carbs}</td>                    
                                <td className = "search-fat">{data.fat}</td>
                                <td>
                                    <a 
                                        id = {data.id}
                                        href = {null}
                                        onClick = {handleShowCustomFood}
                                    >
                                        <BsPen/>
                                    </a>
                                    {
                                        currentCustomFood === data.id 
                                        ? <CustomFood 
                                            data = {data}
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
            </div>
            <div className = 'pagination-data d-flex '>
                <PaginationData
                total = {totalItems}
                itemsPerPage = {ITEMS_PER_PAGE}
                currentPage = {currentPage}
                onPageChange = {page => setCurrentPage(page)}
                />
            </div>
        </div>
    )
}

export default SearchFoodTable