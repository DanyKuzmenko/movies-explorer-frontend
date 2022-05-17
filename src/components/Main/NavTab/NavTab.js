import './NavTab.css';
import { Link } from "react-router-dom";

function NavTab() {
    return (
        <div className="navtab">
            <Link className="navtab__link" to="/signup">Регистрация</Link>
            <Link to="/signin">
                <button className="navtab__button">Войти</button>
            </Link>
        </div>
    );
}

export default NavTab;
