import '../scss/MealPill.scss'
import MealTable from './MealTable'
import { Context } from './MealItems'
import { useState, useContext, useMemo, memo } from 'react'
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap'

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


    useMemo(() => {
        console.log(dataChecked)
        dataChecked.map( item => {
            let newmap
            switch(item.meal) {
                case 'breakfast': { 
                    setDataShare(prevData => {
                        let newfood = []
                        const isInto = prevData.breakfast.filter( data => data.id === item.id).length
                        console.log(isInto)
                        if(isInto) {
                            const idChecked = dataChecked.map(item => item.id)
                            const allDataChecked = [...prevData.breakfast.filter( data => data.id !== item.id), item]
                            newfood = allDataChecked.filter(data => idChecked.includes(data.id))
                        }
                        else 
                        {
                            newfood = [...prevData.breakfast, item]
                        }
                        return {
                            ...dataShare,
                            breakfast: newfood,
                        }
                    })
                    break
                }
                case 'lunch': { 
                    setDataShare(prevData => {
                        let newfood = []
                        const isInto = prevData.lunch.filter( data => data.id === item.id).length
                        console.log(isInto)
                        if(isInto) {
                            const idChecked = dataChecked.map(item => item.id)
                            const allDataChecked = [...prevData.lunch.filter( data => data.id !== item.id), item]
                            newfood = allDataChecked.filter(data => idChecked.includes(data.id))
                        }
                        else 
                        {
                            newfood = [...prevData.lunch, item]
                        }
                        return {
                            ...dataShare,
                            lunch: newfood,
                        }
                    })
                    break
                } 
                case 'dinner': { 
                    setDataShare(prevData => {
                        let newfood = []
                        const isInto = prevData.dinner.filter( data => data.id === item.id).length
                        console.log(isInto)
                        if(isInto) {
                            const idChecked = dataChecked.map(item => item.id)
                            const allDataChecked = [...prevData.dinner.filter( data => data.id !== item.id), item]
                            newfood = allDataChecked.filter(data => idChecked.includes(data.id))
                        }
                        else 
                        {
                            newfood = [...prevData.dinner, item]
                        }
                        return {
                            ...dataShare,
                            dinner: newfood,
                        }
                    })
                    break
                } 
                  case 'snacks': { 
                    setDataShare(prevData => {
                        let newfood = []
                        const isInto = prevData.snacks.filter( data => data.id === item.id).length
                        console.log(isInto)
                        if(isInto) {
                            const idChecked = dataChecked.map(item => item.id)
                            const allDataChecked = [...prevData.snacks.filter( data => data.id !== item.id), item]
                            newfood = allDataChecked.filter(data => idChecked.includes(data.id))
                        }
                        else 
                        {
                            newfood = [...prevData.snacks, item]
                        }
                        return {
                            ...dataShare,
                            snacks: newfood,
                        }
                    })
                    break
                }  
               
                default: 
                return new Error('Invalid value')
            }
            return newmap
        } )
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataChecked])

    console.log(dataShare)


    //Bữa sáng
    const [mealCaloBreFa, setMealCaloBreFa] = useState(0)
    const [mealProteinBreFa, setMealProteinBreFa] = useState(0)
    const [mealCarbsBreFa, setMealCarbsBreFa] = useState(0)
    const [mealFatBreFa, setMealFatBreFa] = useState(0)

     //Bữa trưa
     const [mealCaloLunch, setMealCaloLunch] = useState(0)
     const [mealProteinLunch, setMealProteinLunch] = useState(0)
     const [mealCarbsLunch, setMealCarbsLunch] = useState(0)
     const [mealFatLunch, setMealFatLunch] = useState(0)

      //Bữa tối
    const [mealCaloDinner, setMealCaloDinner] = useState(0)
    const [mealProteinDinner, setMealProteinDinner] = useState(0)
    const [mealCarbsDinner, setMealCarbsDinner] = useState(0)
    const [mealFatDinner, setMealFatDinner] = useState(0)

     //Bữa phụ
     const [mealCaloSnacks, setMealCaloSnacks] = useState(0)
     const [mealProteinSnacks, setMealProteinSnacks] = useState(0)
     const [mealCarbsSnacks, setMealCarbsSnacks] = useState(0)
     const [mealFatSnacks, setMealFatSnacks] = useState(0)

    const [active, setActive] = useState('breakfast')
    const toggle = tab => {
        setActive(tab);
    }
    return (
        <>
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
                    <p>Bữa sáng bạn đã nạp {mealCaloBreFa} calo trong đó có {mealProteinBreFa} (g) protein,
                    {mealCarbsBreFa} (g) carbs và {mealFatBreFa} (g) fat</p>
                    <MealTable 
                    setMealCaloBreFa = {setMealCaloBreFa} 
                    setMealProteinBreFa = {setMealProteinBreFa}
                    setMealCarbsBreFa = {setMealCarbsBreFa}
                    setMealFatBreFa = {setMealFatBreFa}
                    setMealCaloLunch = {setMealCaloLunch}
                    setMealProteinLunch = {setMealProteinLunch}
                    setMealCarbsLunch = {setMealCarbsLunch}
                    setMealFatLunch = {setMealFatLunch}
                    setMealCaloDinner = {setMealCaloDinner}
                    setMealProteinDinner = {setMealProteinDinner}
                    setMealCarbsDinner = {setMealCarbsDinner}
                    setMealFatDinner = {setMealFatDinner}
                    setMealCaloSnacks = {setMealCaloSnacks}
                    setMealProteinSnacks = {setMealProteinSnacks}
                    setMealCarbsSnacks = {setMealCarbsSnacks}
                    setMealFatSnacks = {setMealFatSnacks}
                    />
                </TabPane>
                <TabPane tabId='lunch' className = 'lunch-meal'>
                    <p>Bữa trưa bạn đã nạp {mealCaloLunch} calo trong đó có {mealProteinLunch} (g) protein,
                    {mealCarbsLunch} (g) carbs và {mealFatLunch} (g) fat</p>
                    <MealTable 
                   setMealCaloBreFa = {setMealCaloBreFa} 
                   setMealProteinBreFa = {setMealProteinBreFa}
                   setMealCarbsBreFa = {setMealCarbsBreFa}
                   setMealFatBreFa = {setMealFatBreFa}
                   setMealCaloLunch = {setMealCaloLunch}
                   setMealProteinLunch = {setMealProteinLunch}
                   setMealCarbsLunch = {setMealCarbsLunch}
                   setMealFatLunch = {setMealFatLunch}
                   setMealCaloDinner = {setMealCaloDinner}
                   setMealProteinDinner = {setMealProteinDinner}
                   setMealCarbsDinner = {setMealCarbsDinner}
                   setMealFatDinner = {setMealFatDinner}
                   setMealCaloSnacks = {setMealCaloSnacks}
                   setMealProteinSnacks = {setMealProteinSnacks}
                   setMealCarbsSnacks = {setMealCarbsSnacks}
                   setMealFatSnacks = {setMealFatSnacks}
                    />
                </TabPane>
                <TabPane tabId='dinner' className = 'dinner-meal'>
                    <p>Bữa tối bạn đã nạp {mealCaloDinner} calo trong đó có {mealProteinDinner} (g) protein,
                    {mealCarbsDinner} (g) carbs và {mealFatDinner} (g) fat</p>
                    <MealTable 
                   setMealCaloBreFa = {setMealCaloBreFa} 
                   setMealProteinBreFa = {setMealProteinBreFa}
                   setMealCarbsBreFa = {setMealCarbsBreFa}
                   setMealFatBreFa = {setMealFatBreFa}
                   setMealCaloLunch = {setMealCaloLunch}
                   setMealProteinLunch = {setMealProteinLunch}
                   setMealCarbsLunch = {setMealCarbsLunch}
                   setMealFatLunch = {setMealFatLunch}
                   setMealCaloDinner = {setMealCaloDinner}
                   setMealProteinDinner = {setMealProteinDinner}
                   setMealCarbsDinner = {setMealCarbsDinner}
                   setMealFatDinner = {setMealFatDinner}
                   setMealCaloSnacks = {setMealCaloSnacks}
                   setMealProteinSnacks = {setMealProteinSnacks}
                   setMealCarbsSnacks = {setMealCarbsSnacks}
                   setMealFatSnacks = {setMealFatSnacks}
                    />
                </TabPane>
                <TabPane tabId='snacks' className = 'snacks-meal'>
                    <p>Bữa phụ bạn đã nạp {mealCaloSnacks} calo trong đó có {mealProteinSnacks} (g) protein,
                    {mealCarbsSnacks} (g) carbs và {mealFatSnacks} (g) fat</p>
                    <MealTable 
                   setMealCaloBreFa = {setMealCaloBreFa} 
                   setMealProteinBreFa = {setMealProteinBreFa}
                   setMealCarbsBreFa = {setMealCarbsBreFa}
                   setMealFatBreFa = {setMealFatBreFa}
                   setMealCaloLunch = {setMealCaloLunch}
                   setMealProteinLunch = {setMealProteinLunch}
                   setMealCarbsLunch = {setMealCarbsLunch}
                   setMealFatLunch = {setMealFatLunch}
                   setMealCaloDinner = {setMealCaloDinner}
                   setMealProteinDinner = {setMealProteinDinner}
                   setMealCarbsDinner = {setMealCarbsDinner}
                   setMealFatDinner = {setMealFatDinner}
                   setMealCaloSnacks = {setMealCaloSnacks}
                   setMealProteinSnacks = {setMealProteinSnacks}
                   setMealCarbsSnacks = {setMealCarbsSnacks}
                   setMealFatSnacks = {setMealFatSnacks}
                    />
                </TabPane>
            </TabContent>
        </>
    )
}
export default memo(MealPill)