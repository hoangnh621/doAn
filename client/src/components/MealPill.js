import '../scss/MealPill.scss'
import MealTable from './MealTable'
import { useState, useMemo, memo, useEffect, useRef } from 'react'
import { TabContent, TabPane, Nav, NavItem, NavLink, Button } from 'reactstrap'
import { useSelector, useDispatch } from 'react-redux'
import { createMeal, deleteMeal } from '../actions/mealAction'
import moment from 'moment'



const MealPill = ({checkedData,setCheckedData, setProgressValue,active, toggle, date}) => {
    
    const userIndexGoal = useSelector( state => {
        console.log(state)
        return state.userIndexGoal
    })
    const { indexGoal } = userIndexGoal


    //Phân chia dữ liệu thành từng Mảng tương ứng với các bữa ăn
    const breakfast = useRef([])
    const lunch = useRef([])
    const dinner = useRef([])
    const snacks = useRef([])


    //Chỉ số của từng bữa ăn
    //Bữa sáng
    const [ProteinBreak, setProteinBreak] = useState(0)
    const [CarbsBreak, setCarbsBreak] = useState(0)
    const [FatBreak, setFatBreak] = useState(0)

    //Bữa trưa
    const [ProteinLunch, setProteinLunch] = useState(0)
    const [CarbsLunch, setCarbsLunch] = useState(0)
    const [FatLunch, setFatLunch] = useState(0)

    //Bữa tối
    const [ProteinDinner, setProteinDinner] = useState(0)
    const [CarbsDinner, setCarbsDinner] = useState(0)
    const [FatDinner, setFatDinner] = useState(0)

    //Bữa phụ
    const [ProteinSnacks, setProteinSnacks] = useState(0)
    const [CarbsSnacks, setCarbsSnacks] = useState(0)
    const [FatSnacks, setFatSnacks] = useState(0)

    useMemo(() => {
        //Đảm bảo checkedData không tồn tại đồng thời nhiều phần tử có cùng id và meal
        let computedFoodData = checkedData
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
       //Phân chia dữ liệu vào 4 bữa ăn tương ứng
       breakfast.current = computedFoodData.filter(item => item.meal === 'breakfast')
       lunch.current = computedFoodData.filter(item => item.meal === 'lunch')
       dinner.current = computedFoodData.filter(item => item.meal === 'dinner')
       snacks.current = computedFoodData.filter(item => item.meal === 'snacks')
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ checkedData])
    
    //Hiện thị lượng chất của từng bữa ăn
    useEffect(() => {
        const proteinBreak = breakfast.current.map(item => item.protein*item.quantityFood).reduce((pre,current) => {return pre + current}, 0)
        const carbsBreak = breakfast.current.map(item => item.carbs*item.quantityFood).reduce((pre,current) => {return pre + current}, 0)
        const fatBreak = breakfast.current.map(item => item.fat*item.quantityFood).reduce((pre,current) => {return pre + current}, 0)
        setProteinBreak(proteinBreak)
        setCarbsBreak(carbsBreak)
        setFatBreak(fatBreak)

        const proteinLunch = lunch.current.map(item => item.protein*item.quantityFood).reduce((pre,current) => {return pre + current}, 0)
        const carbsLunch = lunch.current.map(item => item.carbs*item.quantityFood).reduce((pre,current) => {return pre + current}, 0)
        const fatLunch = lunch.current.map(item => item.fat*item.quantityFood).reduce((pre,current) => {return pre + current}, 0)
        setProteinLunch(proteinLunch)
        setCarbsLunch(carbsLunch)
        setFatLunch(fatLunch)

        const proteinDinner = dinner.current.map(item => item.protein*item.quantityFood).reduce((pre,current) => {return pre + current}, 0)
        const carbsDinner = dinner.current.map(item => item.carbs*item.quantityFood).reduce((pre,current) => {return pre + current}, 0)
        const fatDinner = dinner.current.map(item => item.fat*item.quantityFood).reduce((pre,current) => {return pre + current}, 0)
        setProteinDinner(proteinDinner)
        setCarbsDinner(carbsDinner)
        setFatDinner(fatDinner)

        const proteinSnacks = snacks.current.map(item => item.protein*item.quantityFood).reduce((pre,current) => {return pre + current}, 0)
        const carbsSnacks = snacks.current.map(item => item.carbs*item.quantityFood).reduce((pre,current) => {return pre + current}, 0)
        const fatSnacks = snacks.current.map(item => item.fat*item.quantityFood).reduce((pre,current) => {return pre + current}, 0)
        setProteinSnacks(proteinSnacks)
        setCarbsSnacks(carbsSnacks)
        setFatSnacks(fatSnacks)
    }, [checkedData])

    useEffect(() => {
        if(indexGoal) {
            const perPro = Math.round( (ProteinBreak + ProteinLunch + ProteinDinner + ProteinSnacks)/indexGoal.protein * 100)
            const carbsPro = Math.round( (CarbsBreak + CarbsLunch + CarbsDinner + CarbsSnacks)/indexGoal.carbs * 100)
            const fatPro = Math.round( (FatBreak + FatLunch + FatDinner + FatSnacks)/indexGoal.fat * 100)
            const caloPro = Math.round( ((ProteinBreak + ProteinLunch + ProteinDinner + ProteinSnacks + CarbsBreak + CarbsLunch + CarbsDinner + CarbsSnacks)*4 + (FatBreak + FatLunch + FatDinner + FatSnacks)*9 )/indexGoal.calo * 100)
            setProgressValue({ 
                proProgress: perPro,
                carbsProgress: carbsPro,
                fatProgress: fatPro,
                caloProgress: caloPro,
            })
        }
    },[CarbsBreak, CarbsDinner, CarbsLunch, CarbsSnacks, FatBreak, FatDinner, FatLunch, FatSnacks, ProteinBreak, ProteinDinner, ProteinLunch, ProteinSnacks, indexGoal, setProgressValue])
   
    //Lưu bữa ăn
    // const createdAt = ''+date.getDate()+''+ date.getMonth()+''+ date.getFullYear()
    const createdAt = moment(date).format('DDMYYYY')
    const dispatch = useDispatch()
    
    const handleSetMeal = () => {
        dispatch(createMeal(breakfast.current,
            lunch.current,
            dinner.current,
            snacks.current,
            createdAt
        ))
    }
    //Xóa bữa ăn
    const handleDeleteMeal = () => {
        setCheckedData([])
        dispatch(deleteMeal(createdAt))
    }

    return (
        <div className = 'mealPill'>
            <Nav pills fill>
                <NavItem>
                    <NavLink
                    active={active === 'breakfast'}
                    onClick={() => {
                    toggle('breakfast')
                    }}
                    >
                    Bữa sáng
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                    active={active === 'lunch'}
                    onClick={() => {
                    toggle('lunch')
                    }}
                    >
                    Bữa trưa
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                    active={active === 'dinner'}
                    onClick={() => {
                    toggle('dinner')
                    }}
                    >
                    Bữa tối
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                    active={active === 'snacks'}
                    onClick={() => {
                    toggle('snacks')
                    }}
                    >
                    Bữa phụ
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent className='py-50' activeTab={active}>
                <TabPane tabId='breakfast' className = 'breakfast-meal'>
                    <p>Bữa sáng bạn đã nạp {Math.round(ProteinBreak * 4 + CarbsBreak * 4 + FatBreak * 9)} calo trong đó có {Math.round(ProteinBreak)} (g) protein, {Math.round(CarbsBreak)} (g) carbs và {Math.round(FatBreak)} (g) fat</p>
                    <MealTable dataArr = {breakfast.current}
                    />
                </TabPane>
                <TabPane tabId='lunch' className = 'lunch-meal'>
                    <p>Bữa trưa bạn đã nạp {Math.round(ProteinLunch * 4 + CarbsLunch * 4 + FatLunch * 9)} calo trong đó có {Math.round(ProteinLunch)} (g) protein, {Math.round(CarbsLunch)} (g) carbs và {Math.round(FatLunch)} (g) fat</p>
                    <MealTable dataArr = {lunch.current}
                    />
                </TabPane>
                <TabPane tabId='dinner' className = 'dinner-meal'>
                    <p>Bữa tối bạn đã nạp {Math.round(ProteinDinner * 4 + CarbsDinner * 4 + FatDinner * 9)} calo trong đó có {Math.round(ProteinDinner)} (g) protein, {Math.round(CarbsDinner)} (g) carbs và {Math.round(FatDinner)} (g) fat</p>
                    <MealTable dataArr = {dinner.current}
                    />
                </TabPane>
                <TabPane tabId='snacks' className = 'snacks-meal'>
                    <p>Bữa phụ bạn đã nạp {Math.round(ProteinSnacks * 4 + CarbsSnacks * 4 + FatSnacks * 9)} calo trong đó có {Math.round(ProteinSnacks)} (g) protein, {Math.round(CarbsSnacks)} (g) carbs và {Math.round(FatSnacks)} (g) fat</p>
                    <MealTable dataArr = {snacks.current}
                    />
                </TabPane>
            </TabContent>
            <div className="save-meal">
                <Button onClick = {handleSetMeal}>Lưu</Button>
                <Button onClick = {handleDeleteMeal}>Xóa</Button>
            </div>
        </div>
    )
}

export default memo(MealPill)