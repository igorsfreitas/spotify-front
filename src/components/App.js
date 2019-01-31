import React from 'react'
import ConnectedArtists from './Artists'
import ConnectedAlbum from './Album'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from "react-router-dom";
import { 
  handleGetSpotifyApplicationToken
} from '../actions/shared'

class App extends React.Component {
  componentDidMount () {
    const { dispatch } = this.props
    dispatch(handleGetSpotifyApplicationToken())
  }
  render() {
    if (this.props.loading !== false) {
      return <h3>Loading</h3>
    }

    return (
      <div>
        <Router>
          <div>
            <Route path="/album/:albumId" component={ConnectedAlbum} />
            <Route exact path="/" component={ConnectedArtists} />
          </div>
        </Router>
        
      </div>
    )
  }
}

export default connect((state) => ({
  loading: state.loading
}))(App)