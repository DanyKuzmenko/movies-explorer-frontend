import React from "react";
import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({ component: Component, ...props }) {
    const [loggedIn, setLoggedIn] = React.useState(true);

    React.useEffect(() => { // Добавил проверку на токен, чтобы не происходил редирект
        if (!localStorage.getItem('jwt')) { // То есть, если пользователь не вошел, то ставим loggedIn = false
            setLoggedIn(false);
        }
    }, [])

    return (
        <Route>
            {
                () => loggedIn ? <Component {...props} /> : <Redirect to='/' />
            }
        </Route>
    )
}

export default ProtectedRoute;