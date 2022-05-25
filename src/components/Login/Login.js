import React from "react";
import './Login.css';
import {Link} from "react-router-dom";

function Login() {
    return (
        <main className="content">
            <section className="login">
                <h2 className="login__title">Рады видеть!</h2>
                <form className="login__form">
                    <label className="login__label">E-mail</label>
                    <input className="login__input" type="email"/>
                    <span className="login__error"></span>
                    <label className="login__label">Пароль</label>
                    <input className="login__input" type="email"/>
                    <span className="login__error"></span>
                    <button className="login__button">Войти</button>
                </form>
                <p className="login__text">Ещё не зарегистрированы?
                    <Link className="login__link" to="/signup">Регистрация</Link>
                </p>
            </section>
        </main>
    );
}

export default Login;