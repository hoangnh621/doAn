import '../scss/Forecast.scss'
import React, { useState } from 'react'
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap'

const Forecast = () => {
    const [active, setActive] = useState('1')

  const toggle = tab => {
    setActive(tab)
  }
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
            <p>
              Candy canes donut chupa chups candy canes lemon drops oat cake wafer. Cotton candy candy canes marzipan
              carrot cake. Sesame snaps lemon drops candy marzipan donut brownie tootsie roll. Icing croissant bonbon
              biscuit gummi bears. Bear claw donut sesame snaps bear claw liquorice jelly-o bear claw carrot cake. Icing
              croissant bonbon biscuit gummi bears.
            </p>
          </TabPane>
          <TabPane tabId='2'>
            <p>
              Pudding candy canes sugar plum cookie chocolate cake powder croissant. Carrot cake tiramisu danish candy
              cake muffin croissant tart dessert. Tiramisu caramels candy canes chocolate cake sweet roll liquorice
              icing cupcake. Sesame snaps wafer marshmallow danish dragée candy muffin jelly beans tootsie roll. Jelly
              beans oat cake chocolate cake tiramisu sweet.
            </p>
          </TabPane>
        </TabContent>
      </Col>
    </Row>
  )
}

export default Forecast
