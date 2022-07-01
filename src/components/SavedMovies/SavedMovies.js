import React from "react";
import './SavedMovies.css';
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Navigation from "../Navigation/Navigation";
import SearchForm from "../SearchForm/SearchForm";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";
import SearchError from "../SearchError/SearchError";

function SavedMovies(props) {
    return (
        <>
            <Header/>
            <main className="content">
                <Navigation/>
                <SearchForm
                    onSearch={props.onSearch}
                    submitCheckbox={props.submitCheckbox}
                    disabled={props.disabled}
                />
                {props.preloaderStatus ? <Preloader /> : ''}
                {!props.preloaderStatus && !props.searchError ?
                    <MoviesCardList
                        buttonPosition={false}
                        deleteCard={true}
                        savedFilms={props.savedFilms}
                        foundFilms={props.findFilm || props.savedFilms} // Условие, что если у нас есть найденный фильм, то показываем его,
                        // если нет, то показываем все сохранненые фильмы
                        deleteMovie={props.deleteMovie}
                        handleBackButtonClick={props.handleBackButtonClick}
                        findFilmStatus={props.findFilm}
                    />
                    : ''}
                {props.searchError && !props.preloaderStatus ?
                    <SearchError
                        handleBackButtonClick={props.handleBackButtonClick}
                        searchError={props.searchError}
                    />
                    : ''}
            </main>
            <Footer/>
        </>

    );
}

export default SavedMovies;