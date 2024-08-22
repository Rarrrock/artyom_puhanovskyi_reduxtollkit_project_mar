import React, { useState } from 'react';
import { useAppDispatch } from '../store/store';
import { searchPokemons } from '../features/pokemon/pokemonSlice';

const Search = () => {
    const [query, setQuery] = useState('');
    const dispatch = useAppDispatch();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            dispatch(searchPokemons(query));
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
