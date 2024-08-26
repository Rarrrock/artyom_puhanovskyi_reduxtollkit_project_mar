import React, { useState, useEffect } from 'react';
import PokemonList from '../components/PokemonList';
import Pagination from '../components/Pagination/Pagination';
import BackPagination from '../components/Pagination/BackPagination';
import FavoritesPagination from '../components/Pagination/FavoritesPagination';
import { useAppDispatch, useAppSelector } from '../store/store';
import {getPokemons, selectPokemons, selectTotalResults} from '../features/pokemon/pokemonSlice';
import SearchPagination from "../components/Pagination/SearchPagination";

const HomePage: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useAppDispatch();
    const pokemons = useAppSelector(selectPokemons);

    const totalResults = useAppSelector(selectTotalResults);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        setTotalPages(Math.ceil(totalResults / 20));
    }, [totalResults]);

    useEffect(() => {
        dispatch(getPokemons(currentPage));
    }, [currentPage, dispatch]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };


    return (
        <div>
            <SearchPagination />
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
