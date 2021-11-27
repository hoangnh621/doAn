import '../scss/MealItems.scss'
import MealPill from './MealPill'
import { Row, Col } from 'reactstrap'
import { createContext, useState } from 'react'
import SearchFoodTable from './SearchFoodTable'
import ProgressMeal from './ProgressMeal'

const Context = createContext()


const MealItems = () => {
    const [checkedData, setCheckedData] = useState([])

    
    return (
        <Context.Provider value = {[ checkedData, setCheckedData ]}>
            <Row className = "content-meal-items">
                {/* bảng bữa ăn trong ngày */}
                <Col className="col-md-6 p-0 ">
                    <div className = "meal-table">
                        <MealPill/>
                    </div>
                </Col>
                <Col className="col-md-6">
                    <Row className = "search-chart-item">
                        <Col className="col-sm-12">
                            <SearchFoodTable/>
                        </Col>
                        <Col className="col-sm-12">
                        <div>
                            <ProgressMeal title = 'Protein' value = {25}/>
                            <ProgressMeal title = 'Carbs' value = {50}/>
                            <ProgressMeal title = 'Fat' value = {75}/>
                            <ProgressMeal title = 'Calo' value = {100}/>
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
