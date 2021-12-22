import '../scss/CustomRadio.scss'

//Component CustomRadio
function CustomRadio ({label, name, id, isChecked, onChange}) {
    return (
        <div className = 'container-radio'>
            <label className="container">{label}
                <input 
                id = {id}
                type='radio'
                name = {name}
                checked = {id === isChecked}
                onChange = {onChange}
                />
                <span className="checkmark"></span>
            </label>
        </div>
    )
}



export default CustomRadio
