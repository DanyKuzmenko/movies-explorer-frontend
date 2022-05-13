import './App.css';
import {Switch, Route} from "react-router-dom";
import Main from '../Main/Main';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';

function App() {
    return (
        <Switch>
            <Route path="/signin">

            </Route>
            <Route path="/signup">

            </Route>
            <Route path="/movies">
                <Header />
                <Movies />
                <Footer />
            </Route>
            <Route path="/saved-movies">

            </Route>
            <Route path="/profile">

            </Route>
            <Route path="/">
                <Header/>
                <Main/>
                <Footer />
            </Route>
        </Switch>
    );
}

export default App;
