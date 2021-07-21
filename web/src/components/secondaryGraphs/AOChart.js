import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import React, { useEffect } from "react";
import { connect } from "react-redux";


const mapStateToProps = state => {
  return { 
    stratStockData: state.stratStockData,
    graphCount: state.graphCount
   };
};

function ConnectedAOChart(props) {
  useEffect(() => {
    console.log(2)
  }, [props.stratStockData]);
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
      <BarChart width={400} height={400} data={props.stratStockData}>
        <XAxis dataKey='date' />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="ao" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}

const AOChart = connect(
  mapStateToProps,
  )(ConnectedAOChart);

export default AOChart;


