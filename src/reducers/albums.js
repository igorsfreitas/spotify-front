import {
    GET_ALBUM,
    GET_ALBUM_TRACKS
} from '../actions/albums'

const initialState = {
    album: {},
    tracks: []
};

export default (state = initialState, action) => {
    switch(action.type){
        case GET_ALBUM:
            state = Object.assign({}, state, {
                album: action.album
            })
            return state
        case GET_ALBUM_TRACKS:
            state = Object.assign({}, state, {
                tracks: action.tracks
            })
            return state
        default:
            return state
    }
}