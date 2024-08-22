import axios from 'axios';

const API_URL = 'https://pokeapi.co/api/v2';

export const fetchPokemons = async (page: number) => {
    const response = await axios.get(`${API_URL}/pokemon`, {
        params: {
            limit: 10,
            offset: (page - 1) * 10,
        },
    });
    return response.data.results.map((pokemon: any) => ({
        ...pokemon,
        id: pokemon.url.split('/').filter(Boolean).pop(), // Извлечение ID из URL
    }));
};

export const getTotalPages = async () => {
    const response = await axios.get(`${API_URL}/pokemon`, {
        params: {
            limit: 10,
            offset: 0,
        },
    });
    const totalPokemons = response.data.count;
    const totalPages = Math.ceil(totalPokemons / 10);
    return totalPages;
};

export const fetchPokemonDetails = async (id: number) => {
    const response = await axios.get(`${API_URL}/pokemon/${id}`);
    return response.data;
};

export const searchPokemonsByName = async (query: string) => {
    const response = await axios.get(`${API_URL}/pokemon/${query}`);
    return response.data;
};
