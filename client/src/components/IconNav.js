import '../scss/IconNav.scss'
import {Tooltip} from 'reactstrap'
import {useState} from 'react'

function IconNav({href, children, id, text, istoolTip, onClick}) {
    const [tooltipOpen, settoolTipOpen] = useState(false);
    const toggle = () => settoolTipOpen(!tooltipOpen);

    return (
        <span>
            <a href={href} id = {id} onClick = {onClick}>
                {children}
            </a>
            {
            istoolTip && 
            <Tooltip
            placement= "bottom"
            isOpen={tooltipOpen}
            target={id}
            toggle={toggle}
            >
                {text}
            </Tooltip>
            }
        </span>
    )
}

export default IconNav
