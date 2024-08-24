import React, { useState } from 'react';
import { useAppDispatch } from '../store/store';
import { searchPokemons } from '../features/pokemon/pokemonSlice';
import { useNavigate } from 'react-router-dom'; // Импортируем hook для навигации

const Search = () => {
    const [query, setQuery] = useState('');
    const dispatch = useAppDispatch();
    const navigate = useNavigate(); // Используем hook для навигации

    // Функция обработки поиска при нажатии Enter
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            dispatch(searchPokemons(query)); // Отправка запроса на сервер
            navigate(`/search?query=${query}`); // Перенаправление на страницу результатов поиска
        }
    };

    return (
        <form onSubmit={handleSearch} className="search-form">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search Pokémon..."
                className="search-input"
            />
            <button type="submit" className="search-button">
                Search
            </button>
        </form>
    );
};

export default Search;
