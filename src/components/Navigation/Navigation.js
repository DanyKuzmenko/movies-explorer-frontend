import React from "react";
import './Navigation.css';
import {Link, useLocation} from "react-router-dom";

function Navigation() {
    const location = useLocation();
    const [menuStatus, setMenuStatus] = React.useState(false);

    function menuButtonClick() {
        menuStatus ? setMenuStatus(false) : setMenuStatus(true);
    }

    return (
        <section className='navigation'>
            <div className={`navigation__wrapper ${menuStatus ? 'navigation__wrapper_mobile' : ''}`}>
                {/*пришлось добавить еще одну обертку, чтобы остальная часть (все, кроме бургерного меню) не двигалась*/}
                <div className={`navigation__container ${menuStatus ? 'navigation__container_mobile' : ''}`}>
                    <div className="navigation__empty-block"></div>
                    {/*добавил блок div, чтобы верстка нормально отображалась. Если просто добавить <></>,
            то не будет работать. Также добавил width=100px, чтобы фильмы были посередине*/}
                    <button
                        className={`navigation__close-button ${menuStatus ? 'navigation__close-button_mobile' : ''}`}
                        onClick={menuButtonClick}/>
                    <div className={`navigation__films ${menuStatus ? 'navigation__films_mobile' : ''} `}>
                        <Link className={`navigation__film-link ${menuStatus ? 'navigation__film-link_mobile' : ''}`}
                              to="/">Главная</Link>
                        <Link
                            className={`navigation__film-link ${menuStatus ? 'navigation__film-link_mobile' : ''} ${location.pathname === '/movies' ? 'navigation__film-link_active' : ''}`}
                            to="/movies">Фильмы</Link>
                        <Link
                            className={`navigation__film-link ${menuStatus ? 'navigation__film-link_mobile' : ''} ${location.pathname === '/saved-movies' ? 'navigation__film-link_active' : ''}`}
                            to="/saved-movies">Сохранённые фильмы</Link>
                    </div>
                    <Link className={`navigation__account ${menuStatus ? 'navigation__account_mobile' : ''}`}
                          to="/profile">
                        <div className="navigation__account-logo"/>
                        <p className="navigation__account-text">Аккаунт</p>
                    </Link>
                </div>
                <div
                    className={`navigation__burger-container ${menuStatus ? 'navigation__burger-container_disabled' : ''}`}>
                    <div className="navigation__burger-menu" onClick={menuButtonClick}/>
                </div>
            </div>
        </section>
    );
}

export default Navigation;
