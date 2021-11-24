/* eslint-disable jsx-a11y/anchor-is-valid */
import { foodData } from './Data'
import '../scss/SearchFoodTable.scss'
import CustomFood from './CustomFood'
import { Context } from './MealItems'
import { Table, Button } from 'reactstrap'
import { BsPen, BsPlus } from 'react-icons/bs'
import CustomCheckbox from './CustomCheckbox'
import SearchInputFood from './SearchInputFood'
import PaginationData from './PaginationData'
import { useState, useMemo, useEffect, useCallback, useContext, } from 'react'


function SearchFoodTable() {
    //Mảng chứa dữ liệu của các row đã checked
    const [idChecked, setIdChecked] = useState([])
    const [dataSearchTable, setDataSearchTable] = useState([])
    const [dataChecked, setDataChecked] = useContext(Context)


    //State hiện thị customFood mỗi khi click vào bsPen của từng row
    const [currentCustomFood, setCurrenCustomFood] = useState()
    const handleShowCustomFood = useCallback((e) => {
        setCurrenCustomFood(e.currentTarget.id)
    }, [])


    //State tổng số row(item), page hiện tại, search
    const [totalItems, setTotalItems] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [searchFood, setSearchFood] = useState('')
    const handleSearch = (valueSearch) => {
        setSearchFood(valueSearch)
        setCurrentPage(1)
    }


    //Số row của một trang pagination
    const ITEMS_PER_PAGE = 3

    
    //Sao chép dữ liệu, và thêm các thuộc tính mới
    const [dataRep, setDataRep] = useState(() => {
        let computedFoodData = foodData
        computedFoodData = computedFoodData.map(item => ({
            ...item,
            quantityFood: 1,
            meal: 'breakfast',
        }))
        return computedFoodData
    })


    //Tìm kiếm và phân trang
    let computedFoodData = useMemo(() => {
        let computedFoodData = dataRep
        setTotalItems(computedFoodData.length)

        if(searchFood) {
            computedFoodData = computedFoodData.filter(
                food => 
                    food.name.toLowerCase().includes(searchFood.toLowerCase())
            )
        }
        return computedFoodData.slice(
            (currentPage - 1) * ITEMS_PER_PAGE,
            (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
        )
    }, [currentPage, dataRep, searchFood])


    //Set số lượng của từng loại thức ăn
    const handleQuantityFood = (valueQuantityFood, valueMeal, data) => {
        setDataRep(prev => {
            return prev.map(item => {
                if(item.id === data.id)
                return {
                ...item,
                quantityFood: +valueQuantityFood,
                meal: valueMeal,
                }
                return item
            })
        })
    }


    //Xử lý dữ liệu khi checked vào các checkbox
    const handleChecked = useCallback((data) => {
       const isChecked = idChecked.includes(data.id)
       if(isChecked) {
            setIdChecked(idChecked.filter(id => id !== data.id))
       }
       else {
            setIdChecked(prevIdChecked => ([
                ...prevIdChecked,
                data.id,
            ]))
            setDataSearchTable (prevData => ([
                ...prevData,
                data
            ]))
       } 
    }, [idChecked])


    //Ràng buộc dữ liệu với checkbox đang check
    useEffect(() => {
        setDataSearchTable(
            computedFoodData.filter(item => idChecked.includes(item.id)
        ))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[computedFoodData, idChecked])


    //Di chuyển dữ liệu sang bảng meal
    const handleMoveData = () => {
        setDataChecked(dataSearchTable)
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
                <Button
                onClick = {handleMoveData}
                >
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
                        {computedFoodData.map((data) => {
                            return (
                            <tr key = {data.id}>
                                <td><CustomCheckbox 
                                data = {data}
                                idChecked = {idChecked}
                                dataChecked = {dataChecked}
                                handleChecked = {handleChecked}
                                />
                                </td>
                                <td>{data.name}</td>
                                <td>{`${data.quantity * data.quantityFood} (${data.unit})`}</td>
                                <td className = "search-protein">{data.protein * data.quantityFood}</td>
                                <td className = "search-carbs">{data.carbs * data.quantityFood}</td>                    
                                <td className = "search-fat">{data.fat * data.quantityFood}</td>
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
                                            handleQuantityFood = {handleQuantityFood}
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