import React from "react";
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import login from "../Login/Login";

function MoviesCardList(props) {
    const [maxEl, setMaxEl] = React.useState(12);
    const [visibleFilms, setVisibleFilms] = React.useState([]);

    React.useEffect(() => {
        setFilms();
    }, [props.foundFilms, maxEl])

    function setFilms() {
        let films = [];
        props.foundFilms.forEach((item, i) => {
            if (i < maxEl) {
                films.push(item);
            }
        })
        setVisibleFilms(films);
    }

    function handleButtonClick() {
        setMaxEl(maxEl + 4);
    }

    return (
        <section className="movies-card-list">
            <div className="movies-card-list__cards">
                {visibleFilms.map(item => (
                    <MoviesCard
                        cardImage={item.image.url}
                        name={item.nameRU}
                        duration={item.duration}
                        key={item.id}
                    />
                ))}
            </div>
            {props.foundFilms.length !== visibleFilms.length ?
                (<button
                    type="button"
                    className={`${props.buttonPosition ? 'movies-card-list__button' : 'movies-card-list__button_hidden'}`}
                    onClick={handleButtonClick}
                >Ещё</button>)
                : ''}
        </section>
    );
}

export default MoviesCardList;
