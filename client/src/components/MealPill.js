import '../scss/MealPill.scss'
import MealTable from './MealTable'
import { Context } from './MealItems'
import { useState, useContext, useMemo, memo, useEffect, createContext } from 'react'
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap'

const MealPillContext = createContext()

const MealPill = () => {
    //Lấy dữ liệu từ context 
    // eslint-disable-next-line no-unused-vars
    const [dataChecked, setDataChecked] = useContext(Context)


    //Phân chia dữ liệu thành từng Mảng tương ứng với các bữa ăn
    const [dataShare, setDataShare] = useState({
        breakfast: [],
        lunch: [],
        dinner: [],
        snacks: [],
    })


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
        //Đảm bảo dataChecked không tồn tại đồng thời nhiều phần tử có cùng id và meal
        const computedFoodData = dataChecked
        for(let i = 0; i < computedFoodData.length; i++) {
            for(let j = i+ 1; j < computedFoodData.length; j++) {
                const isMatch = (computedFoodData[i].id === computedFoodData[j].id && computedFoodData[i].meal === computedFoodData[j].meal )
                if(isMatch) {
                    computedFoodData[i].quantityFood += computedFoodData[j].quantityFood
                    computedFoodData.splice(j, 1)
                    j--
                }
            }
        }
        //Phân chia dữ liệu vào 4 mảng tương ứng với 4 bữa ăn
        for(let i = 0; i < computedFoodData.length; i++) {
            switch(computedFoodData[i].meal) {
                case 'breakfast': { 
                    // eslint-disable-next-line no-loop-func
                    setDataShare(prevData => {
                        let newfood = []
                        //Kiểm tra trong bữa ăn đã có item của dataChecked chưa?
                        const dataMatchId = prevData.breakfast.filter( data => data.id === computedFoodData[i].id)
                        const dataNotMatchId = prevData.breakfast.filter( data => data.id !== computedFoodData[i].id)
                        const isInto = dataMatchId.length
                        if(isInto) {
                            const idChecked = dataChecked.map(item => item.id)
                            const allDataChecked = [...dataNotMatchId, computedFoodData[i]]
                            newfood = allDataChecked.filter(data => idChecked.includes(data.id))
                        }
                        else 
                        {
                            newfood = [...prevData.breakfast, computedFoodData[i]]
                        }
                        return {
                            ...dataShare,
                            breakfast: newfood,
                        }
                    })
                    break
                }
                case 'lunch': { 
                    // eslint-disable-next-line no-loop-func
                    setDataShare(prevData => {
                        let newfood = []
                        //Kiểm tra trong bữa ăn đã có item của dataChecked chưa?
                        const dataMatchId = prevData.lunch.filter( data => data.id === computedFoodData[i].id)
                        const dataNotMatchId = prevData.lunch.filter( data => data.id !== computedFoodData[i].id)
                        const isInto = dataMatchId.length
                        if(isInto) {
                            const idChecked = dataChecked.map(item => item.id)
                            const allDataChecked = [...dataNotMatchId, computedFoodData[i]]
                            newfood = allDataChecked.filter(data => idChecked.includes(data.id))
                        }
                        else 
                        {
                            newfood = [...prevData.lunch, computedFoodData[i]]
                        }
                        return {
                            ...dataShare,
                            lunch: newfood,
                        }
                    })
                    break
                }
                case 'dinner': { 
                    // eslint-disable-next-line no-loop-func
                    setDataShare(prevData => {
                        let newfood = []
                        //Kiểm tra trong bữa ăn đã có item của dataChecked chưa?
                        const dataMatchId = prevData.dinner.filter( data => data.id === computedFoodData[i].id)
                        const dataNotMatchId = prevData.dinner.filter( data => data.id !== computedFoodData[i].id)
                        const isInto = dataMatchId.length
                        if(isInto) {
                            const idChecked = dataChecked.map(item => item.id)
                            const allDataChecked = [...dataNotMatchId, computedFoodData[i]]
                            newfood = allDataChecked.filter(data => idChecked.includes(data.id))
                        }
                        else 
                        {
                            newfood = [...prevData.dinner, computedFoodData[i]]
                        }
                        return {
                            ...dataShare,
                            dinner: newfood,
                        }
                    })
                    break
                }
                case 'snacks': { 
                    // eslint-disable-next-line no-loop-func
                    setDataShare(prevData => {
                        let newfood = []
                        //Kiểm tra trong bữa ăn đã có item của dataChecked chưa?
                        const dataMatchId = prevData.snacks.filter( data => data.id === computedFoodData[i].id)
                        const dataNotMatchId = prevData.snacks.filter( data => data.id !== computedFoodData[i].id)
                        const isInto = dataMatchId.length
                        if(isInto) {
                            const idChecked = dataChecked.map(item => item.id)
                            const allDataChecked = [...dataNotMatchId, computedFoodData[i]]
                            newfood = allDataChecked.filter(data => idChecked.includes(data.id))
                        }
                        else 
                        {
                            newfood = [...prevData.snacks, computedFoodData[i]]
                        }
                        return {
                            ...dataShare,
                            snacks: newfood,
                        }
                    })
                    break
                }
                default: return new Error('Invalid value')
            }
        }
        // computedFoodData.map( item => {
        //     let newmap
        //     switch(item.meal) {
        //         case 'breakfast': { 
        //             setDataShare(prevData => {
        //                 let newfood = []
        //                 //Kiểm tra trong bữa ăn đã có item của dataChecked chưa?
        //                 const dataMatchId = prevData.breakfast.filter( data => data.id === item.id)
        //                 const dataNotMatchId = prevData.breakfast.filter( data => data.id !== item.id)
        //                 const isInto = dataMatchId.length
        //                 if(isInto) {
        //                     const idChecked = dataChecked.map(item => item.id)
        //                     const allDataChecked = [...dataNotMatchId, item]
        //                     newfood = allDataChecked.filter(data => idChecked.includes(data.id))
        //                 }
        //                 else 
        //                 {
        //                     newfood = [...prevData.breakfast, item]
        //                 }
        //                 return {
        //                     ...dataShare,
        //                     breakfast: newfood,
        //                 }
        //             })
        //             break
        //         }
        //         case 'lunch': { 
        //             setDataShare(prevData => {
        //                 let newfood = []
        //                 const dataMatchId = prevData.lunch.filter( data => data.id === item.id)
        //                 const dataNotMatchId = prevData.lunch.filter( data => data.id !== item.id)
        //                 const isInto = dataMatchId.length
        //                 if(isInto) {
        //                     const idChecked = dataChecked.map(item => item.id)
        //                     const allDataChecked = [...dataNotMatchId, item]
        //                     newfood = allDataChecked.filter(data => idChecked.includes(data.id))
        //                 }
        //                 else 
        //                 {
        //                     newfood = [...prevData.lunch, item]
        //                 }
        //                 return {
        //                     ...dataShare,
        //                     lunch: newfood,
        //                 }
        //             })
        //             break
        //         } 
        //         case 'dinner': { 
        //             setDataShare(prevData => {
        //                 let newfood = []
        //                 const dataMatchId = prevData.dinner.filter( data => data.id === item.id)
        //                 const dataNotMatchId = prevData.dinner.filter( data => data.id !== item.id)
        //                 const isInto = dataMatchId.length
        //                 if(isInto) {
        //                     const idChecked = dataChecked.map(item => item.id)
        //                     const allDataChecked = [...dataNotMatchId, item]
        //                     newfood = allDataChecked.filter(data => idChecked.includes(data.id))
        //                 }
        //                 else 
        //                 {
        //                     newfood = [...prevData.dinner, item]
        //                 }
        //                 return {
        //                     ...dataShare,
        //                     dinner: newfood,
        //                 }
        //             })
        //             break
        //         } 
        //           case 'snacks': { 
        //             setDataShare(prevData => {
        //                 let newfood = []
        //                 const dataMatchId = prevData.snacks.filter( data => data.id === item.id)
        //                 const dataNotMatchId = prevData.snacks.filter( data => data.id !== item.id)
        //                 const isInto = dataMatchId.length
        //                 if(isInto) {
        //                     const idChecked = dataChecked.map(item => item.id)
        //                     const allDataChecked = [...dataNotMatchId, item]
        //                     newfood = allDataChecked.filter(data => idChecked.includes(data.id))
        //                 }
        //                 else 
        //                 {
        //                     newfood = [...prevData.snacks, item]
        //                 }
        //                 return {
        //                     ...dataShare,
        //                     snacks: newfood,
        //                 }
        //             })
        //             break
        //         }  
               
        //         default: 
        //         return new Error('Invalid value')
        //     }
        //     return newmap
        // } )
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataChecked])


    //Hiện thị lượng chất của từng bữa ăn
    useEffect(() => {
        const proteinBreak = dataShare.breakfast.map(item => item.protein*item.quantityFood).reduce((pre,current) => {return pre + current}, 0)
        const carbsBreak = dataShare.breakfast.map(item => item.carbs*item.quantityFood).reduce((pre,current) => {return pre + current}, 0)
        const fatBreak = dataShare.breakfast.map(item => item.fat*item.quantityFood).reduce((pre,current) => {return pre + current}, 0)
        setProteinBreak(proteinBreak)
        setCarbsBreak(carbsBreak)
        setFatBreak(fatBreak)

        const proteinLunch = dataShare.lunch.map(item => item.protein*item.quantityFood).reduce((pre,current) => {return pre + current}, 0)
        const carbsLunch = dataShare.lunch.map(item => item.carbs*item.quantityFood).reduce((pre,current) => {return pre + current}, 0)
        const fatLunch = dataShare.lunch.map(item => item.fat*item.quantityFood).reduce((pre,current) => {return pre + current}, 0)
        setProteinLunch(proteinLunch)
        setCarbsLunch(carbsLunch)
        setFatLunch(fatLunch)

        const proteinDinner = dataShare.dinner.map(item => item.protein*item.quantityFood).reduce((pre,current) => {return pre + current}, 0)
        const carbsDinner = dataShare.dinner.map(item => item.carbs*item.quantityFood).reduce((pre,current) => {return pre + current}, 0)
        const fatDinner = dataShare.dinner.map(item => item.fat*item.quantityFood).reduce((pre,current) => {return pre + current}, 0)
        setProteinDinner(proteinDinner)
        setCarbsDinner(carbsDinner)
        setFatDinner(fatDinner)

        const proteinSnacks = dataShare.snacks.map(item => item.protein*item.quantityFood).reduce((pre,current) => {return pre + current}, 0)
        const carbsSnacks = dataShare.snacks.map(item => item.carbs*item.quantityFood).reduce((pre,current) => {return pre + current}, 0)
        const fatSnacks = dataShare.snacks.map(item => item.fat*item.quantityFood).reduce((pre,current) => {return pre + current}, 0)
        setProteinSnacks(proteinSnacks)
        setCarbsSnacks(carbsSnacks)
        setFatSnacks(fatSnacks)
    }, [dataShare])
   

    const [active, setActive] = useState('breakfast')
    const toggle = tab => {
        setActive(tab);
    }
    return (
        <MealPillContext.Provider value = {[dataShare, setDataShare]}>
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
                    <p>Bữa sáng bạn đã nạp {ProteinBreak * 4 + CarbsBreak * 4 + FatBreak * 9} calo trong đó có {ProteinBreak} (g) protein, {CarbsBreak} (g) carbs và {FatBreak} (g) fat</p>
                    <MealTable dataArr = {dataShare.breakfast}
                    />
                </TabPane>
                <TabPane tabId='lunch' className = 'lunch-meal'>
                    <p>Bữa trưa bạn đã nạp {ProteinLunch * 4 + CarbsLunch * 4 + FatLunch * 9} calo trong đó có {ProteinLunch} (g) protein, {CarbsLunch} (g) carbs và {FatLunch} (g) fat</p>
                    <MealTable dataArr = {dataShare.lunch}
                    />
                </TabPane>
                <TabPane tabId='dinner' className = 'dinner-meal'>
                    <p>Bữa tối bạn đã nạp {ProteinDinner * 4 + CarbsDinner * 4 + FatDinner * 9} calo trong đó có {ProteinDinner} (g) protein, {CarbsDinner} (g) carbs và {FatDinner} (g) fat</p>
                    <MealTable dataArr = {dataShare.dinner}
                    />
                </TabPane>
                <TabPane tabId='snacks' className = 'snacks-meal'>
                    <p>Bữa phụ bạn đã nạp {ProteinSnacks * 4 + CarbsSnacks * 4 + FatSnacks * 9} calo trong đó có {ProteinSnacks} (g) protein, {CarbsSnacks} (g) carbs và {FatSnacks} (g) fat</p>
                    <MealTable dataArr = {dataShare.snacks}
                    />
                </TabPane>
            </TabContent>
        </MealPillContext.Provider>
    )
}

export { MealPillContext }
export default memo(MealPill)