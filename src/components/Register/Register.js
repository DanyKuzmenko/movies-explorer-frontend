import React from "react";
import './Register.css';
import { Link } from "react-router-dom";
import validator from "validator/es";

function Register(props) {
    const [nameValue, setNameValue] = React.useState('');
    const [isNameValid, setIsNameValid] = React.useState(false);
    const [nameError, setNameError] = React.useState('');
    const [emailValue, setEmailValue] = React.useState('');
    const [isEmailValid, setIsEmailValid] = React.useState(false);
    const [emailError, setEmailError] = React.useState('');
    const [passwordValue, setPasswordValue] = React.useState('');
    const [isPasswordValid, setIsPasswordValid] = React.useState(false);
    const [passwordError, setPasswordError] = React.useState('');
    const [isButtonActive, setIsButtonActive] = React.useState(false);
    const [buttonError, setButtonError] = React.useState('');

    React.useEffect(() => {
        if (isNameValid && isEmailValid && isPasswordValid) {
            setIsButtonActive(true);
        } else {
            setIsButtonActive(false);
        }
    }, [isNameValid, isEmailValid, isPasswordValid])

    function handleNameInputChange(e) {
        const input = e.target;
        setNameValue(input.value);
        setButtonError('');
        setIsNameValid(input.validity.valid);
        if (!isNameValid) {
            setNameError(input.validationMessage);
        } else {
            setNameError('');
        }
    }

    function handleEmailInputChange(e) {
        const input = e.target;
        setEmailValue(input.value);
        setButtonError('');
        setIsEmailValid(validator.isEmail(input.value));
        if (!isEmailValid) {
            setEmailError(input.validationMessage);
        } else {
            setEmailError('');
        }
    }

    function handlePasswordInputChange(e) {
        const input = e.target;
        setPasswordValue(input.value);
        setButtonError('');
        setIsPasswordValid(input.validity.valid);
        if (!isPasswordValid) {
            setPasswordError(input.validationMessage);
        } else {
            setPasswordError('');
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onRegister(nameValue, emailValue, passwordValue, setButtonError);
    }

    return (
        <main className="content">
            <section className="register">
                <h2 className="register__title">Добро пожаловать!</h2>
                <form className="register__form" onSubmit={handleSubmit}>
                    <label className="register__label">Имя</label>
                    <input
                        className="register__input"
                        required
                        name="name"
                        value={nameValue || ''}
                        onChange={handleNameInputChange}
                        pattern="[a-zA-Zа-яА-Я\-\s]{1,}" // поле содержит только кириллицу, латиницу, дефис или пробел
                        // также в паттерне пришлось оставить {1,}, потому что без него выдает ошибку.
                        // Если же сделать условие {2,30} то текст ошибки будет "Введите данные в указанном формате",
                        // вместо понятного "Текст должен быть не короче ..."
                        minLength="2"
                        maxLength="30"
                    />
                    {/*не делал placeholder для инпутов, потому что на макете не было*/}
                    <span className="register__error">{nameError}</span>
                    <label className="register__label">E-mail</label>
                    <input
                        className="register__input"
                        required
                        type="email"
                        name="email"
                        value={emailValue || ''}
                        onChange={handleEmailInputChange}
                    />
                    <span className="register__error">{emailError}</span>
                    <label className="register__label">Пароль</label>
                    <input
                        className="register__input"
                        required
                        type="password"
                        name="password"
                        value={passwordValue || ''}
                        onChange={handlePasswordInputChange}
                    />
                    <span className="register__error">{passwordError}</span>
                    <span className="register__button-error">{buttonError}</span>
                    <button
                        className={`register__button ${isButtonActive ? '' : 'register__button_disabled'}`}
                        type="submit"
                        aria-label="Зарегистрироваться."
                    >Зарегистрироваться</button>
                </form>
                <p className="register__text">Уже зарегистрированы?
                    <Link className="register__link" to="/signin">Войти</Link>
                </p>
            </section>
        </main>
    );
}

export default Register;
