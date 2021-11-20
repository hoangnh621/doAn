import '../scss/MealItems.scss'
import MealPill from './MealPill'
import { Row, Col } from 'reactstrap'
import SearchFoodTable from './SearchFoodTable'
import { useReducer, createContext} from 'react'

const Context = createContext()
const initialState = {
    breakfast: [],
    lunch: [],
    dinner: [],
    snacks: [],
}



const reducer = ( state, actions) => {
    switch(actions.type) {

    }
}

const MealItems = () => {
    const [ foodData, dispatch] = useReducer( reducer, initialState )

    return (
        <Context.Provider value = {[ reducer, initialState ]}>
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
                        <div></div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Context.Provider>
    )
}

export default MealItems
