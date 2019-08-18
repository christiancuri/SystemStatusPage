import React, { Component } from "react";

import Chart from "react-apexcharts";

export default class LineChart extends Component {
  constructor(props) {
    super(props);
    console.log(props);

    this.state = {
      options: props.options,
      series: props.series
    };
  }

  render() {
    return (
      <div>
        <Chart
          options={this.state.options}
          series={this.state.series}
          type='line'
          height='350'
        />
      </div>
    );
  }
}
