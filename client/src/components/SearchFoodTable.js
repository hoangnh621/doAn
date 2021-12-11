/* eslint-disable jsx-a11y/anchor-is-valid */
import '../scss/SearchFoodTable.scss'
import CustomFood from './CustomFood'
import { Context } from './MealItems'
import { Table, Button } from 'reactstrap'
import { BsPen, BsPlus } from 'react-icons/bs'
import CustomCheckbox from './CustomCheckbox'
import SearchInputFood from './SearchInputFood'
import PaginationData from './PaginationData'
import { useState, useMemo, useCallback, useContext, useRef, useEffect } from 'react'

import * as api from '../api/index.js';



function SearchFoodTable() {
    const [dataFood, setDataFood] = useState([])    
    useEffect(() => {
        const getFoods =  async () => {
            try {
                const {data} = await api.fetchFoods()
                setDataFood(data)
            }
            catch(err) {
                console.log(err)
            }
        }
        getFoods()
        return () => setDataFood([])
    },[])

    //Mảng chứa dữ liệu của các row đã checked
    const [idChecked, setIdChecked] = useState([])
    const [dataSearchTable, setDataSearchTable] = useState([])
    const [dataChecked, setDataChecked] = useContext(Context)


    //Lưu thành phần search input bằng useRef
    const searchRef = useRef()



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
    const ITEMS_PER_PAGE = 8

    
    //Sao chép dữ liệu, và thêm các thuộc tính mới
    const [dataRep, setDataRep] = useState([])

    useMemo(() => {
        let computedFoodData = dataFood
        computedFoodData = computedFoodData.map(item => ({
            ...item,
            quantityFood: 1,
            meal: 'breakfast',
        }))
        setDataRep(computedFoodData)
    }, [dataFood])


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
                if(item._id === data._id)
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
       const isChecked = idChecked.includes(data._id)
       if(isChecked) {
            setIdChecked(idChecked.filter(id => id !== data._id))
       }
       else {
            setIdChecked(prev_IdChecked => ([
                ...prev_IdChecked,
                data._id,
            ]))
            setDataSearchTable (prevData => ([
                ...prevData,
                data
            ]))
       } 
    }, [idChecked])


    //Ràng buộc dữ liệu với checkbox đang check
    useMemo(() => {
        setDataSearchTable(
            dataRep.filter(item => idChecked.includes(item._id)
        ))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[computedFoodData, idChecked])


    //Di chuyển dữ liệu sang bảng meal
    const handleMoveData = () => {
        setDataChecked(prevData => [
            ...prevData,
            ...dataSearchTable,
        ])
        setIdChecked([])
        setSearchFood('')
        setCurrentPage(1)
        searchRef.current.focus()
        const resetData = dataRep.map((item) => ({
            ...item,
            quantityFood: 1, 
            meal: 'breakfast',
        }))
        setDataRep(resetData)
    }

    
    return (
        <div className = "d-flex search-food-table">
            <div className = 'block-input-button'>
                <SearchInputFood 
                ref = {searchRef}
                id = 'search-food' 
                content = 'Tìm kiếm thức ăn'
                placeholder = 'Nhập tên thức ăn'
                searchFood = {searchFood}
                setSearchFood = {setSearchFood}
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
                        {computedFoodData.map((data,i) => {
                            return (
                            <tr key = {i}>
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
                                        id = {data._id}
                                        href = {null}
                                        onClick = {handleShowCustomFood}
                                    >
                                        <BsPen/>
                                    </a>
                                    {
                                        currentCustomFood === data._id
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