import Calendar from 'react-calendar'
import '../scss/CalendarMeal.scss'
import { useState } from 'react'

const CalendarMeal = () => {
    const [date, setDate] = useState(new Date())

    return (
        <div className = 'react-calendar-meal'>
            <Calendar
            value = {date}
            onChange = {setDate}
            // showFixedNumberOfWeeks 
            />
        </div>
    )
}

export default CalendarMeal
