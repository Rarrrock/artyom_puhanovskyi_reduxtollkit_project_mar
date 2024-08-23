// Home.tsx
import React, { useState, useEffect } from 'react';
import PokemonList from '../components/PokemonList';
import Pagination from '../components/Pagination/Pagination';
import BackPagination from '../components/Pagination/BackPagination';
import FavoritesPagination from '../components/Pagination/FavoritesPagination';
import { fetchPokemons, getTotalPages } from '../utils/api';

const HomePage: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1); // Состояние текущей страницы
    const [pokemons, setPokemons] = useState([]); // Состояние для списка покемонов
    const [totalPages, setTotalPages] = useState(0); // Состояние для общего количества страниц

    useEffect(() => {
        const fetchData = async () => {
            // Получение общего количества страниц
            const pages = await getTotalPages();
            setTotalPages(pages);
            // Получение покемонов для текущей страницы
            const data = await fetchPokemons(currentPage);
            setPokemons(data);
        };
        fetchData();
    }, [currentPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page); // Изменение текущей страницы
    };

    return (
        <div>
            {/* Компоненты отображаются в нужном порядке */}
            <BackPagination />
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
            <FavoritesPagination />
            <PokemonList pokemons={pokemons} />
            <BackPagination />
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
            <FavoritesPagination />
        </div>
    );
};

export default HomePage;
