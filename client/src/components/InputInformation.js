import '../scss/InputInformation.scss'

function InputInformation({id, content, type = 'text', placeholder, data, setData, min = 0, max, warning = false, contentWarning = ''}) {
    return (
        <div className = "InputInformation ">
            <label htmlFor={id}>{content}</label>
            <input 
            type= {type} 
            min = {min}
            max = {max}
            id = {id} 
            value = {data}
            onChange = {(e) => setData(e.target.value)}
            placeholder = {placeholder} />
            {
                warning 
                ? 
                <label className = 'warning-lable' htmlFor={id}>{contentWarning}</label>
                : true
            }
        </div>
    )
}

export default InputInformation
