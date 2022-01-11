import { Row, Col, Button} from 'reactstrap'
import '../scss/GoalItems.scss'
import GoalForm from './GoalForm'
import CustomRadio from './CustomRadio'
import { useState, useRef, useMemo, useEffect } from 'react'
import InputInformation from './InputInformation'
import CustomCheckbox from './CustomCheckbox'
import Forecast from './Forecast'
import ChartPercentage from './ChartPercentage'
import { useDispatch, useSelector} from 'react-redux'
import { addGoalFrequency, updatePercentFood, getBodyIndex } from '../actions/userAction'
import { setNutri } from '../actions/nutri'


const GoalItems = () => {
    //Lấy dữ liệu được trả về từ server
    const userSignin = useSelector( state => {
        return state.userSignin
    })
    useEffect(() => {
        if(userSignin) {

            if(!userSignin.isAdmin) {
                dispatch(getBodyIndex())
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    const bodyis = useSelector( state => {
        return state.bodyIndexServer
    })
    const { bodyIndexSv } = bodyis
    //Các chỉ số cá nhân
    const [bodyIndexC, setBodyIndex] = useState({
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

    const [infoBody, setInfoBody] = useState({
        bmr: 0,
        tdee: 0,
        bmi: 0,
        wIdeal: 0,
        cGoal: 0,
        forecastDay: 0,
    })

    const [persent, setPersent] = useState({
        persentPro: 40,
        persentCarbs: 40,
        persentFat: 20,
    })

    const {persentPro, persentCarbs, persentFat} = persent

    const { cGoal } = infoBody

    const { goalWeight, goalCalo, goalCaloUp, goalCaloDown } = bodyIndexC

    //Hiển thị mô tả từng loại tần suất hoạt động
    const descFrequency = useRef('')
    const [frequencyChecked, setFrequencyChecked] = useState()
    const [frequencyID, setFrequencyID] = useState()
    const handleShowDesc = (e) => {
        setFrequencyChecked(e.target.id)
    }


    useMemo(() => {
        switch (frequencyChecked) {
            case 'frequency1': { 
                setFrequencyID('61bdc97c46e2ce99d3deb68a')
                descFrequency.current = 'Ít hoặc không hoạt động trong ngày, làm công việc văn phòng hoặc tượng tự.'
                setBodyIndex(prev => ({
                    ...prev,
                    frequency: 1.2,
                }))
                break
            }
            case 'frequency2': { 
                setFrequencyID('61bdc97c46e2ce99d3deb68b')
                descFrequency.current = 'Hoạt động nhẹ trong ngày, tập thể dục/thể thao 1-3 lần/tuần.'
                setBodyIndex(prev => ({
                    ...prev,
                    frequency: 1.375,
                }))
                break
            }
            case 'frequency3': { 
                setFrequencyID('61bdc97c46e2ce99d3deb68c')
                descFrequency.current = 'Hoạt động vừa phải trong ngày, tập thể dục/thể thao 4-5 ngày/tuần.'
                setBodyIndex(prev => ({
                    ...prev,
                    frequency: 1.55,
                }))
                break
            }
            case 'frequency4': { 
                setFrequencyID('61bdc97c46e2ce99d3deb68d')
                descFrequency.current = 'Hoạt động rất tích cực trong ngày, tập thể dục chăm chỉ mỗi ngày hoặc tập thể dục 2 lần/ngày'
                setBodyIndex(prev => ({
                    ...prev,
                    frequency: 1.725,
                }))
                break
            }
            case 'frequency5': { 
                setFrequencyID('61bdc97c46e2ce99d3deb68e')
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

    //Mục tiêu 
    const [goalChecked, setGoalChecked] = useState()
    const [goalID, setGoalID] = useState()
    const handleGoalChecked = (e) => {
        setGoalChecked(e.target.id)
    }

    useMemo(() => {
        switch(goalChecked) {
            case 'goal1': {
                setGoalID('61bdca5246e2ce99d3deb691')
                setBodyIndex(prev =>({
                    ...prev,
                    goalCalo: 500,
                }))
                break
             }
             case 'goal2': {
                setGoalID('61bdca5246e2ce99d3deb691')
                setBodyIndex(prev =>({
                    ...prev,
                    goalCalo: 250,
                }))
                break
             }
             case 'goal4': {
                 setGoalID('61bdca5246e2ce99d3deb692')
                setBodyIndex(prev =>({
                    ...prev,
                    goalCalo: -250,
                }))
                break
             }
             case 'goal5': {
                setGoalID('61bdca5246e2ce99d3deb692')
                setBodyIndex(prev =>({
                    ...prev,
                    goalCalo: -500,
                }))
                break
             }
            default: { 
                setGoalID('61bdca5246e2ce99d3deb693')
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
    const [dataPersent, setDataPersent] = useState( 
        () => {
            if(bodyIndexSv)
            {
                const fat_per = 100 - bodyIndexSv.protein_per - bodyIndexSv.carbs_per

                return [
                    { name: 'Protein', value: bodyIndexSv.protein_per },
                    { name: 'Carbs', value: bodyIndexSv.carbs_per },
                    { name: 'Fat', value: fat_per },
                  ]
            }
            else return (

                [
                    { name: 'Protein', value: 40  },
                    { name: 'Carbs', value: 40 },
                    { name: 'Fat', value: 20 },
                ]
            )
        }   
        )
    //Cập nhật tỷ lệ 
      const handlePersent = () => {
          const total = +persentPro + persentCarbs + persentFat
          if(total === 100) {
              setDataPersent([
                { name: 'Protein', value: +persentPro },
                { name: 'Carbs', value: +persentCarbs },
                { name: 'Fat', value: +persentFat },
              ])
              dispatch(updatePercentFood(persentPro, persentCarbs))
          }
      }

    //Reset tỷ lệ
    const handleResetPersent = () => {
        setDataPersent([
            { name: 'Protein', value: 40 },
            { name: 'Carbs', value: 40 },
            { name: 'Fat', value: 20 },
          ])
    }

    //Cập nhật tần suất hoạt động và mục tiêu
    const dispatch = useDispatch()
    const caloDeviant = goalCalo + goalCaloUp - goalCaloDown
    useMemo(() => {
        if(goalCaloDown !== '') {
            setGoalID('61bdca5246e2ce99d3deb695')
        }
        if (goalCaloUp !== '')
        setGoalID('61bdca5246e2ce99d3deb694')
    }, [goalCaloDown, goalCaloUp])
    const handleGoalFrequency = () => {
        dispatch(addGoalFrequency(caloDeviant, goalID, frequencyID, goalWeight ))
    }
   
    useEffect(() => {
        const pro = Math.round((cGoal * persentPro/100)/4)
        const carbs = Math.round((cGoal * persentCarbs/100)/4)
        const fat = Math.round((cGoal * persentFat/100)/9)
        dispatch(setNutri(cGoal, pro, carbs, fat))
    },[cGoal, dispatch, persentCarbs, persentFat, persentPro] )

    //Cập nhật giao diện khi dữ liệu được lấy từ server về
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        if(bodyIndexSv) {
            //Mục tiêu và chỉ số cơ thể
            setBodyIndex(prev => ({ 
                ...prev,
                height: bodyIndexSv.height,
                weight: bodyIndexSv.weight,
                age: bodyIndexSv.age,
                bodyfat: bodyIndexSv.bodyfat, 
                sex: bodyIndexSv.sex, 
                frequency: bodyIndexSv.frequency,
                goalWeight: bodyIndexSv.goal_weight,
            }))
            if(bodyIndexSv.goal_id === '61bdca5246e2ce99d3deb694') {
                setBodyIndex(prev => ({
                    ...prev,
                    goalCaloUp: bodyIndexSv.calo_deviant
                }))
            }
            else if(bodyIndexSv.goal_id === '61bdca5246e2ce99d3deb695') {
                setBodyIndex(prev => ({
                    ...prev,
                    goalCaloDown: bodyIndexSv.calo_deviant
                }))
            }
            else {
                handleControlCalo(controlCalo.data)
                setBodyIndex(prev => ({
                    ...prev,
                    goalCalo: bodyIndexSv.calo_deviant
                }))
                if(bodyIndexSv.goal_id === '61bdca5246e2ce99d3deb691' && bodyIndexSv.calo_deviant === 500)
                { 
                    setGoalChecked('goal1')
                }
                else if (bodyIndexSv.goal_id === '61bdca5246e2ce99d3deb691' && bodyIndexSv.calo_deviant === 250 ) {
                    setGoalChecked('goal2')
                }
                else if (bodyIndexSv.goal_id === '61bdca5246e2ce99d3deb692' && bodyIndexSv.calo_deviant === -250 ) {
                    setGoalChecked('goal4')
                }
                else if (bodyIndexSv.goal_id === '61bdca5246e2ce99d3deb692' && bodyIndexSv.calo_deviant === -500 ) {
                    setGoalChecked('goal5')
                }
                else {
                    setGoalChecked('goal3')
                }
            }
            //Tần suất hoạt động
            switch (bodyIndexSv.frequency_id) {
                case '61bdc97c46e2ce99d3deb68a':
                    setFrequencyChecked('frequency1')
                    break;
                case '61bdc97c46e2ce99d3deb68b':
                    setFrequencyChecked('frequency2')
                    break;
                case '61bdc97c46e2ce99d3deb68c':
                    setFrequencyChecked('frequency3')
                break;
                case '61bdc97c46e2ce99d3deb68d':
                    setFrequencyChecked('frequency4')
                    break;
                case '61bdc97c46e2ce99d3deb68e':
                    setFrequencyChecked('frequency5')
                break;
                default:
                    setFrequencyChecked('')
                    break;
            }

            //Tỷ lệ các chất
            const fat_per = 100 - bodyIndexSv.protein_per - bodyIndexSv.carbs_per
            setPersent({
                persentPro: bodyIndexSv.protein_per,
                persentCarbs: bodyIndexSv.carbs_per,
                persentFat: fat_per,
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <Row className = "content-goal-items">
        {/* bảng bữa ăn trong ngày */}
        <Col className=" goal-form-index col-md-6 p-0 ">
            <div className = "goal-form">
                <div className = 'goal-form-child'>
                    <GoalForm
                    bodyIndexC = {bodyIndexC}
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
                                    <Button onClick = {handleGoalFrequency}>Cập nhật</Button>
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
                        <Forecast 
                        bodyIndexC = {bodyIndexC}
                        infoBody = {infoBody}
                        setInfoBody = {setInfoBody}
                        />
                    </div>
                </div>
            </div>
            <div className = 'percentage-form'>
                <div className = 'percentage-form-child'>
                    <div className="forecast-percentage-header">
                        <h4>Tỷ lệ chất dinh dưỡng</h4>
                    </div>
                    <Row className = 'forecast-percentage-body'>
                        <Col>
                            <ChartPercentage dataPersent = {dataPersent}/>
                        </Col>
                        <Col>
                        <p>Calo: { cGoal } (calo)</p>
                        <p>Protein: { Math.round((cGoal * persentPro/100)/4) } (g)</p>
                        <p>Carbs: { Math.round((cGoal * persentCarbs/100)/4) } (g)</p>
                        <p>Fat: { Math.round((cGoal * persentFat/100)/9) } (g)</p>
                        <div className="selectedPercent">
                            <label>
                                Protein: 
                                <input 
                                type="number"
                                min = '1'
                                max = '100'
                                value = {persentPro}
                                onChange = {(e) =>{
                                    setPersent(prev => ({
                                        ...prev,
                                        persentPro: +e.target.value
                                    }))} 
                                } 
                                />
                            </label>
                            <label>
                                Carbs: 
                                <input 
                                type="number"
                                min = '1'
                                max = '100'
                                value = {persentCarbs}
                                onChange = {(e) => setPersent(prev => ({
                                    ...prev,
                                    persentCarbs: +e.target.value
                                }))} 
                                />
                            </label>
                            <label>
                                Fat: 
                                <input 
                                type="number"
                                min = '1'
                                max = '100'
                                value = {persentFat}
                                onChange = {(e) => setPersent(prev => ({
                                    ...prev,
                                    persentFat: +e.target.value
                                }))} 
                                />
                            </label>
                        </div>
                        <div className="update-reset">
                            <Button onClick = {handlePersent}>Cập nhật</Button>
                            <Button outline onClick = {handleResetPersent}>Reset</Button>
                        </div>
                        </Col>
                    </Row>
                </div>
               
            </div>
        </Col>
    </Row>
    )
}

export default GoalItems
