import React from "react";
import './Header.css';
import headerLogo from '../../images/headerLogo.svg';

function Header() {
    return (
        <header className="header">
            <img className="header__logo" src={headerLogo} />
        </header>
    );
}

export default Header;
