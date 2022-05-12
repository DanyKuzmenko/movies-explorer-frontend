import './NavTab.css';
import { Link } from "react-router-dom";

function NavTab() {
    return (
        <div className="navtab">
            <Link className="navtab__link">Регистрация</Link>
            <button className="navtab__button">Войти</button>
        </div>
    );
}

export default NavTab;
