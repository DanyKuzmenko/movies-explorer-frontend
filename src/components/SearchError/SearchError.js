import React from "react";
import './SearchError.css';

function SearchError(props) {

    function handleBackButtonClick() {
        props.handleBackButtonClick();
    }

    return (
        <div className="search-error">
            <div
                className="search-error__back-button"
                onClick={handleBackButtonClick}
            />
            <p className="search-error_text">{props.searchError}</p>
        </div>
    );
}

export default SearchError;