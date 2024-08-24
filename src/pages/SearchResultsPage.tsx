import React, { useEffect } from 'react';
import { useAppSelector } from '../store/store';
import { selectPokemons } from '../features/pokemon/pokemonSlice';
import { useLocation } from 'react-router-dom';
import PokemonList from '../components/PokemonList'; // Компонент для отображения списка покемонов

const SearchResultsPage = () => {
    const pokemons = useAppSelector(selectPokemons); // Используем useAppSelector для получения покемонов из состояния
    const location = useLocation();

    // Получаем параметр query из строки запроса URL
    const query = new URLSearchParams(location.search).get('query');

    useEffect(() => {
        // Опционально: здесь можно добавить логику для выполнения поиска при монтировании компонента
    }, [query]);

    return (
        <div>
            <h2>Search Results for "{query}"</h2>
            <PokemonList pokemons={pokemons} /> {/* Используем ваш компонент PokemonList для отображения списка покемонов */}
        </div>
    );
};

export default SearchResultsPage;
