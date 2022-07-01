import React from "react";
import './Profile.css';
import Navigation from "../Navigation/Navigation";
import {CurrentUserContext} from '../../contexts/CurrentUserContext';
import validator from "validator/es";
import {useHistory} from "react-router-dom";
import Header from "../Header/Header";

function Profile(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const [inputsValue, setInputsValue] = React.useState(true);
    const [activeButton, setActiveButton] = React.useState(false);
    const [nameValue, setNameValue] = React.useState('');
    const [isNameValid, setIsNameValid] = React.useState(false);
    const [isNameNew, setIsNameNew] = React.useState(false);
    const [nameError, setNameError] = React.useState('');
    const [emailValue, setEmailValue] = React.useState('');
    const [isEmailValid, setIsEmailValid] = React.useState(false);
    const [isEmailNew, setIsEmailNew] = React.useState(false);
    const [emailError, setEmailError] = React.useState('');
    const [isButtonActive, setIsButtonActive] = React.useState(false);
    const [buttonError, setButtonError] = React.useState('');
    const history = useHistory();

    React.useEffect(() => {
        if (isEmailValid && isNameValid) { // Сначала проверяем, что оба поля валидны
            if (isNameNew || isEmailNew) { // А потом проверяем, что хотя бы одно поле не совпадает со старым значением
                setEmailError('');
                setIsButtonActive(true);
            } else {
                setEmailError('Необходимо ввести новые данные');
                setIsButtonActive(false);
            }
        } else {
            setIsButtonActive(false);
        }
    }, [isEmailValid, isNameValid, isNameNew, isEmailNew])

    React.useEffect(() => {
        setNameValue(currentUser.name);
        setEmailValue(currentUser.email);
    }, [])

    function handleNameInputChange(e) {
        const input = e.target;
        setNameValue(input.value);
        setIsNameValid(input.validity.valid);
        setButtonError('');
        setIsNameNew(true);
        if (!isNameValid) {
            setNameError(input.validationMessage);
        } else {
            setNameError('');
        }
        if (input.value === currentUser.name) { // Проверяется условие, что новое имя пользователя не будет совпадать со старым
            setIsNameNew(false);
        }
    }

    function handleEmailInputChange(e) {
        const input = e.target;
        setEmailValue(input.value);
        setIsEmailValid(validator.isEmail(input.value));
        setButtonError('');
        setIsEmailNew(true);
        if (!isEmailValid) {
            setEmailError('Неправильный адрес электронной почты');
        } else {
            setEmailError('');
        }
        if (input.value === currentUser.email) {
            setIsEmailNew(false);
        }
    }

    function handleButtonClick() {
        setInputsValue(false);
        setActiveButton(true);
        setIsEmailValid(true); // Пришлось сделать поля валидными при нажатии кнопки. Это сделано для того, чтобы можно было
        setIsNameValid(true);  // изменить только одно поле, даже не трогая другое. Но минус в том, что сразу будет показана ошибка
                                    // "Необходимо ввести новые данные"
    }

    function submitForm(e) {
        e.preventDefault();
        props.onUpdate(nameValue, emailValue, setButtonError, setActiveButton, setInputsValue, setNameValue, setEmailValue);
    }

    function handleLogout() {
        localStorage.removeItem('jwt');
        history.push('/');
        props.setLoggedIn(false);
        props.setSavedFilms([]);
    }

    return (
        <>
            <Header />
            <main className="content">
                <Navigation/>
                <section className="profile">
                    <h2 className="profile__title">Привет, {currentUser.name}!</h2>
                    <form className="profile__form" onSubmit={submitForm}>
                        <div className="profile__inputs-container">
                            <input
                                className="profile__input"
                                disabled={inputsValue}
                                onChange={handleNameInputChange}
                                value={nameValue || ''}
                                pattern="[a-zA-Zа-яА-Я\-\s]{1,}"
                                minLength="2"
                                maxLength="30"
                                required
                            />
                            <span className="profile__error">{nameError}</span>
                            <label className="profile__label">{currentUser.name}</label>
                        </div>
                        <div className="profile__inputs-container">
                            <input
                                className="profile__input"
                                type="email"
                                disabled={inputsValue}
                                onChange={handleEmailInputChange}
                                value={emailValue || ''}
                                required
                            />
                            <span className="profile__error">{emailError}</span>
                            <label className="profile__label">{currentUser.email}</label>
                        </div>
                        {activeButton ?
                            <>
                                <span className="profile__submit-button-error">{buttonError}</span>
                                <button
                                    className={`profile__form-submit-button ${isButtonActive ? '' : 'profile__form-submit-button_disabled'}`}
                                    disabled={!isButtonActive}
                                    type="submit"
                                >Сохранить
                                </button>
                            </>
                            :
                            <button
                                type="button"
                                className='profile__form-button'
                                onClick={handleButtonClick}
                            >Редактировать</button>
                        }
                    </form>
                    {activeButton ? '' :
                        <button
                            className='profile__button'
                            onClick={handleLogout}
                        >Выйти из аккаунта</button>}
                </section>
            </main>
        </>
    );
}

export default Profile;