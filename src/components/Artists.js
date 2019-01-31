import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { MenuItem } from '@material-ui/core'

import moment from 'moment';
import ArtistsAlbumsFilter from './ArtistsAlbumsFilter'
import ArtistsAlbumsGraphic from './ArtistsAlbumsGraphic'
import ArtistTracks from './ArtistTracks'
import {
  handleGetArtists,
  handleGetArtistAlbuns,
  handleSearchTracksByArtist
} from '../actions/artists'

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
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
  playIcon: {
    height: 38,
    width: 38,
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
  }
})

class Artists extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    artist: '',
    year: ''
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(handleGetArtists(() => console.log(this.props.artists)))
  }

  componentDidUpdate(){
    console.log('proprieddes', this.props)
  }

  renderArtists = () => {
    if(this.props.artists && this.props.artists.length>0){
      return this.props.artists.map(artist=>{
        return <MenuItem key={artist.id} value={artist.id}>{artist.name}</MenuItem>
      })
    }
    return <MenuItem value="none">Sem items</MenuItem>
  }

  renderYears = () => {
    if(this.props.artistAlbums && this.props.artistAlbums.length>0){
      let years = this.props.artistAlbums.map(album=>{
        let year = album.release_date_precision==='day' ? moment(album.release_date,"YYYY-MM-DD").format("YYYY") : album.release_date
        return year
      })
      return years.filter((elem, pos, arr) => {
        return arr.indexOf(elem) == pos;
      }).map(year =>  <MenuItem key={year} value={year}>{year}</MenuItem>)
    }
    return <MenuItem value="none">Sem items</MenuItem>
  }

  getArtistAlbums = (name, artistId) => {
    if(name==='artist'){
      this.props.dispatch(handleGetArtistAlbuns(artistId, () => console.log(this.props.albums)))

      let selectedArtist = this.props.artists.filter(artist=>artist.id===artistId)
      this.props.dispatch(handleSearchTracksByArtist(selectedArtist[0].name, () => console.log(this.props.albums)))
    }
  }

  handleChange = name => event => {
    this.setState(
      { [name]: event.target.value, callValue:{} },
      this.getArtistAlbums(name, event.target.value)
    )
  };

  onBarClick = (e) => {
    this.setState({year: e.year})
  }

  groupTracksFromYearData = artistAlbums => {
    if(artistAlbums && artistAlbums.length>0){
      const albums = artistAlbums.map(album=>{
        album.year = moment(album.release_date,"YYYY-MM-DD").format("YYYY")
        return album
      })

      Array.prototype.groupBy = function(prop) {
        return this.reduce(function(groups, item) {
          const val = item[prop]
          groups[val] = groups[val] || []
          groups[val].push(item)
          return groups
        }, {})
      }
      const artistAlbumsGroupedByYear = artistAlbums.groupBy('year')
      const artistAlbumsGroupedByYearKeys = Object.keys(artistAlbumsGroupedByYear)
  
      let data = artistAlbumsGroupedByYearKeys.map(item => {
        return {
          year: item,
          total_tracks: artistAlbumsGroupedByYear[item].length>1 ? artistAlbumsGroupedByYear[item].reduce((prevVal, elem)=>{
            return prevVal.total_tracks ? prevVal.total_tracks + elem.total_tracks : prevVal + elem.total_tracks;
          }) : artistAlbumsGroupedByYear[item][0].total_tracks
        }
      })
      return data
    } else {
      return []
    }
  }

  render() {
    const { classes, theme } = this.props
    const graphicData = this.groupTracksFromYearData(this.props.artistAlbums)
    return (
      <div>
        <ArtistsAlbumsFilter 
          classes={classes}
          artist={this.state.artist}
          handleChange={this.handleChange.bind(this)}
          renderArtists={this.renderArtists.bind(this)}
          artistAlbums={this.props.artistAlbums}
          year={this.state.year}
          renderYears={this.renderYears.bind(this)}
        />

        {
          this.state.artist ? 
            <ArtistsAlbumsGraphic 
              classes={classes}
              data={graphicData}
              onClick={this.onBarClick.bind(this)}
              selectedYear={this.state.year}
            /> : null
        }

        {
          this.props.tracks && this.props.tracks.length>0 ?
          
            <ArtistTracks 
              classes={classes}
              tracks={this.props.tracks}
              selectedYear={this.state.year}
            /> : null
        }
        
      </div>
    )
  }
}

export default connect((state) => ({
  artists: state.artists.artists,
  artistAlbums: state.artists.albums,
  tracks: state.artists.tracks
}))(withStyles(styles, { withTheme: true })(Artists))