import '../scss/InputInformation.scss'
import { useState } from 'react'

function SearchInputFood({id, content, placeholder, onSearch}) {
    const [search, setSearch] = useState('')

    const onInputSearch = (value) => {
        setSearch(value)
        onSearch(value)
    }

    return (
        <div className = "InputInformation ">
            <label htmlFor={id}>{content}</label>
            <input 
            type="text" 
            id = {id}
            placeholder = {placeholder} 
            value = {search}
            onChange={(e) => onInputSearch(e.target.value)}
            />
        </div>
    )
}

export default SearchInputFood
