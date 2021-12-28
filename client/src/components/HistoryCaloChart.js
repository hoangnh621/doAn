import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';


export default class Example extends PureComponent {

  render() {
    return (
        <LineChart
          width={700}
          height={300}
          data={this.props.historyCalo}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="name" stroke="#d0d2d6" />
          <YAxis stroke="#d0d2d6"/>
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="done" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="goal" stroke="#82ca9d" />
        </LineChart>
    );
  }
}
