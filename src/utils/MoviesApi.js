export const MOVIES_URL = 'https://api.nomoreparties.co/beatfilm-movies';

const getJson = (response) => {
    if (response.ok) {
        return response.json();
    } else {
        return console.log('Ошибка на сервере: ' + response.status + ' - ' + response.statusText);
    }
}

export const getMovies = () => {
    return fetch(`${MOVIES_URL}`)
        .then(getJson)
}

