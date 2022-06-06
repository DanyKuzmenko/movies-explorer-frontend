import React from "react";
import './SearchForm.css';

function SearchForm(props) {
    const [inputData, setInputData] = React.useState('');
    const [checked, setCheckbox] = React.useState(false);
    const [isValid, setValidity] = React.useState(false);
    const [error, setError] = React.useState('');

    React.useEffect(() => { // эффект, который устанавливает значения полей input и checkbox, если они сохранены в памяти
        if (localStorage.getItem('filmName')) {
            setInputData(localStorage.getItem('filmName'));
            setCheckbox(JSON.parse(localStorage.getItem('checkboxStatus')));
        }
    }, [])

    function handleInputChange(e) {
        const input = e.target;
        setInputData(input.value);
        setValidity(input.validity.valid);
        setError(''); // Ошибки очищаются при вводе чего либо
    }

    function handleCheckboxChange() {
        setCheckbox(!checked);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (isValid) {
            props.onSearch(inputData, checked);
        } else {
            setError('Нужно ввести ключевое слово');
        }
    }

    return (
        <section className="search-form">
            <form className="search-form__form" onSubmit={handleSubmit} noValidate>
                <div className="search-form__container">
                    <div className="search-form__input-logo" />
                    <input
                        className="search-form__input"
                        type="text"
                        placeholder="Фильм"
                        required
                        name="film"
                        value={inputData || ''}
                        onChange={handleInputChange}
                    />
                    <span className="search-form__error">{error}</span>
                    <button
                        className="search-form__button"
                        type="submit"
                    />
                </div>
                <div className="search-form__checkbox-container">
                    <label className="search-form__checkbox-label">
                        <input
                            type="checkbox"
                            checked={checked}
                            onChange={handleCheckboxChange}
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
