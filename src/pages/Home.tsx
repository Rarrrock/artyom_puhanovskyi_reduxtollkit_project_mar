import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getPokemons, selectPokemons } from '../features/pokemon/pokemonSlice';
import PokemonList from '../components/PokemonList';
import Pagination from '../components/Pagination';
import { useAppDispatch } from '../store/store';

const Home = () => {
    const dispatch = useAppDispatch();
    const pokemons = useSelector(selectPokemons);

    useEffect(() => {
        dispatch(getPokemons(1));
    }, [dispatch]);

    return (
        <div>
            <Pagination />
            <PokemonList pokemons={pokemons} />
            <Pagination />
        </div>
    );
};

export default Home;
