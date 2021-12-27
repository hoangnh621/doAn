import '../scss/MealItems.scss'
import MealPill from './MealPill'
import { Row, Col, Table } from 'reactstrap'
import { createContext, useState, useMemo, useRef, useEffect } from 'react'
import SearchFoodTable from './SearchFoodTable'
import ProgressMeal from './ProgressMeal'
import CalendarMeal from './CalendarMeal'
import { useSelector, useDispatch } from 'react-redux'
import PaginationData from './PaginationData'
import { getMeal } from '../actions/mealAction'

const Context = createContext()


const MealItems = () => {
    const [checkedData, setCheckedData] = useState([])
    const [date, setDate] = useState(new Date())
    const [active, setActive] = useState('breakfast')
    const toggle = tab => {
        setActive(tab);
    }
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getMeal())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    //Lấy state thực đơn
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


     //Lấy state bữa ăn
     const userMeal = useSelector( state => 
        {
            return state.userMeal
        }
    )

    const { userSetMeal  } = userMeal
    console.log('userSetMeal', userSetMeal)

    const [allMealState, setAllMealState] = useState()
    const [allMealFoodState, setAllMealFoodState] = useState()

    //Ràng buộc dữ liệu vào các state
    useEffect(() => {
        if(userSetMeal) {
            setAllMealState(userSetMeal.allMeal)
            setAllMealFoodState(userSetMeal.allMealFood)
        }
    },[userSetMeal])
    //Thiết lập các bữa ăn từ dữ liệu được trả về
    const handleMeal = useMemo(() => {
        //Tương ứng với id của từng thực đơn
        if(allMealState && allMealFoodState && allFoodState )
        {

            const handleMeal = allMealState.map((meal)=> {
                const arrMealFood = allMealFoodState.filter((arrMealfood) =>arrMealfood.meal_id === meal._id)
                const arrFoodOfMeal = arrMealFood.map((mealfood) => {
                    const foodOfMeal =  allFoodState.filter((food) => food._id === mealfood.food_id)
                    const quantityFood = mealfood.qty
                    return { 
                        ...foodOfMeal[0], 
                        quantityFood,
                        meal: meal.type
                    }
                })
                return {
                    arrFoodOfMeal,
                    createdAt: meal.created_at
                }
            })
    
            return handleMeal
        }
    },[allFoodState, allMealFoodState, allMealState])

    //Click chọn ngày và hiển thị bữa ăn tương ứng
    const createdAt = ''+date.getDate()+''+ date.getMonth()+''+ date.getFullYear()
    const handleUpdateFromCalendar = ( ) => {
        if(handleMeal) {

            const newMealData =  handleMeal.filter((meal) => meal.createdAt === createdAt)
            if(newMealData.length === 0) {
                setCheckedData([])
            }
            else
            setCheckedData(newMealData[0].arrFoodOfMeal)
        }
    }
    console.log('handleMeal',handleMeal)
    useMemo(() => {
        if(handleMeal) {

            const newMealData =  handleMeal.filter((meal) => meal.createdAt === createdAt)
            if(newMealData.length === 0) {
                setCheckedData([])
            }
            else
            setCheckedData(newMealData[0].arrFoodOfMeal)
        }
    },[createdAt, handleMeal])

    //Tìm kiếm và phân trang
    const [totalItems, setTotalItems] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const ITEMS_PER_PAGE = 3

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
    const newMenuData =  handleMenu.filter((menu) => menu.name === name)
    setCheckedData(newMenuData[0].arrFoodOfMenu.map((item) => ({
        ...item,
        meal: active
    })))
    }

    const [progressValue, setProgressValue] = useState({
        proProgress: 0,
        carbsProgress: 0,
        fatProgress: 0,
        caloProgress: 0,
    })
    console.log('dataChecked', checkedData)
    
    return (
        <Context.Provider value = {[ checkedData, setCheckedData ]}>
            <Row className = "content-meal-items">
                {/* bảng bữa ăn trong ngày */}
                <Col className="meal-table-items col-md-6 p-0 ">
                    <div className = "meal-table">
                        <MealPill
                        checkedData = {checkedData}
                        setCheckedData = {setCheckedData}
                        setProgressValue = {setProgressValue}
                        active = {active}
                        toggle = {toggle}
                        date = {date}
                        />
                    </div>
                    <Row className = 'calendar-meal'>
                        <Col>
                            <div className = 'calendaritem'>
                                <CalendarMeal
                                date = {date}
                                setDate = {setDate}
                                onChangeMeal = {handleUpdateFromCalendar}
                                />
                            </div>
                        </Col>
                        <Col>
                            <div className = 'progress-meal'>
                                <ProgressMeal title = 'Protein' value = {progressValue.proProgress}/>
                                <ProgressMeal title = 'Carbs' value = {progressValue.carbsProgress}/>
                                <ProgressMeal title = 'Fat' value = {progressValue.fatProgress}/>
                                <ProgressMeal title = 'Calo' value = {progressValue.caloProgress}/>
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col className="search-meals-item col-md-6">
                    <Row className = "search-chart-item">
                        <Col className="col-sm-12">
                            <SearchFoodTable/>
                        </Col>
                        <Col className="col-sm-12">
                        <div className = 'allMenu'>
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
                                                <tr key = {i} onClick = {()=> handleUpdateMenuTable(menu.name)}>
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
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Context.Provider>
    )
}

export { Context }
export default MealItems
