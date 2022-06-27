import React from "react";
import './Main.css';
import Promo from './Promo/Promo';
import NabTab from './NavTab/NavTab';
import AboutProject from './AboutProject/AboutProject';
import Techs from "./Techs/Techs";
import AboutMe from './AboutMe/AboutMe';
import Navigation from "../Navigation/Navigation";

function Main(props) {
    return (
        <main className="content">
            {
                props.loggedIn ? (
                    <Navigation
                        loggedIn={props.loggedIn}
                    />
                ) : (
                    <NabTab />
                )
            }
            <Promo />
            <AboutProject />
            <Techs />
            <AboutMe />
        </main>
    )
}

export default Main;
