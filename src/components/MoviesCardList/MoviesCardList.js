import React from "react";
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import login from "../Login/Login";

function MoviesCardList(props) {
    const [maxEl, setMaxEl] = React.useState(12);
    const [visibleFilms, setVisibleFilms] = React.useState([]);
    const [width, setWidth] = React.useState(1280);

    React.useEffect(() => { // эффект, который устанавливает начальное количество фильмов,
        // в зависимости от разрешения экрана
        handleSubscribe();
        if (width < 767) {
            setDefaultFilms(5);
        } else if (width < 1025) {
            setDefaultFilms(6)
        } else if (width < 1280) {
            setDefaultFilms(9);
        } else {
            setDefaultFilms(12);
        }
    }, [props.foundFilms, width])

    React.useEffect(() => { // эффект, который отслеживает максимальное количество фильмов и в зависимости
        // от значения, устанавливает видимые фильмы
        setFilms();
    }, [maxEl])

    React.useEffect(() => { // эффект, который отслеживает разрешение экрана
        onSubscribe();
        return () => offSubscribe;
    }, [])

    function handleSubscribe() { // функция, которая записывает разрешение экрана в переменную
        setWidth(window.innerWidth);
    }

    function onSubscribe() {
        window.addEventListener('resize', handleSubscribe);
    }

    function offSubscribe() {
        window.removeEventListener('resize', handleSubscribe);
    }

    function setDefaultFilms(count) { // функция, которая устанавливает начальное количество фильмов
        setMaxEl(count);
        let films = [];
        props.foundFilms.forEach((item, i) => {
            if (i < count) {
                films.push(item);
            }
        })
        setVisibleFilms(films);
    }

    function setFilms() { // функция, которая устанавливает новое количество фильмов
        let films = [];
        props.foundFilms.forEach((item, i) => {
            if (i < maxEl) {
                films.push(item);
            }
        })
        setVisibleFilms(films);
    }

    function handleButtonClick() {
        if (width < 768) {
            setMaxEl(maxEl + 5);
        } else if (width < 1025) {
            setMaxEl(maxEl + 2)
        } else if (width < 1280) {
            setMaxEl(maxEl + 3);
        } else {
            setMaxEl(maxEl + 4);
        }
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
