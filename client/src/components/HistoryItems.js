import { Row, Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap'
import  '../scss/HistoryItems.scss'
import TodayChart from './TodayChart'
import PercentFourMealChart from './PercentFourMealChart'
import { useState, useMemo, useEffect} from 'react'
import { useSelector,  } from 'react-redux'
import HistoryCaloChart from './HistoryCaloChart.js'
import HistoryWeight from './HistoryWeight'
import moment from 'moment'

const HistoryItems = () => {
    const [dropdownOpen, setOpen] = useState(false);

    const toggle = () => setOpen(!dropdownOpen);

    // const [dropdownOpen2, setOpen2] = useState(false);

    // const toggle2 = () => setOpen2(!dropdownOpen2);
     //Biểu đồ lịch sử cân nặng
     
     const [dataWeight, setDataWeight] = useState()
     const userWeight = useSelector( state => {
         console.log(state)
        return state.userWeight
    })
    const { getHistoryWeight } = userWeight
    useMemo(()=> {
        if(getHistoryWeight) {
            const newDataWeight = getHistoryWeight.map(item => {
                const date = moment(item.created_at,'DDMMYYYY').add(1, 'month').format('DD-MM-YYYY')
               return ({
                    name: date,
                    weight: item.weight
                })
            }
            )
            setDataWeight(newDataWeight)
        }
    },[ getHistoryWeight])

    //Biểu đồ hôm nay
    const [percent, setPercent] = useState(80)
    const userIndexGoal = useSelector( state => {
        return state.userIndexGoal
    })
    const {indexGoal, nutriToday, nutriTypeMeal} = userIndexGoal

     //Biểu đồ tỷ lệ calo của các bữa ăn hôm nay
     const [dataTypeMeal, setDataTypeMeal] = useState(
        [
            { name: 'Bữa sáng', value: 400 },
            { name: 'Bữa trưa', value: 300 },
            { name: 'Bữa tối', value: 300 },
            { name: 'Bữa phụ', value: 200 },
          ]
    )

    //Biểu đồ lich sử calo
    const [historyCalo, setHistoryCalo] = useState([])
    useMemo(() => {
        if(indexGoal && nutriToday && nutriTypeMeal) {
            const newPercent = Math.round(nutriToday.calo/indexGoal.calo * 100) || 0
            setPercent(newPercent)
            setDataTypeMeal(
                [
                    { name: 'Bữa sáng', value: nutriTypeMeal.caloBreak },
                    { name: 'Bữa trưa', value: nutriTypeMeal.caloLunch },
                    { name: 'Bữa tối', value: nutriTypeMeal.caloDinner },
                    { name: 'Bữa phụ', value: nutriTypeMeal.caloSnacks },
                  ]
            )
        }
    },[indexGoal, nutriToday, nutriTypeMeal])

    const userMeal = useSelector( state => state.userMeal)
    const { userSetMeal } = userMeal
    const [allMealState, setAllMealState] = useState()
    const [allMealFoodState, setAllMealFoodState] = useState()
    const [allFoodState, setAllFoodState] = useState()


    //Ràng buộc dữ liệu vào các state
    useEffect(() => {
        if(userSetMeal) {
            setAllMealState(userSetMeal.allMeal)
            setAllMealFoodState(userSetMeal.allMealFood)
            setAllFoodState(userSetMeal.allFood)
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

    //Tạo ra  mảng các ngày cần xem lịch sử calo, mặc định 7 ngày
    //state số ngày muốn xem lịch sử
    const [numberDate, setNumberDate] = useState(7)
    useMemo(() => {
        if(indexGoal && nutriToday && nutriTypeMeal) {

            if(handleMeal ) {
    
                const arrDate = []
                for(let i = 0; i < numberDate; i++) {
                    const prevDate = moment().add(-i, 'day').format('DDMYYYY')
                    const prevDateNotY = moment().add(-i,'day').format('DD/MM')
                    arrDate.push({prevDate, prevDateNotY})
                }
                const dataCalo = arrDate.map(item => {
                    const dataForItem = handleMeal.filter(meal => {
                        return meal.createdAt === item.prevDate
                    })
                    if(dataForItem.length === 0 ) return {
                        name: item.prevDateNotY,
                        goal: indexGoal.calo,
                        done: 0,
                    }
                    else {
                         //Tổng calo
                        const reduceFunctionCalo = (prev, currentValue) => {
                            const calo = currentValue.totalCalo
                            return prev + calo
                        }
                        const finalCalo = dataForItem.reduce(reduceFunctionCalo, 0)
                        return {
                            name: item.prevDateNotY,
                            goal: indexGoal.calo,
                            done: finalCalo,
                        }
                    }
                })
                console.log(arrDate)
                console.log(handleMeal)
                setHistoryCalo(dataCalo)
            }
        }
    },[handleMeal, indexGoal, numberDate, nutriToday, nutriTypeMeal])

   
    return (
        <Row className = "history-items">
        <Col className=" today-history-weight col-md-6 p-0 ">
            <div className = "today-chart">
                <div className = 'today-chart-child'>
                    <div className="today-history-header">
                        <h4>Hôm nay</h4>
                    </div>
                    <Row className="today-history-body">
                        <Col>
                            <TodayChart
                            percent = { percent }
                            />
                        </Col>
                        <Col>
                            <p>Protein đã nạp: {nutriToday.protein || 0} / {indexGoal.protein || 0} (g)</p>
                            <p>Carbs đã nạp: {nutriToday.carbs || 0} / {indexGoal.carbs || 0} (g)</p>
                            <p>Fat đã nạp: {nutriToday.fat || 0} / {indexGoal.fat || 0} (g)</p>
                            <p>Calo đã nạp: {nutriToday.calo || 0} / {indexGoal.calo || 0} (calo)</p>
                        </Col>
                    </Row>
                </div>
            </div>
            <div className = 'history-weight'>
                <div className = 'history-weight-child'>
                    <div className="today-history-header">
                        <h4>Lịch sử cân nặng</h4>
                        {/* <Dropdown isOpen={dropdownOpen2} toggle={toggle2} >
                        <DropdownToggle caret >
                            Lần cập nhật
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem onClick = {() => setNumberDate(7)}>7 lần gần nhất</DropdownItem>
                            <DropdownItem onClick = {() => setNumberDate(30)}>14 lần gần nhất</DropdownItem>
                            <DropdownItem onClick = {() => setNumberDate(90)}>Tất cả</DropdownItem>
                        </DropdownMenu>
                        </Dropdown> */}
                    </div>
                    <HistoryWeight
                    dataWeight = { dataWeight }
                    />
                </div>
               
            </div>
        </Col>
        <Col className="percentage-history-calo col-md-6">
            <div className = "percentage-calo">
                <div className = 'percentage-calo-child'>
                    <div className="percentage-history-header">
                        <h4>Tỷ lệ calo các bữa ăn hôm nay</h4>
                    </div>
                    <Row className="percentage-history-body">
                        <Col >
                            <PercentFourMealChart
                            dataTypeMeal = {dataTypeMeal}
                            />
                        </Col>
                        <Col >
                            <p>Bữa sáng: {nutriTypeMeal.caloBreak} (calo)</p>
                            <p>Bữa trưa: {nutriTypeMeal.caloLunch} (calo)</p>
                            <p>Bữa tối: {nutriTypeMeal.caloDinner} (calo)</p>
                            <p>Bữa phụ: {nutriTypeMeal.caloSnacks} (calo)</p>
                        </Col>
                    </Row>
                </div>
            </div>
            <div className = 'history-calo'>
                <div className = 'history-calo-child'>
                    <div className="percentage-history-header">
                        <h4>Lịch sử calo nạp vào</h4>
                        <Dropdown isOpen={dropdownOpen} toggle={toggle} >
                        <DropdownToggle caret >
                            Khoảng thời gian
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem onClick = {() => setNumberDate(7)}>7 ngày</DropdownItem>
                            <DropdownItem onClick = {() => setNumberDate(30)}>30 ngày</DropdownItem>
                            <DropdownItem onClick = {() => setNumberDate(90)}>90 ngày</DropdownItem>
                        </DropdownMenu>
                        </Dropdown>
                    </div>
                    <HistoryCaloChart
                    historyCalo = { historyCalo }
                    />
                </div>
               
            </div>
        </Col>
    </Row>
    )
}

export default HistoryItems
