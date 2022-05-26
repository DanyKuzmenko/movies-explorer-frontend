import React from "react";
import './SearchForm.css';

function SearchForm(props) {

    function handleSubmit(e) {
        e.preventDefault();
    }

    return (
        <section className="search-form">
            <form className="search-form__form" onSubmit={handleSubmit}>
                <div className="search-form__container">
                    <div className="search-form__input-logo" />
                    <input
                        className="search-form__input"
                        type="text"
                        placeholder="Фильм"
                        required
                    />
                    <button
                        className="search-form__button"
                        type="submit"
                    />
                </div>
                <div className="search-form__checkbox-container">
                    <label className="search-form__checkbox-label">
                        <input
                            type="checkbox"
                            className="search-form__invisible-checkbox"
                        />
                        <span className="search-form__visible-checkbox" />
                    </label>
                    <p className="search-form__text">Короткометражки</p>
                </div>
            </form>
        </section>
    );
}

export default SearchForm;
