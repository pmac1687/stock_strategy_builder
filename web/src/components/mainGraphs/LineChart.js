import React from 'react';
import {XAxis, YAxis, Legend, ResponsiveContainer, LineChart, Line} from 'recharts'

import { connect } from "react-redux";


const mapStateToProps = state => {
  return { 
    stratStockData: state.stratStockData,
   };
};

function ConnectedCardLineChart(props){
  	return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart width={100} height={100} data={props.stratStockData} margin={{top: 50, right: 5, bottom: 5, left: 5}}>
          <XAxis dataKey='date' />
          <YAxis />
          <Legend />
          <Line type="linear" dataKey="close" stroke="#8884d8" strokeWidth={2} dot={false}/>
        </LineChart>
      </ResponsiveContainer>
    );
}

const CardLineChart = connect(
  mapStateToProps,
  )(ConnectedCardLineChart);

export default CardLineChart;

