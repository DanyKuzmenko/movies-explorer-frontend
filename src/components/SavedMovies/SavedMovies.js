import React from "react";
import './SavedMovies.css';
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Navigation from "../Navigation/Navigation";
import SearchForm from "../SearchForm/SearchForm";

function SavedMovies(props) {
    return (
        <main className="content">
            <Navigation />
            <SearchForm />
            <MoviesCardList
                buttonPosition={false}
                deleteCard={true}
                savedFilms={props.savedFilms}
                deleteMovie={props.deleteMovie}
            />
        </main>
    );
}

export default SavedMovies;