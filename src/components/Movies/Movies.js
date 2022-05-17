import React from "react";
import './Movies.css';
import Navigation from "../Navigation/Navigation";
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies() {
    return (
        <main className="content">
            <Navigation />
            <SearchForm />
            <MoviesCardList />
        </main>
    );
}

export default Movies;
