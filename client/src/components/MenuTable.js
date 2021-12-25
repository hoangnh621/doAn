import '../scss/MenuTable.scss'
import { Button, Table } from 'reactstrap'
import PaginationData from './PaginationData'
import InputInformation from './InputInformation'
import ActionMenuDropdown from './ActionMenuDropdown'
import { useState, useMemo, useRef, useContext} from 'react'
import { ContextMenu } from './MenuItems'
import { useDispatch,  } from 'react-redux'
import { createMenu, updateMenu, deleteMenu, getMenuUser } from '../actions/userAction'


const MenuTable = ({nameMenu, setNameMenu}) => {
    const [dataChecked, setDataChecked] = useContext(ContextMenu)
    const handleDataChecked = (dataChecked) => {
        //Đảm bảo dataChecked không tồn tại đồng thời nhiều phần tử có cùng id và meal
        const computedFoodData = dataChecked
        for(let i = 0; i < computedFoodData.length; i++) {
            for(let j = i+ 1; j < computedFoodData.length; j++) {
                const isMatch = (computedFoodData[i]._id === computedFoodData[j]._id && computedFoodData[i].meal === computedFoodData[j].meal )
                if(isMatch) {
                    computedFoodData[i].quantityFood += computedFoodData[j].quantityFood
                    computedFoodData.splice(j, 1)
                    j--
                }
            }
        }
        return computedFoodData
    }
    const dataFromTable = useRef()
    useMemo(() => {
       dataFromTable.current = handleDataChecked(dataChecked)
    }, [dataChecked])

    const [totalItems, setTotalItems] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const ITEMS_PER_PAGE = 6

     //Tìm kiếm và phân trang
     let computedFoodData = useMemo(() => {
        let computedFoodData = handleDataChecked(dataChecked)
        setTotalItems(computedFoodData.length)
        
        return computedFoodData.slice(
            (currentPage - 1) * ITEMS_PER_PAGE,
            (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
        )
    }, [currentPage, dataChecked])

    const totalPages = useRef(0)
    useMemo(() => {
         totalPages.current = Math.ceil(dataFromTable.current.length / ITEMS_PER_PAGE)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[dataFromTable.current])

    

    //Tạo menu mới
    const dispatch = useDispatch()
    const handleCreateMenu = () => {
        dispatch(createMenu(nameMenu, dataFromTable.current))
        dispatch(getMenuUser())

    }
    //Cập nhật menu
    const handleUpdateMenu = () => {
        dispatch(updateMenu(nameMenu, dataFromTable.current))
        dispatch(getMenuUser())

    }
    //Xóa thực đơn
    const handleDeteleMenu = () => {
        dispatch(deleteMenu(nameMenu))
        dispatch(getMenuUser())
        setDataChecked([])
        setNameMenu('') 
    }
    

    return (
        <div className = 'menuTable'>
             <div className = 'menuTable-header'>
                <InputInformation
                    id = 'menu-name'
                    content = 'Tên thực đơn'
                    placeholder = 'Nhập tên thực đơn'
                    data = {nameMenu}
                    setData = {setNameMenu}
                />
                <div className="menuButton">
                    <Button onClick = {handleCreateMenu}>Thêm mới</Button>
                    <Button onClick = { handleUpdateMenu }>Cập nhật</Button>
                    <Button onClick = {handleDeteleMenu}>Xóa</Button>
                </div>
            </div>
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
                            <td>{dataObj.protein * dataObj.quantityFood}</td>
                            <td>{dataObj.carbs * dataObj.quantityFood}</td>                    
                            <td>{dataObj.fat * dataObj.quantityFood}</td>
                            <td>
                                <ActionMenuDropdown
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
            
        </div>
    )
}

export default MenuTable
