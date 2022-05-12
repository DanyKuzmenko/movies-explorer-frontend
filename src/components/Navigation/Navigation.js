import './Navigation.css';
import {Link} from "react-router-dom";

function Navigation() {
    return (
        <section className="navigation">
            <div className="navigation__empty-block"></div>
            {/*добавил блок div, чтобы верстка нормально отображалась. Если просто добавить <></>,
            то не будет работать. Также добавил width=100px, чтобы фильмы были посередине*/}
            <div className="navigation__films">
                <Link className="navigation__film-link">Фильмы</Link>
                <Link className="navigation__film-link">Сохранённые фильмы</Link>
            </div>
            <Link className="navigation__account">
                <div className="navigation__account-logo" />
                <p className="navigation__account-text">Аккаунт</p>
            </Link>
        </section>
    );
}

export default Navigation;
