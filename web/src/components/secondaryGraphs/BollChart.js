import React, { useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { connect } from "react-redux";


const mapStateToProps = state => {
  return { 
    stratStockData: state.stratStockData,
    graphCount: state.graphCount
   };
};

function ConnectedBollChart(props) {
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
    <LineChart
      width={500}
      height={100}
      data={props.stratStockData}
    >
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="boll" stroke="white" dot={false} />
      <Line type="monotone" dataKey="boll_ub" stroke="green" dot={false}/>
      <Line type="monotone" dataKey="boll_lb" stroke="red" dot={false} />
    </LineChart>
  </ResponsiveContainer>
  );
}

const BollChart = connect(
  mapStateToProps,
  )(ConnectedBollChart);

export default BollChart;