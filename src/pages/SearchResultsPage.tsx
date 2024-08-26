import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { selectPokemons, searchPokemons, selectTotalResults } from '../features/pokemon/pokemonSlice';
import { useLocation} from 'react-router-dom';
import Pagination from '../components/Pagination/Pagination';
import BackPagination from '../components/Pagination/BackPagination';
import SearchForm from '../components/SearchForm';
import PokemonList from '../components/PokemonList';
import HomePagination from "../components/Pagination/HomePagination";
import FavoritesPagination from "../components/Pagination/FavoritesPagination";

const SearchResultsPage = () => {
    const dispatch = useAppDispatch();
    const pokemons = useAppSelector(selectPokemons);
    const totalResults = useAppSelector(selectTotalResults);
    const location = useLocation();
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

        if (query || type || ability) {
            dispatch(searchPokemons({ query, type, ability, page: currentPage }));
        }
    }, [dispatch, location.search, currentPage]);

    useEffect(() => {
        setTotalPages(Math.ceil(totalResults / 20));
    }, [totalResults]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const searchString = `${query ? `Name: "${query}"` : ''} ${filterType ? `Type: "${filterType}"` : ''} ${filterAbility ? `Ability: "${filterAbility}"` : ''}`.trim();

    const paginatedPokemons = pokemons.slice((currentPage - 1) * 20, currentPage * 20);

    return (
        <div>
            <SearchForm />
            <BackPagination />
            <HomePagination/>
            <FavoritesPagination/>
            <h2>
                Search Results for {searchString && searchString}
            </h2>
            <div>
                {totalResults === 0 ? (
                    <p>No pokemons found</p>
                ) : (
                    <p>Displaying {totalResults} pokemons</p>
                )}
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
                <PokemonList pokemons={paginatedPokemons} />
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
