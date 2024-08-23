// src/features/pokemon/pokemonForms.ts

import { fetchPokemonDetailsByName } from '../../utils/api';
import { EvolutionChain } from '../../models/types';

// Экспортируемая функция для получения форм покемона по имени
export const getPokemonFormsByName = async (name: string): Promise<string[]> => {
    try {
        // Используем функцию для получения данных о покемоне по имени
        const pokemonDetails = await fetchPokemonDetailsByName(name);

        // Проверяем, существуют ли формы у покемона и возвращаем их имена
        if (pokemonDetails && pokemonDetails.forms) {
            return pokemonDetails.forms.map((form: any) => form.name);
        }

        // Возвращаем пустой массив, если формы не найдены
        return [];
    } catch (error) {
        console.error('Ошибка при получении форм покемона:', error);
        return [];
    }
};
