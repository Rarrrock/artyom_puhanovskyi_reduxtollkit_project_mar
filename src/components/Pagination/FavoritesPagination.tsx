import React from 'react';
import { useNavigate } from 'react-router-dom';
import {goToFavorites} from '../../utils/api';
const FavoritesPagination = () => {
    const navigate = useNavigate();
    return (
        <div style={{ marginTop: '20px' }}>
            <button onClick={goToFavorites(navigate)}>Favorites Page</button>
        </div>
    );
};
export default FavoritesPagination;
