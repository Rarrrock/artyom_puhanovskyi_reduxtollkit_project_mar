import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate, Link } from 'react-router-dom'; // Импорт Link
import { getPokemonDetails, selectPokemonDetails } from '../features/pokemon/pokemonSlice';
import { addFavorite, removeFavorite, selectFavorites } from '../features/favorites/favoritesSlice';
import { useAppDispatch } from '../store/store';
import { PokemonListProps } from "../models/types";
import { getPokemonFormsByName } from "../features/pokemon/pokemonForms";
import { getPokemonIdByName} from "../features/pokemon/pokemonSlice";

const PokemonDetails: React.FC<PokemonListProps> = ({ pokemons }) => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const favorites = useSelector(selectFavorites);
    const pokemonDetails = useSelector(selectPokemonDetails);

    // Локальное состояние для хранения форм покемона
    const [pokemonForms, setPokemonForms] = useState<string[]>([]);

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

    useEffect(() => {
        const fetchForms = async () => {
            if (pokemonDetails?.name) {
                try {
                    const forms = await getPokemonFormsByName(pokemonDetails.name);
                    setPokemonForms(forms); // Устанавливаем формы в состояние
                } catch (error) {
                    console.error("Error fetching pokemon forms:", error);
                }
            }
        };

        fetchForms();
    }, [pokemonDetails]);
    if (!pokemonDetails) {
        return <div>Loading...</div>;
    }

    const handleFormClick = async (formName: string) => {
        const formId = await getPokemonIdByName(formName); // Получаем ID формы покемона по его имени
        if (formId) {
            navigate(`/pokemon/${formId}`); // Переход к странице покемона по ID
        } else {
            console.error(`Could not find ID for form: ${formName}`);
        }
    };

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
            <h2>Stats:</h2>
            <ul>
                {pokemonDetails.stats.map((stat: any) => (
                    <li key={stat.stat.name}>{stat.stat.name}</li>
                ))}
            </ul>
            <h2>Forms:</h2>
            <ul>
                {pokemonForms.map((form, index) => (
                    <li key={index}>
                        <a href="#" onClick={() => handleFormClick(form)}>{form}</a> {/* Кликабельная ссылка для формы */}
                    </li>
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
