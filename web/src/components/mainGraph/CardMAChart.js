import React, { useEffect } from "react";
import {
    ComposedChart,
    Line,
    LineChart,
    Area,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Scatter,
    ResponsiveContainer,
  } from 'recharts';
import { connect } from "react-redux";


const mapStateToProps = state => {
  return { 
    stratStockData: state.stratStockData,
   };
};

function ConnectedCardMAChart(props) {
  useEffect(() => {
    console.log(2)
  }, [props.stratStockData]);
  

  
  return (
    <ResponsiveContainer  width="100%" height="100%">
      <ComposedChart
        width={500}
        height={300}
        data={props.stratStockData}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid stroke="#f5f5f5" />
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

const CardMAChart = connect(
  mapStateToProps,
  )(ConnectedCardMAChart);

export default CardMAChart;