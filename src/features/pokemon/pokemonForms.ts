import axios from 'axios';
import { fetchPokemonDetailsByName } from '../../utils/api';
import { EvolutionChain } from '../../models/types';

// Функция для получения всех форм покемона по его имени
export const getPokemonFormsByName = async (name: string) => {
    try {
        // 1. Получаем детали покемона по его имени
        const pokemonDetails = await fetchPokemonDetailsByName(name);

        // 2. Получаем идентификатор эволюционной цепочки из данных покемона
        const evolutionChainUrl = pokemonDetails.species.url;
        const speciesResponse = await axios.get(evolutionChainUrl);
        const evolutionChainId = speciesResponse.data.evolution_chain.url.split('/').filter(Boolean).pop();

        // 3. Получаем данные эволюционной цепочки по идентификатору
        const evolutionChainResponse = await axios.get(`https://pokeapi.co/api/v2/evolution-chain/${evolutionChainId}/`);
        const evolutionChainData: EvolutionChain = evolutionChainResponse.data.chain;

        // 4. Извлекаем все формы покемонов из данных эволюционной цепочки
        const forms = extractFormsFromEvolutionChain(evolutionChainData);

        return forms;
    } catch (error) {
        console.error('Error fetching pokemon forms:', error);
        return [];
    }
};

// Вспомогательная функция для извлечения всех форм покемонов из эволюционной цепочки
const extractFormsFromEvolutionChain = (chain: EvolutionChain): string[] => {
    const forms: string[] = [];

    const extractForms = (evolutionChain: EvolutionChain) => {
        forms.push(evolutionChain.species.name);

        // Рекурсивно обходим вложенные цепочки "evolves_to"
        evolutionChain.evolves_to.forEach((evolution) => {
            extractForms(evolution);
        });
    };

    extractForms(chain);

    return forms;
};
