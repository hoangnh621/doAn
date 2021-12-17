import '../scss/InputInformation.scss'

function InputInformation({id, content, type = 'text', placeholder, data, setData}) {
    return (
        <div className = "InputInformation ">
            <label htmlFor={id}>{content}</label>
            <input 
            type= {type} 
            id = {id} 
            value = {data}
            onChange = {(e) => setData(e.target.value)}
            placeholder = {placeholder} />
        </div>
    )
}

export default InputInformation
