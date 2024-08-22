import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import { fetchPokemons, fetchPokemonDetails, searchPokemonsByName } from '../../utils/api';

interface PokemonState {
    pokemons: any[];
    pokemonDetails: any | null;
    status: 'idle' | 'loading' | 'failed';
}

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

export default pokemonSlice.reducer;
