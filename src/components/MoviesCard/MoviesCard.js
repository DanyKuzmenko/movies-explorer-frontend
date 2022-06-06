import React from "react";
import './MoviesCard.css';

function MoviesCard(props) {
    const [buttonValue, setButtonValue] = React.useState(true);
    const [cardId, setCardId] = React.useState('');

    React.useEffect(() => { // эффект, который проверяет совпадает ли id у данной карточки с id у сохраненной карточки
                                    // и если оно совпадает, то меняется значение кнопки и сохраняется id этой карточки
        props.savedFilms.map((item) => {
            if (item.movieId === props.card.id) {
                setCardId(item._id);
                setButtonValue(!buttonValue);
            }
        })
    }, [props.savedFilms])

    function submitMovie() {
        if (buttonValue) {
            props.saveMovie(props.card, setCardId);
        } else {
            props.deleteMovie(cardId);
        }
    }

    function handleButtonClick() {
        submitMovie();
        setButtonValue(!buttonValue);
    }

    return (
            <div className="card">
                <img className="card__image" alt="Изображение фильма." src={`https://api.nomoreparties.co/${props.card.image.url}`}/>
                <div className="card__container">
                    <div className="card__text-container">
                        <h3 className="card__title">{props.card.nameRU}</h3>
                        <p className="card__duration">{props.card.duration}</p>
                    </div>
                    <button
                        className={`card__button ${props.deleteCard ? 'card__button_delete' : ''} ${buttonValue ? '' : 'card__button_active'}`}
                        onClick={handleButtonClick}
                    />
                </div>
            </div>
    );
}

export default MoviesCard;
