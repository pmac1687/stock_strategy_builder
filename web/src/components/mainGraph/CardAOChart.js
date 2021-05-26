import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { addBarData, } from "../../js/actions/index";


const mapStateToProps = state => {
  return { 
    stratStockData: state.stratStockData,
    graphCount: state.graphCount
   };
};

function ConnectedCardAOChart(props) {
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
        <Bar dataKey="ao" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}

const CardAOChart = connect(
  mapStateToProps,
  )(ConnectedCardAOChart);

export default CardAOChart;


