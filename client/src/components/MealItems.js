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
import { setNutriToday, setNutriTypeMeal } from '../actions/nutri'

const Context = createContext()


const MealItems = () => {
    const [checkedData, setCheckedData] = useState([])
    const [date, setDate] = useState(new Date())
    const [active, setActive] = useState('breakfast')
    const toggle = tab => {
        setActive(tab);
    }
    const dispatch = useDispatch()
    const userSignin = useSelector( state => 
        {
            return state.userSignin
        }
    )
    const { userInfo } = userSignin
    useEffect(() => {
        if(userInfo) {
            if(!userInfo.isAdmin)
            dispatch(getMeal())
        }
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
            console.log('state', state)
            return state.userMeal
        }
    )

    const { userSetMeal  } = userMeal
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

                //Tổng calo
                const reduceFunctionCalo = (prev, currentValue) => {
                    const calo = (currentValue.protein * 4 + currentValue.carbs*4 + currentValue.fat*9)*currentValue.quantityFood
                    return prev + calo
                }
                const totalCalo = arrFoodOfMeal.reduce(reduceFunctionCalo, 0)
                //Tổng protein
                const reduceFunctionPro = (prev, currentValue) => {
                    const pro = (currentValue.protein )*currentValue.quantityFood
                    return prev + pro
                }
                const totalPro = arrFoodOfMeal.reduce(reduceFunctionPro, 0)
                 //Tổng carbs
                 const reduceFunctionCarbs = (prev, currentValue) => {
                    const carbs = (currentValue.carbs )*currentValue.quantityFood
                    return prev + carbs
                }
                const totalCarbs = arrFoodOfMeal.reduce(reduceFunctionCarbs, 0)
                 //Tổng carbs
                 const reduceFunctionFat = (prev, currentValue) => {
                    const fat = (currentValue.fat )*currentValue.quantityFood
                    return prev + fat
                }
                const totalFat = arrFoodOfMeal.reduce(reduceFunctionFat, 0)

                return {
                    arrFoodOfMeal,
                    createdAt: meal.created_at, 
                    totalCalo,
                    totalPro,
                    totalCarbs,
                    totalFat, 
                    type: meal.type
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
    useMemo(() => {
        if(handleMeal) {

            const newMealData =  handleMeal.filter((meal) => meal.createdAt === createdAt)
            if(newMealData.length === 0) {
                setCheckedData([])
            }
            else {
                const mealToday = []
                newMealData.map(item => {
                    mealToday.push(...item.arrFoodOfMeal)
                    return item
                })
                setCheckedData(mealToday)
            }
        }
    },[createdAt, handleMeal])

    useEffect(() => {
        if(handleMeal) {

            const newMealData =  handleMeal.filter((meal) => meal.createdAt === createdAt)
            if(newMealData.length !== 0) {
                //Tổng calo
                const reduceFunctionCalo = (prev, currentValue) => {
                    const calo = (currentValue.totalPro * 4 + currentValue.totalCarbs*4 + currentValue.totalFat*9)
                    return prev + calo
                }
                const todayCalo = newMealData.reduce(reduceFunctionCalo, 0)
                //Tổng totalPro
                const reduceFunctionPro = (prev, currentValue) => {
                    const pro = (currentValue.totalPro )
                    return prev + pro
                }
                const todayPro = newMealData.reduce(reduceFunctionPro, 0)
                 //Tổng carbs
                 const reduceFunctionCarbs = (prev, currentValue) => {
                    const carbs = (currentValue.totalCarbs )
                    return prev + carbs
                }
                const todayCarbs = newMealData.reduce(reduceFunctionCarbs, 0)
                 //Tổng carbs
                 const reduceFunctionFat = (prev, currentValue) => {
                    const fat = (currentValue.totalFat )
                    return prev + fat
                }
                const todayFat = newMealData.reduce(reduceFunctionFat, 0)

                //Lấy calo từng loại bữa ăn
                let caloBreak = 0
                let caloLunch = 0
                let caloDinner = 0
                let caloSnacks = 0
                newMealData.map(item => {
                    if(item.type === 'breakfast') caloBreak = item.totalCalo
                    else if(item.type === 'lunch') caloLunch = item.totalCalo
                    else if(item.type === 'dinner') caloDinner = item.totalCalo
                    else caloSnacks = item.totalCalo
                    return item
                })
            
                dispatch(setNutriToday(todayCalo, todayPro, todayCarbs, todayFat))
                dispatch(setNutriTypeMeal(caloBreak, caloLunch, caloDinner, caloSnacks,))
            }
        }
    },[createdAt, dispatch, handleMeal])

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
   }, [allMenuState, currentPage, handleMenu])

   const totalPages = useRef(0)
   useMemo(() => {
       if(allMenuState) {

           totalPages.current = Math.ceil(allMenuState.length / ITEMS_PER_PAGE)
       }
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
