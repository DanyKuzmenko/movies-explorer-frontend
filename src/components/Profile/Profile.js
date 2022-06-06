import React from "react";
import './Profile.css';
import Navigation from "../Navigation/Navigation";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import validator from "validator/es";

function Profile(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const [inputsValue, setInputsValue] = React.useState(true);
    const [activeButton, setActiveButton] = React.useState(false);
    const [nameValue, setNameValue] = React.useState('');
    const [isNameValid, setIsNameValid] = React.useState(false);
    const [nameError, setNameError] = React.useState('');
    const [emailValue, setEmailValue] = React.useState('');
    const [isEmailValid, setIsEmailValid] = React.useState(false);
    const [emailError, setEmailError] = React.useState('');
    const [isButtonActive, setIsButtonActive] = React.useState(false);
    const [buttonError, setButtonError] = React.useState('');

    React.useEffect(() => {
        if (isEmailValid && isNameValid) {
            setIsButtonActive(true);
        } else {
            setIsButtonActive(false);
        }
    }, [isEmailValid, isNameValid])

    function handleNameInputChange(e) {
        const input = e.target;
        setNameValue(input.value);
        if (input.value !== currentUser.name && input.validity.valid) {
            setIsNameValid(true)
        } else {
            setIsNameValid(false);
        }
        if (!isNameValid) {
                setNameError(input.validationMessage);
        } else {
            setNameError('');
        }
    }

    function handleEmailInputChange(e) {
        const input = e.target;
        setEmailValue(input.value);
        setIsEmailValid(validator.isEmail(input.value));
        if (!isEmailValid) {
            setEmailError(input.validationMessage);
        } else {
            setEmailError('');
        }
    }

    function handleButtonClick() {
        setInputsValue(false);
        setActiveButton(true);
    }

    function submitForm(e) {
        e.preventDefault();
        props.onUpdate(nameValue, emailValue, setButtonError, setActiveButton, setInputsValue);
    }

    return (
        <main className="content">
            <Navigation/>
            <section className="profile">
                <h2 className="profile__title">Привет, Даниил!</h2>
                <form className="profile__form" onSubmit={submitForm}>
                    <div className="profile__inputs-container">
                        <input
                            className="profile__input"
                            placeholder="Имя"
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
                            placeholder="E-mail"
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
                            >Сохранить</button>
                        </>
                        :
                        <button
                            type="button"
                            className='profile__form-button'
                            onClick={handleButtonClick}
                        >Редактировать</button>
                    }
                </form>
                {activeButton ? '' : <button className='profile__button'>Выйти из аккаунта</button>}
            </section>
        </main>
    );
}

export default Profile;