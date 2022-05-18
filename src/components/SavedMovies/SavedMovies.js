import './SavedMovies.css';
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Navigation from "../Navigation/Navigation";
import SearchForm from "../SearchForm/SearchForm";

function SavedMovies() {
    return (
        <main className="content">
            <Navigation />
            <SearchForm />
            <MoviesCardList deleteCard={true}/>
        </main>
    );
}

export default SavedMovies;