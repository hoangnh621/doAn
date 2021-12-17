import '../scss/GoalForm.scss'
import { Row, Col, Button} from 'reactstrap'
import InputInformation from './InputInformation'
import CustomRadio from './CustomRadio'
import { memo } from 'react'


const GoalForm = ({bodyIndex, setBodyIndex}) => {
  
    const {  height, weight, age, bodyfat, sex} = bodyIndex
    const handleSex = (e) => {
        setBodyIndex(prev => ({
            ...prev,
            sex: e.target.id
        }))
    }

    const handleReset = () => {
        setBodyIndex(prev => {
            return {
            ...prev,
            height: '',
            weight: '',
            age: '',
            bodyfat: '',
            sex: '',
        }})
    }
    return (
        <div className = 'goalform'>
            <div className = 'goal-header'>
                <h4>Chỉ số cơ thể</h4>
            </div>
            <Row className="body-index">
                <Col>
                    <InputInformation
                    type = 'number'
                    id = "index-height"
                    content="Chiều cao (cm)"
                    placeholder='Nhập chiều cao (cm)'
                    data = {height}
                    setData = {(value) => {
                        setBodyIndex(prev => ({
                        ...prev,
                        height: +value, 
                    }))}
                    }
                    />
                     <InputInformation
                     type = 'number'
                    id = "index-weight"
                    content="Cân nặng (kg)"
                    placeholder='Nhập cân nặng (kg)'
                    data = {weight}
                    setData = {(value) => setBodyIndex(prev => ({
                        ...prev,
                        weight: +value, 
                    }))}
                    />
                    <div className="sex">
                    <p>Giới tính: </p>
                    <CustomRadio
                    id = 'male'
                    label = 'Nam'
                    name = 'sex'
                    isChecked={sex}
                    onChange={handleSex}
                    />
                    <CustomRadio
                    id = 'female'
                     label = 'Nữ'
                     name = 'sex'
                     isChecked={sex}
                     onChange={handleSex}
                    />
                    </div>
                </Col>
                <Col>
                    <InputInformation
                    type = 'number'
                    id = "index-age"
                    content="Tuổi (năm)"
                    placeholder='Nhập tuổi (năm)'
                    data = {age}
                    setData = {(value) => setBodyIndex(prev => ({
                        ...prev,
                        age: +value, 
                    }))}
                    />
                    <InputInformation
                    type = 'number'
                    id = "index-bodyfat"
                    content="Bodyfat (%)"
                    placeholder='Bodyfat không bắt buộc (%)'
                    data = {bodyfat}
                    setData = {(value) => setBodyIndex(prev => ({
                        ...prev,
                        bodyfat: +value, 
                    }))}
                    />
                </Col>
            </Row>
            <div className="update-reset">
                <Button>Cập nhật</Button>
                <Button outline onClick = {handleReset}>Reset</Button>
            </div>
        </div>
    )
}

export default memo(GoalForm)
