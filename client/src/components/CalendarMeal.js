import Calendar from 'react-calendar'
import '../scss/CalendarMeal.scss'

const CalendarMeal = ({date, setDate, onChangeMeal}) => {
    // const [date, setDate] = useState(new Date())
    return (
        <div className = 'react-calendar-meal'>
            <Calendar
            value = {date}
            onChange = {setDate}
            onClickDay = {onChangeMeal}
            />
        </div>
    )
}

export default CalendarMeal
