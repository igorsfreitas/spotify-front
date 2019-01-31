import { combineReducers } from 'redux'

import loading from './loading'
import artistsReducer from './artists'
import albumReducer from './albums'

export default combineReducers({
    loading,
    artists: artistsReducer,
    album: albumReducer
})