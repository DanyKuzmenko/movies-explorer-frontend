import './SearchForm.css';

function SearchForm() {
    return (
        <section className="search-form">
            <form className="search-form__form">
                <div className="search-form__input-logo" />
                <input
                    className="search-form__input"
                    type="text"
                    placeholder="Фильм"
                />
                <button className="search-form__button" />
                <label className="search-form__checkbox-label">
                    <input type="checkbox" className="search-form__invisible-checkbox" />
                    <span className="search-form__visible-checkbox" />
                </label>
                <p className="search-form__text">Короткометражки</p>
            </form>
        </section>
    );
}

export default SearchForm;