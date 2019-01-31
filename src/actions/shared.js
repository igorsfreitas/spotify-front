import API from 'goals-todos-api'

export const RECEIVE_DATA = 'RECEIVE_DATA'

function receiveData (todos, goals) {
    return {
        type: RECEIVE_DATA,
        todos,
        goals
    }
}

function authHeader() {
    const hash = new Buffer(`9b52f4d2226641c5a0870ce3a1a95411:ae0a0680afb34664adbe334f848ff082`).toString('base64')
    return { 
        'Authorization': `Basic  ${hash}`,
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}

export function handleInitialData () {
    return (dispatch) => {
        return Promise.all([
            API.fetchTodos(),
            API.fetchGoals()
        ]).then(([todos, goals]) => {
            dispatch(receiveData(todos, goals, null))
        })
    }
}

export function handleGetSpotifyApplicationToken () {
    return (dispatch, getState) => {
        const state = getState()
        return fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: authHeader(),
            body: "grant_type=client_credentials"
        }).then((token) => token.json())
          .then(tokenData => {
            dispatch(receiveData([], []))
            sessionStorage.setItem('spotify_token', tokenData.access_token);
        })
    }
}