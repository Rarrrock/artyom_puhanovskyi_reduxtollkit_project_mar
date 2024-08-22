import axios from 'axios';

const API_URL = 'https://pokeapi.co/api/v2';

export const fetchPokemons = async (page: number) => {
    try {
        const response = await axios.get(`${API_URL}/pokemon?limit=20&offset=${(page - 1) * 20}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch Pokémon list');
    }
};

export const fetchPokemonDetails = async (id: number) => {
    try {
        const response = await axios.get(`${API_URL}/pokemon/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch Pokémon details');
    }
};