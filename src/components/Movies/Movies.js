import React from "react";
import './Movies.css';
import Navigation from "../Navigation/Navigation";
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from "./Preloader/Preloader";

function Movies(props) {

    return (
        <main className="content">
            <Navigation />
            <SearchForm onSearch={props.onSearch} />
            {localStorage.getItem('foundFilms') ?
                <MoviesCardList
                    buttonPosition={true}
                    foundFilms={props.foundFilms}
                    cardsLoad={props.cardsLoad}
                    savedFilms={props.savedFilms}
                    saveMovie={props.saveMovie}
                    deleteMovie={props.deleteMovie}
                />
                : ''}
        </main>
    );
}

export default Movies;
