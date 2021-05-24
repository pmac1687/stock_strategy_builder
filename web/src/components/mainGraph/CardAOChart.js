import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { addBarData, } from "../../js/actions/index";


const mapStateToProps = state => {
  return { 
    stratStockData: state.stratStockData,
   };
};

function ConnectedCardAOChart(props) {
  useEffect(() => {
    console.log(2)
  }, [props.stratStockData]);
  

  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart width={400} height={400} data={props.stratStockData}>
        <Bar dataKey="ao" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}

const CardAOChart = connect(
  mapStateToProps,
  )(ConnectedCardAOChart);

export default CardAOChart;


