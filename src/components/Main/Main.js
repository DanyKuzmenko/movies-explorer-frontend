import React from "react";
import './Main.css';
import Promo from './Promo/Promo';
import NabTab from './NavTab/NavTab';
import AboutProject from './AboutProject/AboutProject';
import Techs from "./Techs/Techs";
import AboutMe from './AboutMe/AboutMe';

function Main() {
    return (
        <main className="content">
            <Promo />
            <NabTab />
            <AboutProject />
            <Techs />
            <AboutMe />
        </main>
    )
}

export default Main;
