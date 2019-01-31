import {
    GET_ARTISTS,
    GET_ALBUMS,
    SEARCH_TRACKS_BY_ARTIST_NAME
} from '../actions/artists'

const initialState = {
    artists: [],
    albums: [],
    tracks: []
};

export default (state = initialState, action) => {
    switch(action.type){
        case GET_ARTISTS:
            state = Object.assign({}, state, {
                artists: action.artists
            })
            return state
        case GET_ALBUMS:
            state = Object.assign({}, state, {
                albums: action.albums
            })
            return state
        case SEARCH_TRACKS_BY_ARTIST_NAME:
            state = Object.assign({}, state, {
                tracks: action.tracks
            })
            return state
        default:
            return state
    }
}