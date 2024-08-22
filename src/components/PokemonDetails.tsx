import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPokemonDetails, selectPokemonDetails } from '../features/pokemon/pokemonSlice';
import { addFavorite, removeFavorite, selectFavorites } from '../features/favorites/favoritesSlice';
import { useAppDispatch } from '../store/store';
import {PokemonListProps} from "../models/types";

const PokemonDetails: React.FC<PokemonListProps> = ({ pokemons }) => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
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
        </div>
    );
};

export default PokemonDetails;
