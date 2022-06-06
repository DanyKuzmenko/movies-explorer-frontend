import React from "react";
import './Login.css';
import {Link} from "react-router-dom";
import validator from "validator/es";

function Login(props) {
    const [emailValue, setEmailValue] = React.useState('');
    const [isEmailValid, setIsEmailValid] = React.useState(false);
    const [emailError, setEmailError] = React.useState('');
    const [passwordValue, setPasswordValue] = React.useState('');
    const [isPasswordValid, setIsPasswordValid] = React.useState(false);
    const [passwordError, setPasswordError] = React.useState('');
    const [isButtonActive, setIsButtonActive] = React.useState(false);
    const [buttonError, setButtonError] = React.useState('');

    React.useEffect(() => {
        if (isEmailValid && isPasswordValid) {
            setIsButtonActive(true);
        } else {
            setIsButtonActive(false);
        }
    }, [isEmailValid, isPasswordValid])

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

    function handleFormSubmit(e) {
        e.preventDefault();
        props.onLogin(emailValue, passwordValue, setButtonError);
    }


    return (
        <main className="content">
            <section className="login">
                <h2 className="login__title">Рады видеть!</h2>
                <form className="login__form" onSubmit={handleFormSubmit}>
                    <label className="login__label">E-mail</label>
                    <input
                        className="login__input"
                        type="email"
                        onChange={handleEmailInputChange}
                        value={emailValue || ''}
                        required
                    />
                    <span className="login__error">{emailError}</span>
                    <label className="login__label">Пароль</label>
                    <input
                        className="login__input"
                        type="password"
                        onChange={handlePasswordInputChange}
                        value={passwordValue || ''}
                        required
                    />
                    <span className="login__error">{passwordError}</span>
                    <span className="login__button-error">{buttonError}</span>
                    <button
                        className={`login__button ${isButtonActive ? '' : 'login__button_disabled'}`}
                    >Войти</button>
                </form>
                <p className="login__text">Ещё не зарегистрированы?
                    <Link className="login__link" to="/signup">Регистрация</Link>
                </p>
            </section>
        </main>
    );
}

export default Login;