import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface SearchFormProps {
    onSearch?: (query: string, type: string, ability: string) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
    const [query, setQuery] = useState('');
    const [type, setType] = useState('');
    const [ability, setAbility] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const query = params.get('query') || '';
        const type = params.get('type') || '';
        const ability = params.get('ability') || '';

        setQuery(query);
        setType(type);
        setAbility(ability);
    }, [location.search]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Search form submitted with:', { query, type, ability });

        if (onSearch) {
            onSearch(query, type, ability);
        } else {
            const params = new URLSearchParams();
            if (query) params.append('query', query);
            if (type) params.append('type', type);
            if (ability) params.append('ability', ability);
            navigate(`/search?${params.toString()}`);
        }
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
