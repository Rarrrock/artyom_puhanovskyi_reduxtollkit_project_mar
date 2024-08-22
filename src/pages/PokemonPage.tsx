import React from 'react';
import PokemonDetails from '../components/PokemonDetails';
import { useSelector } from 'react-redux';
import { selectPokemons } from '../features/pokemon/pokemonSlice';

const PokemonPage: React.FC = () => {
    const pokemons = useSelector(selectPokemons);

    return (
        <div>
            <PokemonDetails pokemons={pokemons} />
        </div>
    );
};

export default PokemonPage;