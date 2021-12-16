import '../scss/GoalForm.scss'
import { Row, Col} from 'reactstrap'
import InputInformation from './InputInformation'
import CustomRadio from './CustomRadio'
import { Button } from 'reactstrap'

const GoalForm = () => {
    return (
        <div className = 'goalform'>
            <div className = 'goal-header'>
                <h4>Chỉ số cơ thể</h4>
            </div>
            <Row className="body-index">
                <Col>
                    <InputInformation
                    id = "index-height"
                    content="Chiều cao"
                    placeholder='Nhập chiều cao (cm)'
                    />
                     <InputInformation
                    id = "index-weight"
                    content="Cân nặng"
                    placeholder='Nhập cân nặng (kg)'
                    />
                    <div className="sex">
                    <p>Giới tính: </p>
                    <CustomRadio
                    label = 'Nam'
                    name = 'sex'
                    onChange={()=> {}}
                    />
                    <CustomRadio
                     label = 'Nữ'
                     name = 'sex'
                    onChange={()=> {}}

                    />
                    </div>
                </Col>
                <Col>
                    <InputInformation
                    id = "index-age"
                    content="Tuổi"
                    placeholder='Nhập tuổi (năm)'
                    />
                    <InputInformation
                    id = "index-bodyfat"
                    content="Bodyfat"
                    placeholder='Bodyfat không bắt buộc (%)'
                    />
                </Col>
            </Row>
            <div className="update-reset">
                <Button>Cập nhật</Button>
                <Button outline>Reset</Button>
            </div>
        </div>
    )
}

export default GoalForm
