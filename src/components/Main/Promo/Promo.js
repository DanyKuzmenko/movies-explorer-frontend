import React from "react";
import './Promo.css';
import promoImage from '../../../images/promoImage.svg';

function Promo() {
    return (
        <section className="promo">
            <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
            <div className="promo__image-container">
                <img className="promo__image" src={promoImage} />
            </div>
        </section>
    );
}

export default Promo;
