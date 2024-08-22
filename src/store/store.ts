import { configureStore } from '@reduxjs/toolkit';
import pokemonReducer from '../features/pokemon/pokemonSlice';
import favoritesReducer from '../features/favorites/favoritesSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
    reducer: {
        pokemon: pokemonReducer,
        favorites: favoritesReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
