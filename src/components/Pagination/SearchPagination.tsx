import React from 'react';
import {goToSearch} from "../../utils/api";
import {useNavigate} from "react-router-dom";

const SearchPagination = () => {
    const navigate = useNavigate();
    return (
        <div style={{ marginTop: '20px' }}>
            <button onClick={goToSearch(navigate)}>Search Page</button>
        </div>
    );
};

export default SearchPagination;