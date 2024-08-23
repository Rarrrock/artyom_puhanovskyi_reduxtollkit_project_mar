import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PokemonPage from './pages/PokemonPage';
import FavoritesPage from "./pages/FavoritesPage";

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/pokemon/:id" element={<PokemonPage />} />
                <Route path="/favorites" element={<FavoritesPage />} />
            </Routes>
        </Router>
    );
};

export default App;