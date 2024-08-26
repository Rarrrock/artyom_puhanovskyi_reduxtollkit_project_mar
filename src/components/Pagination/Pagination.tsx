import React, { useState, useEffect } from 'react';
import {
    fetchTotalPages,
    goToCurrentPage,
    goToFirstPage,
    goToLastPage,
    goToNextPage,
    goToPreviousPage
} from '../../utils/api';
import { PaginationProps } from '../../models/types';

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const [internalCurrentPage, setInternalCurrentPage] = useState<number>(currentPage);
    const [internalTotalPages, setInternalTotalPages] = useState<number>(totalPages);

    useEffect(() => {
        fetchTotalPages(setInternalTotalPages);
    }, []);

    useEffect(() => {
        setInternalCurrentPage(currentPage);
    }, [currentPage]);

    const handlePageChange = (newPage: number) => {
        if (newPage < 1 || newPage > internalTotalPages) return;
        setInternalCurrentPage(newPage);
        onPageChange(newPage);
    };

    return (
        <div>
            <div>
                <div style={{ marginTop: '20px' }}>
                    <button onClick={goToFirstPage(handlePageChange)}>First Page</button>
                    <button onClick={goToPreviousPage(handlePageChange, internalCurrentPage)}>Prev</button>
                    <button onClick={goToCurrentPage(handlePageChange, internalCurrentPage)}>Page {internalCurrentPage}</button>
                    <button onClick={goToNextPage(handlePageChange, internalCurrentPage)}>Next</button>
                    <button onClick={goToLastPage(handlePageChange, internalTotalPages)}>Last Page</button>
                </div>
            </div>
        </div>
    );
};

export default Pagination;
