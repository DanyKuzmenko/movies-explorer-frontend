import './App.css';
import React from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import Main from '../Main/Main';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import PageNotFound from "../PageNotFound/PageNotFound";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import * as moviesApi from "../../utils/MoviesApi";
import * as mainApi from "../../utils/MainApi";

function App() {
    const [films, setFilms] = React.useState([]);
    const [foundFilms, setFoundFilms] = React.useState([]);
    const [cardsLoad, setCardsLoad] = React.useState(false);
    const [savedFilms, setSavedFilms] = React.useState([]);
    const [currentUser, setCurrentUser] = React.useState([]);
    const history = useHistory();

    React.useEffect(() => {
        if (localStorage.getItem('jwt')) {
            mainApi.getUser()
                .then((res) => {
                    setCurrentUser(res);
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }, [])

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

    React.useEffect(() => { // эффект, который сохраняет сохраненные пользователем карточки
        mainApi.getMovies()
            .then((res) => {
                setSavedFilms(res.data);
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    function handleSearchSubmit(film, checked) { // функция, которая сохраняет нужный фильм
        let filterFilms = films.filter(item => item.nameRU === film);
        setFoundFilms(foundFilms.concat(filterFilms));
        localStorage.setItem('filmName', film);
        localStorage.setItem('foundFilms', JSON.stringify(foundFilms.concat(filterFilms)));
        localStorage.setItem('checkboxStatus', JSON.stringify(checked));
    }

    function saveMovie(movie, setCardId) { // в функцию сохранения фильма передаю не только сам фильм, но и
                                            // фукнцию обновления стейта
        mainApi.saveMovie(movie)
            .then((res) => {
                console.log(res);
                setCardId(res._id);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    function deleteMovie(movie) { // функция удаления фильма из сохраненных
        mainApi.deleteMovie(movie)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    function handleRegisterSubmit(name, email, password, setButtonError) { // функция регистрации пользователя. После регистрации сразу идет авторизация
        mainApi.createUser(name, email, password)
            .then(() => {
                return mainApi.authorize(email, password)
                    .then((res) => {
                        localStorage.setItem('jwt', res.message);
                        history.push('/movies');
                    })
            })
            .catch((err) => {
                if (err === 409) {
                    setButtonError('Такой пользователь уже зарегистрирован');
                } else {
                    setButtonError(err);
                }
            })
    }

    function handleLoginSubmit(email, password, setButtonError) { // функция авторизации пользователя
        mainApi.authorize(email, password)
            .then((res) => {
                localStorage.setItem('jwt', res.message);
                history.push('/movies');
                return mainApi.getUser() // тут сохраняем данные о пользователе
                    .then((res) => {
                        setCurrentUser(res);
                    })
            })
            .catch((err) => {
                if (err === 401) {
                    setButtonError('Неправильные почта или пароль');
                } else {
                    setButtonError(err);
                }
            })
    }

    function submitProfileForm(name, email, setButtonError, setActiveButton, setInputsValue) {
        mainApi.updateUser(name, currentUser.email)
            .then((res) => { // доделать бэк и сделать изменение почты
                setActiveButton(false);
                setInputsValue(true);
                console.log(res)
            })
            .catch((err) => {
                console.log(err);
                setButtonError(err);
            })
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <Switch>
                <Route exact path='/'>
                    <Header/>
                    <Main/>
                    <Footer/>
                </Route>
                <Route path='/signup'>
                    <Header
                        logoPosition={true}
                    />
                    <Register
                        onRegister={handleRegisterSubmit}
                    />
                </Route>
                <Route path='/signin'>
                    <Header
                        logoPosition={true}/>
                    <Login
                        onLogin={handleLoginSubmit}
                    />
                </Route>
                <Route path='/movies'>
                    <Header/>
                    <Movies
                        onSearch={handleSearchSubmit}
                        foundFilms={foundFilms}
                        cardsLoad={cardsLoad}
                        savedFilms={savedFilms}
                        saveMovie={saveMovie}
                        deleteMovie={deleteMovie}
                    />
                    <Footer/>
                </Route>
                <Route path='/saved-movies'>
                    <Header/>
                    <SavedMovies
                        savedFilms={savedFilms}
                        deleteMovie={deleteMovie}
                    />
                    <Footer/>
                </Route>
                <Route path='/profile'>
                    <Header/>
                    <Profile
                        onUpdate={submitProfileForm}
                    />
                </Route>
                <Route path='*'>
                    <PageNotFound />
                </Route>
            </Switch>
        </CurrentUserContext.Provider>
    );
}

export default App;
