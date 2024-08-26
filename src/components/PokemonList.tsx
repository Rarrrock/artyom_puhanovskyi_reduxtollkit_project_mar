import React from 'react';
import { PokemonListProps } from "../models/types";
import { Link } from 'react-router-dom';
import {getPokemonImageUrl} from "../utils/api";

const PokemonList: React.FC<PokemonListProps> = ({ pokemons }) => {
    return (
        <div>
            {pokemons.map((pokemon) => {
                const imageUrl = getPokemonImageUrl(pokemon.id);

                return (
                    <div key={pokemon.name} className="pokemon-item">
                        <Link to={`/pokemon/${pokemon.id}`}>
                            <img
                                src={imageUrl}
                                alt={pokemon.name}
                                className="pokemon-image"
                                onError={(e) => {
                                    e.currentTarget.src = "/images/pokemon_def.jpg";
                                    console.error(`Failed to load image for ${pokemon.name} at ${imageUrl}`);
                                }}
                            />
                        </Link>
                        <Link to={`/pokemon/${pokemon.id}`}>
                            <p>{pokemon.name}</p>
                        </Link>
                    </div>
                );
            })}
        </div>
    );
};

export default PokemonList;