import '../scss/Forecast.scss'
import { useState, useEffect } from 'react'
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, ListGroup, ListGroupItem } from 'reactstrap'

const Forecast = ({bodyIndexC, infoBody, setInfoBody}) => {
    const [active, setActive] = useState('1')
    const toggle = tab => {
        setActive(tab)
    }

    const { height, weight, age, bodyfat,  sex,  frequency, goalWeight, goalCalo, goalCaloUp, goalCaloDown,} = bodyIndexC
    const {bmr, tdee, bmi, wIdeal, cGoal, forecastDay} = infoBody
    
    //Tính toán các chỉ số như BMI, BMR...
    useEffect(() => {
      if(height < 300 && height > 50 && weight < 300 && bodyfat < 99 && sex !== '' && age < 80 &&
       age > 10 && frequency !== '') {
         //bmr
         let brmIndex = 0
         if(bodyfat === '') {
             if(sex === 'male' ) {
                 brmIndex = 10*weight + 6.25*height - 5*age + 5
             }
             else if (sex === 'female')
                 brmIndex = 10*weight + 6.25*height - 5*age - 161
         }
         else {
             brmIndex = 21.6 * (weight - weight*bodyfat/100) + 370
         }
         //tdee
         const tdeeIndex = brmIndex * frequency;
         // bmi
         const bmiIndex = weight/((height/100)*(height/100))
         //Trọng lượng lý tưởng
         const feetHeight = height*0.0328
         let wIdealIndex = 0
         if(sex === 'male' ) {
             if(feetHeight > 5)
             wIdealIndex = 52 + 1.9*((feetHeight-5)*12)
             else 
             wIdealIndex = 52
         }
         else {
             if(feetHeight > 5)
             wIdealIndex = 49 + 1.7*((feetHeight-5)*12)
             else 
             wIdealIndex = 49
         }
         //Calo theo mục tiêu
         const cGoalIndex = tdeeIndex + goalCalo + goalCaloUp - goalCaloDown
 
         //Dự báo số ngày đạt được mục tiêu, khai báo calo tích trữ/thâm hụt
         const caloAccumulate = Math.abs(goalWeight - weight)*7700
         const forecastDayIndex = Math.ceil(caloAccumulate/cGoalIndex)
         setInfoBody({ 
             bmr: Math.round(brmIndex * 10)/10,
             tdee: Math.round(tdeeIndex * 10)/10,
             bmi: Math.round(bmiIndex * 10)/10,
             wIdeal: Math.round(wIdealIndex * 10)/10,
             cGoal: Math.round(cGoalIndex * 10)/10,
             forecastDay: forecastDayIndex,
         })
       }
    }, [age, bodyfat, frequency, goalCalo, goalCaloDown, goalCaloUp, height, sex, weight, bodyIndexC, goalWeight, setInfoBody])


    return (
    <Row className = 'forecastItems'>
      <Col md='3' sm='12'>
        <Nav pills vertical>
          <NavItem>
            <NavLink
              active={active === '1'}
              onClick={() => {
                toggle('1')
              }}
            >
              Thông tin
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              active={active === '2'}
              onClick={() => {
                toggle('2')
              }}
            >
              Dự báo
            </NavLink>
          </NavItem>
        </Nav>
      </Col>
      <Col md='9' sm='12'>
        <TabContent activeTab={active}>
          <TabPane tabId='1'>
            <ListGroup>
                <ListGroupItem>Chỉ số BMR: {bmr} (calo)</ListGroupItem>
                <ListGroupItem>Chỉ số TDEE: {tdee} (calo)</ListGroupItem>
                <ListGroupItem>Chỉ số BMI: {bmi}</ListGroupItem>
                <ListGroupItem>Trọng lượng lý tưởng: {wIdeal} (kg)</ListGroupItem>
                <ListGroupItem>Calo tương ứng với mục tiêu: {cGoal} (calo)</ListGroupItem>
            </ListGroup>
          </TabPane>
          <TabPane tabId='2'>
            <ListGroup>
                    <ListGroupItem>Mục tiêu đạt được sau: {forecastDay} ngày</ListGroupItem>
                    <ListGroupItem>Trọng lượng cơ thể với lượng cơ bắp tối đa: {height -100} kg</ListGroupItem>
                </ListGroup>
          </TabPane>
        </TabContent>
      </Col>
    </Row>
  )
}

export default Forecast
