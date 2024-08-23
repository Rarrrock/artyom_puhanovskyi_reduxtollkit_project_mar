import React from 'react';
import { useNavigate } from 'react-router-dom';
import { goToHome } from '../../utils/api';

const HomePagination = () => {
    const navigate = useNavigate();

    return (
        <div style={{ marginTop: '20px' }}>
            <button onClick={goToHome(navigate)}>Home Page</button>
        </div>
    );
};

export default HomePagination;
