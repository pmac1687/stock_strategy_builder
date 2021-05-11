import React, { useEffect, useState, useReducer } from "react";
import axios from 'axios';
import {
    ComposedChart,
    Line,
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
  import { getData, getHistoryData, addHistoryGraphData, addMasterHistoryData } from "../js/actions/index";

const mapStateToProps = state => {
  return { 
    stock: state.stock,
    remoteData: state.remoteAOData,
    master: state.cardHistoryData,
    data: state.cardHistoryGraphData,
    masterData: state.masterHistoryData,
   };
};


const initialState = {
    master: [],
    masterData: [],
    data: [],
};
const reducer = (state, action) => {
  switch (action.type) {
    case 'set': return {...state, master: action.arr};
    case 'setData': return {...state, data: action.arr}
    case 'setMasterData': return {...state, masterData: action.arr};
    default: throw new Error('Unexpected action');
  }
};

function ConnectedCardHistoryChart(props){
    const [state, dispatch] = useReducer(reducer, initialState);
    
    useEffect(() => {
        if(state.master.length > 0){
            formatData();
        };
    }, [state.master]);
    
    useEffect(() => {
        console.log(state.masterData)
    }, [state.masterData])
    useEffect(() => {
        if(props.stock.length > 0){
          console.log('stockkkkkkkkkk', props.stock);
          props.getHistoryData();
        }    
      }, [props.stock]);
    useEffect(() => {
        console.log('!!!!!', props.data)
        if(props.master.length > 0){
          console.log('propppppps',props.data)
          dispatch({ type: 'set', arr: props.master});
          //formatData();
        }
    }, [props.master])
    /*
      const getData = () => {
        props.getData(props.stock.split(' ')[2]);
        console.log(props.remoteData)
        dispatch({ type: 'set', arr: props.remoteData})
        


        /*
        axios.get(`http://localhost:5000/${props.stock.split(' ')[2]}`, {
          headers: {
            "Access-Control-Allow-Origin": "*",
          }
        })  
        .then((res) => {  
          dispatch({ type: 'set', arr: res.data});
          ///setStockData(res.data);
          //console.log(stockData) 
        })
        .catch(err => {  
          console.log(err)  
        });  
        
      };
    */
      function formatData(){
        const arr = [];
        console.log('masterrrrrrrr', state.master)
        for(let i=0;i<state.master[1].length;i++){
            //console.log(state.master[1][i]);
            const price = state.master[1][i];
            const ao = state.master[2][i];
            let date = state.master[3][i].split('T')[0].split('-');
            date = `${date[1]}/${date[2]}`
            ///console.log(date, 'dddadadadadadad')
            const percent = ao !== 0 ? (Math.round((ao / price) *10)  > 8 || Math.round((ao / price) *10) < -8) ? 8:Math.round((ao / price) *10) : 0;
            ///console.log(percent);
            const dic = {'name': state.master[0], 'price': price, 'ao': ao, 'date': date, 'percent': Math.abs(percent)};
            arr.push(dic);
        };
        console.log('arggggggggg',arr);
        props.addHistoryGraphData(arr);
        props.addMasterHistoryData(arr);
        //dispatch({ type: 'setData', arr: arr});
        //dispatch({ type: 'setMasterData', arr: arr});
        props.setHistoryData(prev => arr);
      };
    
    return (
        <>
        <div style={{ width: '100%', height: '100%'}}>
          <div style={{ position: 'absolute'}}>
            <button  type="button" className="btn update" style={{ position: 'absolute', zIndex: '1', backgroundColor: 'darkgray'}}>
                Zoom Out
            </button>
            <div style={{ height: '15vh'}}></div>
    
    
          </div>
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              // eslint-disable-next-line react/jsx-no-bind
              width={500}
              height={1000}
              data={props.data}
              style={{
                backgroundColor: '#202020',
              }}
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
              }}
            >
              <XAxis dataKey="ticker"  />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="ao" barSize={20} fill="#FF0000" />
              <Bar dataKey="percent" barSize={20} fill="#C000FF" />
              <Line dataKey="price" fill="#40FF40" dot={false} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
    
        </>
    )
};


const CardHistoryChart = connect(
  mapStateToProps,
  { getData, getHistoryData, addHistoryGraphData, addMasterHistoryData }
  )(ConnectedCardHistoryChart);

export default CardHistoryChart;