import '../scss/MealPill.scss'
import MealTable from './MealTable'
import React, { useState } from 'react'
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap'

const PillFilled = () => {
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
export default PillFilled