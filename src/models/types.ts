export interface PokemonSprites {
    front_default?: string;
}

export interface Pokemon {
    id: number;
    name: string;
    sprites: {
        front_default: string;
    };
    types: Array<{
        type: {
            name: string;
        };
    }>;
    abilities: Array<{
        ability: {
            name: string;
        };
    }>;
    stats: Array<{
        stat: {
            name: string;
        };
    }>;
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
    pokemons: Pokemon[];
    pokemonDetails: Pokemon | null;
    status: 'idle' | 'loading' | 'failed';
    totalResults: number;
}

export interface EvolutionChain {
    species: {
        name: string;
        url: string;
    };
    evolves_to: EvolutionChain[];
}
