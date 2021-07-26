import React, { useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { connect } from "react-redux";


const mapStateToProps = state => {
  return { 
    stratStockData: state.stratStockData,
    graphCount: state.graphCount
   };
};

function ConnectedRSIChart(props) {
  const heights = [
    '0%',
    '0%',
    '33%',
    '25%',
    '20%',
    '16%',
    '14%',
    '12.5%'
  ];

  
  
  return (
    <ResponsiveContainer width="100%" height={heights[props.graphCount]}>
      <LineChart width={300} height={100} data={props.stratStockData}>
        <Tooltip />
        <Legend />
        <XAxis dataKey='date' />
        <YAxis />
        <Line type="monotone" dataKey="rsi_6" stroke="#8884d8" strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}

const RSIChart = connect(
  mapStateToProps,
  )(ConnectedRSIChart);

export default RSIChart;