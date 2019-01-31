import React from 'react'
import { Grid, Paper, Card, CardContent, Typography, CardMedia, TextField } from '@material-ui/core';
import { Link, withRouter } from "react-router-dom";
import moment from 'moment';

class ArtistTracks extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    findMusic: ''
  }

  renderTracks = (classes) => {
    return this.props.tracks
      .filter(track=>{
        if(this.props.selectedYear){
          if(track.album.release_date_precision==='day'){
            return moment(track.album.release_date,"YYYY-MM-DD").format("YYYY")===this.props.selectedYear
          }else if(track.album.release_date_precision==='year'){
            return track.album.release_date===this.props.selectedYear
          }
        }
        return true
      })
      .filter(track => (
        this.state.findMusic ? track.name.toLowerCase().includes(this.state.findMusic.toLowerCase()): true
      ))
      .map(track => (
        <Grid key={track.id} item lg={4} md={4} sm={6} xs={12}>
          <Link to={track.album ? `/album/${track.album.id}` : '/'} style={{ textDecoration: 'none' }} >
            <Card className={classes.card}>
              <div className={classes.details}>
                <CardContent className={classes.content}>
                  <Typography component="h5" variant="h5">
                    {track.name.substr(0, 25)}
                    {
                      track.name.length < 13 ?  <span><br /><br /></span> : null
                    }
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    {track.album ? track.album.name.substr(0, 18) : track.name}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Track {track.track_number}
                  </Typography>
                  <Typography variant="subtitle2" color='primary'>
                    {
                      track.popularity>65 ? 'Alta Popularidade' : track.popularity>35 ? 'Média Popularidade' : track.popularity ? 'Baixa Popularidade' : null
                    }
                  </Typography>
                  <br />
                  {
                    track.explicit ? <img src="https://pngimage.net/wp-content/uploads/2018/06/18-icon-png-3.png" height="30"/> 
                      : <span><br /><br /></span>
                  }
                </CardContent>
              </div>
              {
                track.album ?
                <CardMedia
                  className={classes.cover}
                  image={track.album.images[0].url}
                  title={track.album.name}
                /> : null
              }
              
            </Card>
          </Link>
        </Grid>
    ))
  }

  changeMusicFilter = name => event => {
    console.log(event.target.value)
    this.setState({ [name]: event.target.value, callValue:{} })
  }

  render() {
    const { classes } = this.props
    return (
      <Paper className={classes.paper}>
        
        <Grid container spacing={16}>
          <Grid item lg={9} md={9} sm={6} xs={12}>
            <h3>TODAS AS MÚSICAS</h3> 
          </Grid>
          <Grid item lg={3} md={3} sm={6} xs={12}>
            <TextField
              id="filled-name"
              label="Buscar música"
              name="findMusic"
              value={this.state.findMusic}
              onChange={this.changeMusicFilter('findMusic')}
              margin="normal"
              variant="filled"
            />
          </Grid>
        </Grid>
        <Grid container spacing={16}>
          {this.renderTracks(classes)}
        </Grid>
      </Paper>
    )
  }
}

export default withRouter(ArtistTracks)