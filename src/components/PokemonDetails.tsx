import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getPokemonDetails, selectPokemonDetails } from '../features/pokemon/pokemonSlice';
import { addFavorite, removeFavorite, selectFavorites } from '../features/favorites/favoritesSlice';
import { useAppDispatch } from '../store/store';
import { PokemonListProps } from "../models/types";

const PokemonDetails: React.FC<PokemonListProps> = ({ pokemons }) => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate(); // Хук для навигации
    const favorites = useSelector(selectFavorites);
    const pokemonDetails = useSelector(selectPokemonDetails);

    // Проверка, находится ли покемон в избранном
    const isFavorite = favorites.some(pokemon => pokemon.id === pokemonDetails?.id);

    // Функция для добавления или удаления покемона из избранного
    const handleFavoriteToggle = () => {
        if (pokemonDetails) {
            if (isFavorite) {
                dispatch(removeFavorite(pokemonDetails.id)); // Удаление из избранного по id
            } else {
                // Добавление в избранное всей информации о покемоне
                dispatch(addFavorite({
                    id: pokemonDetails.id,
                    name: pokemonDetails.name,
                    sprites: pokemonDetails.sprites, // Добавляем изображения покемона
                    types: pokemonDetails.types,
                    abilities: pokemonDetails.abilities,
                }));
            }
        }
    };

    const handleFavoritesClick = () => {
        navigate('/favorites'); // Перенаправление на страницу FavoritesPage
    };

    const handleBackClick = () => {
        navigate(-1); // Возвращение на предыдущую страницу
    };

    const handleHomeClick = () => {
        navigate('/'); // Перенаправление на домашнюю страницу
    };

    useEffect(() => {
        if (id) {
            dispatch(getPokemonDetails(Number(id)));
        }
    }, [dispatch, id]);

    if (!pokemonDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <button onClick={handleHomeClick}>Home</button>
            <h1>{pokemonDetails.name}</h1>
            <img src={pokemonDetails.sprites.front_default} alt={pokemonDetails.name} />
            <h2>Types:</h2>
            <ul>
                {pokemonDetails.types.map((type: any) => (
                    <li key={type.type.name}>{type.type.name}</li>
                ))}
            </ul>
            <h2>Abilities:</h2>
            <ul>
                {pokemonDetails.abilities.map((ability: any) => (
                    <li key={ability.ability.name}>{ability.ability.name}</li>
                ))}
            </ul>
            <button onClick={handleFavoriteToggle}>
                {isFavorite ? 'Remove from FavoritesPage' : 'Add to FavoritesPage'}
            </button>
            <div style={{ marginTop: '20px' }}>
                <button onClick={handleFavoritesClick}>Favorites</button>
            </div>
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
                <button onClick={handleBackClick}>Back</button>
            </div>
        </div>
    );
};

export default PokemonDetails;
