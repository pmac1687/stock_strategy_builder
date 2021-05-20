import React, { useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { connect } from "react-redux";
import { addBarData, } from "../../js/actions/index";


const mapStateToProps = state => {
  return { 
    stratStockData: state.stratStockData,
   };
};

function ConnectedCardBollChart(props) {
  useEffect(() => {
    console.log(2)
  }, [props.stratStockData]);
  

  
  return (
    <ResponsiveContainer width="100%" height="100%">
    <LineChart
      width={500}
      height={500}
      data={props.stratStockData}
      margin={{
        top: 10,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="1 1" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="boll" stroke="#8884d8" dot={false} />
      <Line type="monotone" dataKey="boll_ub" stroke="#82ca9d" dot={false}/>
      <Line type="monotone" dataKey="boll_lb" stroke="#82ca9d" dot={false} />
    </LineChart>
  </ResponsiveContainer>
  );
}

const CardBollChart = connect(
  mapStateToProps,
  )(ConnectedCardBollChart);

export default CardBollChart;