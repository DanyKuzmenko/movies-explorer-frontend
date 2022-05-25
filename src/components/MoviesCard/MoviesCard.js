import './MoviesCard.css';
import cardImage from "../../images/card.png";

function MoviesCard(props) {
    return (
            <div className="card">
                <img className="card__image" alt="Изображение фильма." src={cardImage}/>
                <div className="card__container">
                    <div className="card__text-container">
                        <h3 className="card__title">33 слова о дизайне</h3>
                        <p className="card__duration">1ч42м</p>
                    </div>
                    <button className={`card__button ${props.deleteCard ? 'card__button_delete' : ''}`} />
                </div>
            </div>
    );
}

export default MoviesCard;
