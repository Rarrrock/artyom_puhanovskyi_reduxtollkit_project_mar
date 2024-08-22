import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Импорт useNavigate для навигации
import { useAppDispatch } from '../store/store';
import { getPokemons } from '../features/pokemon/pokemonSlice';
import { getTotalPages } from '../utils/api';

const Pagination: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate(); // Хук для навигации
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchTotalPages = async () => {
            const pages = await getTotalPages();
            setTotalPages(pages);
        };
        fetchTotalPages();
    }, []);

    const handlePageChange = (newPage: number) => {
        if (newPage < 1 || newPage > totalPages) return;
        setCurrentPage(newPage);
        dispatch(getPokemons(newPage));
    };

    const handleFavoritesClick = () => {
        navigate('/favorites'); // Перенаправление на страницу Favorites
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
                <button onClick={() => handlePageChange(1)}>First Page</button>
                <button onClick={() => handlePageChange(currentPage - 1)}>Prev</button>
                <button onClick={() => handlePageChange(currentPage)}>Page {currentPage}</button>
                <button onClick={() => handlePageChange(currentPage + 1)}>Next</button>
                <button onClick={() => handlePageChange(totalPages)}>Last Page</button>
                <div style={{ marginTop: '20px' }}>
                    <button onClick={handleFavoritesClick}>Favorites</button>
                </div>
            </div>
        </div>
    );
};

export default Pagination;