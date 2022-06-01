import React from "react";
import './Movies.css';
import Navigation from "../Navigation/Navigation";
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import * as moviesApi from "../../utils/MoviesApi";
import Preloader from "./Preloader/Preloader";

function Movies(props) {
    const [films, setFilms] = React.useState([]);
    const [foundFilms, setFoundFilms] = React.useState([]);
    const [cardsLoad, setCardsLoad] = React.useState(false);

    React.useEffect(() => { // эффект, который берет все фильмы из API
        moviesApi.getMovies()
            .then((films) => {
                setFilms(films);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    React.useEffect(() => { // эффект, который достает найденные фильмы из хранилища
        if (localStorage.getItem('foundFilms')) {
            const localFilms = JSON.parse(localStorage.getItem('foundFilms'));
            setFoundFilms(localFilms);
            setCardsLoad(true);
        }
    }, [])

    function handleSearchSubmit(film, checked) { // функция, которая сохраняет нужный фильм
        let filterFilms = films.filter(item => item.nameRU === film);
        setFoundFilms(foundFilms.concat(filterFilms));
        localStorage.setItem('filmName', film);
        localStorage.setItem('foundFilms', JSON.stringify(foundFilms.concat(filterFilms)));
        localStorage.setItem('checkboxStatus', checked);
    }

    return (
        <main className="content">
            <Navigation />
            <SearchForm onSearch={handleSearchSubmit} />
            {localStorage.getItem('foundFilms') ?
                <MoviesCardList
                    buttonPosition={true}
                    foundFilms={foundFilms}
                    cardsLoad={cardsLoad}
                />
                : ''}
        </main>
    );
}

export default Movies;
