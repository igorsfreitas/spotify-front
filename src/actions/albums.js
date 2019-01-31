export const GET_ALBUM = 'GET_ALBUM'
export const GET_ALBUM_TRACKS = 'GET_ALBUM_TRACKS'

function getAlbum (album) {
    return {
        type: GET_ALBUM,
        album
    }
}

function getAlbumTracks (tracks) {
    return {
        type: GET_ALBUM_TRACKS,
        tracks
    }
}

function authHeader() {
    return { 
        'Authorization': `Bearer ${sessionStorage.getItem('spotify_token')}`
    }
}

export function handleGetAlbumDetails (albumId, cb) {
    return (dispatch) => {
        return fetch(`https://api.spotify.com/v1/albums/${albumId}`, {
            method: 'GET',
            headers: authHeader()
        }).then((data) => data.json())
        .then((album) => {
            dispatch(getAlbum(album))
            cb()
        }).catch((e) => {
            console.log('There was an error to get albums. Try again.', e)
        })
    }
}

export function handleGetAlbumTracks (albumId, cb) {
    return (dispatch) => {
        return fetch(`https://api.spotify.com/v1/albums/${albumId}/tracks`, {
            method: 'GET',
            headers: authHeader()
        }).then((data) => data.json())
        .then((tracks) => {
            dispatch(getAlbumTracks(tracks.items))
            cb()
        }).catch((e) => {
            console.log('There was an error to get the album tracks. Try again.', e)
        })
    }
}