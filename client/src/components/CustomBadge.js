import { Badge } from 'reactstrap'
import '../scss/CustomBadge.scss'

const CustomBadge = ({ type}) => {
    let lable = 'Thấp'
    switch (type) {
        case 'low': lable = 'Thấp'
        break
        case 'mid': lable = 'Trung bình'
        break
        default: lable = 'Cao'
    }
    return (
        <Badge className = {type} >{lable}</Badge>
    )
}


export default CustomBadge
