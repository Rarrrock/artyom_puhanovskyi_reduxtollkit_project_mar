// src/components/Pagination/Pagination.tsx
import React, { useState, useEffect } from 'react';
import { useAppDispatch } from '../../store/store';
import { getPokemons } from '../../features/pokemon/pokemonSlice';
import {
    fetchTotalPages,
    goToCurrentPage,
    goToFirstPage,
    goToLastPage,
    goToNextPage,
    goToPreviousPage
} from '../../utils/api';
import { PaginationProps } from '../../models/types'; // Импорт интерфейса PaginationProps

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const dispatch = useAppDispatch();
    const [internalCurrentPage, setInternalCurrentPage] = useState<number>(currentPage);
    const [internalTotalPages, setInternalTotalPages] = useState<number>(totalPages);

    useEffect(() => {
        fetchTotalPages(setInternalTotalPages); // Обновление состояния при монтировании
    }, []);

    useEffect(() => {
        setInternalCurrentPage(currentPage); // Обновление состояния при изменении currentPage
    }, [currentPage]);

    const handlePageChange = (newPage: number) => {
        if (newPage < 1 || newPage > internalTotalPages) return;
        setInternalCurrentPage(newPage);
        dispatch(getPokemons(newPage));
        onPageChange(newPage); // Вызов функции обратного вызова
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
