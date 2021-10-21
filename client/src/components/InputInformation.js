import '../scss/InputInformation.scss'

function InputInformation({id, content, placeholder}) {
    return (
        <div className = "InputInformation ">
            <label htmlFor={id}>{content}</label>
            <input type="text" id = {id} placeholder = {placeholder} />
        </div>
    )
}

export default InputInformation
