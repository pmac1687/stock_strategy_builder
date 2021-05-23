import React from 'react';
import {XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line} from 'recharts'

const data = [
      {name: 'Week 1', max: 4000, min: 1400, error: [200, 1000]},
      {name: 'Week 2', max: 4000, min: 3400, errorNegative: [1000, 200]},
      {name: 'Week 3', max: 3200, min: 2400, errorNegative: [1000, 200]},
      {name: 'Week 4', max: 1000, min: 400, error: [200, 1000]},
      {name: 'Week 5', max: 2000, min: 1100, error: [200, 1000]},
      {name: 'Week 6', max: 3000, min: 400, error: [-200, 2000]},
      {name: 'Week 7', max: 500, min: -1000, error: [200, 2000]},
];
export default function CardCandleChart(){
  	return (
        <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    );
}

