import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';

interface FavoritesState {
    favorites: any[];
}

const initialState: FavoritesState = {
    favorites: [],
};

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        addFavorite: (state, action) => {
            state.favorites.push(action.payload);
        },
        removeFavorite: (state, action) => {
            state.favorites = state.favorites.filter(pokemon => pokemon.id !== action.payload);
        },
    },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;

export const selectFavorites = (state: RootState) => state.favorites.favorites;

export default favoritesSlice.reducer;
