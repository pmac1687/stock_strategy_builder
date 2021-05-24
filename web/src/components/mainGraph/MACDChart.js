import React, { useEffect } from "react";
import { LineChart, Line,Bar, ResponsiveContainer } from 'recharts';
import { connect } from "react-redux";


const mapStateToProps = state => {
  return { 
    stratStockData: state.stratStockData,
   };
};

function ConnectedMACDChart(props) {
  useEffect(() => {
    console.log(2)
  }, [props.stratStockData]);
  

  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart width={300} height={100} data={props.stratStockData}>
        <Line type="monotone" dataKey="macd_value" stroke="#8884d8" strokeWidth={2} dot={false} />
        <Line type="monotone" dataKey="macd_signal" stroke="white" strokeWidth={2} dot={false} />
        <Bar dataKey="macd_h" fill="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
}

const MACDChart = connect(
  mapStateToProps,
  )(ConnectedMACDChart);

export default MACDChart;