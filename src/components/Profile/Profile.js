import React from "react";
import './Profile.css';
import Navigation from "../Navigation/Navigation";

function Profile() {
    return (
        <main className="content">
            <Navigation/>
            <section className="profile">
                <h2 className="profile__title">Привет, Даниил!</h2>
                <form className="profile__form">
                    <div className="profile__inputs-container">
                        <input className="profile__input" placeholder="Имя"/>
                        <label className="profile__label">Даниил</label>
                    </div>
                    <div className="profile__inputs-container">
                        <input className="profile__input" placeholder="E-mail"/>
                        <label className="profile__label">dankuzmenko02@yandex.ru</label>
                    </div>
                    <button type='submit' className='profile__form-button'>Редактировать</button>
                    {/*изменение кнопки при нажатии решил сделать, когда буду делать функциональность,
                    поэтому стили для кнопки еще не делал*/}
                </form>
                <button className='profile__button'>Выйти из аккаунта</button>
            </section>
        </main>
    );
}

export default Profile;