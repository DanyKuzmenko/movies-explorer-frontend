import React from "react";
import './Register.css';
import { Link } from "react-router-dom";

function Register() {
    return (
        <main className="content">
            <section className="register">
                <h2 className="register__title">Добро пожаловать!</h2>
                <form className="register__form">
                    <label className="register__label">Имя</label>
                    <input className="register__input"/>
                    {/*не делал placeholder для инпутов, потому что на макете не было*/}
                    <span className="register__error"></span>
                    <label className="register__label">E-mail</label>
                    <input className="register__input" type="email"/>
                    <span className="register__error"></span>
                    <label className="register__label">Пароль</label>
                    <input className="register__input" type="password"/>
                    <span className="register__error">Что -то пошло не так...</span>
                    <button className="register__button">Зарегистрироваться</button>
                </form>
                <p className="register__text">Уже зарегистрированы?
                    <Link className="register__link" to="/signin">Войти</Link>
                </p>
            </section>
        </main>
    );
}

export default Register;