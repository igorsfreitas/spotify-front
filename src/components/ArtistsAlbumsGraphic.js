import React from 'react'
import { Grid, Paper } from '@material-ui/core';
import {BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

class ArtistsAlbumsGraphic extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Paper className={this.props.classes.paper}>
        <h3>PAINEL DE ÁLBUNS</h3>
        <Grid container spacing={16}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <BarChart width={950} height={300} data={this.props.data}
                  margin={{top: 20, right: 30, left: 20, bottom: 5}}>
              <CartesianGrid strokeDasharray="3 3"/>
              <XAxis dataKey="year"/>
              <YAxis/>
              <Tooltip/>
              <Legend />
              <Bar dataKey="total_tracks" stackId="a" onClick={this.props.onClick} >
                {
                  this.props.data.map((entry, index) => (
                    <Cell key={`cell-${index}`} stroke="#eee" fill={"lightyellow"} strokeWidth={entry.year === this.props.selectedYear ? 8 : 0}/>
                  ))
                }
              </Bar>
            </BarChart>
          </Grid>
        </Grid>
      </Paper>
    )
  }
}

export default ArtistsAlbumsGraphic