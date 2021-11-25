import '../scss/InputInformation.scss'
import { forwardRef } from 'react'


function SearchInputFood({id, content, placeholder, onSearch, searchFood, setSearchFood}, searchRef) {

    const onInputSearch = (value) => {
        setSearchFood(value)
        onSearch(value)
    }

    return (
        <div className = "InputInformation ">
            <label htmlFor={id}>{content}</label>
            <input 
            ref = {searchRef}
            type="text" 
            id = {id}
            placeholder = {placeholder} 
            value = {searchFood}
            onChange={(e) => onInputSearch(e.target.value)}
            />
        </div>
    )
}

export default forwardRef(SearchInputFood)
