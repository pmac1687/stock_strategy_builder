import React, { useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { connect } from "react-redux";
import { addBarData, } from "../../js/actions/index";


const mapStateToProps = state => {
  return { 
    stratStockData: state.stratStockData,
   };
};

function ConnectedCardRSIChart(props) {
  useEffect(() => {
    console.log(2)
  }, [props.stratStockData]);
  

  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart width={300} height={100} data={props.stratStockData}>
        <Line type="monotone" dataKey="rsi_6" stroke="#8884d8" strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}

const CardRSIChart = connect(
  mapStateToProps,
  )(ConnectedCardRSIChart);

export default CardRSIChart;