import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Pagination from '../components/Pagination/Pagination';
import PokemonList from '../components/PokemonList';
import { selectFavorites } from '../features/favorites/favoritesSlice';
import BackPagination from "../components/Pagination/BackPagination";
import HomePagination from "../components/Pagination/HomePagination";

const FavoritesPage: React.FC = () => {
    const favorites = useSelector(selectFavorites);
    const [currentPage, setCurrentPage] = useState(1);
    const pokemonsPerPage = 10;
    const totalPages = Math.ceil(favorites.length / pokemonsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const displayedPokemons = favorites.slice(
        (currentPage - 1) * pokemonsPerPage,
        currentPage * pokemonsPerPage
    );

    return (
        <div>
            <HomePagination/>
            <BackPagination />
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
            <PokemonList pokemons={displayedPokemons} />
            <HomePagination/>
            <BackPagination />
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default FavoritesPage;
