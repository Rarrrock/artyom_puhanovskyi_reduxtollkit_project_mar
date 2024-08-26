import React, { useState } from 'react';

interface SearchFormProps {
    onSearch: (query: string, type: string, ability: string) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
    const [query, setQuery] = useState('');
    const [type, setType] = useState('');
    const [ability, setAbility] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Search form submitted with:', { query, type, ability });
        onSearch(query, type, ability); // Выполняем поиск с текущими значениями полей ввода
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Search by Name"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <input
                type="text"
                placeholder="Search by Type"
                value={type}
                onChange={(e) => setType(e.target.value)}
            />
            <input
                type="text"
                placeholder="Search by Ability"
                value={ability}
                onChange={(e) => setAbility(e.target.value)}
            />
            <button type="submit">Search</button>
        </form>
    );
};

export default SearchForm;