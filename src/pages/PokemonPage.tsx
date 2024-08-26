import React from 'react';
import { useSelector } from 'react-redux';
import PokemonDetails from '../components/PokemonDetails';
import BackPagination from "../components/Pagination/BackPagination";
import FavoritesPagination from '../components/Pagination/FavoritesPagination';
import HomePagination from '../components/Pagination/HomePagination';
import { selectPokemons } from '../features/pokemon/pokemonSlice';
import SearchPagination from "../components/Pagination/SearchPagination";

const PokemonPage: React.FC = () => {
    const pokemons = useSelector(selectPokemons);
    return (
        <div>
            <HomePagination />
            <BackPagination />
            <FavoritesPagination />
            <SearchPagination/>
            <PokemonDetails pokemons={pokemons} />
        </div>
    );
};

export default PokemonPage;
