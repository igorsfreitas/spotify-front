export const GET_ARTISTS = 'GET_ARTISTS'
export const GET_ALBUMS = 'GET_ALBUMS'
export const SEARCH_TRACKS_BY_ARTIST_NAME = 'SEARCH_TRACKS_BY_ARTIST_NAME'

function getArtists (artists) {
    return {
        type: GET_ARTISTS,
        artists
    }
}

function getAlbums (albums) {
    return {
        type: GET_ALBUMS,
        albums
    }
}

function searchTracksByArtist (tracks) {
    return {
        type: SEARCH_TRACKS_BY_ARTIST_NAME,
        tracks
    }
}

function authHeader() {
    return { 
        'Authorization': `Bearer ${sessionStorage.getItem('spotify_token')}`
    }
}

export function handleGetArtists (cb) {
    return (dispatch) => {
        return fetch('https://api.spotify.com/v1/artists?ids=0oSGxfWSnnOXhD2fKuz2Gy,3dBVyJ7JuOMt4GE9607Qin,3TVXtAsR1Inumwj472S9r4,3wyVrVrFCkukjdVIdirGVY,1w5Kfo2jwwIPruYS2UWh56,6eUKZXaKkcviH0Ku9w2n3V,04gDigrS5kc9YWfZHwBETP,6PAt558ZEZl0DmdXlnjMgD,53XhwfbYqKCa1cC15pYq2q,4gzpq5DPGxSnKTe4SA8HAU', {
            method: 'GET',
            headers: authHeader()
        }).then((data) => data.json())
        .then((artists) => {
            dispatch(getArtists(artists.artists))
            cb()
        }).catch((e) => {
            console.log('There was an error para pegar artistas. Try again.', e)
        })
    }
}

export function handleGetArtistAlbuns (artistId, cb) {
    return (dispatch) => {
        return fetch(`https://api.spotify.com/v1/artists/${artistId}/albums`, {
            method: 'GET',
            headers: authHeader()
        }).then((data) => data.json())
        .then((albums) => {
            dispatch(getAlbums(albums.items))
            cb()
        }).catch((e) => {
            console.log('There was an error para pegar albuns. Try again.', e)
        })
    }
}

export function handleSearchTracksByArtist (artistName, cb) {
    return (dispatch) => {
        return fetch(`https://api.spotify.com/v1/search?q=${artistName}&type=track`, {
            method: 'GET',
            headers: authHeader()
        }).then((data) => data.json())
        .then((tracks) => {
            dispatch(searchTracksByArtist(tracks.tracks.items))
            cb()
        }).catch((e) => {
            console.log('There was an error to find tracks by artist name. Try again.', e)
        })
    }
}