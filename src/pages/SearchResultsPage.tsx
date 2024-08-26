import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { selectPokemons, searchPokemons, selectTotalResults } from '../features/pokemon/pokemonSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import Pagination from '../components/Pagination/Pagination';
import BackPagination from '../components/Pagination/BackPagination';
import SearchForm from '../components/SearchForm';
import { Link } from 'react-router-dom';

const SearchResultsPage = () => {
    const dispatch = useAppDispatch();
    const pokemons = useAppSelector(selectPokemons);
    const totalResults = useAppSelector(selectTotalResults);
    const location = useLocation();
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [query, setQuery] = useState('');
    const [filterType, setFilterType] = useState('');
    const [filterAbility, setFilterAbility] = useState('');
    const [totalPages, setTotalPages] = useState(1);

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

    useEffect(() => {
        // Устанавливаем общее количество страниц на основе количества покемонов (максимум 20 на странице)
        setTotalPages(Math.ceil(totalResults / 20));
    }, [totalResults]);

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

    console.log('Pokemons:', pokemons); // Отладка

    // Формирование строки запроса для заголовка
    const searchString = `${query ? `Name: "${query}"` : ''} ${filterType ? `Type: "${filterType}"` : ''} ${filterAbility ? `Ability: "${filterAbility}"` : ''}`.trim();

    // Ограничиваем количество отображаемых покемонов до 20 на текущей странице
    const paginatedPokemons = pokemons.slice((currentPage - 1) * 20, currentPage * 20);

    return (
        <div>
            <SearchForm onSearch={handleSearch} />
            <BackPagination />
            <button onClick={() => navigate('/')}>Home</button>
            <button onClick={() => navigate('/favorites')}>Favorites</button>
            <h2>
                Search Results for {searchString && searchString}
            </h2>
            {/* Убедитесь, что результаты отображаются */}
            <div>
                {totalResults === 0 ? (
                    <p>No pokemons found</p>
                ) : (
                    <p>Displaying {totalResults} pokemons</p> // Здесь показываем общее количество результатов
                )}
                <ul>
                    {paginatedPokemons.map((pokemon) => {
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
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
            <BackPagination />
        </div>
    );
};

export default SearchResultsPage;