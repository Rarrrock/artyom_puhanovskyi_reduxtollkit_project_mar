import React from 'react';
import { PokemonListProps } from '../models/types';

const PokemonList: React.FC<PokemonListProps> = ({ pokemons }) => {
    return (
        <div className="pokemon-list">
            {pokemons.map((pokemon) => (
                <div key={pokemon.id} className="pokemon-item">
                    <h3>{pokemon.name}</h3>
                    {pokemon.sprites?.front_default && (
                        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                    )}
                </div>
            ))}
        </div>
    );
};

export default PokemonList;