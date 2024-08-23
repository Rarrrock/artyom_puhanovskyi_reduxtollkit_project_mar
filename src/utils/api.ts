import axios from 'axios';
import React from "react";

const API_URL = 'https://pokeapi.co/api/v2';

export const fetchPokemons = async (page: number) => {
    const response = await axios.get(`${API_URL}/pokemon`, {
        params: {
            limit: 10,
            offset: (page - 1) * 10,
        },
    });
    return response.data.results.map((pokemon: any) => ({
        ...pokemon,
        id: pokemon.url.split('/').filter(Boolean).pop(), // Извлечение ID из URL
    }));
};

export const getTotalPages = async () => {
    const response = await axios.get(`${API_URL}/pokemon`, {
        params: {
            limit: 10,
            offset: 0,
        },
    });
    const totalPokemons = response.data.count;
    const totalPages = Math.ceil(totalPokemons / 10);
    return totalPages;
};

export const fetchPokemonDetails = async (id: number) => {
    const response = await axios.get(`${API_URL}/pokemon/${id}`);
    return response.data;
};

export const fetchPokemonDetailsByName = async (name: string) => {
    const response = await axios.get(`${API_URL}/pokemon/${name}`);
    return response.data;
};

export const searchPokemonsByName = async (query: string) => {
    const response = await axios.get(`${API_URL}/pokemon/${query}`);
    return response.data;
};

// Функция для получения общего числа страниц
export const fetchTotalPages = async (setTotalPages: React.Dispatch<React.SetStateAction<number>>) => {
    const pages = await getTotalPages();
    setTotalPages(pages);
};

// Функции для смены страницы
export const goToFirstPage = (handlePageChange: (newPage: number) => void) => () => handlePageChange(1);
export const goToPreviousPage = (handlePageChange: (newPage: number) => void, currentPage: number) => () => handlePageChange(currentPage - 1);
export const goToNextPage = (handlePageChange: (newPage: number) => void, currentPage: number) => () => handlePageChange(currentPage + 1);
export const goToLastPage = (handlePageChange: (newPage: number) => void, totalPages: number) => () => handlePageChange(totalPages);
export const goToCurrentPage = (handlePageChange: (newPage: number) => void, currentPage: number) => () => handlePageChange(currentPage);

// Функции для навигации
export const goToFavorites = (navigate: (path: string) => void) => () => navigate('/favorites');
export const goToHome = (navigate: (path: string) => void) => () => navigate('/');
export const goBack = (navigate: (delta: number) => void) => () => navigate(-1);
