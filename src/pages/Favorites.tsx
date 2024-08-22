import React from 'react';
import { useSelector } from 'react-redux';
import { selectFavorites } from '../features/favorites/favoritesSlice';
import PokemonList from '../components/PokemonList';

const Favorites = () => {
    const favorites = useSelector(selectFavorites);

    return (
        <div>
            <h1>Favorites</h1>
            <PokemonList pokemons={favorites} />
        </div>
    );
};

export default Favorites;
