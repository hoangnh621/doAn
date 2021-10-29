import '../scss/ItemBar.scss'
import {ListGroupItem} from 'reactstrap'


function ItemBar({id, children, text, active, toggle}) {
    return (
        <ListGroupItem
         tag="a" 
         onClick = {toggle}
         active = {active} 
         id = {id}
        >
            {children}
            {text}
        </ListGroupItem>
    )
}

export default ItemBar
