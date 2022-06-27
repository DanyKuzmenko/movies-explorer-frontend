import React from "react";
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import {useLocation} from "react-router-dom";

function MoviesCardList(props) {
    const [maxEl, setMaxEl] = React.useState(12);
    const [visibleFilms, setVisibleFilms] = React.useState([]);
    const [width, setWidth] = React.useState(1280);
    const location = useLocation();

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
        if (location.pathname === '/saved-movies') {
            setMaxEl(101);
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

    function onSubscribe() { // добавил ограничение по времени, чтобы не перегружать приложение
        window.addEventListener('resize', function () {
            setTimeout(handleSubscribe, 1000);
        });
    }

    function offSubscribe() {
        window.removeEventListener('resize', function () {
            setTimeout(handleSubscribe, 1000);
        });
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

    function handleButtonClick() { // в зависимости от разрешения экрана, добавляется различное количество фильмов
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

    function handleBackButtonClick() {
        props.handleBackButtonClick();
    }

    return (
        <section className="movies-card-list">
            {props.findFilmStatus ?
                <div
                    className="movies-card-list__back-button"
                    onClick={handleBackButtonClick}
                />
                : ''}
            <div className="movies-card-list__cards">
                {visibleFilms.map(item => (
                    <MoviesCard
                        card={item}
                        key={item.id || item._id}
                        savedFilms={props.savedFilms}
                        saveMovie={props.saveMovie}
                        deleteMovie={props.deleteMovie}
                        deleteCard={props.deleteCard}
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
