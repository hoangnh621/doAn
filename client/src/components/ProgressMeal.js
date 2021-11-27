import { Progress } from 'reactstrap'
import '../scss/ProgressMeal.scss'

const ProgressMeal = ({title, value}) => {
    return (
        <div className = 'progressMeal'>
            <span>{title}</span>
            <Progress animated value = {value} >{value}%</Progress>
        </div>
    )
}

export default ProgressMeal
