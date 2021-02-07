import React, { Component } from 'react';
import { Grid } from "gridjs-react";


class Content extends Component {

  constructor() {
    super()
  
  }


  render() {
    const style = {
      table: {
        border: '1px solid #ccc'
      },
      th: {
        'background-color': 'rgba(0, 0, 0, 0.1)',
        color: '#000',
        'border-bottom': '1px solid #ccc',
        'text-align': 'center'
      },
      td: {
        'text-align': 'center',
        border: '1px solid #ccc'

      }
    }
    return (
      <Grid
        data={this.props.state.shownRows}
        columns={this.props.state.columnDefs}
        search={this.props.state.search}
        style={style}
      />
    )
  }
}


export default Content;
