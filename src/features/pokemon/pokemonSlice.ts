import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import {
    fetchPokemons,
    fetchPokemonDetails,
    searchPokemonsByName,
    fetchPokemonDetailsByName,
    API_URL
} from '../../utils/api';
import {EvolutionChain, Pokemon, PokemonState} from "../../models/types";
import axios from "axios";

const initialState: PokemonState = {
    pokemons: [],
    pokemonDetails: null,
    status: 'idle',
};

export const getPokemons = createAsyncThunk(
    'pokemon/fetchPokemons',
    async (page: number) => {
        const response = await fetchPokemons(page);
        return response;  // Возвращаем непосредственно массив покемонов
    }
);

export const getPokemonDetails = createAsyncThunk(
    'pokemon/fetchPokemonDetails',
    async (id: number) => {
        const response = await fetchPokemonDetails(id);
        return response;
    }
);

export const getPokemonDetailsByName = createAsyncThunk(
    'pokemon/fetchPokemonDetailsByName',
    async (name: string) => {
        const response = await fetchPokemonDetailsByName(name);
        return response;
    }
);

export const searchPokemons = createAsyncThunk(
    'pokemon/searchPokemons',
    async (query: string) => {
        const response = await searchPokemonsByName(query);
        return [response];  // Возвращаем в виде массива, чтобы соответствовать структуре данных
    }
);

export const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPokemons.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getPokemons.fulfilled, (state, action) => {
                state.status = 'idle';
                state.pokemons = action.payload;
            })
            .addCase(getPokemons.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(getPokemonDetails.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getPokemonDetails.fulfilled, (state, action) => {
                state.status = 'idle';
                state.pokemonDetails = action.payload;
            })
            .addCase(getPokemonDetails.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(searchPokemons.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(searchPokemons.fulfilled, (state, action) => {
                state.status = 'idle';
                state.pokemons = action.payload;
            })
            .addCase(searchPokemons.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export const selectPokemons = (state: RootState) => state.pokemon.pokemons;
export const selectPokemonDetails = (state: RootState) => state.pokemon.pokemonDetails;

export const getPokemonIdByName = async (name: string): Promise<number | undefined> => {
    try {
        // Сначала получаем данные о покемоне по имени
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const pokemonData = response.data;

        // Получаем URL для эволюционной цепочки из данных вида покемона
        const speciesResponse = await axios.get(pokemonData.species.url);
        const evolutionChainUrl = speciesResponse.data.evolution_chain.url;
        const evolutionChainId = evolutionChainUrl.split('/').filter(Boolean).pop();

        if (evolutionChainId) {
            // Используем функцию для получения всех имен покемонов из эволюционной цепочки
            const names = await getPokemonNameFromEvolv(Number(evolutionChainId));

            // Находим имя покемона в списке имен и возвращаем его ID
            if (names.includes(name.toLowerCase())) {
                return pokemonData.id;
            }
        }

        console.warn(`Pokemon with name "${name}" not found in the evolution chain.`);
        return undefined;
    } catch (error) {
        console.error('Error fetching pokemon ID by name:', error);
        return undefined;
    }
};

// Функция для получения всех форм покемона по идентификатору эволюционной цепочки
export const getPokemonNameFromEvolv = async (evolutionChainId: number): Promise<string[]> => {
    try {
        const response = await axios.get(`${API_URL}/evolution-chain/${evolutionChainId}/`);
        const evolutionChainData: EvolutionChain = response.data.chain;

        // Используем вспомогательную функцию для извлечения имен покемонов из цепочки эволюции
        return extractNamesFromEvolutionChain(evolutionChainData);
    } catch (error) {
        console.error('Error fetching evolution chain data:', error);
        return [];
    }
};

// Вспомогательная функция для извлечения всех имен покемонов из эволюционной цепочки
const extractNamesFromEvolutionChain = (chain: EvolutionChain): string[] => {
    const names: string[] = [];

    const extractNames = (evolutionChain: EvolutionChain) => {
        names.push(evolutionChain.species.name);

        // Рекурсивно обходим вложенные цепочки "evolves_to"
        evolutionChain.evolves_to.forEach((evolution) => {
            extractNames(evolution);
        });
    };

    extractNames(chain);

    return names;
};

export default pokemonSlice.reducer;
