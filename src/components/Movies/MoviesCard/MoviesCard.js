import './MoviesCard.css';
import cardImage from "../../../images/card.png";

function MoviesCard() {
    return (
            <div className="card">
                <img className="card__image" src={cardImage}/>
                <div className="card__container">
                    <div className="card__text-container">
                        <h3 className="card__title">33 слова о дизайне</h3>
                        <p className="card__duration">1ч42м</p>
                    </div>
                    <button type="button" className="card__button" />
                </div>
            </div>
    );
}

export default MoviesCard;
