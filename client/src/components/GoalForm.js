import '../scss/GoalForm.scss'
import { Row, Col, Button} from 'reactstrap'
import InputInformation from './InputInformation'
import CustomRadio from './CustomRadio'
import { memo } from 'react'
import { useDispatch } from 'react-redux'
import { addBodyIndex } from '../actions/userAction'


const GoalForm = ({bodyIndexC, setBodyIndex}) => {
  
    const {  height, weight, age, bodyfat, sex} = bodyIndexC
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
    const dispatch = useDispatch()
    const handleUpdate = () => {
        dispatch(addBodyIndex(height, weight, age, bodyfat, sex))
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
                    min = {50}
                    max = {300}
                    content="Chiều cao (cm)"
                    placeholder='Nhập chiều cao (cm)'
                    data = {height||''}
                    warning = {  height > 300 }
                    contentWarning= {'Chiều cao phải nhỏ 300cm'}
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
                    min = {10}
                    max = {200}
                    content="Cân nặng (kg)"
                    placeholder='Nhập cân nặng (kg)'
                    data = {weight || ''}
                    warning = {  weight > 300 }
                    contentWarning= {'Cân nặng phải nhỏ 300 kg'}
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
                    min = {10}
                    max = {80}
                    content="Tuổi (năm)"
                    placeholder='Nhập tuổi (năm)'
                    data = {age || ''}
                    warning = {  age > 80 }
                    contentWarning= {'Tuổi phải nhỏ hơn 80'}
                    setData = {(value) => setBodyIndex(prev => ({
                        ...prev,
                        age: +value, 
                    }))}
                    />
                    <InputInformation
                    type = 'number'
                    id = "index-bodyfat"
                    min = {3}
                    max = {99}
                    content="Bodyfat (%)"
                    placeholder='Bodyfat không bắt buộc (%)'
                    data = {bodyfat || ''}
                    warning = {  bodyfat > 99 }
                    contentWarning= {'Bodyfat phải nhỏ hơn 99%'}
                    setData = {(value) => setBodyIndex(prev => ({
                        ...prev,
                        bodyfat: +value, 
                    }))}
                    />
                </Col>
            </Row>
            <div className="update-reset">
                <Button onClick = {handleUpdate}>Cập nhật</Button>
                <Button outline onClick = {handleReset}>Reset</Button>
            </div>
        </div>
    )
}

export default memo(GoalForm)
