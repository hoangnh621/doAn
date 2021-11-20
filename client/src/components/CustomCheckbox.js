import '../scss/CustomCheckbox.scss'


function CustomCheckbox({label, dataChecked, handleChecked, data}) {

    
    return (
        <label className="container">{label}
            <input 
            type="checkbox"
            checked = {dataChecked.includes(data)}
            onChange = {() => handleChecked(data)}
            />
            <span className="checkmark"></span>
        </label>
    )
}

export default CustomCheckbox
