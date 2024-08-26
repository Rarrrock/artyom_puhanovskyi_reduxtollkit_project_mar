import React from 'react';
import { useNavigate } from 'react-router-dom';
import {goBack} from "../../utils/api";

const BackPagination: React.FC = () => {
    const navigate = useNavigate();
     return (
         <div style={{ marginTop: '20px' }}>
            <button onClick={goBack(navigate)}>Go Back</button>
        </div>
    );
};
export default BackPagination;