// src/models/types.ts
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

export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export interface PokemonState {
    pokemons: any[];
    pokemonDetails: any | null;
    status: 'idle' | 'loading' | 'failed';
}

export interface EvolutionChain {
    species: {
        name: string;
        url: string;
    };
    evolves_to: EvolutionChain[];
}
