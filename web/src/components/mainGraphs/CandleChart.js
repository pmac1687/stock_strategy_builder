import React, { useEffect, useState} from 'react';
import {ComposedChart, ReferenceDot,ReferenceArea, Bar,Line, XAxis, YAxis, Tooltip, ErrorBar, ResponsiveContainer} from 'recharts'

import { connect } from "react-redux";
import { 
  addBarData, 
  filterGraphData, 
  addRefCoords, 
  getStockData, 
  getCandlestickData,
  addSeriesArray,
  //removeWindowCoords,
  getWindowsSeriesData  
} from "../../js/actions/index";


const mapStateToProps = state => {
  return { 
    candlestickData: state.candlestickData,
    graphCount: state.graphCount,
    refWindow: state.refWindow,
   };
};

function ConnectedCardCandleChart(props){
  const [refAreaLeft, setRefAreaLeft] = useState()
  const [refAreaRight, setRefAreaRight] = useState()
  const [leftDot, setLeftDot] = useState();
  const [rightDot, setRightDot] = useState();
  const [refsOff, setRefsOff] = useState(true);
  const [rWindow, setRWindow] = useState([]);
  const refArr = []
  const heights = [
    '90%',
    '56%',
    '40%',
    '30%',
    '30%',
    '25%',
    '25%'
  ]
  useEffect(() => {
    setRWindow(prev => props.refWindow);
    console.log(rWindow);
  },[props.refWindow])

  useEffect(() => {
    console.log(refAreaLeft,'rleft');
    console.log(refAreaRight, 'rright')
  },[refAreaLeft, refAreaRight])

  function removeRefs(){
    const ref1 = document.getElementById('dot1');
    const ref2 = document.getElementById('dot2');
    ref1.style.display = 'none'
    ref2.style.display = 'none'
  }

  function zoom(){
    const arr = [refAreaLeft, refAreaRight]
    console.log('refarr',arr)
    // setRefAreaLeft(prev => '');
    // setRefAreaRight(prev => '');
    if(refAreaRight && refAreaLeft){
      if (refAreaRight !== refAreaLeft){
        props.addRefCoords(arr)
      }
    }
    props.filterGraphData()
  }


  	return (
      <>
        <div style={{ width:"100%", height:'7vh', display:'flex', alignItems:'center', }}>
          <button style={{ marginLeft: '2vw'}} onClick={() => {props.getStockData(); props.getCandlestickData()}}  type="button" class="btn btn-secondary">Zoom Out</button>
          <button style={{ marginLeft: '2vw'}}  type="button" class="btn btn-primary">Add Ref</button>
          <button style={{ marginLeft: '2vw'}} onClick={() => {props.addSeriesArray(); props.getWindowsSeriesData();}} type="button" class="btn btn-success btn-sm">Save</button>
          <button style={{ marginLeft: '2vw'}} onClick={props.removeWindowCoords} type="button" class="btn btn-danger btn-sm">Delete</button>
        </div>
        <ResponsiveContainer width="100%" height={`${heights[props.graphCount -1 ]}`}>
          <ComposedChart
          barCategoryGap='1%'
          barGap='1%'
          barSize='1'
          minHeight='10'
          width={150} 
          height={100} 
          data={props.candlestickData}
          onMouseDown={(e) => refsOff && setRefAreaLeft(prev => e.activeLabel)}
          onMouseMove={(e) => refAreaLeft && setRefAreaRight(prev => e.activeLabel)}
          // eslint-disable-next-line react/jsx-no-bind
          onMouseUp={zoom}
          >
            <XAxis dataKey='date' />
            <YAxis />
            <Bar dataKey="bar_green" fill="green">
              {/*<ErrorBar dataKey="line_green" stroke='white'/>*/}
            </Bar>
            <Tooltip />
            <Bar dataKey="bar_red" fill="red">
              {/*<ErrorBar dataKey="line_red" stroke='white'/>*/}
            </Bar>
            <Line type="linear" dataKey="close" stroke="#8884d8" strokeWidth={.5} dot={false}/>
            <ReferenceDot  id='dot1' x={rWindow[0]} y='0' r={20} fill="red" stroke="none" />
            <ReferenceDot id='dot2' x={rWindow[1]} y='0' r={20} fill="red" stroke="none" />
            {refAreaLeft && refAreaRight ? (
              <ReferenceArea x1={refAreaLeft} x2={refAreaRight} strokeOpacity={0.3} />
            ) : null}
          </ComposedChart>
        </ResponsiveContainer>
      </>
    );
}

const CardCandleChart = connect(
  mapStateToProps,
  { 
    filterGraphData, 
    addRefCoords, 
    getStockData, 
    getCandlestickData,
    addSeriesArray,
    //removeWindowCoords,
    getWindowsSeriesData 
  },
  )(ConnectedCardCandleChart);

export default CardCandleChart;

