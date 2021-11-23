import { memo } from 'react'
import '../scss/CustomCheckbox.scss'


function CustomCheckbox({label, handleChecked, data, idChecked}) {

    
    return (
        <label className="container">{label}
            <input 
            type="checkbox"
            checked = {idChecked.includes(data.id)}
            onChange = {() => handleChecked(data)}
            />
            <span className="checkmark"></span>
        </label>
    )
}

export default memo(CustomCheckbox)
