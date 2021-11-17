import '../scss/PaginationData.scss'
import { BsChevronRight, BsChevronLeft } from 'react-icons/bs'
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap'

function PaginationData() {
    return(
    <Pagination size = 'sm' className='d-flex mt-3'>
        <PaginationItem>
            <PaginationLink href='#' first>
            <BsChevronLeft />
            </PaginationLink>
        </PaginationItem>
        <PaginationItem active>
            <PaginationLink href='#'>1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
            <PaginationLink href='#'>2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
            <PaginationLink href='#'>3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
            <PaginationLink href='#'>4</PaginationLink>
        </PaginationItem>
        <PaginationItem>
            <PaginationLink href='#'>5</PaginationLink>
        </PaginationItem>
        <PaginationItem>
            <PaginationLink href='#' last>
            <BsChevronRight />
            </PaginationLink>
        </PaginationItem>
    </Pagination>
    )
}

export default PaginationData
