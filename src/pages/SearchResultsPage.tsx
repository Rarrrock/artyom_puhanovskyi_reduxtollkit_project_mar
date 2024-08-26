import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { selectPokemons, searchPokemons } from '../features/pokemon/pokemonSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import Pagination from '../components/Pagination/Pagination';
import BackPagination from '../components/Pagination/BackPagination';
import SearchForm from '../components/SearchForm'; // Компонент формы поиска
import { Link } from 'react-router-dom';

const SearchResultsPage = () => {
    const dispatch = useAppDispatch();
    const pokemons = useAppSelector(selectPokemons);
    const location = useLocation();
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [query, setQuery] = useState('');
    const [filterType, setFilterType] = useState('');
    const [filterAbility, setFilterAbility] = useState('');

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const query = params.get('query') || '';
        const type = params.get('type') || '';
        const ability = params.get('ability') || '';

        setQuery(query);
        setFilterType(type);
        setFilterAbility(ability);

        // Выполняем поиск, если есть хотя бы один параметр
        if (query || type || ability) {
            dispatch(searchPokemons({ query, type, ability, page: currentPage }));
        }
    }, [dispatch, location.search, currentPage]);

    const handleSearch = (query: string, type: string, ability: string) => {
        // Устанавливаем параметры поиска в URL
        const params = new URLSearchParams();
        if (query) params.append('query', query);
        if (type) params.append('type', type);
        if (ability) params.append('ability', ability);
        navigate(`/search?${params.toString()}`);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    console.log('Pokemons:', pokemons); // Добавьте это для отладки

    return (
        <div>
            <SearchForm onSearch={handleSearch} />
            <BackPagination />
            <button onClick={() => navigate('/')}>Home</button>
            <button onClick={() => navigate('/favorites')}>Favorites</button>
            <h2>Search Results</h2>
            {/* Убедитесь, что результаты отображаются */}
            <div>
                {pokemons.length === 0 ? <p>No pokemons found</p> : <p>Displaying {pokemons.length} pokemons</p>}
                <ul>
                    {pokemons.map((pokemon) => {
                        const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
                        return (
                            <li key={pokemon.id}>
                                <Link to={`/pokemon/${pokemon.id}`}>
                                    <img
                                        src={imageUrl}
                                        alt={pokemon.name}
                                        className="pokemon-image"
                                        onError={(e) => {
                                            e.currentTarget.src = "/images/pokemon_def.jpg";
                                            console.error(`Failed to load image for ${pokemon.name} at ${imageUrl}`);
                                        }}
                                    />
                                    <p>{pokemon.name}</p>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={10} // Замените на фактическое значение
                onPageChange={handlePageChange}
            />
            <BackPagination />
        </div>
    );
};

export default SearchResultsPage;