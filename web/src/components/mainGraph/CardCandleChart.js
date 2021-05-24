import React from 'react';
import {ComposedChart, Bar,Line, XAxis, YAxis, Tooltip, ErrorBar, ResponsiveContainer} from 'recharts'

import { connect } from "react-redux";
import { addBarData, } from "../../js/actions/index";


const mapStateToProps = state => {
  return { 
    candlestickData: state.candlestickData,
   };
};

function ConnectedCardCandleChart(props){
  	return (
      <ResponsiveContainer width="100%" height="50%">
        <ComposedChart width={150} height={40} data={props.candlestickData}>
          <XAxis dataKey='date' />
          <YAxis />
          <Bar dataKey="bar_green" fill="green">
            {/*<ErrorBar dataKey="line_green" stroke='white'/>*/}
          </Bar>
          <Bar dataKey="bar_red" fill="red">
            {/*<ErrorBar dataKey="line_red" stroke='white'/>*/}
          </Bar>
        </ComposedChart>
      </ResponsiveContainer>
    );
}

const CardCandleChart = connect(
  mapStateToProps,
  )(ConnectedCardCandleChart);

export default CardCandleChart;

