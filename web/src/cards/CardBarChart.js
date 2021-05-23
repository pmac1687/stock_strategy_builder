import React, { useEffect } from "react";
import { BarChart, Bar,XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { connect } from "react-redux";
import { addBarData, addMasterBarData, incrementBarIndex, decrementBarIndex } from "../js/actions/index";


const mapStateToProps = state => {
  return { 
    masterData: state.masterHistoryData,
    data: state.cardBarData,
    masterBarData: state.masterCardBarData,
    index: state.cardBarIndex,
   };
};

function ConnectedCardBarChart(props) {
  useEffect(() => {
    if(props.masterData.length > 1){
      formatData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.masterData]);

  function formatData(){
    const sl_range = [props.masterData.length-props.index[0], props.masterData.length-props.index[1]];
    props.addBarData(props.masterData.slice(sl_range[0], sl_range[1]));
    props.addMasterBarData(props.masterData.slice(sl_range[0], sl_range[1]));
  };

  function panRight(){
    if(props.index[0] > 8){
      props.decrementBarIndex([props.index[0]-1, props.index[1] - 1])
      formatData();
    };
  };

  function panLeft(){
    if(props.index[0] < props.masterData.length){
      props.incrementBarIndex([props.index[0]+1, props.index[1] + 1])
      formatData();
    };
  };
  
  return (
    <>
      <button onClick={panRight} style={{ height: '2vw', width: '2vw', position: 'absolute', zIndex: '1'}}>right</button>
      <button onClick={panLeft} style={{ marginTop: '2vw' ,height: '2vw', width: '2vw', position: 'absolute', zIndex: '1'}}>left</button>
      <ResponsiveContainer width="100%" height="100%" style={{ backgroundColor: 'white'}}>
        <BarChart
          width={500}
          height={300}
          data={props.data}
          style={{ backgroundColor: 'white'}}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="price" fill="black" />
          <Bar dataKey="percent" fill="green" />
          <Bar dataKey="ao" fill="blue" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}

const CardBarChart = connect(
  mapStateToProps,
  { addBarData, addMasterBarData, incrementBarIndex, decrementBarIndex }
  )(ConnectedCardBarChart);

export default CardBarChart;