import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackPagination: React.FC = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1); // Переход на предыдущую страницу в истории
    };

    return (
        <div>
            <button onClick={handleGoBack}>Go Back</button>
        </div>
    );
};

export default BackPagination;