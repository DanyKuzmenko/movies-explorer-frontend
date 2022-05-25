import './App.css';
import React from "react";
import {Switch, Route} from "react-router-dom";
import Main from '../Main/Main';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import PageNotFound from "../PageNotFound/PageNotFound";

function App() {
    return (
        <Switch>
            <Route exact path='/'>
                <Header/>
                <Main/>
                <Footer/>
            </Route>
            <Route path='/signup'>
                <Header
                    logoPosition={true}/>
                <Register />
            </Route>
            <Route path='/signin'>
                <Header
                    logoPosition={true}/>
                <Login/>
            </Route>
            <Route path='/movies'>
                <Header/>
                <Movies/>
                <Footer/>
            </Route>
            <Route path='/saved-movies'>
                <Header/>
                <SavedMovies />
                <Footer/>
            </Route>
            <Route path='/profile'>
                <Header/>
                <Profile/>
            </Route>
            <Route path='*'>
                <PageNotFound />
            </Route>
        </Switch>
    );
}

export default App;
