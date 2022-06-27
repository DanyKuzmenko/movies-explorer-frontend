export const MAIN_URL = 'https://api.dankuzmenko.movies.nomoredomains.work';

const _checkResponse = (response) => {
    if (response.ok) {
        return response.json();
    }
    return Promise.reject(response.status);
}

const _getToken = () => {
    return `Bearer ${localStorage.getItem('jwt')}`;
}

export const getMovies = () => {
    return fetch(`${MAIN_URL}/movies`, {
        headers: {
            'Authorization': _getToken(),
        }
    })
        .then(_checkResponse)
}

export const saveMovie = (card) => {
    return fetch(`${MAIN_URL}/movies`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': _getToken(),
        },
        body: JSON.stringify({
            country: card.country,
            director: card.director,
            duration: card.duration,
            year: card.year,
            description: card.description,
            image: `https://api.nomoreparties.co/${card.image.url}`,
            trailerLink: card.trailerLink,
            thumbnail: `https://api.nomoreparties.co/${card.image.formats.thumbnail.url}`,
            movieId: card.id,
            nameRU: card.nameRU,
            nameEN: card.nameEN,
        })
    })
        .then(_checkResponse)
}

export const deleteMovie = (id) => {
    return fetch(`${MAIN_URL}/movies/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': _getToken(),
        }
    })
        .then(_checkResponse)
}

export const createUser = (name, email, password) => {
    return fetch(`${MAIN_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
    })
        .then(_checkResponse)
}

export const authorize = (email, password) => {
    return fetch(`${MAIN_URL}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then(_checkResponse)
}

export const getUser = () => {
    return fetch(`${MAIN_URL}/users/me`, {
        headers: {
            'Authorization': _getToken(),
        }
    })
        .then(_checkResponse)
}

export const updateUser = (name, email) => {
    return fetch(`${MAIN_URL}/users/me`, {
        method: 'PATCH',
        headers: {
            'Authorization': _getToken(),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email })
    })
        .then(_checkResponse)
}