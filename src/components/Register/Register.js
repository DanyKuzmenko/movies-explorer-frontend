import React from "react";
import './Register.css';
import { Link } from "react-router-dom";

function Register(props) {
    const [formData, setFormData] = React.useState({});

    function handleInputChange(e) {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }
    // функция, которая заносит данные в стейт, в зависимости от имени поля

    function handleSubmit(e) {
        e.preventDefault();
        props.onRegister(formData);
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
                        value={formData.name || ''}
                        onChange={handleInputChange}
                    />
                    {/*не делал placeholder для инпутов, потому что на макете не было*/}
                    <span className="register__error"></span>
                    <label className="register__label">E-mail</label>
                    <input
                        className="register__input"
                        required
                        type="email"
                        name="email"
                        value={formData.email || ''}
                        onChange={handleInputChange}
                    />
                    <span className="register__error"></span>
                    <label className="register__label">Пароль</label>
                    <input
                        className="register__input"
                        required
                        type="password"
                        name="password"
                        value={formData.password || ''}
                        onChange={handleInputChange}
                    />
                    <span className="register__error"></span>
                    <button
                        className="register__button"
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
