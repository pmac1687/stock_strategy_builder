import React, { useEffect, useState} from 'react';
import {ComposedChart, Bar,Line, XAxis, YAxis, Tooltip, ErrorBar, ResponsiveContainer} from 'recharts'

import { connect } from "react-redux";
import { addBarData, } from "../../js/actions/index";


const mapStateToProps = state => {
  return { 
    candlestickData: state.candlestickData,
    graphCount: state.graphCount,
   };
};

function ConnectedCardCandleChart(props){
  const heights = [
    '100%',
    '66%',
    '50%',
    '40%',
    '33%',
    '28%',
    '25%'
  ]

  	return (
      <ResponsiveContainer width="100%" height={`${heights[props.graphCount -1 ]}`}>
        <ComposedChart width={150} height={100} data={props.candlestickData}>
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

