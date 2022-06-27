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
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import ProfilePopup from "../ProfilePopup/ProfilePopup";

function App() {
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [films, setFilms] = React.useState([]); // Стейт всех фильмов
    const [foundFilms, setFoundFilms] = React.useState([]); // Стейт найденных пользователем фильмов
    const [savedFilms, setSavedFilms] = React.useState([]); // Стейт сохраненных пользователем фильмов
    const [currentUser, setCurrentUser] = React.useState([]);
    const history = useHistory();
    const [preloaderStatus, setPreloaderStatus] = React.useState(false);
    const [findFilm, setFindFilm] = React.useState(''); // Это отдельный стейт для найденного фильма среди сохраненных
    const [copyOfSavedFilms, setCopyOfSavedFilms] = React.useState([]); // Стейт, который хранит копию сохраненных фильмов
    const [checkboxStatus, setCheckboxStatus] = React.useState(true); // Стейт, который определяет можно использовать чекбокс или нет.
    // Если пользователь еще не искал фильмы, то чекбокс будет заблокирован
    const [searchError, setSearchError] = React.useState('');
    const [isPopupOpen, setIsPopupOpen] = React.useState(false);

    React.useEffect(() => { // эффект, который проверяет вошел ли пользователь и устанавливает его данные в стейт
        if (localStorage.getItem('jwt')) {
            mainApi.getUser()
                .then((res) => {
                    setCurrentUser(res);
                    setLoggedIn(true);
                })
                .catch((err) => {
                    setSearchError(err); // Сделал один обработчик ошибки для всего
                })
        }
    }, [])

    React.useEffect(() => { // эффект, который берет все фильмы из API
        moviesApi.getMovies()
            .then((films) => {
                setFilms(films);
            })
            .catch(() => {
                setSearchError('Во время запроса произошла ошибка. Возможно, проблема с соединением ' +
                    'или сервер недоступен. Подождите немного и попробуйте ещё раз');
            })
    }, [])

    React.useEffect(() => { // эффект, который достает найденные фильмы из хранилища
        if (localStorage.getItem('foundFilms') && localStorage.getItem('checkboxStatus')) {
            setCheckboxStatus(false); // Разрешаем использовать чекбокс для фильтрации фильмов
            const localFilms = JSON.parse(localStorage.getItem('foundFilms'));
            setFoundFilms(localFilms); // Сохраняем найденные фильмы
            const checkboxStatus = JSON.parse(localStorage.getItem('checkboxStatus'));
            handleCheckboxSubmit(checkboxStatus); // Устанавливаем последнее состояние чекбокса на странице фильмов
        }
    }, [])

    React.useEffect(() => { // эффект, который сохраняет сохраненные пользователем карточки
        if (!loggedIn) // Если пользователь не вошел в аккаунт, мы не отправляем запрос
            return;
        mainApi.getMovies()
            .then((res) => {
                setSavedFilms(res.data);
                setCopyOfSavedFilms(res.data);
            })
            .catch((err) => {
                setSearchError(err);
            })
    }, [loggedIn])

    function handleSearchSubmit(film, checked) { // функция, которая сохраняет нужный фильм
        setSearchError('');
        setPreloaderStatus(true);
        let filterFilms = films.filter(item => item.nameRU.toLowerCase() === film.toLowerCase());
        if (filterFilms.length === 0) {
            setTimeout(() => setPreloaderStatus(false), 1000); // Таймер нужен, чтобы можно было увидеть загрузку
            setSearchError('Ничего не найдено');
        } else {
            setCheckboxStatus(false); // Разрешаем использование чекбокса после того как нашли фильм
            localStorage.setItem('filmName', film);
            localStorage.setItem('foundFilms', JSON.stringify(foundFilms.concat(filterFilms)));
            localStorage.setItem('checkboxStatus', JSON.stringify(checked));
            setFoundFilms(foundFilms.concat(filterFilms));
            setTimeout(() => setPreloaderStatus(false), 1000); // Таймер нужен, чтобы можно было увидеть загрузку
        }
    }

    function handleSavedMoviesSearchSubmit(film, checked) { // функция, которая ищет нужный фильм среди сохраненных
        setSearchError('');
        setPreloaderStatus(true);
        let findFilm = savedFilms.filter(item => item.nameRU.toLowerCase() === film.toLowerCase());
        if (findFilm.length === 0) {
            setTimeout(() => setPreloaderStatus(false), 1000); // Таймер нужен, чтобы можно было увидеть загрузку
            setSearchError('Ничего не найдено');
        } else {
            localStorage.setItem('filmNameSavedMovies', film);
            localStorage.setItem('checkboxStatusSavedFilms', JSON.stringify(checked));
            setTimeout(() => setPreloaderStatus(false), 1000); // Таймер нужен, чтобы можно было увидеть загрузку
            setFindFilm(findFilm); // Здесь мы сохраняем найденный фильм в стейт и передаем в сохраненные фильмы
        }
    }

    function handleCheckboxSubmit(checkbox) { // функция, которая фильтрует фильмы в зависимости от состояния чекбокса
        let filteredFilms;
        let films = JSON.parse(localStorage.getItem('foundFilms')); // Тут берем наши найденные фильмы
        if (checkbox) { // В зависимости от состояния чекбокса фильтруем их
            filteredFilms = films.filter(item => item.duration <= 40);
        } else if (!checkbox) {
            filteredFilms = films;
        }
        setFoundFilms(filteredFilms); // Записываем их в найденные фильмы
        localStorage.setItem('checkboxStatus', JSON.stringify(checkbox));
    }

    function handleSavedMoviesCheckboxSubmit(checkbox) { // функция, которая фильтрует сохраненные фильмы
        if (checkbox) { // В зависимости от состояния чекбокса фильтруем их
            setSavedFilms(savedFilms.filter(item => item.duration <= 40));
        } else if (!checkbox) {
            setSavedFilms(copyOfSavedFilms);
        }
        localStorage.setItem('checkboxStatusSavedFilms', JSON.stringify(checkbox));
    }

    function handleBackButtonClick() {
        const films = JSON.parse(localStorage.getItem('foundFilms'));
        setPreloaderStatus(true);
        setTimeout(() => setPreloaderStatus(false), 1000); // Таймер нужен, чтобы можно было увидеть загрузку
        setFoundFilms(films);
        setSearchError('');
    }

    function handleSavedFilmsBackButtonClick() { // функция, которая возвращает все сохраненные фильмы при клике на кнопку
        setPreloaderStatus(true);
        setTimeout(() => setPreloaderStatus(false), 1000); // Таймер нужен, чтобы можно было увидеть загрузку
        setSearchError('');
        setFindFilm(''); // Здесь мы очищаем найденный фильм и тогда высвечиваются сохраненные фильмы
    }

    function saveMovie(movie, setCardId) { // в функцию сохранения фильма передаю не только сам фильм, но и
                                            // фукнцию обновления стейта
        mainApi.saveMovie(movie)
            .then((res) => {
                setCardId(res._id);
                setSavedFilms(savedFilms.concat(res));
                setCopyOfSavedFilms(copyOfSavedFilms.concat(res));
            })
            .catch((err) => {
                setSearchError(err);
            })
    }

    function deleteMovie(movie) { // функция удаления фильма из сохраненных
        mainApi.deleteMovie(movie)
            .then((res) => {
                setSavedFilms(savedFilms.filter(item => item._id !== res._id));
                setCopyOfSavedFilms(copyOfSavedFilms.filter(item => item._id !== res._id));
            })
            .catch((err) => {
                setSearchError(err);
            })
    }

    function handleRegisterSubmit(name, email, password, setButtonError) { // функция регистрации пользователя. После регистрации сразу идет авторизация
        mainApi.createUser(name, email, password)
            .then(() => {
                return mainApi.authorize(email, password)
                    .then((res) => {
                        localStorage.setItem('jwt', res.message);
                        setLoggedIn(true);
                        history.push('/movies');
                        return mainApi.getUser() // тут сохраняем данные о пользователе
                            .then((res) => {
                                setCurrentUser(res);
                            })
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
                setLoggedIn(true);
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

    function handleSubmitProfileForm(name, email, setButtonError, setActiveButton, setInputsValue, setNameValue, setEmailValue) {
        // Функция сабмита профиля
        mainApi.updateUser(name, email)
            .then((res) => {
                setIsPopupOpen(true); // Открываем попап, еслит профиль успешно изменен
                setActiveButton(false); // Делаем кнопку редактирования неактивной
                setInputsValue(true); // Блокируем возможность вводить что-либо в инпуты
                setCurrentUser(res); // Сохраняем измененные данные пользователя
                setNameValue(''); // Сбрасываем значения полей инпутов
                setEmailValue('');
            })
            .catch((err) => {
                if (err === 409) {
                    setButtonError('Пользователь с таким email уже существует');
                } else {
                    setButtonError(err);
                }
            })
    }

    function handleCloseProfilePopup() { // Функция закрытия попапа редактирования профиля
        setIsPopupOpen(false);
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <Switch>
                <Route exact path='/'>
                    <Header/>
                    <Main
                        loggedIn={loggedIn}
                    />
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
                <ProtectedRoute
                    path='/movies'
                    component={Movies}
                    loggedIn={loggedIn}
                    onSearch={handleSearchSubmit}
                    foundFilms={foundFilms}
                    savedFilms={savedFilms}
                    saveMovie={saveMovie}
                    deleteMovie={deleteMovie}
                    preloaderStatus={preloaderStatus}
                    submitCheckbox={handleCheckboxSubmit}
                    disabled={checkboxStatus} // Здесь передаем разрешение на использование чекбокса
                    searchError={searchError}
                    handleBackButtonClick={handleBackButtonClick}
                />
                <ProtectedRoute
                    path='/saved-movies'
                    component={SavedMovies}
                    onSearch={handleSavedMoviesSearchSubmit}
                    loggedIn={loggedIn}
                    savedFilms={savedFilms}
                    deleteMovie={deleteMovie}
                    preloaderStatus={preloaderStatus}
                    findFilm={findFilm} // Это найденный фильм
                    submitCheckbox={handleSavedMoviesCheckboxSubmit}
                    disabled={checkboxStatus} // Здесь передаем разрешение на использование чекбокса
                    searchError={searchError}
                    handleBackButtonClick={handleSavedFilmsBackButtonClick}
                />
                <ProtectedRoute
                    path='/profile'
                    component={Profile}
                    loggedIn={loggedIn}
                    onUpdate={handleSubmitProfileForm}
                    setLoggedIn={setLoggedIn}
                    setSavedFilms={setSavedFilms}
                />
                <Route path='*'>
                    <PageNotFound />
                </Route>
            </Switch>
            <ProfilePopup
                isPopupOpen={isPopupOpen}
                onClose={handleCloseProfilePopup}
            />
        </CurrentUserContext.Provider>
    );
}

export default App;
