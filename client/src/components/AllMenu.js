import '../scss/AllMenu.scss'
import { Table } from 'reactstrap'
import { useSelector } from 'react-redux'
import { ContextMenu } from './MenuItems'
import { useEffect, useState, useMemo, useRef, useContext } from 'react'
import PaginationData from './PaginationData'


const AllMenu = ({ setNameMenu }) => {
    const [setDataChecked] = useContext(ContextMenu)
    const userMenu = useSelector( state => 
        {
            return state.userMenu
        }
    )

    const { getMenu  } = userMenu

    const [allMenuState, setAllMenuState] = useState()
    const [allMenuFoodState, setAllMenuFoodState] = useState()
    const [allFoodState, setAllFoodState] = useState()

    //Ràng buộc dữ liệu vào các state
    useEffect(() => {
        if(getMenu) {
            setAllMenuState(getMenu.allMenu)
            setAllMenuFoodState(getMenu.allMenuFood)
            setAllFoodState(getMenu.allFood)
        }
    },[getMenu])

    //Thiết lập các thực đơn từ dữ liệu được trả về
    const handleMenu = useMemo(() => {
        //Tương ứng với id của từng thực đơn
        if(allFoodState && allMenuFoodState && allMenuState )
        {

            const handleMenu = allMenuState.map((menu)=> {
                const arrMenuFood = allMenuFoodState.filter((arrMenufood) =>arrMenufood.menu_id === menu._id)
                const arrFoodOfMenu = arrMenuFood.map((menufood) => {
                    const foodOfMenu =  allFoodState.filter((food) => food._id === menufood.food_id)
                    const quantityFood = menufood.qty
                    return { 
                        ...foodOfMenu[0], 
                        quantityFood
                    }
                })
                //Tổng calo
                const reduceFunctionCalo = (prev, currentValue) => {
                    const calo = (currentValue.protein * 4 + currentValue.carbs*4 + currentValue.fat*9)*currentValue.quantityFood
                    return prev + calo
                }
                const totalCalo = arrFoodOfMenu.reduce(reduceFunctionCalo, 0)
                //Tổng protein
                const reduceFunctionPro = (prev, currentValue) => {
                    const pro = (currentValue.protein )*currentValue.quantityFood
                    return prev + pro
                }
                const totalPro = arrFoodOfMenu.reduce(reduceFunctionPro, 0)
                 //Tổng carbs
                 const reduceFunctionCarbs = (prev, currentValue) => {
                    const carbs = (currentValue.carbs )*currentValue.quantityFood
                    return prev + carbs
                }
                const totalCarbs = arrFoodOfMenu.reduce(reduceFunctionCarbs, 0)
                 //Tổng carbs
                 const reduceFunctionFat = (prev, currentValue) => {
                    const fat = (currentValue.fat )*currentValue.quantityFood
                    return prev + fat
                }
                const totalFat = arrFoodOfMenu.reduce(reduceFunctionFat, 0)
                return {
                    name: menu.name,
                    arrFoodOfMenu,
                    calo: Math.round(totalCalo),
                    totalPro,
                    totalCarbs,
                    totalFat
                }
            })
    
            return handleMenu
        }
    },[allFoodState, allMenuFoodState, allMenuState])



    const [totalItems, setTotalItems] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const ITEMS_PER_PAGE = 3

     //Tìm kiếm và phân trang
     let computedFoodData = useMemo(() => {
         if(allMenuState) {

             let computedFoodData = handleMenu
             setTotalItems(computedFoodData.length)
             
             return computedFoodData.slice(
                 (currentPage - 1) * ITEMS_PER_PAGE,
                 (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
             )
         }
    }, [allMenuState, handleMenu, currentPage])

    const totalPages = useRef(0)
    useMemo(() => {
        if(allMenuState) {

            totalPages.current = Math.ceil(allMenuState.length / ITEMS_PER_PAGE)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[allMenuState])
    
    const handleUpdateMenuTable = ( name) => {
        setNameMenu(name)
        const newMenuData =  handleMenu.filter((menu) => menu.name === name)
        setDataChecked(newMenuData[0].arrFoodOfMenu)
    }
    
        

    return (
        <div className = 'allMenu'>
            <div className="header-allMenu">
                <h3>Thực đơn của bạn</h3>
            </div>
            <Table borderless  hover className="table-allMenu">
                <thead>
                    <tr>
                        <th>Tên thực đơn</th>
                        <th>Calo</th>
                        <th>Protein</th>
                        <th>Carbs</th>
                        <th>Fat</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        computedFoodData ?
                        computedFoodData.map((menu, i) => {
                            return (
                                <tr key = {i} onClick = {()=>handleUpdateMenuTable( menu.name)}>
                                    <td>{menu.name}</td>
                                    <td>{menu.calo}</td>
                                    <td>{menu.totalPro}</td>
                                    <td>{menu.totalCarbs}</td>
                                    <td>{menu.totalFat}</td>
                                </tr>
                            )
                        })
                        : true
                    }
                </tbody>
            </Table>
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

export default AllMenu
