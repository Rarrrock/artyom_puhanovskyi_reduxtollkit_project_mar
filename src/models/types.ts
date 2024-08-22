export interface PokemonSprites {
    front_default?: string;
}

export interface Pokemon {
    id: number;
    name: string;
    sprites?: PokemonSprites;
}

export interface PokemonListProps {
    pokemons: Pokemon[];
}