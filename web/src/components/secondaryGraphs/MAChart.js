import React, { useEffect } from "react";
import {
    ComposedChart,
    Line,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
  } from 'recharts';
import { connect } from "react-redux";


const mapStateToProps = state => {
  return { 
    stratStockData: state.stratStockData,
    graphCount: state.graphCount
   };
};

function ConnectedMAChart(props) {
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
    <ResponsiveContainer  width="100%" height={heights[props.graphCount]}>
      <ComposedChart
        width={500}
        height={300}
        data={props.stratStockData}
      >
        <XAxis dataKey="date"  />
        <YAxis scale='auto'  />
        <Tooltip />
        <Legend />
        <Bar dataKey="ma_div" fill="#8884d8" />
        <Line type="monotone" dataKey="ma" stroke="#ff7300" dot={false}/>
        <Line type="monotone" dataKey="close" stroke="green" dot={false}/>
      </ComposedChart>
    </ResponsiveContainer>
  );
}

const MAChart = connect(
  mapStateToProps,
  )(ConnectedMAChart);

export default MAChart;