import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Grid, Paper, Typography, Chip } from '@material-ui/core'
import ArtistTracks from './ArtistTracks'
import moment from 'moment'

import {
  handleGetAlbumDetails,
  handleGetAlbumTracks
} from '../actions/albums'

const styles = theme => ({
  card: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    padding: `0 ${theme.spacing.unit * 3}px`,
  },
  paper: {
    maxWidth: 1000,
    margin: `${theme.spacing.unit}px auto`,
    padding: theme.spacing.unit * 2,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  chip: {
    margin: theme.spacing.unit,
  }
})

class Album extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    artist: '',
    year: ''
  }

  componentDidMount(){
    const { dispatch } = this.props
    const { albumId } = this.props.match.params
    dispatch(handleGetAlbumDetails(albumId, () => console.log(this.props.album)))
  }

  render() {
    const { album } = this.props
    return (
      <div>
        <Paper className={this.props.classes.paper}>
          
          <Typography variant="h2" color='secondary'>
                {
                  album.artists ? album.artists.map(artist=>artist.name+" / ") : null
                }
          </Typography>
          <h2>{album.name} - {moment(album.release_date,"YYYY-MM-DD").format("DD/MM/YYYY")}</h2>
          <Chip
            label={album.popularity>65 ? 'Alta Popularidade' : album.popularity>35 ? 'Média Popularidade' : 'Baixa Popularidade'}
            className={this.props.classes.chip}
            color="primary"
          />
        </Paper>
        {
          album.tracks && album.tracks.items && album.tracks.items.length>0 ?
            <ArtistTracks 
              classes={this.props.classes}
              tracks={album.tracks.items}
              
            /> : null
        }
      </div>
    )
  }
}

export default connect((state) => ({
  album: state.album.album,
  tracks: state.album.tracks
}))(withStyles(styles, { withTheme: true })(Album))