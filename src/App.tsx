import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import PokemonPage from './pages/PokemonPage';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/pokemon/:id" element={<PokemonPage />} />
            </Routes>
        </Router>
    );
};

export default App;