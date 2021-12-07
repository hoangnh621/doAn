import '../scss/PaginationData.scss'
import { useState, useEffect, useMemo } from 'react'
import { BsChevronRight, BsChevronLeft } from 'react-icons/bs'
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap'

function PaginationData({total , itemsPerPage , currentPage, onPageChange }) {
    const [totalPages, setTotalPages] = useState(0)

    useEffect(() => {
        if(total > 0 && itemsPerPage > 0)
        setTotalPages(Math.ceil(total / itemsPerPage))
    }, 
    [itemsPerPage, total])

    const paginationItems = useMemo(() => {
        const siblingCount = 1
        let arrShow = []
        const DOTS = '...'

        const range = (start, end) => {
            let length = end - start + 1
           
            return Array.from({ length }, (_, idx) => idx + start)
        }

        const totalPageNumbers = siblingCount + 5;

        if (totalPageNumbers >= totalPages) {
            arrShow = range(1, totalPages);
        }

        const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
        const rightSiblingIndex = Math.min(
        currentPage + siblingCount,
        totalPages
        )


        const shouldShowLeftDots = leftSiblingIndex > 2
        const shouldShowRightDots = rightSiblingIndex < totalPages - 2

        const firstPageIndex = 1
        const lastPageIndex = totalPages

        if (!shouldShowLeftDots && shouldShowRightDots) {
            let leftItemCount = 3 + 2 * siblingCount;
            let leftRange = range(1, leftItemCount);
      
            arrShow =  [...leftRange, DOTS, totalPages];
        }


        if (shouldShowLeftDots && !shouldShowRightDots) {
      
            let rightItemCount = 3 + 2 * siblingCount;
            let rightRange = range(
              totalPages - rightItemCount + 1,
              totalPages
            )
            arrShow =  [firstPageIndex, DOTS, ...rightRange]
        }

        if (shouldShowLeftDots && shouldShowRightDots) {
            let middleRange = range(leftSiblingIndex, rightSiblingIndex);
            arrShow =  [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
        }
      

        
        const pages = []

        arrShow.map( (item, i) => {
            if(item === DOTS) {
                if (i === 1) {
                    pages.push(
                        <PaginationItem
                            key = {i}
                            // active={item === currentPage}
                            onClick = {() => onPageChange(currentPage - 1)}
                        >
                            <PaginationLink>{item}</PaginationLink>
                        </PaginationItem>
                    ) 
                }
                else {
                    pages.push(
                        <PaginationItem
                            key = {i}
                            // active={item === currentPage}
                            onClick = {() => onPageChange(currentPage + 1)}
                        >
                            <PaginationLink>{item}</PaginationLink>
                        </PaginationItem>
                    ) 
                }
            }
            else {
                pages.push(
                    <PaginationItem
                        key = {i}
                        active={item === currentPage}
                        onClick = {() => onPageChange(item)}
                    >
                        <PaginationLink>{item}</PaginationLink>
                    </PaginationItem>
                )
            }
            return null
        })
        return pages
    }, [totalPages, currentPage, onPageChange])

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
