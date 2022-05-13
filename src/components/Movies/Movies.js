import './Movies.css';
import Navigation from "../Navigation/Navigation";
import SearchForm from './SearchForm/SearchForm';

function Movies() {
    return (
        <main className="content">
            <Navigation />
            <SearchForm />
        </main>
    );
}

export default Movies;
