import React from "react";
import './Header.css';
import headerLogo from '../../images/headerLogo.svg';
import {Link} from "react-router-dom";

function Header(props) {
    return (
        <header className="header">
            <Link to="/">
                <img className={`header__logo ${props.logoPosition ? 'header__logo_auth' : ''}`} src={headerLogo} />
            </Link>
        </header>
    );
}

export default Header;
