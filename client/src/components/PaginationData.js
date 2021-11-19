import '../scss/PaginationData.scss'
import { useState, useEffect, useMemo } from 'react'
import { BsChevronRight, BsChevronLeft } from 'react-icons/bs'
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap'

function PaginationData({total , itemsPerPage , currentPage, onPageChange}) {
    const [totalPages, setTotalPages] = useState(0)

    useEffect(() => {
        if(total > 0 && itemsPerPage > 0)
        setTotalPages(Math.ceil(total / itemsPerPage))
    }, 
    [itemsPerPage, total])

    const paginationItems = useMemo(() => {
        const pages = []

        for(let i = 1; i <= totalPages; i++) {
            pages.push(
                <PaginationItem
                    key = {i}
                    active={i === currentPage}
                    onClick = {() => onPageChange(i)}
                >
                    <PaginationLink>{i}</PaginationLink>
                </PaginationItem>
            )
        }
        return pages
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [totalPages, currentPage])

    if(totalPages === 0) return null

    return(
        <Pagination size = 'sm' className='d-flex mt-3'>
            <PaginationItem
                disabled = {currentPage === 1}
            >
                <PaginationLink 
                first  
                onClick = {() => onPageChange(currentPage - 1)}
                >
                    <BsChevronLeft />
                </PaginationLink>
            </PaginationItem>
           {paginationItems}
            <PaginationItem
                disabled = {currentPage === totalPages}
            >
                <PaginationLink 
                last
                onClick = {() => onPageChange(currentPage + 1)}
                >
                    <BsChevronRight />
                </PaginationLink>
            </PaginationItem>
        </Pagination>
    )
}

export default PaginationData
