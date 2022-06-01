import './MoviesCard.css';

function MoviesCard(props) {
    return (
            <div className="card">
                <img className="card__image" alt="Изображение фильма." src={`https://api.nomoreparties.co/${props.cardImage}`}/>
                <div className="card__container">
                    <div className="card__text-container">
                        <h3 className="card__title">{props.name}</h3>
                        <p className="card__duration">{props.duration}</p>
                    </div>
                    <button className={`card__button ${props.deleteCard ? 'card__button_delete' : ''}`} />
                </div>
            </div>
    );
}

export default MoviesCard;
