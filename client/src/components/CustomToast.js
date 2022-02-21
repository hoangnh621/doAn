import { Toast, ToastBody, ToastHeader } from 'reactstrap'
import '../scss/CustomToast.scss'
import { MdDone, MdErrorOutline } from 'react-icons/md'
import { useEffect } from 'react'

const CustomToast = ({show, setShow, toggle, title, content, status}) => {
    useEffect(() => {
        const timeId = setTimeout(() => {
            if(show)
            setShow(!show)
        },3000)

        return () => clearTimeout(timeId)
    })
    return (
        <Toast isOpen={show} className = {status} 
        >
        <ToastHeader toggle={toggle}>
            {
                status === 'toastSuccess'
                ? 
                <MdDone/>
                : 
                <MdErrorOutline/>
            }
            { title }
        </ToastHeader>
        <ToastBody>
            {content}
        </ToastBody>
      </Toast>
    )
}

export default CustomToast
