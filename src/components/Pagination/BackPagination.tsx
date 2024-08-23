import React from 'react';
import { useNavigate } from 'react-router-dom';
import { goBack } from '../../utils/api';

const BackPagination = () => {
    const navigate = useNavigate();

    return (
        <div>
            <button onClick={goBack(navigate)}>Go Back</button>
        </div>
    );
};

export default BackPagination;
