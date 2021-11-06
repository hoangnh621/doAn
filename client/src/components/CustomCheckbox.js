import '../scss/CustomCheckbox.scss'

function CustomCheckbox({label}) {
    return (
        <label className="container">{label}
            <input type="checkbox" />
            <span className="checkmark"></span>
        </label>
    )
}

export default CustomCheckbox
