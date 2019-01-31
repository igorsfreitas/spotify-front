import React from 'react'
import { Grid, Paper, TextField } from '@material-ui/core';

class ArtistsAlbumsFilter extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <Paper className={this.props.classes.paper}>
          <h3>FILTRO DOS ARTISTAS</h3>
          <Grid container spacing={16}>
            <Grid item lg={3} md={3} sm={6} xs={12}>
              <TextField
                id="artist-open-select"
                select
                label="Artistas"
                className={this.props.classes.textField}
                value={this.props.artist}
                onChange={this.props.handleChange('artist')}
                SelectProps={{
                    MenuProps: {
                      className: this.props.classes.menu,
                    },
                }}
                helperText="Selecione o Artista"
                margin="normal"
                >
                {this.props.renderArtists()}
              </TextField>
            </Grid>
            <Grid item lg={3} md={3} sm={6} xs={12}>
              <TextField
                id="year-open-select"
                select
                disabled={this.props.artistAlbums && this.props.artistAlbums.length<1}
                label="Período"
                className={this.props.classes.textField}
                value={this.props.year}
                onChange={this.props.handleChange('year')}
                SelectProps={{
                    MenuProps: {
                      className: this.props.classes.menu,
                    },
                }}
                helperText="Selecione o Ano"
                margin="normal"
                >
                {this.props.renderYears()}
              </TextField>
            </Grid>
          </Grid>
        </Paper>
    )
  }
}

export default ArtistsAlbumsFilter