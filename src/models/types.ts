// src/models/types.ts
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
    // Добавьте другие поля, если они используются
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
    pokemons: Pokemon[]; // массив покемонов
    pokemonDetails: Pokemon | null; // детали покемона или null
    status: 'idle' | 'loading' | 'failed'; // статус загрузки
    totalResults: number; // добавлено новое свойство для общего количества результатов
}

export interface EvolutionChain {
    species: {
        name: string;
        url: string;
    };
    evolves_to: EvolutionChain[];
}
