import React from 'react';

interface PokemonSprites {
    front_default?: string;
}

interface Pokemon {
    id: number;
    name: string;
    sprites?: PokemonSprites;
}

interface PokemonListProps {
    pokemons: Pokemon[];
}

const PokemonList: React.FC<PokemonListProps> = ({ pokemons }) => {
    return (
        <div>
            {pokemons.map((pokemon) => {
                const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;

                return (
                    <div key={pokemon.name} className="pokemon-item">
                        <img
                            src={imageUrl}
                            alt={pokemon.name}
                            className="pokemon-image"
                            onError={(e) => {
                                e.currentTarget.src = "/images/pokemon_def.jpg";
                                console.error(`Failed to load image for ${pokemon.name} at ${imageUrl}`);
                            }}
                        />
                        <p>{pokemon.name}</p>
                    </div>
                );
            })}
        </div>
    );
};

export default PokemonList;
