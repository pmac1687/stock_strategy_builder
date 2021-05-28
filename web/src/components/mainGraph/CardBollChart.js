import React, { useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { connect } from "react-redux";
import { addBarData, } from "../../js/actions/index";


const mapStateToProps = state => {
  return { 
    stratStockData: state.stratStockData,
    graphCount: state.graphCount
   };
};

function ConnectedCardBollChart(props) {
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

const CardBollChart = connect(
  mapStateToProps,
  )(ConnectedCardBollChart);

export default CardBollChart;