import React from "react";
import './Movies.css';
import Navigation from "../Navigation/Navigation";
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from "../Preloader/Preloader";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchError from "../SearchError/SearchError";

function Movies(props) {

    return (
        <>
            <Header />
            <main className="content">
                <Navigation />
                <SearchForm
                    onSearch={props.onSearch}
                    submitCheckbox={props.submitCheckbox}
                    disabled={props.disabled}
                />
                {props.preloaderStatus ? <Preloader /> : ''}
                {localStorage.getItem('foundFilms') && !props.preloaderStatus && !props.searchError ?
                    <MoviesCardList
                        buttonPosition={true}
                        foundFilms={props.foundFilms}
                        savedFilms={props.savedFilms}
                        saveMovie={props.saveMovie}
                        deleteMovie={props.deleteMovie}
                    />
                    : ''}
                {props.searchError && !props.preloaderStatus ?
                    <SearchError
                        handleBackButtonClick={props.handleBackButtonClick}
                        searchError={props.searchError}
                    />
                    : ''}
            </main>
            <Footer />
        </>
    );
}

export default Movies;
