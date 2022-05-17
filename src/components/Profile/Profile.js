import './Profile.css';
import Navigation from "../Navigation/Navigation";

function Profile() {
    return (
        <main className="content">
            <Navigation />
            <section className="profile">
                <h2 className="profile__title">Привет, Даниил!</h2>
                <div className="profile__info">
                    <div className="profile__text-container">
                        <h3 className="profile__data-title">Имя</h3>
                        <p className="profile__user-data">Даниил</p>
                    </div>
                    <div className="profile__text-container">
                        <h3 className="profile__data-title">E-mail</h3>
                        <p className="profile__user-data">dankuzmenko02@yandex.ru</p>
                    </div>
                </div>
                <div className="profile__container">
                    <button className="profile__button">Редактировать</button>
                    <button className="profile__button">Выйти из аккаунта</button>
                </div>
            </section>
        </main>
    );
}

export default Profile;