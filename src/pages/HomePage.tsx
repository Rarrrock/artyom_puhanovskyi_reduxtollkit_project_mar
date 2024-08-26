import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PokemonList from '../components/PokemonList';
import Pagination from '../components/Pagination/Pagination';
import BackPagination from '../components/Pagination/BackPagination';
import FavoritesPagination from '../components/Pagination/FavoritesPagination';
import { useAppDispatch, useAppSelector } from '../store/store';
import { getPokemons, selectPokemons } from '../features/pokemon/pokemonSlice';

const HomePage: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useAppDispatch();
    const pokemons = useAppSelector(selectPokemons);
    const navigate = useNavigate(); // Use useNavigate for navigation

    useEffect(() => {
        // Fetch pokemons for the current page
        dispatch(getPokemons(currentPage));
    }, [currentPage, dispatch]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleSearchClick = () => {
        navigate('/search'); // Navigate to the search page
    };

    return (
        <div>
            <button onClick={handleSearchClick}>Go to Search</button>
            <BackPagination />
            <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(2000 / 20)}
                onPageChange={handlePageChange}
            />
            <FavoritesPagination />
            <PokemonList pokemons={pokemons} />
            <BackPagination />
            <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(2000 / 20)}
                onPageChange={handlePageChange}
            />
            <FavoritesPagination />
        </div>
    );
};

export default HomePage;
