import React, { useEffect } from "react";
import { LineChart, Line,Bar, ResponsiveContainer, XAxis, YAxis, Legend, Tooltip, ComposedChart } from 'recharts';
import { connect } from "react-redux";


const mapStateToProps = state => {
  return { 
    stratStockData: state.stratStockData,
    graphCount: state.graphCount
   };
};

function ConnectedMACDChart(props) {
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
  useEffect(() => {
    console.log(2)
  }, [props.stratStockData]);
  

  
  return (
    <ResponsiveContainer width="100%" height={heights[props.graphCount]}>
      <ComposedChart width={300} height={100} data={props.stratStockData}>
        <XAxis dataKey='date' />
        <YAxis />
        <Legend />
        <Tooltip />
        <Line type="monotone" dataKey="macd_value" stroke="#8884d8" strokeWidth={2} dot={false} />
        <Line type="monotone" dataKey="macd_signal" stroke="white" strokeWidth={2} dot={false} />
        <Bar dataKey="macd_h" fill="#8884d8" />
      </ComposedChart>
    </ResponsiveContainer>
  );
}

const MACDChart = connect(
  mapStateToProps,
  )(ConnectedMACDChart);

export default MACDChart;