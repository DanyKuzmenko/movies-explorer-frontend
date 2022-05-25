import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList(props) {
    return (
        <section className="movies-card-list">
            <div className="movies-card-list__cards">
                <MoviesCard deleteCard={props.deleteCard} />
                <MoviesCard deleteCard={props.deleteCard} />
                <MoviesCard deleteCard={props.deleteCard} />
            </div>
            <button type="button" className={`${props.buttonPosition ? 'movies-card-list__button' : 'movies-card-list__button_hidden'}`}>Ещё</button>
        </section>
    );
}

export default MoviesCardList;
