import { Row, Col, Button} from 'reactstrap'
import '../scss/GoalItems.scss'
import GoalForm from './GoalForm'
import CustomRadio from './CustomRadio'
import { useState, useRef, useMemo } from 'react'
import InputInformation from './InputInformation'
import CustomCheckbox from './CustomCheckbox'
import Forecast from './Forecast'
import ChartPercentage from './ChartPercentage'


const GoalItems = () => {
    //Các chỉ số cá nhân
    const [bodyIndex, setBodyIndex] = useState({
        height: '',
        weight: '',
        age: '',
        bodyfat: '', 
        sex: '', 
        frequency: '',
        goalWeight: '',
        goalCalo: '',
        goalCaloUp: '',
        goalCaloDown: '',
    })

    const { goalWeight, goalCaloUp, goalCaloDown } = bodyIndex

    //Hiển thị mô tả từng loại tần suất hoạt động
    const descFrequency = useRef('')
    const [frequencyChecked, setFrequencyChecked] = useState()
    const handleShowDesc = (e) => {
        setFrequencyChecked(e.target.id)
    }


    useMemo(() => {
        switch (frequencyChecked) {
            case 'frequency1': { 
                descFrequency.current = 'Ít hoặc không hoạt động trong ngày, làm công việc văn phòng hoặc tượng tự.'
                setBodyIndex(prev => ({
                    ...prev,
                    frequency: 1.2,
                }))
                break
            }
            case 'frequency2': { 
                descFrequency.current = 'Hoạt động nhẹ trong ngày, tập thể dục/thể thao 1-3 lần/tuần.'
                setBodyIndex(prev => ({
                    ...prev,
                    frequency: 1.375,
                }))
                break
            }
            case 'frequency3': { 
                descFrequency.current = 'Hoạt động vừa phải trong ngày, tập thể dục/thể thao 4-5 ngày/tuần.'
                setBodyIndex(prev => ({
                    ...prev,
                    frequency: 1.55,
                }))
                break
            }
            case 'frequency4': { 
                descFrequency.current = 'Hoạt động rất tích cực trong ngày, tập thể dục chăm chỉ mỗi ngày hoặc tập thể dục 2 lần/ngày'
                setBodyIndex(prev => ({
                    ...prev,
                    frequency: 1.725,
                }))
                break
            }
            case 'frequency5': { 
                descFrequency.current = 'Tập thể dục chăm chỉ 2 lần trở lên mỗi ngày, tập luyện chạy marathon, ba môn phối hợp, vận động viên…'
                setBodyIndex(prev => ({
                    ...prev,
                    frequency: 1.9,
                }))
                break
            }
            default: descFrequency.current = ""
        }
    }, [frequencyChecked])
    console.log(bodyIndex)

    //Mục tiêu 
    const [goalChecked, setGoalChecked] = useState()
    const handleGoalChecked = (e) => {
        setGoalChecked(e.target.id)
    }

    useMemo(() => {
        switch(goalChecked) {
            case 'goal1': {
                setBodyIndex(prev =>({
                    ...prev,
                    goalCalo: 500,
                }))
                break
             }
             case 'goal2': {
                setBodyIndex(prev =>({
                    ...prev,
                    goalCalo: 250,
                }))
                break
             }
             case 'goal4': {
                setBodyIndex(prev =>({
                    ...prev,
                    goalCalo: -250,
                }))
                break
             }
             case 'goal5': {
                setBodyIndex(prev =>({
                    ...prev,
                    goalCalo: -500,
                }))
                break
             }
            default: { 
                setBodyIndex(prev =>({
                    ...prev,
                    goalCalo: 0,
                }))
            }
        }
    }, [goalChecked])

    //Thay đổi giao diện khi click vào checkbox
    const [controlCalo, setControlCalo] = useState({
        data: {},
        idChecked: []
    })
    const handleControlCalo = (data) => {
       if(controlCalo.idChecked.length === 0) {
           setControlCalo({ 
               data: { _id: data._id},
               idChecked: [data._id]
           })
           setBodyIndex(prev => ({
               ...prev,
               goalCaloUp: '',
               goalCaloDown: '',
           }))
       }
       else {
            
            setControlCalo({
            data: {_id: ''},
            idChecked: []
            })
           setGoalChecked()

       } 
    }

    const handleReset = () => {
        setBodyIndex(prev =>({
            ...prev, 
            frequency: '',
            goalWeight: '',
            goalCalo: '',
            goalCaloUp: '',
            goalCaloDown: '',
        }))

        setFrequencyChecked('')
        setGoalChecked('')
    }




    return (
        <Row className = "content-goal-items">
        {/* bảng bữa ăn trong ngày */}
        <Col className=" goal-form-index col-md-6 p-0 ">
            <div className = "goal-form">
                <div className = 'goal-form-child'>
                    <GoalForm
                    bodyIndex = {bodyIndex}
                    setBodyIndex = {setBodyIndex}
                    />
                </div>
            </div>
            <div className = 'frequency-form'>
                <div className = 'frequency-form-child'>
                    <Row>
                        <Col>
                            <div className = 'frequency-goal-header'>
                                <h4>Tần suất hoạt động</h4>
                            </div >
                            <div className = 'frequency-goal-body'>
                                <CustomRadio
                                isChecked = {frequencyChecked}
                                id = 'frequency1'
                                name = 'frequency'
                                label = 'Ít hoạt động'
                                onChange = {handleShowDesc}
                                />
                                <CustomRadio
                                isChecked = {frequencyChecked}
                                id = 'frequency2'
                                name = 'frequency'
                                label = 'Hoạt động nhẹ'
                                onChange = {handleShowDesc}
                                />
                                <CustomRadio
                                isChecked = {frequencyChecked}
                                id = 'frequency3'
                                name = 'frequency'
                                label = 'Hoạt động vừa phải'
                                onChange = {handleShowDesc}
                                />
                                <CustomRadio
                                isChecked = {frequencyChecked}
                                id = 'frequency4'
                                name = 'frequency'
                                label = 'Hoạt động rất tích cực'
                                onChange = {handleShowDesc}
                                />
                                <CustomRadio
                                isChecked = {frequencyChecked}
                                id = 'frequency5'
                                name = 'frequency'
                                label = 'Hoạt động cường độ cao'
                                onChange = {handleShowDesc}
                                />
                            {
                                frequencyChecked && <p>Mô tả: {descFrequency.current}</p>
                            }
                            </div>
                        </Col>
                        <Col>
                            <div className = 'frequency-goal-header'>
                                <h4>Mục tiêu</h4>
                            </div>
                            <div className = 'frequency-goal-body'>
                                <InputInformation
                                    id = "goal-weight"
                                    type = 'number'
                                    content="Mục tiêu (kg)"
                                    placeholder='Nhập cân nặng mong muốn (kg)'
                                    data = {goalWeight}
                                    setData = {(value) => {
                                        setBodyIndex(prev => ({
                                        ...prev,
                                        goalWeight: +value, 
                                    }))}
                                    }
                                    />
                            {
                                controlCalo.idChecked.length ?
                                <div >
                                    <CustomRadio
                                    isChecked = {goalChecked}
                                    id = 'goal1'
                                    name = 'goal'
                                    label = 'Tăng 0.5kg một tuần'
                                    onChange = {handleGoalChecked}
                                    />
                                    <CustomRadio
                                    isChecked = {goalChecked}
                                    id = 'goal2'
                                    name = 'goal'
                                    label = 'Tăng 0.25kg một tuần'
                                    onChange = {handleGoalChecked}
                                    />
                                    <CustomRadio
                                    isChecked = {goalChecked}
                                    id = 'goal3'
                                    name = 'goal'
                                    label = 'Giữ nguyên cân'
                                    onChange = {handleGoalChecked}
                                    />
                                    <CustomRadio
                                    isChecked = {goalChecked}
                                    id = 'goal4'
                                    name = 'goal'
                                    label = 'Giảm 0.25kg một tuần'
                                    onChange = {handleGoalChecked}
                                    />
                                    <CustomRadio
                                    isChecked = {goalChecked}
                                    id = 'goal5'
                                    name = 'goal'
                                    label = 'Giảm 0.5kg một tuần'
                                    onChange = {handleGoalChecked}
                                    />
                                </div>
                                :
                                <div  >
                                <InputInformation
                                type = 'number'
                                id = "up-goal"
                                content="Tăng (calo)"
                                placeholder='Nhập lượng calo'
                                data = {goalCaloUp}
                                setData = {(value) => setBodyIndex(prev => ({
                                    ...prev,
                                    goalCaloUp: +value, 
                                    goalCaloDown: '', 
                                }))}
                                />
                                <InputInformation
                                type = 'number'
                                id = "down-goal"
                                content="Giảm (calo)"
                                placeholder='Nhập lượng calo'
                                data = {goalCaloDown}
                                setData = {(value) => setBodyIndex(prev => ({
                                    ...prev,
                                    goalCaloDown: +value, 
                                    goalCaloUp: '', 
                                }))}
                                />
                                </div>
                            }
                                <CustomCheckbox
                                label = 'Mục tiêu theo tuần'
                                handleChecked = {handleControlCalo}
                                data = {controlCalo.data}
                                idChecked = {controlCalo.idChecked}
                                />
                                <div className="update-reset">
                                    <Button>Cập nhật</Button>
                                    <Button outline onClick = {handleReset}>Reset</Button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
               
            </div>
        </Col>
        <Col className="forecast-percentage col-md-6">
            <div className = "forecast-form">
                <div className = 'forecast-form-child'>
                    <div className="forecast-percentage-header">
                        <h4>Thông tin và Dự báo</h4>
                    </div>
                    <div className = 'forecast-percentage-body'>
                        <Forecast bodyIndex = {bodyIndex}/>
                    </div>
                </div>
            </div>
            <div className = 'percentage-form'>
                <div className = 'percentage-form-child'>
                    <div className="forecast-percentage-header">
                        <h4>Tỷ lệ chất dinh dưỡng</h4>
                        <ChartPercentage/>
                    </div>
                </div>
               
            </div>
        </Col>
    </Row>
    )
}

export default GoalItems
