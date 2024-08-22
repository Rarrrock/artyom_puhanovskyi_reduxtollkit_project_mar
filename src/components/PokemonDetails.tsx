import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { getPokemonDetails, selectPokemonDetails } from '../features/pokemon/pokemonSlice';
import { addFavorite, removeFavorite, selectFavorites } from '../features/favorites/favoritesSlice';
import { useAppDispatch } from '../store/store';
import { PokemonListProps } from "../models/types";

const PokemonDetails: React.FC<PokemonListProps> = ({ pokemons }) => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate(); // Хук для навигации
    const location = useLocation(); // Хук для получения текущего URL
    const favorites = useSelector(selectFavorites);
    const pokemonDetails = useSelector(selectPokemonDetails);
    const pokemon = pokemons[0];

    const isFavorite = favorites.some(pokemon => pokemon.id === pokemonDetails?.id);

    const handleFavoriteToggle = () => {
        if (pokemonDetails) {
            if (isFavorite) {
                dispatch(removeFavorite(pokemonDetails.id));
            } else {
                dispatch(addFavorite(pokemonDetails));
            }
        }
    };

    const handleFavoritesClick = () => {
        navigate('/favorites'); // Перенаправление на страницу Favorites
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
                {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
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
