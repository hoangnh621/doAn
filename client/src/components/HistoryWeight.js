import React, { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';


export default class Example extends PureComponent {

  render() {
    return (
        <BarChart
          width={700}
          height={300}
          data={this.props.dataWeight}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barSize={18}
        >
          <XAxis dataKey="name" scale="point" padding={{ left: 25, right: 10 }} stroke="#d0d2d6" />
          <YAxis stroke="#d0d2d6"/>
          <Tooltip />
          <Legend />
          <Bar dataKey="weight" fill="#8884d8"  />
          {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
        </BarChart>
    );
  }
}
